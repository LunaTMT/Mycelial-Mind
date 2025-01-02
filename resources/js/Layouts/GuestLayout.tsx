import { PropsWithChildren, ReactNode, useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import Socials from "@/Components/Menu/Socials";
import NavLink from "@/Components/Nav/NavLink";
import { CiLogin, CiShoppingCart } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { BsShop, BsInfoSquare } from "react-icons/bs";
import { LiaHomeSolid } from "react-icons/lia";

export default function Guest({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const headerPosition = document.querySelector("header")?.offsetTop || 0;
            setIsSticky(window.scrollY >= headerPosition);
        };

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="relative w-full min-h-screen ">
            {/* Navigation Bar */}
            <nav className="h-[12vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="hidden space-x-5 sm:flex ">
                    <NavLink
                        href="/"
                        active={true}
                        icon={<IoHomeOutline className="w-full h-auto text-black hover:text-black/50" />}
                        name="Home"
                    />
                    <NavLink
                        href="/shop"
                        active={false}
                        icon={<BsShop className="w-full h-auto text-black hover:text-black/50" />}
                        name="Shop"
                    />
                    <NavLink
                        href="/about"
                        active={false}
                        icon={<BsInfoSquare className="w-full h-auto text-black hover:text-black/50" />}
                        name="About"
                    />
                </div>

                <div className="hidden sm:flex items-center space-x-3">
                    <Link href={route("cart")}>
                        <CiShoppingCart className="w-10 h-10 text-black/70 hover:text-black " />
                    </Link>
                    <Link href={route("dashboard")}>
                        <CiLogin className="w-10 h-10 text-black/70 hover:text-black " />
                    </Link>
                </div>

            </nav>

            {/* Header */}
            <header className="sticky top-0 z-40 bg-white shadow-md h-[6vh] transition-all duration-300 ease-in-out ">
                <div className="flex justify-between items-center mx-auto w-full h-full max-w-7xl sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>


            {/* Main Content */}


            <main className="relative w-full min-h-[82vh] 
                h-full flex justify-start items-center
                mx-auto py-4 sm:px-6 max-w-7xl lg:px-8">
                {children}
                
            </main>


            {/* Footer */}
            <footer className="relative bottom-0 border-t-4 w-full h-auto p-5 flex items-center justify-center gap-4">
                <div className="flex items-center justify-center space-x-5">
                    <Socials />
                </div>
            </footer>
        </div>
    );
}
