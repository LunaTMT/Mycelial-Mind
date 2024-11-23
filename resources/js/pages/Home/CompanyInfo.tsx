import React from 'react';
import ScrollingWords from '../../components/ui/ScrollingWords';

const CompanyInfo: React.FC = () => {
    return (
        <div
            className={`relative
                        flex flex-col lg:flex-row items-center justify-center 
                        w-full h-screen
                        mx-auto
                        z-20
                        gap-32
                        bg-black`}
        >
            {/* Left Column: Image */}
            <div className="flex justify-center lg:justify-end w-full lg:w-1/2">
                <img
                    className="
                        w-[60%]        /* Base width for extra small screens (mobile) */
                        sm:w-[50%]      /* Small screens */
                        md:w-[40%]      /* Medium screens */
                        lg:w-[80%]      /* Adjust size for large screens */
                        xl:w-[70%]      /* Extra large screens */
                        h-auto"
                    src="/assets/images/logo2.png"
                    alt="Mycenic Logo"
                />
            </div>

            {/* Right Column: Text and Content */}
            <div className="flex flex-col items-start justify-center text-center lg:text-left w-1/2 h-screen bg-black gap-10">
                <h1 className="                                  
                                font-extrabold italic leading-none tracking-tight text-white 
                                     
                                sm:text-[7rem] 
                                lg:text-8xl
                                text-right        
                                dark:text-white">
                    Mycenic
                </h1>

                <ScrollingWords 
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                    words={["Mushroom Cultivation", "Advanced technology", "Gourmet Mushrooms", "Medicine", "Paraphernalia", "Research"]} 
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
