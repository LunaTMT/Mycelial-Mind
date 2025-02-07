import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionProps {
    title: string;
    subtitle: string;
    content: string;
    index: number;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, content, index }) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Scroll progress tracking for fade and progress effects
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Animations
    const fadeInOut = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.75], [0, 1, 1, 0]);
    const progressBarWidth = useTransform(scrollYProgress, [0.32, 0.7], ["0%", "100%"]);

    return (
        <div ref={sectionRef} className="relative w-full h-[200vh]">
            {/* Fixed Section Wrapper */}
            <motion.div 
                className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center"
                style={{ opacity: fadeInOut }}
            >
                {/* Title */}
                <motion.h2 
                    className="text-8xl font-Audrey text-black dark:text-transparent dark:bg-clip-text 
                               dark:bg-gradient-to-t dark:from-[#e7e77a] dark:to-white leading-tight"
                >
                    {title}
                </motion.h2>

                {/* Progress Bar */}
                <motion.div 
                    className="h-[2px] max-w-5xl bg-gradient-to-r from-yellow-400/10 via-yellow-400 to-yellow-400/10
                               dark:from-slate-800/10 dark:via-white dark:to-slate-800/10 shadow-golden-glow"
                    style={{ width: progressBarWidth }}
                />

                {/* Subtitle & Content */}
                <div className="p-10 text-center max-w-7xl dark:text-white">
                    <p className="text-xl leading-relaxed">{subtitle}</p>
                    <p className="text-xl leading-relaxed mt-4">{content}</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Section;
