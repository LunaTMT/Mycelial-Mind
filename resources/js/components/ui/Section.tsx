import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

import LearnMoreButton from './LearnMoreButton';
import ImageScroller from '../../components/ui/ImageScroller';

interface SectionProps {
    name: string;
    item_align: 'items-start' | 'items-center' | 'items-end'; // Tailwind alignment classes for items
    text_align: 'text-left' | 'text-center' | 'text-right'; // Tailwind alignment classes for text
}

const Section: React.FC<SectionProps> = ({ name, item_align, text_align }) => {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    console.log('motion.div is fully in view!');
                } else {
                    setInView(false);
                    console.log('motion.div is not fully in view!');
                }
            },
            { threshold: 1.0 } // Trigger when 100% of the element is in view
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div className="relative w-full h-[100vh] bg-black z-50">
            {/* Content Overlay */}
            <motion.div
                ref={sectionRef} // Attach the ref here to track the element
                className={`
                    sticky top-[25%] 
                    w-full h-full flex flex-col justify-center items-center
                    ${item_align} 
                    text-6xl px-6 lg:px-12 z-20
                `}
            >
                <h1
                    className={`
                        font-extralight
                        text-white text-7xl 
                        dark:text-black 
                        lg:text-8xl
                        pb-4
                        ${text_align} // Dynamically apply text alignment
                    `}
                >
                    {name} {/* Dynamically set the h1 content */}
                </h1>

                <p
                    className={`
                        text-base sm:text-lg lg:text-xl
                        text-white dark:text-gray-300
                        max-w-4xl 
                        mt-4 
                        ${text_align} // Dynamically apply text alignment
                    `}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                    ut aliquip ex ea commodo consequat.
                </p>

                <LearnMoreButton />
            </motion.div>

      
        </div>
    );
};

export default Section;
