import { PropsWithChildren, ReactNode } from 'react';
import NavLink from '@/Components/Nav/NavLink';
import { MdAccountBox } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import Dropdown from '@/Components/Login/Dropdown';
import Socials from '@/Components/Menu/Socials';
import { useNav } from '@/Contexts/NavContext';
import { usePage, router } from '@inertiajs/react';
import { useDarkMode } from '@/Contexts/DarkModeContext';

interface User {
    name: string;
    email: string;
}

interface PageProps {
    auth: {
        user: User;
    };
}

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { user } = usePage<PageProps>().props.auth;
    const { url } = usePage();
    const { scrollDirection } = useNav();
    const { darkMode, toggleDarkMode } = useDarkMode();

    const navItems = [
        { href: '/', name: 'Home' },
        { href: '/shop', name: 'Shop' },
        { href: '/about', name: 'About' },
        { href: '/dashboard', name: 'Dashboard' },
    ];

    const renderNavLinks = () => {
        return navItems.map((item) => (
            <NavLink
                key={item.href}
                href={item.href}
                name={item.name}
                active={url === item.href}
                className={url === item.href ? 'active' : ''}
            />
        ));
    };

    const handleProfileClick = () => {
        router.get('/profile');
    };

    const handleLogout = () => {
        router.post('/logout', {}, { preserveScroll: true });
    };

    return (
        <div className="relative w-full min-h-screen dark:bg-slate-800">
            {/* Navigation */}
            <header className={`flex flex-col items-center justify-center h-[12vh] sticky top-0 z-10 shadow-md transition-all duration-500 ease-in-out overflow-visible bg-white dark:bg-slate-700/50 dark:text-white
                    ${scrollDirection === "down" ? '-translate-y-1/2' : ''}`}>
                <nav className={`w-full h-[6vh] flex items-center justify-center z-50 max-w-7xl sm:px-6 lg:px-8 
                    ${scrollDirection === "down" ? '-translate-y-full' : 'translate-y-0'} transition-transform duration-500 ease-in-out`}>
                    <div className="flex gap-8 justify-center items-center">
                        {renderNavLinks()}
                    </div>

                    {/* Right-aligned Icons */}
                    <div className="flex items-center ml-auto justify-center">
                        <CiShoppingCart className="w-14 h-10 text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white" />

                        {/* Account Dropdown */}
                        <Dropdown>
                            <Dropdown.Trigger>
                                <MdAccountBox className="w-14 h-12 text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white" />
                            </Dropdown.Trigger>

                            <Dropdown.Content >
                                <ul className={`absolute right-0 top-full mt-2 border border-gray-200 dark:border-gray-600 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md z-50
                                    ${scrollDirection === "down" ? 'hidden' : ''}`}>
                                    <li 
                                        className="cursor-pointer px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                                        onClick={handleProfileClick}
                                    >
                                        Profile
                                    </li>
                                    <li 
                                        className="cursor-pointer px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                                        onClick={handleLogout}
                                    >
                                        Log Out
                                    </li>
                                </ul>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </nav>

                <div className="flex h-[6vh] justify-between items-center mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>

            {/* Dark Mode Toggle Button */}
            <div className="absolute top-0 right-0 z-50 w-14 h-12">
                <button
                    onClick={toggleDarkMode}
                    className="w-full h-full text-black dark:text-white hover:rotate-[-30deg] transition-transform duration-500 focus:outline-none"
                >
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
