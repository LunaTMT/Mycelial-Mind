import React, { useEffect, useState, useRef } from 'react';
import Reveal from '../../utils/Reveal';






interface ScrollingWordsProps {
  text: string;
  words: string[]; 
}

const ScrollingWords: React.FC<ScrollingWordsProps> = ({ text, words }) => {
  const gradients: string[] = [
    "from-[#12c2e9] via-[#c471ed] to-[#f64f59]",
    "from-[#59c173] via-[#a17fe0] to-[#5d26c1]",
    "from-[#f12711] to-[#f5af19]",
    "from-[#654ea3] to-[#b991c1]",
    "from-[#8a2387] via-[#e94057] to-[#f27121]",
    "from-[#da4453] to-[#89216b]",
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const currentIndexRef = useRef<number>(currentIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true); 

      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          currentIndexRef.current = (prevIndex + 1) % words.length;
          return currentIndexRef.current;
        });

      setFadeOut(false); 

      }, 500); // Wait for the fade-out effect to complete before changing text
    }, 2000); // Change service every 2 seconds

    return () => clearInterval(interval);
  });

  return (
    <div className="inline-block w-full">
      
      <h1 className="text-3xl inline">
        { text }&nbsp;
      </h1>
      
      <h1 className={`
          text-3xl inline bg-gradient-to-r
          bg-black 
          bg-clip-text text-transparent 
          transition-all duration-500 ease-in-out
          ${fadeOut ? 'translate-y-[-20px] opacity-0' : 'translate-y-0 opacity-100'}
          ${gradients[currentIndex]} `}>
          {words[currentIndex]} 
      </h1>

    </div>
  );
};

export default ScrollingWords;
