import React, { useState } from "react";

// Define the type for the props
interface CardWithNamedOverlayProps {
    src: string;
    title: string;
}

const CardWithNamedOverlay: React.FC<CardWithNamedOverlayProps> = ({ src, title }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
  
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
  
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full overflow-hidden"
      >
        {/* Darken background and zoom the image */}
        <div
          className={`absolute inset-0 transition-all duration-300 ease-in-out
                      ${isHovered ? 'bg-black opacity-50 scale-110' : 'bg-transparent opacity-0 scale-100'}
                      md:bg-black md:opacity-50`}
        ></div>
  
        <img
          src={src}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-300 ease-in-out transform
                      ${isHovered ? 'scale-110 opacity-80' : 'scale-100 opacity-100'}`}
        />
  
        {/* Text */}
        <div
          className={`absolute inset-0 flex justify-center items-center
                      text-white text-3xl transition-opacity duration-300
                      ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          {title}
        </div>
      </div>
    );
  };
  
export default CardWithNamedOverlay;
  