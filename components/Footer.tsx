import Image from 'next/image'
import Link from 'next/link'

import { footerLinks } from '@/constants'

const Footer = () => {
  const getSectionEmoji = (title: string) => {
    switch (title) {
      case 'About':
        return '🚗'
      case 'Company':
        return '🏢'
      case 'Socials':
        return '🌐'
      default:
        return '📍'
    }
  }

  return (
    <footer className='relative overflow-hidden'>
      {/* Multi-layer background */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary-blue-100 via-white to-light-white'></div>
      <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-secondary-orange/5 to-primary-blue/5'></div>
      
      {/* Geometric decorative elements */}
      <div className='absolute top-0 left-0 w-32 h-32 bg-primary-blue/8 rounded-full -translate-x-16 -translate-y-16 animate-pulse'></div>
      <div className='absolute bottom-0 right-0 w-40 h-40 bg-secondary-orange/8 rounded-full translate-x-20 translate-y-20 animate-pulse delay-700'></div>
      <div className='absolute top-1/4 right-1/4 w-20 h-20 bg-primary-blue/5 rounded-full animate-bounce'></div>
      <div className='absolute bottom-1/3 left-1/5 w-16 h-16 bg-secondary-orange/5 rounded-full animate-bounce delay-1000'></div>
      
      {/* Car silhouette pattern */}
      <div className='absolute inset-0 opacity-100'>
        <div className='absolute top-10 left-10 text-6xl text-primary-blue/20 transform rotate-12'>🚗</div>
        <div className='absolute top-20 right-20 text-4xl text-secondary-orange/20 transform -rotate-12'>🏎️</div>
        <div className='absolute bottom-42 left-4/11 text-5xl text-primary-blue/15 transform rotate-45'>🚙</div>
        <div className='absolute bottom-1/3 right-1/4 text-3xl text-grey/30 transform -rotate-45'>🚕</div>
      </div>
      
      {/* Dotted pattern overlay */}
      <div className='absolute inset-0 footer-dotted-pattern'></div>
      
      <div className='relative z-10 flex flex-col text-black-100 mt-5 border-t border-primary-blue/20'>
        <div className='flex max-md:flex-col max-md:items-center justify-center gap-8 sm:px-16 px-6 py-12'>
          <div className='flex flex-col md:flex-row justify-center items-start max-md:items-center w-full max-w-4xl gap-8 md:gap-16'>
            {footerLinks.map((link) => (
              <div key={link.title} className='flex flex-col gap-4 max-md:text-center md:flex-1 group'>
                <h3 className='font-bold text-xl flex items-center justify-center md:justify-start gap-2 text-black-100 group-hover:text-primary-blue transition-colors duration-300'>
                  <span className='text-2xl drop-shadow-sm'>{getSectionEmoji(link.title)}</span>
                  {link.title}
                </h3>
                <ul className='flex flex-col gap-3'>
                  {link.links.map((item) => (
                    <li key={item.title} className='text-grey text-base hover:text-primary-blue hover:translate-x-1 transition-all duration-200 md:ml-4'>
                      <span className='mr-2 text-primary-blue/40'>•</span>
                      <Link href={item.url} className='relative'>
                        {item.title}
                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all duration-300 group-hover:w-full'></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='relative backdrop-blur-sm bg-white/40 border-t border-primary-blue/10'>
          <div className='flex flex-col md:flex-row md:justify-between justify-center items-center gap-4 sm:px-16 px-6 py-8'>
            <p className='text-base text-black-100/80 text-center md:text-left font-medium'>
                Carhub 2025. All rights reserved &copy;
            </p>
            <div className='flex gap-6 text-center'>
              <Link href='/' className='text-grey hover:text-primary-blue hover:scale-105 transition-all duration-200 font-medium px-3 py-1 rounded-full hover:bg-primary-blue/10'>
                Privacy Policy
              </Link>
              <Link href='/' className='text-grey hover:text-primary-blue hover:scale-105 transition-all duration-200 font-medium px-3 py-1 rounded-full hover:bg-primary-blue/10'>
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer