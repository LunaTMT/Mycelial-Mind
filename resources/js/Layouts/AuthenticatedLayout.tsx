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

export default function Authenticated({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    const { user } = usePage<PageProps>().props.auth;
    const { url } = usePage();
    const { scrollDirection } = useNav();
    const { darkMode, toggleDarkMode } = useDarkMode();
    const { scaled, cart, totalItems } = useCart();

    const [mounted, setMounted] = useState(false);

    const navItems = [
        { href: '/', name: 'Home' },
        { href: '/shop', name: 'Shop' },
        { href: '/about', name: 'About' },
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative w-full min-h-screen dark:bg-slate-800">
            <motion.header
                className="flex flex-col items-center justify-center h-[12vh] sticky top-0 z-10 shadow-md overflow-visible bg-white dark:bg-slate-700/50 dark:text-white"
                initial={{ y: -100 }}  // Starts above the screen
                animate={{ y: 0 }}     // Ends at its normal position
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileInView={{
                    y: scrollDirection === "down" ? "-50%" : "0",
                }}
                viewport={{ once: true }} // Animation occurs once when the header is in view
            >
                {/* top nav */}
                <nav className={`w-full h-[6vh] flex items-center justify-center z-50 max-w-7xl sm:px-6 lg:px-8`}>
                    {/* left */}
                    <NavLinks items={navItems} currentUrl={url} />

                    {/* right */}
                    <div className="flex items-center ml-auto justify-center relative">
                        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                        <CartButton cart={cart} totalItems={totalItems} scaled={scaled} />
                        <AccountDropdown />
                    </div>
                </nav>

                {/* bottom nav */}
                <div className="flex h-[6vh] justify-between items-center mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
                    {header}
                </div>
            </motion.header>

            <main className="relative w-full min-h-[88vh] flex flex-col gap-2 justify-start items-center mx-auto py-4 sm:px-6 max-w-7xl lg:px-8 ">
                {children}
            </main>

            <footer className="dark:bg-slate-700/50 z-50 relative bottom-0 w-full h-[auto] p-5 flex items-center justify-center gap-4">
                <div className="flex items-center justify-center space-x-5 dark:text-white">
                    <Socials />
                </div>
            </footer>
        </div>
    );
}
