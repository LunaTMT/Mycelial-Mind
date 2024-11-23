// Reveal.tsx
import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

// Define the props interface
interface RevealProps {
  children: React.ReactNode; // This allows any valid React node as children
}

const Reveal: React.FC<RevealProps> = ({ children }) => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true
  });

  const mainControls = useAnimation();

  useEffect(() => {
    if (inView) {
      mainControls.start("visible");
    }
  }, [inView]);

  return (
    <div ref={ref} className="w-full h-full bg-black">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
