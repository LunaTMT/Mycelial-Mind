import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionProps {
    title: string;
    subtitle: string;
    content: string;
    index: number;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, content, index }) => {
    const parentDivRef = useRef<HTMLDivElement>(null);

    // Use scroll progress for parent motion.div
    const { scrollYProgress } = useScroll({
        target: parentDivRef,
        offset: ["start end", "end start"],
    });

    // Define animations
    const fadeInOut     = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.8], [0, 1, 1, 0]);

    const fadeOut       = useTransform(scrollYProgress, [0.7, 0.8], [1, 0]);
    const progressBarWidth = useTransform(scrollYProgress, [0.32, 0.7], ["0%", "100%"]);

    // Log scrollYProgress as it changes
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((value) => {
      
            console.log(` ${value}`);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, [scrollYProgress]);

    return (
        <motion.div
            ref={parentDivRef}
            className="w-full h-[200vh] flex flex-col items-center justify-center max-w-7xl"
        >
            <motion.section
                className="h-auto flex flex-col justify-center items-center gap-5 text-black dark:text-white sticky top-[15%]"
                style={{
                    opacity: index === 0 ? fadeOut : fadeInOut,
                }}
            >
                <h2 className="text-9xl fixed top-[20%] font-Aileron_Thin  p-1 rounded-lg">{title}</h2>

                {/* Progress Bar with gradient change for light/dark mode */}
                <motion.div
                    style={{ width: progressBarWidth, opacity: fadeInOut }}
                    className={`fixed top-[35%] h-[2px] max-w-4xl  z-50 rounded-full 
                        bg-gradient-to-r 
                       from-yellow-400/50 via-yellow-400 to-yellow-400/50
                        dark:from-slate-800/50 dark:via-white dark:to-slate-800/50`}
                />
            </motion.section>

            <motion.div
                className="fixed top-[40%]  p-10 rounded-lg text-black dark:text-white flex flex-col items-center justify-center text-center gap-5 max-w-7xl mx-auto"
                style={{ opacity: fadeInOut }}
            >
                <p className="text-2xl leading-relaxed">{subtitle}</p>
                <p className="text-2xl leading-relaxed">{content}</p>
            </motion.div>
        </motion.div>
    );
};

export default Section;
