import { PropsWithChildren, ReactNode } from 'react';
import NavLink from '@/Components/Nav/NavLink';


import { useNav } from '@/Contexts/NavContext';
import { usePage, router } from '@inertiajs/react';
import { useDarkMode } from '@/Contexts/DarkModeContext';
import { useCart } from "@/Contexts/CartContext";

import {Link} from '@inertiajs/react';
import { CiLogin } from "react-icons/ci";

import Socials from '@/Components/Menu/Socials';
import NavLinks from '@/Components/Nav/NavLinks';
import DarkModeToggle from '@/Components/Buttons/DarkModeButton';
import CartButton from '@/Components/Buttons/CartButton';
import LoginButton from '@/Components/Buttons/LoginButton';


export default function Guest({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
       
       const { url } = usePage();
       const { scrollDirection } = useNav();
       const { darkMode, toggleDarkMode } = useDarkMode();
       const { scaled, cart, totalItems } = useCart();  // Access both `scaled` and `cart`
   
       const navItems = [
           { href: '/', name: 'Home' },
           { href: '/shop', name: 'Shop' },
           { href: '/about', name: 'About' }
       ];
   


   
       return (
           <div className="relative w-full min-h-screen dark:bg-slate-800">
               {/* Navigation */}
                            
               <header className={`flex flex-col items-center justify-center h-[12vh] sticky top-0 z-10 shadow-md transition-all duration-500 ease-in-out overflow-visible bg-white dark:bg-slate-700/50 dark:text-white ${scrollDirection === "down" ? '-translate-y-1/2' : ''}`}>
                
                {/* top nav */}
                <nav className={`w-full h-[6vh] flex items-center justify-center z-50 max-w-7xl sm:px-6 lg:px-8 ${scrollDirection === "down" ? '-translate-y-full' : 'translate-y-0'} transition-transform duration-500 ease-in-out`}>
                    
                    {/* left */}
                    <NavLinks items={navItems} currentUrl={url} />
                    
                    {/* right */}
                    <div className="flex items-center ml-auto justify-center relative">
                        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                        <CartButton cart={cart} totalItems={totalItems} scaled={scaled} />
                        <LoginButton />
                    </div>
                </nav>

                 {/* bottom nav */}
                <div className="flex h-[6vh] justify-between items-center mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>

   
   
               {/* Main Content */}
               <main className="relative w-full min-h-[88vh] flex flex-col gap-10 justify-start items-center mx-auto py-4 sm:px-6 max-w-7xl lg:px-8">
                   {children}
               </main>
   
               {/* Footer */}
               <footer className="dark:bg-slate-700/50 z-50 relative bottom-0 w-full h-[auto] p-5 flex items-center justify-center gap-4">
                   <div className="flex items-center justify-center space-x-5 dark:text-white">
                       <Socials />
                   </div>
               </footer>
           </div>
       );
   }
   