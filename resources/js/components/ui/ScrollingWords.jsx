import React, { useEffect, useState, useRef } from 'react';

const ScrollingWords = () => {
  const gradients = [
    "from-[#12c2e9] via-[#c471ed] to-[#f64f59]",
    "from-[#59c173] via-[#a17fe0] to-[#5d26c1]",
    "from-[#f12711] to-[#f5af19]",
    "from-[#654ea3] to-[#eaafc8]",
    "from-[#8a2387] via-[#e94057] to-[#f27121]",
    "from-[#da4453] to-[#89216b]",
  ];

  const services = [
    "Mushroom Cultivation",
    "Advanced technology",
    "Gourmet Mushrooms",
    "Medicine",
    "Paraphernalia",
    "Research"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true); // Start fading out

      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % services.length;
          currentIndexRef.current = newIndex;
          return newIndex;
        });

        setFadeOut(false); // Reset fade-out effect
      }, 500); // Wait for the fade-out effect to complete before changing text
    }, 2000); // Change service every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-block w-full">
      <h1 className="text-3xl relative">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua&nbsp;
        
        <span
          key={currentIndex}
          className={`absolute bg-gradient-to-r
                      bg-black 
                      ${gradients[currentIndex]} 
                      bg-clip-text text-transparent 
                      transition-all duration-500 ease-in-out
                      ${fadeOut ? 'translate-y-[-20px] opacity-0' : 'translate-y-0 opacity-100'}`}
        >
          {services[currentIndex]}
          
        </span>
      </h1>
    </div>
  );
};

export default ScrollingWords;
