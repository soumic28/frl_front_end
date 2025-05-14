"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import ConcentricCircles from "../ConcentricCircles";

// Dynamically import BalanceWheel to prevent SSR issues
const BalanceWheel = dynamic(() => import("../BalanceWheel"), { ssr: false });

const VisualizationContainer = ({ currentStage, isSwinging, wheelRef, formData }) => {
  // Hero image for intro stages (0-1)
  if (currentStage < 2) {
    return (
      <motion.div
        className="flex justify-center md:mr-32 scale-75 md:scale-100"
        animate={isSwinging ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      >
        {/* Hero image for PC only */}
        <div className="hidden md:flex md:w-[500px] md:h-[500px] md:mt-4 rounded-full overflow-hidden items-center justify-center shadow-lg">
          <Image
            src="/assets/Life-balance-model.svg"
            width={300}
            height={300}
            className="md:w-[600px] md:h-[600px]"
            alt="Life balance wheel model"
            priority
          />
        </div>

        {/* Hero image for Mobile only */}
        <div className="flex md:hidden">
          <Image
            src="/assets/Life-balance-model.svg"
            width={550}
            height={500}
            alt="Life balance wheel model"
            priority
          />
        </div>
      </motion.div>
    );
  }

  // Concentric circles for question stages (3-10)
  if (currentStage > 2 && currentStage < 11) {
    return (
      <div className="scale-70 md:scale-100 w-full h-full mb-[80px] md:mb-0 flex items-center justify-center">
        <ConcentricCircles stage={currentStage} />
      </div>
    );
  }

  // Balance wheel for results stage (11)
  if (currentStage === 11) {
    return (
      <div
        className="scale-100 md:scale-100 mt-0 md:mt-[15%] md:mr-[20%] mb-4 w-[350px] h-[350px] md:w-[600px] md:h-[600px] flex items-center justify-center relative"
        style={{ aspectRatio: "1/1" }}
      >
        <BalanceWheel graphRef={wheelRef} formData={formData} />
      </div>
    );
  }

  // Default case (should not happen)
  return null;
};

export default VisualizationContainer; 