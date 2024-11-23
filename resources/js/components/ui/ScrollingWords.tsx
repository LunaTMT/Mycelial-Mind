import React, { useEffect, useState } from 'react';

interface ScrollingWordsProps {
  text: string;
  words: string[];
}

const ScrollingWords: React.FC<ScrollingWordsProps> = ({ text, words }) => {
  const gradients = [
    "from-[#00c6ff] via-[#0072ff] to-[#00c6ff]", // Bright blue to vibrant blue
    "from-[#ff7e5f] via-[#feb47b] to-[#ff7e5f]", // Soft pink to peachy gradient
    "from-[#ff5f6d] to-[#ffc371]", // Deep red to golden yellow
    "from-[#8e2de2] via-[#4a00e0] to-[#8e2de2]", // Purple gradient
    "from-[#f6d365] to-[#fda085]", // Warm pastel orange to pink
  ];
  
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFadeOut(false);
      }, 500); // Wait for fade-out animation to complete
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="inline-block text-left mr-40">
      <h1 className="text-3xl inline text-white">
        {text}&nbsp;
        <span
          className={`
            inline-block bg-gradient-to-r
            bg-clip-text text-transparent
            transition-all duration-500 ease-in-out
            ${fadeOut ? "opacity-0 translate-y-[-20px]" : "opacity-100 translate-y-0"}
            ${gradients[currentIndex]}
          `}
        >
          {words[currentIndex]}
        </span>
      </h1>
    </div>
  );
};

export default ScrollingWords;
