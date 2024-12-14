import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Hamburger from 'hamburger-react';

// Define the type for navigation items
interface NavItem {
  id: number;
  text: string;
}

const Navbar: React.FC = () => {
  const [nav, setNav]               = useState<boolean>(false);
  const [isOpen, setOpen]           = useState<boolean>(false);
  const [visible, setVisible]       = useState<boolean>(true);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null); // Track which item is being hovered

  const navItems: NavItem[] = [
    { id: 1, text: 'Home' },
    { id: 2, text: 'Company' },
    { id: 3, text: 'Resources' },
    { id: 4, text: 'About' },
    { id: 5, text: 'Contact' },
  ];

  const handleNav = () => setNav(prev => !prev);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.ul
        className="md:flex md:transition-none z-50"
        initial={{ opacity: 0, y: -100, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 2 }}
      >
        {navItems.map((item, index) => (
          <motion.li
            key={item.id}
            className="relative m-4 px-4 py-1 md:text-xl lg:text-xl cursor-pointer group"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 1 }} 
            transition={{ type: "spring", stiffness: 400, damping: 17 }} // Optional: Apply transition for the scaling
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onMouseEnter={() => setHoveringIndex(index)} // Set hover state when mouse enters
            onMouseLeave={() => setHoveringIndex(null)} // Reset hover state when mouse leaves
          >
            {item.text}
            {/* Line under text */}
            <motion.div
              animate={{ width: hoveringIndex === index ? "100%" : "0%" }} // Animate width based on hover state
              className={`absolute left-0 bottom-0 h-[2px] rounded-full
                bg-white bg-gradient-to-r from-sky-500 to-white
                ${hoveringIndex === index ? "shadow-[0_0_20px_5px_rgba(0,182,255,0.6)]" : ""}
              `}
              transition={{ duration: 0.5 }}
            />
          </motion.li>
        ))}
      </motion.ul>



      {/* Mobile Navigation Icon */}
      <motion.div
        onClick={handleNav}
        className={`fixed top-0 right-0 m-4 md:hidden transition-all duration-1000 z-50`}
        initial={{ opacity: 1 }}
        animate={{ opacity: visible ? 1 : 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </motion.div>

      {/* Mobile Navigation Menu */}
      <motion.ul
        initial={{ x: '-100%' }}
        animate={{ x: nav ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`md:hidden fixed left-0 top-0 w-auto h-auto bg-transparent text-white border border-red-600 z-50 pl-10 pt-10`}
      >
        {navItems.map(item => (
          <motion.li
            key={item.id}
            className="w-auto relative p-4 cursor-pointer group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: item.id * 0.1 }}
          >
            {item.text}
            <motion.div
              className="absolute left-0 bottom-0 h-[2px] bg-white w-0 group-hover:w-full transition-all duration-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
};

export default Navbar;
