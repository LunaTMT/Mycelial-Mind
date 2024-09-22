import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Home' },
    { id: 2, text: 'Company' },
    { id: 3, text: 'Resources' },
    { id: 4, text: 'About' },
    { id: 5, text: 'Contact' },
  ];

  return (
    <div className='bg-black flex  justify-between align-middle items-center w-full h-35   px-4 text-white'>
      {/* Logo */}
          <img 
      src="/assets/images/logo.png" // Path to your image
      alt="Mycelial Mind Logo" 
      className='object-fit h-36 ' // Adjust height and width as needed
    />
  

    {/* Desktop Navigation */}
    <ul className='hidden md:flex'>
      {navItems.map(item => (
        <li key={item.id} className='relative  m-4 cursor-pointer px-4 py-1 group'>
          {item.text}
          <div className="absolute left-0 bottom-0 h-[2px] bg-slate-100 w-0 group-hover:w-full transition-all duration-500"></div>
        </li>
      ))}
    </ul>


      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={35} /> : <AiOutlineMenu size={35} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-[9rem] w-[40%] h-full border-none bg-black -in-out duration-500'
            : 'ease-in-out w-[25%] duration-500 fixed top-[9rem] bottom-0 left-[-100%]'
        }
      >

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b hover:bg-white duration-300 hover:text-black cursor-pointer border-none'
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;