import { PropsWithChildren, ReactNode, useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import Socials from "@/Components/Menu/Socials";
import NavLink from "@/Components/Nav/NavLink";
import { CiLogin, CiShoppingCart } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { BsShop, BsInfoSquare } from "react-icons/bs";
import { LiaHomeSolid } from "react-icons/lia";
import { useNav } from '@/Contexts/NavContext';

export default function Guest({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const [darkMode, setDarkMode] = useState(false);
    const { showNav, scrollDirection } = useNav();
    const { url } = usePage();

    useEffect(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

    }, []);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            if (newMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            return newMode;
        });
    };

    return (
        <div className="relative w-full min-h-screen dark:bg-slate-800 ">
                        {/* Navigation */}
                        <header className={`flex flex-col items-center justify-center h-[12vh] sticky top-0 z-10 shadow-md transition-all duration-500 ease-in-out overflow-visible bg-white dark:bg-slate-700/50 dark:text-white
                                    ${scrollDirection === "down" ? '-translate-y-1/2' : ''}`}>
                            <nav className={`w-full h-[6vh] flex items-center justify-center z-50 max-w-7xl sm:px-6 lg:px-8 
                                ${scrollDirection === "down" ? '-translate-y-full' : 'translate-y-0'} transition-transform duration-500 ease-in-out`}>
                               <div className="flex gap-8 justify-center items-center">
                                    {/* Centered NavLinks */}
                                    <NavLink
                                        href="/"
                                        name="Home"
                                        active={url === '/'} // Pass active as a boolean
                                        className={url === '/' ? 'active' : ''}
                                    />
                                    <NavLink
                                        href="/shop"
                                        name="Shop"
                                        active={url === '/shop'} // Pass active as a boolean
                                        className={url === '/shop' ? 'active' : ''}
                                    />
                                    <NavLink
                                        href="/about"
                                        name="About"
                                        active={url === '/about'} // Pass active as a boolean
                                        className={url === '/about' ? 'active' : ''}
                                    />
     
                                </div>
            
            
                                {/* Right-aligned Icons */}
                                <div className="flex items-center ml-auto justify-center">
                                    <CiShoppingCart className="w-14 h-10 text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white" />
            
                                    
                                </div>
                            </nav>
            
                            <div className="flex h-[6vh] justify-between items-center mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
            
                        {/* Dark Mode Toggle Button */}
                        <div className="absolute top-0 right-0 z-50 w-14 h-12">
                            <button onClick={toggleDarkMode} className="w-full h-full text-black dark:text-white hover:rotate-[-30deg] transition-transform duration-500 focus:outline-none">
                                {darkMode ? <span className="text-3xl">🌙</span> : <span className="text-3xl">☀️</span>}
                            </button>
                        </div>

            {/* Main Content */}
            <main className="relative w-full min-h-[82vh] 
                h-full flex justify-start items-center
                mx-auto py-4 sm:px-6 max-w-7xl lg:px-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="relative bottom-0 w-full h-auto p-5 flex items-center justify-center gap-4">
                <div className="flex items-center justify-center space-x-5 dark:text-white">
                    <Socials />
                </div>
            </footer>
        </div>
    );
}
