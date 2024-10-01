import React, { useEffect, useState, useRef } from 'react';

interface ScrollingWordsProps {
  text: string;
  words: string[]; // Define a prop type for the words array
}

const ScrollingWords: React.FC<ScrollingWordsProps> = ({ text, words }) => {
  const gradients: string[] = [
    "from-[#12c2e9] via-[#c471ed] to-[#f64f59]",
    "from-[#59c173] via-[#a17fe0] to-[#5d26c1]",
    "from-[#f12711] to-[#f5af19]",
    "from-[#654ea3] to-[#eaafc8]",
    "from-[#8a2387] via-[#e94057] to-[#f27121]",
    "from-[#da4453] to-[#89216b]",
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const currentIndexRef = useRef<number>(currentIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true); // Start fading out

      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % words.length; // Use words array length
          currentIndexRef.current = newIndex;
          return newIndex;
        });

        setFadeOut(false); // Reset fade-out effect
      }, 500); // Wait for the fade-out effect to complete before changing text
    }, 2000); // Change service every 2 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="inline-block w-full">
      <h1 className="text-3xl relative">
        { text }&nbsp;

        <span
          key={currentIndex}
          className={`absolute bg-gradient-to-r
                      bg-black 
                      ${gradients[currentIndex]} 
                      bg-clip-text text-transparent 
                      transition-all duration-500 ease-in-out
                      ${fadeOut ? 'translate-y-[-20px] opacity-0' : 'translate-y-0 opacity-100'}`}
        >
          {words[currentIndex]} {/* Use words from props */}
        </span>
      </h1>
    </div>
  );
};

export default ScrollingWords;
