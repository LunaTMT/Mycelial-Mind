import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { useNav } from '@/Contexts/NavContext';
import { useDarkMode } from '@/Contexts/DarkModeContext';
import { useCart } from "@/Contexts/CartContext";
import { motion } from 'framer-motion';

import Socials from '@/Components/Menu/Socials';
import NavLinks from '@/Components/Nav/NavLinks';
import DarkModeToggle from '@/Components/Buttons/DarkModeButton';
import CartButton from '@/Components/Buttons/CartButton';
import AccountDropdown from '@/Components/Dropdown/AccountDropdown';

import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function Authenticated({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    const { user } = usePage<PageProps>().props.auth;
    const { url } = usePage();
    const { scrollDirection } = useNav();
    const { darkMode, toggleDarkMode } = useDarkMode();
    const { scaled, cart, totalItems } = useCart();

    const [mounted, setMounted] = useState(false);

    const navItems = [
        { href: '/', name: 'HOME' },
        { href: '/shop', name: 'SHOP' },
        { href: '/about', name: 'ABOUT' },
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative w-full min-h-screen  dark:bg-slate-800">

            
            <motion.header      
                className="sticky w-full flex flex-col items-center justify-center min-h-6vh h-auto  top-0 z-10 shadow-xl overflow-visible  bg-[#f5f5dc] dark:bg-slate-700 dark:text-white"
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileInView={{
                    y: scrollDirection === "down" ? "-6vh" : "0",
                }}
                viewport={{ once: true }} // Animation occurs once when the header is in view
            >
                
                {/* top nav */}
                <nav className={`w-full h-[6vh] flex items-center justify-center z-50 max-w-7xl sm:px-6 lg:px-8`}>
                    {/* left */}
                    <NavLinks items={navItems} currentUrl={url} />

                    {/* right */}
                    <div className="flex items-center ml-auto justify-center yellow- relative mb-2">
                    
                    
                        <div className="transform hover:scale-110 transition-transform duration-500">
                            <DarkModeSwitch
                                checked={darkMode}
                                onChange={toggleDarkMode}
                                size={35}
                                moonColor={darkMode ? "white" : "rgb(253, 230, 138)"}  // Use RGB string for yellow
                                sunColor={darkMode ? "black" : "rgb(252, 211, 77)"}  // Use RGB for Tailwind 'yellow-500'
                            />
                        </div>

                        <CartButton cart={cart} totalItems={totalItems} scaled={scaled} />
                        <AccountDropdown />
                    </div>
                </nav>

                {/* bottom nav */}
                <div className="flex max-h-[6vh] justify-between items-center mx-auto w-full max-w-7xl sm:px-6 lg:px-8 ">
                    {header}
                </div>
            </motion.header>

            <main className="relative w-full min-h-[88vh] flex flex-col   justify-start items-center 
                            bg-gradient-to-l from-[#f5f5dc]  via-white to-[#f5f5dc] 
                            dark:bg-gradient-to-b dark:from-slate-700 dark:via-slate-400/50 dark:to-slate-800">
                {children}
            </main>
                

            <footer className="dark:bg-slate-800 border-t-[1px]bg-sky-300 dark:border-none border-black/20 bg-[#f5f5dc] relative bottom-0 w-full h-[auto] p-5 flex items-center justify-center gap-4">
                    <Socials />
            </footer>
        </div>
    );
}
