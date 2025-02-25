import React from "react";
import Socials from '@/Components/Menu/Socials';

const Footer = () => {
    return (
        <footer className="font-Poppins relative bottom-0 h-auto p-8 flex flex-col items-center text-gray-900 dark:text-gray-200 bg-cover bg-center">
            {/* Grid Layout with 5 Columns */}
            <div className="relative z-10 w-full max-w-7xl sm:px-6 lg:px-8 grid grid-cols-5 text-center md:text-left gap-8">
                {/* Legal Column */}
                <div>
                    <h2 className="text-lg font-semibold">LEGAL</h2>
                    <ul className="text-sm space-y-1">
                        <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
                        <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="/cookie-policy" className="hover:underline">Cookie Policy</a></li>
                        <li><a href="/website-terms" className="hover:underline">Website Terms of Use</a></li>
                        <li><a href="/acceptable-use" className="hover:underline">Acceptable Use Policy</a></li>
                    </ul>
                </div>


                <div>
                    <h2 className="text-lg font-semibold">ACCOUNT</h2>
                    <ul className="text-sm space-y-1">
                        <li><a href="/account" className="hover:underline">Profile</a></li>
                        <li><a href="/orders" className="hover:underline">Orders</a></li>
                        <li><a href="/information" className="hover:underline">Shipping</a></li>
                    </ul>
                </div>

               

                {/* Center Column - Logo */}
                <div className="flex justify-center items-center">
                    <img src="/assets/images/logo.png" alt="Mycenic Logo" className="w-32 md:w-40 rounded-full border-2 bg-gradient-to-t from-[#f5f5dc]/40 shadow-lg dark:hidden" />
                    <img src="/assets/images/logo2.png" alt="Mycenic Logo" className="w-32 md:w-40 rounded-full border-2 bg-gradient-to-t dark:from-slate-400 dark:via-slate-800/50 shadow-lg hidden dark:block" />
                </div>

                {/* Help & Account Column Together */}
                <div className="col-span-2 flex justify-end gap-12">
                    <div>
                        <h2 className="text-lg font-semibold">HELP</h2>
                        <ul className="text-sm space-y-1">
                            <li><a href="/guides" className="hover:underline">Guides</a></li>
                            <li><a href="/faqs" className="hover:underline">FAQs</a></li>
                            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                            <li><a href="/about" className="hover:underline">About Us</a></li>
                        </ul>
                    </div>
                     {/* Information Column */}
                    <div>
                        <h2 className="text-lg font-semibold">INFORMATION</h2>
                        <ul className="text-sm space-y-1">
                            <li><a href="/payments" className="hover:underline">Payments</a></li>
                            <li><a href="/shipping" className="hover:underline">Shipping & Dispatch</a></li>
                            <li><a href="/cancellations" className="hover:underline">Cancellations</a></li>
                            <li><a href="/returns" className="hover:underline">Refunds & Returns</a></li>
                        </ul>
                    </div>
                </div>
            </div>



            {/* Footer Bottom Section */}
            <div className="relative z-10 w-full flex flex-col gap-1 sm:px-6 lg:px-8 justify-between items-center max-w-7xl mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
                <div className="flex flex-row items-center md:items-start">
                    <Socials />
                </div>
                <p className="text-xs text-center md:text-left mt-4 md:mt-0">&copy; {new Date().getFullYear()} Mycenic. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
