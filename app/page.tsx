import { Hero, SearchBar, CustomFilter, CarCard } from "@/components"
import { fetchCars } from "@/utils"

export default async function Home() {
  const allCars = await fetchCars()

  const isDataEmpty = !allCars?.length

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 mb-48 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catelogue</h1>
          <p>Explore the cars you might like</p>
          <div className="home__filters">
            <SearchBar />
            {/* <div className="home__filter-container">
              <CustomFilter title="fuel" />
              <CustomFilter title="year" />
            </div> */}
          </div>

          {isDataEmpty ? (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">No results</h2>
              <p>No cars found. Please try a different search.</p>
            </div>
          ) : (
            <section className="w-full mx-auto">
              <div className="home__cars-wrapper">
                {allCars?.map((car, index) => (
                  <CarCard key={`${car.make}-${car.model}-${car.year}-${index}`} car={car} />
                ))}
              </div>  
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
