import { useRef, useEffect} from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation} from "framer-motion"


export default function Test({ children }) {
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  const mainControls = useAnimation();

  useEffect(() => {
    if (inView){
      mainControls.start("visible")
    }
  }, [inView]);

  useEffect(() => {
    console.log("Element is in view: ", inView)
  }, [inView])


  return (
    <div ref={ref}>
      <motion.div
        variants={{
            hidden: { opacity: 0, y: 75 },
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
}
