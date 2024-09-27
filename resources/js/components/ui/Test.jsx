import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Test() {
    const scrollRef = useRef(null);
    const isInView = useInView(scrollRef, { once: false }); // Use useInView to track visibility


    return (
      <div ref={scrollRef} style={{ height: "200px", overflow: "scroll" }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}

          viewport={{ amount: 0.5 }}
          style={{ height: "400px", backgroundColor: "lightblue" }} // Example content height
        />
        <h1>This is a test</h1>
      </div>
    );
}
