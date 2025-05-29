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
                    </div>
                    
                    {/* Content container */}
                    <div className="w-full h-full max-w-[1440px] mt-12 md:mt-0 flex flex-col-reverse md:flex-row items-center justify-center p-4 sm:p-6 md:p-8 relative z-10">
                      {/* Content side (left on desktop) */}
                      <div className="w-full md:w-1/2 z-10 mt-6 md:mt-0">
                        <ResultsScreen
                          date={date}
                          handleDownload={handleDownload}
                          router={router}
                          pageVariants={pageVariants}
                        />
                      </div>
                      
                      {/* Wheel side (right on desktop) */}
                      <div className="w-full md:w-1/2 z-10 flex justify-center items-center">
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
        `}</style>
      </div>
    </PageTransition>
  );
}
