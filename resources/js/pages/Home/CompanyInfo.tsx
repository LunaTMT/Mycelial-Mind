import React from 'react';
import ScrollingWords from '../../components/ui/ScrollingWords';

const CompanyInfo: React.FC = () => {
    return (
        <div
            className={`relative
                        flex flex-col items-center justify-center 
                        w-full h-screen
                        mx-auto
                        z-20
                        gap-10
                        bg-black

                        sm:gap-8
                        md:gap-5 md:p-5 
                        lg:gap-10 lg:flex-row
                        xl:gap-20 xl:px-24
                        `}
        >
            {/* Left Column: Image */}
            <div className="flex justify-center w-1/2
                            
                            
                            md:w-[35%]
                            lg:justify-end
                            xl:justify-start xl:w-[25%]
                            ">
                                
                <img
                    className="
                        w-auto         
                        h-auto
                        "
                    src="/assets/images/logo2.png"
                    alt="Mycenic Logo"
                />
            </div>

            {/* Right Column: Text and Content */}
            <div className="flex flex-col                
                            
                            justify-start  items-center 
                            text-center
                            h-auto w-[70%]

                            gap-5

                            md:w-[80%]

                            lg:justify-center lg:items-start  lg:text-left 
                            lg:h-screen 

                            xl:w-2/3

                            ">
                <h1 className="                                  
                                leading-none tracking-tight text-white 
                                
                                
                                text-7xl
                                font-thin    
                                                             
                                dark:text-white

                                lg:text-8xl
                                xl:text-
                                ">
                    Mycenic
                </h1>

                <ScrollingWords 
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                    words={["Cultivation", "Technology", "Gourmet", "Medicine", "Paraphernalia", "Research"]} 
                />

                <a 
                    href="#" 
                    className="inline-flex items-center justify-center 
                            px-5 py-3 my-5  
                            text-2xl font-medium text-center text-white 
                            bg-black rounded-lg border-2
                            hover:bg-white hover:border-black hover:text-black hover:scale-110
                            transform transition-all duration-300 ease-in-out
                            ">
                    Learn more
                    <svg 
                        className="w-6 h-6 ms-2 rtl:rotate-180 
                                transition-all duration-300 ease-in-out
                                group-hover:scale-150" 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 14 10">
                        <path 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </a>


            </div>
        </div>
    );
};

export default CompanyInfo;
