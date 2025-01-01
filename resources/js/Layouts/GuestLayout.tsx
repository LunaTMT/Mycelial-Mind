import ApplicationLogo from '@/Components/Login/ApplicationLogo';
import Dropdown from '@/Components/Login/Dropdown';
import NavLink from '@/Components/Nav/NavLink';
import ResponsiveNavLink from '@/Components/Login/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState, useEffect } from 'react';



import { CiLogin } from 'react-icons/ci';


import { CiShoppingCart } from "react-icons/ci";
import Socials from '@/Components/Menu/Socials';


import { IoHomeOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { MdAccountBox } from "react-icons/md";

import { IoBookOutline } from "react-icons/io5";
import { BsInfoSquare } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { LiaBookSolid } from "react-icons/lia";
import { BsShop } from "react-icons/bs";
import { BsInfoSquareFill } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";




export default function Guest({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                // If scrolling down, hide the nav
                setIsNavVisible(false);
            } else {
                // If scrolling up, show the nav
                setIsNavVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        // Add the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]); // Dependency array to track last scroll position

    return (
        <div className="realtive w-full min-h-screen  bg-gradient-to-r from-sky-500 to-slate-950">
            
   
            <nav className="mx-auto h-[12vh] max-w-7xl px-4 sm:px-6 lg:px-8 p-6">
                <div className="flex justify-between items-center">
                    {/* Left side (Socials) */}
                   
                    
                    <div className="flex w-auto items-center justify-start  border-white/20 ">
                        <div className="hidden space-x-5  sm:flex  ">
                        <NavLink
                            href="/"
                            active={true}
                            icon={<IoHomeOutline className="w-full h-auto text-white/70 hover:text-white" />} 
                            name="Home"
                        />

                        <NavLink
                            href="/shop"
                            active={false}
                            icon={<BsShop className="w-full h-auto text-white/70 hover:text-white" />} 
                            name="Shop"
                        />

                    
                        <NavLink
                            href="/about"
                            active={false}
                            icon={<BsInfoSquare className="w-full h-auto text-white/70 hover:text-white" />} 
                            name="About"
                        />

                        </div>
                    </div>

                   
                
                    {/* Centered Logo 
                    <Link href="/"> 
                        <div className="absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <ApplicationLogo
                                className="
                                    w-20 h-auto 
                                    rounded-full opacity-[100%] 
                                    fill-current text-gray-500
                                    bg-gradient-to-r from-sky-500 to-slate-700
                                    hover:opacity-100 hover:scale-105 hover:shadow-[0_0_20px_rgba(56,189,248,0.75)] 
                                    transition-all duration-300"
                            />
                        </div>
                    </Link>
                    */}
                    
                    {/* Right side (Cart) */}
                    <div className="hidden sm:flex items-center">
                        <Link href={route('cart')}>
                            <CiShoppingCart className="w-10 h-10 text-white/70 hover:text-white ms-3" />
                        </Link>

                        <Link href={route('dashboard')}>
                            <CiLogin className="w-10 h-10 text-white/70 hover:text-white ms-3" />
                        </Link>

                    </div>

                </div>
            </nav>

            {header && (
                <header className="text-white h-[6vh] shadow border-t-2 border-white/25">
                <div className="flex justify-between items-center 
                                mx-auto 
                                w-full h-full max-w-7xl 
                                sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

    
            <main className="relative p-5 w-full h-full min-h-[82vh]  flex items-center justify-center 
                             mx-auto max-w-7xl py-4 sm:px-6 lg:px-8">
                    {children}
            </main>



            <footer className='relative bottom-0 w-full h-auto p-5 flex items-center justify-center gap-4'>
                <div className="flex items-center justify-center space-x-5">
                    <Socials />
                </div>
            </footer>
        </div>
    );
}


















