import React, { useRef, useState, useEffect } from "react";
import { useScroll, motion } from "framer-motion";
import { CircularProgressbar } from 'react-circular-progressbar';

interface SectionProps {
    title: string;
    subtitle: string;
    content: string;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, content }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        return scrollYProgress.onChange(latest => {
            setProgress(latest * 100);
        });
    }, [scrollYProgress]);

    return (
        <section
            ref={sectionRef}
            className="min-h-[85vh] flex flex-col justify-center items-center gap-5 text-gray-900 dark:text-white "
        >
            
            {/* Title with scroll effect */}
            <h2 className="text-8xl font-Aileron_Thin mb-10 ">
                {title}
            </h2>

            {/* Subtitle */}
            <p className="text-2xl leading-relaxed text-center">{subtitle}</p>

            {/* Content */}
            <p className="text-2xl leading-relaxed text-center">{content}</p>
        </section>
    );
};

export default Section;
