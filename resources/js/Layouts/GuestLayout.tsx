import { PropsWithChildren, ReactNode, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import Socials from "@/Components/Menu/Socials";
import NavLink from "@/Components/Nav/NavLink";
import { CiShoppingCart } from "react-icons/ci";
import { useNav } from '@/Contexts/NavContext';
import { useDarkMode } from '@/Contexts/DarkModeContext';
import { CiLogin } from "react-icons/ci";

export default function Guest({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { darkMode, toggleDarkMode } = useDarkMode(); // Use context here
    const { scrollDirection } = useNav();
    const { url } = usePage();

    useEffect(() => {
        // The dark mode state will be handled automatically by the context
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <div className="relative w-full min-h-screen dark:bg-slate-800">
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
                            active={url === '/'}
                            className={url === '/' ? 'active' : ''}
                        />
                        <NavLink
                            href="/shop"
                            name="Shop"
                            active={url === '/shop'}
                            className={url === '/shop' ? 'active' : ''}
                        />
                        <NavLink
                            href="/about"
                            name="About"
                            active={url === '/about'}
                            className={url === '/about' ? 'active' : ''}
                        />
                    </div>
                    {/* Right-aligned Icons */}
                    <div className="flex items-center ml-auto justify-center">
                        <CiShoppingCart className="w-14 h-10 text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white" />

                        {/* Login Button */}
                        <Link href="/login" className=" text-sm font-medium text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white">
                            <CiLogin className="w-14 h-10"/>
                        </Link>
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
           <main className="relative w-full min-h-[88vh] flex flex-col gap-10 justify-center items-center mx-auto py-4 sm:px-6 max-w-7xl lg:px-8">
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
