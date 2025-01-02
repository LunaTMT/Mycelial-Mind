import { usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState, useEffect } from 'react';
import NavLink from '@/Components/Nav/NavLink';
import ResponsiveNavLink from '@/Components/Login/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/Login/ApplicationLogo';
import Dropdown from '@/Components/Login/Dropdown';
import LightCircles from '@/Components/Background/LightCircles';
import { IoHomeOutline } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { BsInfoSquare } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { CiShoppingCart } from "react-icons/ci";
import { RiShoppingCartLine } from "react-icons/ri";
import Socials from '@/Components/Menu/Socials';
import { BsShop } from "react-icons/bs";

// Define the types for the user and page props
interface User {
    name: string;
    email: string;
    // Add other properties if necessary
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
    // Type the usePage hook properly
    const { user } = usePage<PageProps>().props.auth;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
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
    }, [lastScrollY]);

    return (
        <div className="relative w-full min-h-screen bg-gradient-to-r from-sky-500 to-slate-950">

     

            <nav className="mx-auto h-[12vh] max-w-7xl px-4 sm:px-6 lg:px-8 p-6">
                <div className="flex h justify-between items-center">
                    <div className="flex w-auto items-center justify-start border-white/20 ">
                        <div className="hidden space-x-5 sm:flex">
                            <NavLink
                                href="/"
                                active={true}
                                icon={<IoHomeOutline className="w-full h-auto text-white/70 hover:text-white " />}
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
                                icon={<BsInfoSquare className="w-full h-auto text-white/70 hover:text-white " />}
                                name="About"
                            />
                            <NavLink
                                href="/dashboard"
                                active={false}
                                icon={<RxDashboard className="w-full h-auto text-white/70 hover:text-white " />}
                                name="Dashboard"
                            />
                        </div>
                    </div>

                    <div className="hidden sm:ms-6 sm:flex sm:items-center">
                        <Link href={route('cart')}>
                            <CiShoppingCart className="w-10 h-10 text-white/70 hover:text-white ms-3" />
                        </Link>

                        <div className="relative ms-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                        >
                                            <MdAccountBox className="w-14 h-14 text-white/70 hover:text-white" />
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    {/* Mobile version */}
                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown((previousState) => !previousState)
                            }
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">{user.name}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            
            <header className="sticky top-0 z-40 bg-sky shadow-md h-[6vh] transition-all duration-300 ease-in-out ">
                <div className="flex justify-between items-center mx-auto w-full h-full max-w-7xl sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>


            <main className="relative w-full min-h-[82vh] 
                h-auto
                mx-auto py-4 sm:px-6 max-w-7xl lg:px-8">
                {children}
                
            </main>

            <footer className="relative bottom-0 w-full h-auto p-5 flex items-center justify-center gap-4">
                <div className="flex items-center justify-center space-x-5">
                    <Socials />
                </div>
            </footer>
        </div>
    );
}




    