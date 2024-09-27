import React from 'react';
import ScrollingWords from '../../components/ui/ScrollingWords';


export default function CompanyInfo(){
    return (
        <div
        className={`relative
                    flex flex-col items-start justify-center h-full
                    w-[80%]
                    mx-auto
                     p-5 pt-20 z-20
                    `} >

                        
        <img 
            className="
                w-[60%]        /* Base width for extra small screens (mobile) */
                sm:w-[50%]      /* Small screens */
                md:w-[40%]      /* Medium screens */
                lg:w-[30%]      /* Large screens */
                xl:w-[30%]      /* Extra large screens */
                2xl:w-[30%]     /* 2XL screens */
                h-auto
                pb-5"
            src="/assets/images/logo2.png"
            alt="Mycenic Logo"
        />

        <h1 className="mb-4 
                        font-extrabold leading-none tracking-tight text-gray-900 
                        text-5xl
                        sm:text-6xl
                        pb-2
                        dark:text-white">
            Mycenic
        </h1>



        
        <ScrollingWords words={["word1", "word2", "word3"]} />
        




        <a href="#" className="inline-flex items-center justify-center 
                            px-5 py-3 my-5 
                            text-base font-medium text-center text-white 
                            bg-black rounded-lg border-2
                            hover:bg-white hover:border-black hover:text-black">
            Learn more
            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
        </div>
    );
};

