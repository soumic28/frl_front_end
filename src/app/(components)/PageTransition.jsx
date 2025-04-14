"use client"
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.3
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 