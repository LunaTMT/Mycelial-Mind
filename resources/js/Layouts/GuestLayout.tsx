import ApplicationLogo from '@/Components/Login/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col h-[100vh]
                        min-h-screen
                        items-center bg-gray-100 pt-6 justify-center sm:pt-0 
                        bg-gradient-to-r from-sky-500 to-slate-950">
            
            
            
            <div className="h-[20%] flex items-center justify-center w-full      ">
                <Link href="/">
                    <ApplicationLogo
                        className="
                        w-[15%] h-auto m-auto
                        rounded-full opacity-[50%] 
                        fill-current text-gray-500
                        hover:opacity-100 hover:scale-105 hover:shadow-[0_0_20px_rgba(56,189,248,0.75)] 
                        transition-all duration-300  "
                        
                    />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}




