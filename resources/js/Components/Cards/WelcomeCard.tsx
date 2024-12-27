import React from "react";

interface WelcomeCardProps {
    title: string;
    icon: React.ReactElement; // Expecting a React element for the icon
    className: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ title, icon, className }) => {
    return (
        <a
            className={`relative flex flex-col justify-start items-start p-10 gap-5 
                rounded-lg z-30 overflow-hidden bg-white/30 group hover:bg-white/50
                ${className} `} // Ensure it takes full height
        >
            {/* Title */}
            <h2 className="text-7xl font-Aileron_UltraLight text-white text-transparent 
                group-hover:text-white transition-all duration-300 transform group-hover:translate-x-[20px]">
                {title}
            </h2>
    
            {/* Paragraph */}
            <p className="text-white/80 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
    
            {/* Icon */}
            <div
                className="absolute right-10 w-20 h-20 text-white/75
                rounded-xl bg-gradient-to-r from-sky-500 to-sky-300
                opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
                {icon}
            </div>
        </a>
    );
};

  


export default WelcomeCard;
