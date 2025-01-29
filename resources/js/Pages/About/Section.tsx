import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DownwardArrow from "./DownwardArrow";

interface SectionProps {
    title: string;
    subtitle: string;
    content: string;
    index: number;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, content, index }) => {
    const parentDivRef = useRef<HTMLDivElement>(null);

    // Scroll progress for parent motion.div
    const { scrollYProgress } = useScroll({
        target: parentDivRef,
        offset: ["start end", "end start"],
    });

    // Define animations
    const fadeInOut = useTransform(scrollYProgress, [0, 0.4, 0.7, 0.8], [0, 1, 1, 0]);
    const fadeOut = useTransform(scrollYProgress, [0.7, 0.8], [1, 0]);
    const progressBarWidth = useTransform(scrollYProgress, [0.32, 0.7], ["0%", "100%"]);

    return (
        <motion.div ref={parentDivRef} className="w-full h-[200vh] flex flex-col items-center justify-center max-w-7xl">
            <motion.section
                className="h-auto flex flex-col justify-center items-center gap-5 text-white dark:text-white sticky top-[15%]"
                style={{ opacity: index === 0 ? fadeOut : fadeInOut }}
            >
                <h2 className="text-9xl fixed top-[20%] font-Audrey 
                
                
                dark:text-transparent dark:bg-clip-text 
                dark:bg-gradient-to-t dark:from-[#e7e77a] dark:to-white dark:text-#f5f5dc 
                
                text-[125px] leading-tight dark:text-shadow-beige-glow">
                    {title}
                </h2>

                <motion.div
                    style={{ width: progressBarWidth, opacity: fadeInOut }}
                    className="fixed top-[35%] h-[2px] max-w-6xl z-50 rounded-full bg-gradient-to-r
                    
                    from-yellow-400/10 via-yellow-400 to-yellow-400/10
                    dark:from-slate-800/10 dark:via-white dark:to-slate-800/10 shadow-golden-glow"
                />

            </motion.section>

            <motion.div
                className="fixed top-[40%] p-10 rounded-lg text-transparent bg-clip-text bg-gradient-to-t from-[#e7e77a] to-white text-#f5f5dc text-[100px] leading-tight text-shadow-beige-glow flex flex-col items-center justify-center text-center gap-5 max-w-7xl mx-auto"
                style={{ opacity: fadeInOut }}
            >
                <p className="text-2xl leading-relaxed">{subtitle}</p>
                <p className="text-2xl leading-relaxed">{content}</p>
                <DownwardArrow />
            </motion.div>
        </motion.div>
    );
};

export default Section;
