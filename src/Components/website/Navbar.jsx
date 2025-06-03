import React from 'react'
import { Icons } from '../../Content/Icons'
import { MainContent } from '../../Content/MainContent'
import { Link } from 'react-router-dom'
import { Routers } from '../../Routes/Routers'
import { Link as ScrollLink } from 'react-scroll'

const Navbar = () => {
  const navItems = ["Home", "About", "Packages", "FAQ", "Contact"]

  return (
    <div className=''>
      <div className='flex items-center md:px-4 px-0 p-2 justify-between w-full'>
        <div className='flex gap-5 justify-center items-center'>
          <img
            src={MainContent.AppLogo}
            alt="logo"
            className='md:h-16 h-10 sm:h-12 object-contain'
          />
        </div>

        <div className='hidden md:flex lg:gap-12 gap-8 justify-center items-center bg-white/5 backdrop-blur-md rounded-lg px-8 py-3'>
          {navItems.map((item) => (
            <ScrollLink
              key={item}
              to={item.toLowerCase()}
              smooth={true}
              duration={500}
              offset={-0}
              className='text-gray-200 hover:text-bg-color cursor-pointer capitalize transition-colors duration-200'
            >
              {item}
            </ScrollLink>
          ))}
        </div>

        <div className='flex gap-5 items-center'>
          <div className='hidden md:flex'>
            <Icons type="EARTH" color="#fff" size={30} />
          </div>
          <Link to={Routers.LOGIN}>
            <button className='bg-bg-color font-semibold text-white rounded-md p-1 px-4'>
              Connect Wallet
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
