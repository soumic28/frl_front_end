"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

import PageTransition from "../(components)/PageTransition";
import { pageVariants, questionData } from "./data/constants";
import { generateBalanceWheelImage } from "./utils/imageGenerator";

// Component imports
import IntroScreen from "./components/IntroScreen";
import InstructionsScreen from "./components/InstructionsScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultsScreen from "./components/ResultsScreen";
import ProgressBar from "./components/ProgressBar";
import BackButton from "./components/BackButton";
import VisualizationContainer from "./components/VisualizationContainer";
// Temporarily commented out WavyBackground
// import { WavyBackground } from "@/components/ui/wavy-background";

// Dynamic import to prevent SSR issues with chart
const BalanceWheel = dynamic(() => import("./BalanceWheel"), { ssr: false });

export default function LifeBalancePage() {
  const router = useRouter();
  const wheelRef = useRef(null);
  const [date, setDate] = useState("");
  const [currentStage, setCurrentStage] = useState(0);
  const [isSwinging, setIsSwinging] = useState(false);
  
  // Form data state to track all inputs
  const [formData, setFormData] = useState({
    health: 5,
    recreation: 5,
    relationships: 5,
    romance: 5,
    finance: 5,
    environment: 5,
    career: 5,
    spiritual: 5,
  });

  // Set date on component mount
  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  // Function to update form data
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  // Handle image download
  const handleDownload = () => {
    console.log("handleDownload called");
    console.log("wheelRef.current:", wheelRef.current);
    console.log("date:", date);
    
    if (!wheelRef.current) {
      console.error("wheelRef.current is null or undefined");
      
      // Try alternative download method
      console.log("Attempting alternative download method...");
      
      // Look for the wheel element by data attribute
      const wheelElement = document.querySelector('[data-balance-wheel="true"]');
      if (wheelElement) {
        console.log("Found wheel element by data attribute");
        generateBalanceWheelImage(wheelElement, date);
        return;
      }
      
      // Look for the wheel container
      const wheelContainer = document.querySelector('[data-wheel-container="true"]');
      if (wheelContainer) {
        console.log("Found wheel container by data attribute");
        generateBalanceWheelImage(wheelContainer, date);
        return;
      }
      
      alert("Unable to download: Wheel not ready. Please wait a moment and try again.");
      return;
    }
    
    generateBalanceWheelImage(wheelRef.current, date);
  };

  // Random swinging effect for intro stage
  useEffect(() => {
    let timeoutId;

    const triggerRandomSwing = () => {
      setIsSwinging(true);
      setTimeout(() => setIsSwinging(false), 2000);
      const randomDelay = Math.random() * 1000 + 3000;
      timeoutId = setTimeout(triggerRandomSwing, randomDelay);
    };

    triggerRandomSwing();

    return () => clearTimeout(timeoutId);
  }, []);

  // Determine the current question data
  const currentQuestion = questionData.find(q => q.stage === currentStage);

  // Handle back navigation with stage skipping logic
  const handleBackNavigation = () => {
    // Skip step 2 when going back from step 3
    if (currentStage === 3) {
      setCurrentStage(1);
    } else {
      setCurrentStage(currentStage - 1);
    }
  };

  // Handle stage progression with stage skipping logic
  const handleStageProgression = (stage) => {
    // Skip step 2 when moving from step 1 to step 3
    if (currentStage === 1 && stage === 2) {
      setCurrentStage(3);
    } else {
      setCurrentStage(stage);
    }
  };

  return (
    <PageTransition>
      <div className="h-full bg-[#19667A] flex flex-col min-h-[100dvh] overflow-hidden md:my-0 items-center justify-center ">
        <div className="w-full max-w-screen-[1440px] mx-auto px-4 flex items-center justify-center">
          <div className="flex flex-col md:flex-row w-full justify-center items-center">
            {/* Visualization Section */}
            <div className="w-full md:w-1/2 md:order-2 mt-[60px] md:mt-4 mx-auto md:mr-10 relative flex justify-center md:justify-center items-center h-auto min-h-[280px] md:min-h-[600px]">
              {/* Back button and progress bar for question stages */}
              {currentStage >= 3 && currentStage <= 10 && currentQuestion && (
                <BackButton 
                  onBack={handleBackNavigation}
                  currentStage={currentStage}
                />
              )}

              {/* Visualization container with appropriate content based on stage */}
              <VisualizationContainer
                currentStage={currentStage}
                isSwinging={isSwinging}
                wheelRef={wheelRef}
                formData={formData}
              />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-[80%] md:order-1 flex flex-col px-4 sm:px-0">
              <AnimatePresence mode="wait">
                {currentStage === 0 && (
                  <IntroScreen
                    setCurrentStage={handleStageProgression}
                    pageVariants={pageVariants}
                  />
                )}

                {currentStage === 1 && (
                  <InstructionsScreen
                    setCurrentStage={handleStageProgression}
                    currentStage={currentStage}
                    pageVariants={pageVariants}
                    onBack={handleBackNavigation}
                  />
                )}

                {/* Questions stages (3-10) */}
                {currentStage >= 3 && currentStage <= 10 && (
                  <motion.div
                    key={`stage-${currentStage}`}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={pageVariants}
                    className="flex flex-col justify-start mt-[75px] md:mt-[20vh] ml-2 sm:ml-[5vw] md:ml-[10vw] pr-2 sm:pr-[5vw] h-full"
                  >
                    {currentQuestion && (
                      <QuestionScreen
                        currentStage={currentStage}
                        setCurrentStage={handleStageProgression}
                        question={currentQuestion.question}
                        field={currentQuestion.field}
                        formData={formData}
                        updateFormData={updateFormData}
                        handleSubmit={currentStage === 10 ? handleSubmit : null}
                      />
                    )}
                  </motion.div>
                )}

                {/* Results stage - With animated gradient background */}
                {currentStage === 11 && (
                  <div className="fixed inset-0 z-[1] overflow-hidden">
                    {/* Base teal background with image */}
                    <div className="absolute inset-0 bg-[#081A20]">
                      <img 
                        src="/assets/bg.png" 
                        alt="Background" 
                        className="absolute inset-0 w-full h-full object-cover animated-bg"
                      />
                      {/* Apple weather-style flowing overlays */}
                      <div className="absolute inset-0 apple-flow-layer-1"></div>
                      <div className="absolute inset-0 apple-flow-layer-2"></div>
                      <div className="absolute inset-0 apple-flow-layer-3"></div>
                      
                      {/* Apple Weather-Style Lightning Effects */}
                      <div className="absolute inset-0 lightning-bolt-main"></div>
                      <div className="absolute inset-0 lightning-bolt-secondary"></div>
                      <div className="absolute inset-0 lightning-flash-overlay"></div>
                      <div className="absolute inset-0 lightning-afterglow"></div>
                    </div>
                    
                    {/* Content container with equal spacing */}
                    <div className="w-full h-full max-w-[1440px] mx-auto mt-12 md:mt-0 flex flex-col-reverse md:flex-row items-center justify-center relative z-10">
                      {/* Content side (left on desktop) */}
                      <div className="flex-1 z-10 mt-6 md:mt-0 flex items-center justify-center px-4 sm:px-6 md:px-8">
                        <ResultsScreen
                          date={date}
                          handleDownload={handleDownload}
                          router={router}
                          pageVariants={pageVariants}
                        />
                      </div>
                      
                      {/* Equal spacing gap between components */}
                      <div className="hidden md:block w-16"></div>
                      
                      {/* Wheel side (right on desktop) */}
                      <div className="flex-1 z-10 flex justify-center items-center px-4 sm:px-6 md:px-8">
                        <VisualizationContainer
                          currentStage={currentStage}
                          isSwinging={isSwinging}
                          wheelRef={wheelRef}
                          formData={formData}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <style jsx global>{`
          select,
          input {
            border-width: 0.5px !important;
            border-radius: 8px !important;
          }

          /* Add a custom breakpoint xs */
          @media (min-width: 480px) {
            .xs\\:block {
              display: block;
            }
            .xs\\:text-sm {
              font-size: 0.875rem;
              line-height: 1.25rem;
            }
            .xs\\:text-lg {
              font-size: 1.125rem;
              line-height: 1.75rem;
            }
            .xs\\:text-4xl {
              font-size: 2.25rem;
              line-height: 2.5rem;
            }
            .xs\\:ml-2 {
              margin-left: 0.5rem;
            }
            .xs\\:py-2 {
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
            }
            .xs\\:px-4 {
              padding-left: 1rem;
              padding-right: 1rem;
            }
            .xs\\:w-4 {
              width: 1rem;
            }
            .xs\\:h-4 {
              height: 1rem;
            }
          }

          /* Removed animation styles for gradient background */
          
          /* Apple Weather-style flowing animations */
          .animated-bg {
            animation: gentle-drift 15s ease-in-out infinite;
          }
          
          @keyframes gentle-drift {
            0%, 100% { 
              transform: translateX(0%) scale(1.01);
            }
            50% { 
              transform: translateX(-3%) scale(1.02);
            }
          }
          
          /* Flowing layers that move right to left continuously */
          .apple-flow-layer-1 {
            background: linear-gradient(90deg, 
              transparent 0%, 
              rgba(255,255,255,0.15) 25%, 
              rgba(173,216,230,0.20) 50%, 
              rgba(135,206,235,0.15) 75%, 
              transparent 100%);
            animation: flow-right-to-left-1 6s linear infinite;
            width: 200%;
          }
          
          .apple-flow-layer-2 {
            background: linear-gradient(90deg, 
              transparent 0%, 
              rgba(100,149,237,0.12) 30%, 
              rgba(176,224,230,0.18) 60%, 
              rgba(70,130,180,0.12) 90%, 
              transparent 100%);
            animation: flow-right-to-left-2 9s linear infinite;
            width: 250%;
          }
          
          .apple-flow-layer-3 {
            background: linear-gradient(90deg, 
              transparent 0%, 
              rgba(240,248,255,0.08) 20%, 
              rgba(230,230,250,0.14) 50%, 
              rgba(176,196,222,0.10) 80%, 
              transparent 100%);
            animation: flow-right-to-left-3 12s linear infinite;
            width: 300%;
          }
          
          @keyframes flow-right-to-left-1 {
            0% { 
              transform: translateX(100%);
            }
            100% { 
              transform: translateX(-100%);
            }
          }
          
          @keyframes flow-right-to-left-2 {
            0% { 
              transform: translateX(100%);
            }
            100% { 
              transform: translateX(-150%);
            }
          }
          
          @keyframes flow-right-to-left-3 {
            0% { 
              transform: translateX(100%);
            }
            100% { 
              transform: translateX(-200%);
            }
          }
          
          /* Mobile-specific enhancements */
          @media (max-width: 767px) {
            .apple-flow-layer-1 {
              background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(255,255,255,0.20) 25%, 
                rgba(173,216,230,0.25) 50%, 
                rgba(135,206,235,0.20) 75%, 
                transparent 100%);
              animation: flow-right-to-left-1 5s linear infinite;
            }
            
            .apple-flow-layer-2 {
              background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(100,149,237,0.15) 30%, 
                rgba(176,224,230,0.22) 60%, 
                rgba(70,130,180,0.15) 90%, 
                transparent 100%);
              animation: flow-right-to-left-2 7s linear infinite;
            }
            
            .apple-flow-layer-3 {
              background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(240,248,255,0.12) 20%, 
                rgba(230,230,250,0.18) 50%, 
                rgba(176,196,222,0.14) 80%, 
                transparent 100%);
              animation: flow-right-to-left-3 9s linear infinite;
            }
            
            /* Additional mobile cloud layer */
            .animated-bg::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: 
                radial-gradient(ellipse 400px 200px at 120% 20%, rgba(255,255,255,0.06) 0%, transparent 60%),
                radial-gradient(ellipse 300px 150px at 80% 80%, rgba(173,216,230,0.08) 0%, transparent 60%);
              animation: mobile-cloud-flow 15s linear infinite;
              width: 180%;
            }
          }
          
          @keyframes mobile-cloud-flow {
            0% { 
              transform: translateX(100%);
            }
            100% { 
              transform: translateX(-80%);
            }
          }
          
          /* Desktop cloud movement - enhanced visibility */
          @media (min-width: 768px) {
            .animated-bg::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: 
                radial-gradient(ellipse 800px 400px at 120% 30%, rgba(255,255,255,0.06) 0%, transparent 70%),
                radial-gradient(ellipse 600px 300px at 80% 70%, rgba(173,216,230,0.08) 0%, transparent 70%),
                radial-gradient(ellipse 1000px 500px at 150% 90%, rgba(135,206,235,0.05) 0%, transparent 70%);
              animation: cloud-flow 15s linear infinite;
              width: 200%;
            }
          }
          
          @keyframes cloud-flow {
            0% { 
              transform: translateX(100%);
            }
            100% { 
              transform: translateX(-100%);
            }
          }
          
          /* ===== APPLE WEATHER STYLE LIGHTNING EFFECTS ===== */
          
          /* Main Lightning Bolt - Realistic jagged pattern */
          .lightning-bolt-main {
            background: 
              linear-gradient(15deg, transparent 0%, transparent 45%, 
                rgba(255,255,255,0.9) 46%, rgba(135,206,250,0.8) 47%, 
                rgba(255,255,255,0.95) 48%, transparent 49%, transparent 100%),
              linear-gradient(25deg, transparent 0%, transparent 52%, 
                rgba(255,255,255,0.85) 53%, rgba(173,216,230,0.7) 54%, 
                rgba(255,255,255,0.9) 55%, transparent 56%, transparent 100%),
              linear-gradient(35deg, transparent 0%, transparent 38%, 
                rgba(255,255,255,0.8) 39%, rgba(100,149,237,0.6) 40%, 
                rgba(255,255,255,0.85) 41%, transparent 42%, transparent 100%);
            animation: lightning-strike-main 8s ease-in-out infinite;
            opacity: 0;
            filter: blur(0.5px);
          }
          
          /* Secondary Lightning Bolt - Branching effect */
          .lightning-bolt-secondary {
            background: 
              linear-gradient(-20deg, transparent 0%, transparent 60%, 
                rgba(255,255,255,0.7) 61%, rgba(176,224,230,0.5) 62%, 
                rgba(255,255,255,0.75) 63%, transparent 64%, transparent 100%),
              linear-gradient(-10deg, transparent 0%, transparent 35%, 
                rgba(255,255,255,0.6) 36%, rgba(135,206,235,0.4) 37%, 
                rgba(255,255,255,0.65) 38%, transparent 39%, transparent 100%),
              linear-gradient(-30deg, transparent 0%, transparent 70%, 
                rgba(255,255,255,0.5) 71%, rgba(70,130,180,0.3) 72%, 
                rgba(255,255,255,0.55) 73%, transparent 74%, transparent 100%);
            animation: lightning-strike-secondary 8s ease-in-out infinite;
            animation-delay: 0.3s;
            opacity: 0;
            filter: blur(0.3px);
          }
          
          /* Lightning Flash Overlay - Screen illumination */
          .lightning-flash-overlay {
            background: 
              radial-gradient(ellipse 100% 80% at 50% 30%, rgba(255,255,255,0.4) 0%, transparent 70%),
              radial-gradient(ellipse 80% 60% at 30% 50%, rgba(173,216,230,0.3) 0%, transparent 60%),
              radial-gradient(ellipse 90% 70% at 70% 40%, rgba(135,206,235,0.2) 0%, transparent 80%);
            animation: lightning-flash 8s ease-in-out infinite;
            animation-delay: 0.1s;
            opacity: 0;
            mix-blend-mode: screen;
          }
          
          /* Lightning Afterglow - Residual illumination */
          .lightning-afterglow {
            background: 
              radial-gradient(ellipse 120% 100% at 50% 40%, rgba(255,255,255,0.1) 0%, transparent 80%),
              radial-gradient(ellipse 80% 60% at 40% 60%, rgba(173,216,230,0.08) 0%, transparent 70%),
              radial-gradient(ellipse 100% 80% at 60% 30%, rgba(100,149,237,0.06) 0%, transparent 90%);
            animation: lightning-afterglow 8s ease-in-out infinite;
            animation-delay: 0.5s;
            opacity: 0;
          }
          
          /* Main Lightning Strike Animation */
          @keyframes lightning-strike-main {
            0%, 85% { 
              opacity: 0;
              transform: scaleY(0) translateX(0%);
            }
            86% { 
              opacity: 1;
              transform: scaleY(1) translateX(-2%);
            }
            86.2% { 
              opacity: 0;
              transform: scaleY(1) translateX(-2%);
            }
            86.5% { 
              opacity: 1;
              transform: scaleY(1) translateX(1%);
            }
            87% { 
              opacity: 0;
              transform: scaleY(1) translateX(1%);
            }
            100% { 
              opacity: 0;
              transform: scaleY(0) translateX(0%);
            }
          }
          
          /* Secondary Lightning Strike Animation */
          @keyframes lightning-strike-secondary {
            0%, 85.3% { 
              opacity: 0;
              transform: scaleX(0) translateY(0%);
            }
            85.8% { 
              opacity: 0.8;
              transform: scaleX(1) translateY(-1%);
            }
            86% { 
              opacity: 0;
              transform: scaleX(1) translateY(-1%);
            }
            86.3% { 
              opacity: 0.6;
              transform: scaleX(1) translateY(2%);
            }
            86.8% { 
              opacity: 0;
              transform: scaleX(1) translateY(2%);
            }
            100% { 
              opacity: 0;
              transform: scaleX(0) translateY(0%);
            }
          }
          
          /* Lightning Flash Animation */
          @keyframes lightning-flash {
            0%, 85% { 
              opacity: 0;
              transform: scale(1);
            }
            85.5% { 
              opacity: 0.6;
              transform: scale(1.1);
            }
            86% { 
              opacity: 0.3;
              transform: scale(1.05);
            }
            86.5% { 
              opacity: 0.8;
              transform: scale(1.15);
            }
            87.5% { 
              opacity: 0;
              transform: scale(1);
            }
            100% { 
              opacity: 0;
              transform: scale(1);
            }
          }
          
          /* Lightning Afterglow Animation */
          @keyframes lightning-afterglow {
            0%, 86% { 
              opacity: 0;
              transform: scale(1);
            }
            87% { 
              opacity: 0.4;
              transform: scale(1.2);
            }
            90% { 
              opacity: 0.2;
              transform: scale(1.1);
            }
            95% { 
              opacity: 0.1;
              transform: scale(1.05);
            }
            100% { 
              opacity: 0;
              transform: scale(1);
            }
          }
          
          /* Mobile Lightning Optimizations */
          @media (max-width: 767px) {
            .lightning-bolt-main {
              background: 
                linear-gradient(20deg, transparent 0%, transparent 42%, 
                  rgba(255,255,255,1) 43%, rgba(135,206,250,0.9) 44%, 
                  rgba(255,255,255,1) 45%, transparent 46%, transparent 100%),
                linear-gradient(30deg, transparent 0%, transparent 48%, 
                  rgba(255,255,255,0.95) 49%, rgba(173,216,230,0.8) 50%, 
                  rgba(255,255,255,0.95) 51%, transparent 52%, transparent 100%),
                linear-gradient(40deg, transparent 0%, transparent 35%, 
                  rgba(255,255,255,0.9) 36%, rgba(100,149,237,0.7) 37%, 
                  rgba(255,255,255,0.9) 38%, transparent 39%, transparent 100%);
              animation: lightning-strike-main 6s ease-in-out infinite;
              filter: blur(0.3px);
            }
            
            .lightning-bolt-secondary {
              background: 
                linear-gradient(-25deg, transparent 0%, transparent 55%, 
                  rgba(255,255,255,0.8) 56%, rgba(176,224,230,0.6) 57%, 
                  rgba(255,255,255,0.8) 58%, transparent 59%, transparent 100%),
                linear-gradient(-15deg, transparent 0%, transparent 30%, 
                  rgba(255,255,255,0.7) 31%, rgba(135,206,235,0.5) 32%, 
                  rgba(255,255,255,0.7) 33%, transparent 34%, transparent 100%);
              animation: lightning-strike-secondary 6s ease-in-out infinite;
              animation-delay: 0.2s;
              filter: blur(0.2px);
            }
            
            .lightning-flash-overlay {
              background: 
                radial-gradient(ellipse 120% 100% at 50% 30%, rgba(255,255,255,0.6) 0%, transparent 70%),
                radial-gradient(ellipse 100% 80% at 30% 50%, rgba(173,216,230,0.4) 0%, transparent 60%),
                radial-gradient(ellipse 110% 90% at 70% 40%, rgba(135,206,235,0.3) 0%, transparent 80%);
              animation: lightning-flash 6s ease-in-out infinite;
              animation-delay: 0.1s;
            }
            
            .lightning-afterglow {
              background: 
                radial-gradient(ellipse 140% 120% at 50% 40%, rgba(255,255,255,0.15) 0%, transparent 80%),
                radial-gradient(ellipse 100% 80% at 40% 60%, rgba(173,216,230,0.12) 0%, transparent 70%),
                radial-gradient(ellipse 120% 100% at 60% 30%, rgba(100,149,237,0.08) 0%, transparent 90%);
              animation: lightning-afterglow 6s ease-in-out infinite;
              animation-delay: 0.3s;
            }
          }
          
          /* Desktop Lightning Enhancements */
          @media (min-width: 768px) {
            .lightning-bolt-main {
              background: 
                linear-gradient(12deg, transparent 0%, transparent 47%, 
                  rgba(255,255,255,0.85) 48%, rgba(135,206,250,0.7) 49%, 
                  rgba(255,255,255,0.9) 50%, transparent 51%, transparent 100%),
                linear-gradient(22deg, transparent 0%, transparent 54%, 
                  rgba(255,255,255,0.8) 55%, rgba(173,216,230,0.6) 56%, 
                  rgba(255,255,255,0.85) 57%, transparent 58%, transparent 100%),
                linear-gradient(32deg, transparent 0%, transparent 40%, 
                  rgba(255,255,255,0.75) 41%, rgba(100,149,237,0.5) 42%, 
                  rgba(255,255,255,0.8) 43%, transparent 44%, transparent 100%),
                linear-gradient(42deg, transparent 0%, transparent 62%, 
                  rgba(255,255,255,0.7) 63%, rgba(70,130,180,0.4) 64%, 
                  rgba(255,255,255,0.75) 65%, transparent 66%, transparent 100%);
              filter: blur(0.7px);
            }
            
            .lightning-bolt-secondary {
              background: 
                linear-gradient(-18deg, transparent 0%, transparent 62%, 
                  rgba(255,255,255,0.65) 63%, rgba(176,224,230,0.45) 64%, 
                  rgba(255,255,255,0.7) 65%, transparent 66%, transparent 100%),
                linear-gradient(-8deg, transparent 0%, transparent 37%, 
                  rgba(255,255,255,0.55) 38%, rgba(135,206,235,0.35) 39%, 
                  rgba(255,255,255,0.6) 40%, transparent 41%, transparent 100%),
                linear-gradient(-28deg, transparent 0%, transparent 72%, 
                  rgba(255,255,255,0.45) 73%, rgba(70,130,180,0.25) 74%, 
                  rgba(255,255,255,0.5) 75%, transparent 76%, transparent 100%);
              filter: blur(0.4px);
            }
          }
        `}</style>
      </div>
    </PageTransition>
  );
}
