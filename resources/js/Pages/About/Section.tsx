import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionProps {
    title: string;
    subtitle: string;
    content: string;
    index: number; // Added index prop to differentiate the first section
}

const Section: React.FC<SectionProps> = ({ title, subtitle, content, index }) => {
    const parentDivRef = useRef<HTMLDivElement>(null);

    // Use scroll progress for parent motion.div
    const { scrollYProgress } = useScroll({
        target: parentDivRef,
        offset: ["start end", "end start"],
    });

    // Log the parent scrollYProgress
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((value) => {
            console.log(`Parent scrollYProgress: ${value}`);
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    // Define animations
    const fadeInOut = useTransform(scrollYProgress, [0, 0.5, 0.7, 0.8], [0, 1, 1, 0]);
    const fadeOut = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);
    const progressBarWidth = useTransform(scrollYProgress, [0.3, 1], ["0%", "100%"]);

    return (
        <motion.div
            ref={parentDivRef}
            className="w-full h-[200vh]  flex flex-col items-center justify-start max-w-7xl"
        >
            <motion.section
                className="h-auto flex flex-col justify-center items-center gap-5 text-gray-900 dark:text-white sticky top-[30%]"
                style={{
                    opacity: index ===  0 ? fadeOut : fadeInOut, // Use fadeOut for the first section, fadeInOut for others
                }}
            >
                <h2 className="text-8xl font-Aileron_Thin  ">{title}</h2>
                
                <motion.div
                    style={{ width: progressBarWidth, opacity: fadeInOut }}
                    className={`relative h-1 z-50 bg-gradient-to-r rounded-full mb-10 from-black/50 via-white to-black/50`}
                />

                <p className="text-2xl leading-relaxed text-center">{subtitle}</p>
                <p className="text-2xl leading-relaxed text-center">{content}</p>
               
                
            </motion.section>
        </motion.div>
    );
};

export default Section;
