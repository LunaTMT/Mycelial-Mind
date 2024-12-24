import React, { useState, useEffect } from "react";

interface CarouselProps {
  children: React.ReactNode;
  className: string;
}

const Carousel: React.FC<CarouselProps> = ({ children, className }) => {
  const items = React.Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move to the next item every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000); // 3000ms = 3 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [items.length]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  return (
    <div className={`relative w-full  ${className}`}>
      <div className="overflow-hidden rounded-lg">
        {items[currentIndex]}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <span
            key={index}
            className={`w-2.5 h-2.5 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
