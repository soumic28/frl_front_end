"use client"
import { motion } from 'framer-motion';

// Separate CircleAnimation component
const ConcentricCircles = ({ stage }) => {
  // Circle color definitions - from outside to inside
  const circleColors = [
    "#FFFFFF", // White outermost circle
    "#E9E0E0",
    "#DAC5C5",
    "#C39E9E",
    "#A58282",
    "#8C6666",
    "#563B3B",
    "#2B1B1B",
    "#422B2B",  // Dark center
    "#422B2B",  // Dark center
  ];
  
  // Start showing circles from stage 2
  const currentCircles = stage >= 2 ? Math.min(stage - 1, circleColors.length) : 0;
  
  // Base size for largest circle - responsive for different screen sizes
  const baseSize = "min(100vw, 600px)";
  
  return (
    <div className="relative top-[80px] inset-0 flex items-center justify-center w-full h-full">
      {circleColors.slice(0, currentCircles).map((color, index) => {
        // Calculate size - largest (outer) to smallest (inner)
        const sizePercentage = 1 - (index * 0.1); // Each circle is 10% smaller
        
        return (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1 
            }}
            transition={{
              duration: 0.5,
              delay: 0.1 * index, // Start from outside
              ease: "easeOut"
            }}
            className="absolute rounded-full"
            style={{
              backgroundColor: color,
              width: `calc(${baseSize} * ${sizePercentage})`,
              height: `calc(${baseSize} * ${sizePercentage})`,
              maxWidth: `${600 * sizePercentage}px`,
              maxHeight: `${600 * sizePercentage}px`,
              zIndex: index // Smaller circles appear on top
            }}
          />
        );
      })}
    </div>
  );
};

export default ConcentricCircles; 