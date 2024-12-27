import ApplicationLogo from '@/Components/Login/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import MouseColorChanger from '@/Components/Background/MouseColorChanger';
import Socials from '@/Components/Menu/Socials';

import { FiShoppingCart } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";
import { SlSocialFacebook } from "react-icons/sl";


import { CiLogin } from 'react-icons/ci';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col h-[100vh]
                        min-h-screen
                        items-center justify-center 
                          bg-gradient-to-r from-sky-500 via-slate-900 to-sky-500">
            
            <MouseColorChanger className='z-0'/>
        
            <header className="relative h-[15%] z-10 bg-white/15 top-0 grid grid-cols-3 items-center">
                
                <div className=' flex h-full p-5 space-x-2 items-center justify-start '>
                    <Socials /> 
                </div>
                
                <Link href="/"> 
                    <ApplicationLogo
                        className="
                        col-start-2
                        w-[15%] h-auto m-auto
                        rounded-full opacity-[100%] 
                        fill-current text-gray-500
                        bg-gradient-to-r from-sky-700 to-slate-700
                        hover:opacity-100 hover:scale-105 hover:shadow-[0_0_20px_rgba(56,189,248,0.75)] 
                        transition-all duration-300  "
                    />
                </Link>

            
                    <nav className="flex justify-end items-center pr-10 col-start-3 z-50 h-full">
                        <Link href={route('dashboard')}>
                            <CiLogin className="w-10 h-10 text-white" />
                        </Link>

                        <Link href={route('shop')}>
                            <CiShoppingCart   className="w-10 h-10 text-white" />
                        </Link>
                    </nav>
                
            </header>

    
            <div className="relative h-[85%] w-full z-10 overflow-hidden  sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}




