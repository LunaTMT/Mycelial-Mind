import React from "react";

interface WelcomeCardProps {
    title: string;
    icon: React.ReactElement; // Expecting a React element for the icon
    className: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ title, icon, className }) => {
    return (
        <a
            className={`relative flex flex-col p-10 gap-5 
                rounded-lg z-30 overflow-hidden  shadow-xl group hover:bg-white/50 
                dark:bg-gray-800/40 dark:hover:bg-gray-700/50 
                ${className}`}
        >
            {/* Title */}
            <h2 className="text-7xl font-Aileron_UltraLight text-black 
                group-hover:text-black dark:text-white dark:group-hover:text-white
                transition-all duration-300 transform group-hover:translate-x-[20px]">
                {title}
            </h2>

            {/* Paragraph */}
            <p className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-black dark:group-hover:text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            {/* Icon */}
            <div
                className="absolute right-10 w-20 h-20 
                rounded-xl bg-gradient-to-r from-grey to-grey-700
                opacity-0 group-hover:opacity-100 transition-opacity duration-500 
               
                dark:text-white/75 dark:bg-gradient-to-r from-gray-500 to-gray-400 dark:opacity-100"
            >
                {icon}
            </div>
        </a>
    );
};

export default WelcomeCard;
