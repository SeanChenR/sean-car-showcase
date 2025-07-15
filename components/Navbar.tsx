import Link from "next/link"
import Image from "next/image"

import CustomButton from "./CustomButton"

const Navbar = () => {
  return (
    <header className="w-full absolute z-10">
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent'>
        <Link href="/" className="flex-center">
          <Image
            src="/logo.svg"
            alt="Car Hub Logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>

        <CustomButton
          title='Sign in'
          containerStyles='text-primary-blue rounded-full bg-white min-w-[130px] hover:bg-primary-blue hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out border-2 border-transparent hover:border-primary-blue-100'
          btnType='button'
        />
      </nav>
    </header>
  )
}

export default Navbar