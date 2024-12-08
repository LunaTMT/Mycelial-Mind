import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Hamburger from 'hamburger-react';

// Define the type for navigation items
interface NavItem {
  id: number;
  text: string;
}

const Navbar: React.FC = () => {
  const [nav, setNav] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { id: 1, text: 'Home' },
    { id: 2, text: 'Company' },
    { id: 3, text: 'Resources' },
    { id: 4, text: 'About' },
    { id: 5, text: 'Contact' },
  ];

  const handleNav = () => setNav(prev => !prev);

  // Effect to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
      if (isScrolled) {
        setNav(false); // Close nav if scrolled down
        setOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Used for setting the components of the navbar to visible after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <>
      {/* Blurry Background Overlay */}
      <div className={`absolute 
                      w-full h-full 
                      flex items-center justify-center 
                      pt-24 inset-0 
                      transition-all duration-1000 
                      ${visible ? 'blur-none' : 'blur-2xl'}`}>
        {/* Desktop Navigation */}
        <ul className={`hidden 
                        md:flex 
                        transition-transform duration-1000 
                        ${visible ? 'translate-y-0 blur-0' : '-translate-y-full blur-none'}`}>
          {navItems.map(item => (
            <li key={item.id} className='relative 
                            m-4 px-4 py-1 
                            text-lg 
                            md:text-xl 
                            lg:text-2xl 
                            cursor-pointer group'>
              {item.text}
              {/* Line under text */}
              <div className="absolute left-0 bottom-0 
                              h-[2px] w-0 
                              bg-white 
                              filter blur-lg 
                              group-hover:w-full group-hover:blur-none 
                              transition-all duration-500"></div>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className={`
            fixed 
            top-0 right-0 
            m-4
            md:hidden  
            transition-all duration-1000 
            ${visible ? 'blur-none' : 'blur-2xl'}`}>
          <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>  

      {/* Mobile Navigation Menu */}
      <ul className={`
        md:hidden

        fixed left-0 top-0
        w-auto h-auto 
        bg-transparent text-white border-none
        border-red-600
        z-10
        pl-10
        pt-10
        transition-transform duration-1000 ease-in-out 
        ${nav ? 'translate-x-0 ' : '-translate-x-full'}
        ${isScrolled ? 'hidden' : ''}
      `}>
        {navItems.map(item => (
          <li key={item.id} className='w-auto relative p-4 cursor-pointer group'>
            {item.text}
            <div className="absolute left-0 bottom-0 h-[2px] bg-white w-0 group-hover:w-full transition-all duration-500"></div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navbar;
