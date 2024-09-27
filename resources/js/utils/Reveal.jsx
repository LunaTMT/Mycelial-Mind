  import React, { useEffect, useRef } from "react";
  import { motion, useInView, useAnimation } from "framer-motion";

  const Reveal = ({ children }) => {
    const ref = useRef(null);
    const mainControls = useAnimation();

    const onViewportEnter = (entry) => {
      console.log("Element entered the viewport:", entry);
      mainControls.start("visible");
    };

    const onViewportLeave = (entry) => {
      console.log("Element left the viewport:", entry);
      mainControls.start("hidden"); // Optional: Reset animation when leaving
    };

    // Set up the in-view observer
    const isInView = useInView(ref, {
      onEnter: onViewportEnter,
      onLeave: onViewportLeave,
      once: false, // Set to true if you only want to trigger once
    });

    


    return (
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          animate={mainControls}
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {children}  
        </motion.div>
      </div>
    );
  };

  export default Reveal;
