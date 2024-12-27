import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  className?: string;
}

const MouseColorChanger: React.FC<Props> = ({ className }) => {
  return (
    <div className="overflow-hidden">
      {/* Left background image */}
      <motion.div
        className={`fixed top-0 left-0 ${className}`}
        animate={{
          scale: [1, 1.2, 1], // Grow and shrink effect
          y: [0, -20, 0], // Float up and down
        }}
        transition={{
          duration: 10, // One cycle duration
          repeat: Infinity, // Repeat the animation indefinitely
          repeatType: 'loop',
          ease: 'easeInOut', // Smooth easing
        }}
      >
        <img
          id="background-left"
          className="w-full h-auto"
          src="/assets/images/background_left.png"
          alt="Background Left"
        />
      </motion.div>

      {/* Right background image */}
      <motion.div
        className={`fixed top-0 right-0 ${className}`}
        animate={{
          scale: [1, 1.2, 1], // Grow and shrink effect
          y: [0, 20, 0], // Float in the opposite direction
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      >
        <img
          id="background-right"
          className="w-full h-auto"
          src="/assets/images/background_right.png"
          alt="Background Right"
        />
      </motion.div>
    </div>
  );
};

export default MouseColorChanger;
