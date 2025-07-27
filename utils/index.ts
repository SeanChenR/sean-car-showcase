// Simple XML parser for FuelEconomy.gov API
function parseXmlToJson(xmlText: string) {
  // Extract menuItem values from XML
  const menuItemRegex = /<menuItem>\s*<text>(.*?)<\/text>\s*<value>(.*?)<\/value>\s*<\/menuItem>/g;
  const menuItems = [];
  let match;
  
  while ((match = menuItemRegex.exec(xmlText)) !== null) {
    menuItems.push({
      text: match[1],
      value: match[2]
    });
  }
  
  return { menuItem: menuItems };
}

function parseVehicleXml(xmlText: string) {
  const getValue = (tag: string) => {
    const regex = new RegExp(`<${tag}>(.*?)<\/${tag}>`, 'i');
    const match = xmlText.match(regex);
    return match ? match[1] : null;
  };
  
  return {
    city08: parseInt(getValue('city08') || '0') || 0,
    VClass: getValue('VClass') || 'Unknown',
    comb08: parseInt(getValue('comb08') || '0') || 0,
    cylinders: parseInt(getValue('cylinders') || '0') || 0,
    displ: parseFloat(getValue('displ') || '0') || 0,
    drive: getValue('drive') || 'Unknown',
    fuelType1: getValue('fuelType1') || 'Unknown',
    highway08: parseInt(getValue('highway08') || '0') || 0,
    make: getValue('make') || '',
    model: getValue('model') || '',
    trany: getValue('trany') || 'Unknown',
    year: parseInt(getValue('year') || '0') || 0
  };
}

interface VehicleOption {
  text: string
  value: string
}

export async function fetchCars(make = 'Toyota', model = 'Corolla', year = '2020') {
  try {
    // Get vehicle options for the specified make, model, and year
    const optionsUrl = `https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`
    const optionsResponse = await fetch(optionsUrl)
    const optionsXml = await optionsResponse.text()
    const optionsData = parseXmlToJson(optionsXml)
    
    // If no options found, return empty array
    if (!optionsData.menuItem || optionsData.menuItem.length === 0) {
      return []
    }

    // Fetch detailed data for each vehicle option
    const vehicles = await Promise.all(
      optionsData.menuItem.map(async (option: VehicleOption) => {
        const vehicleResponse = await fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${option.value}`)
        const vehicleXml = await vehicleResponse.text()
        const vehicleData = parseVehicleXml(vehicleXml)
        
        // Transform the API response to match our CarProps interface
        return {
          city_mpg: vehicleData.city08,
          class: vehicleData.VClass,
          combination_mpg: vehicleData.comb08,
          cylinders: vehicleData.cylinders,
          displacement: vehicleData.displ,
          drive: vehicleData.drive,
          fuel_type: vehicleData.fuelType1,
          highway_mpg: vehicleData.highway08,
          make: vehicleData.make || make,
          model: vehicleData.model || model,
          transmission: vehicleData.trany,
          year: vehicleData.year || parseInt(year)
        }
      })
    )

    return vehicles
  } catch (error) {
    console.error('Error fetching cars:', error)
    return []
  }
}

// Car rental calculation constants
const BASE_PRICE_PER_DAY = 50; // Base rental price per day in dollars
const MILEAGE_FACTOR = 0.1; // Additional rate per mile driven
const AGE_FACTOR = 0.05; // Additional rate per year of vehicle age

export const calculateCarRent = (city_mpg: number, year: number) => {
  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * MILEAGE_FACTOR;
  const ageRate = (new Date().getFullYear() - year) * AGE_FACTOR;

  // Calculate total rental rate per day
  const rentalRatePerDay = BASE_PRICE_PER_DAY + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};