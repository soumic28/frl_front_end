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
      <div className="h-full bg-[#19667A] flex flex-col min-h-[100dvh] overflow-hidden md:my-0 items-center justify-center">
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
                    {/* Base teal background */}
                    <div className="absolute inset-0 bg-[#205A6A]"></div>
                    
                    {/* Animated gradient circles */}
                    <div className="gradient-bg">
                      <div className="gradient-circle c1"></div>
                      <div className="gradient-circle c2"></div>
                      <div className="gradient-circle c3"></div>
                      <div className="gradient-circle c4"></div>
                      <div className="gradient-circle c5"></div>
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

          /* Animated gradient background styles */
          .gradient-bg {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            overflow: hidden;
            filter: blur(10px);
            opacity: 0.8;
          }
          
          .gradient-circle {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, 
              rgba(24, 110, 137, 0.9) 0%, 
              rgba(15, 80, 105, 0.8) 40%, 
              rgba(32, 90, 106, 0.6) 60%, 
              rgba(15, 43, 53, 0.3) 80%
            );
            mix-blend-mode: screen;
          }
          
          .c1 {
            top: -10%;
            left: -10%;
            width: 50%;
            height: 50%;
            animation: move1 4s infinite linear;
          }
          
          .c2 {
            bottom: -5%;
            right: 10%;
            width: 40%;
            height: 40%;
            animation: move2 5s infinite linear;
          }
          
          .c3 {
            top: 20%;
            right: -10%;
            width: 60%;
            height: 60%;
            animation: move3 6s infinite linear;
          }
          
          .c4 {
            bottom: 30%;
            left: 10%;
            width: 35%;
            height: 35%;
            animation: move4 3.5s infinite linear;
          }
          
          .c5 {
            top: 40%;
            left: 40%;
            width: 45%;
            height: 45%;
            animation: move5 4.5s infinite linear;
          }
          
          @keyframes move1 {
            0% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(10%, 15%) scale(1.1); }
            50% { transform: translate(20%, 5%) scale(0.9); }
            75% { transform: translate(5%, 20%) scale(1.05); }
            100% { transform: translate(0, 0) scale(1); }
          }
          
          @keyframes move2 {
            0% { transform: translate(0, 0) rotate(0deg) scale(1); }
            33% { transform: translate(-15%, -10%) rotate(120deg) scale(1.2); }
            66% { transform: translate(-5%, -20%) rotate(240deg) scale(0.8); }
            100% { transform: translate(0, 0) rotate(360deg) scale(1); }
          }
          
          @keyframes move3 {
            0% { transform: translate(0, 0) scale(1); }
            20% { transform: translate(-20%, 10%) scale(0.8); }
            40% { transform: translate(-10%, 20%) scale(1.1); }
            60% { transform: translate(-30%, 5%) scale(0.9); }
            80% { transform: translate(-15%, 15%) scale(1.2); }
            100% { transform: translate(0, 0) scale(1); }
          }
          
          @keyframes move4 {
            0% { transform: translate(0, 0) rotate(0deg) scale(1); }
            25% { transform: translate(15%, -15%) rotate(90deg) scale(0.9); }
            50% { transform: translate(25%, 10%) rotate(180deg) scale(1.1); }
            75% { transform: translate(10%, 20%) rotate(270deg) scale(0.8); }
            100% { transform: translate(0, 0) rotate(360deg) scale(1); }
          }
          
          @keyframes move5 {
            0% { transform: translate(0, 0) scale(1); }
            20% { transform: translate(20%, 10%) scale(1.1); }
            40% { transform: translate(5%, 25%) scale(0.9); }
            60% { transform: translate(-15%, 15%) scale(1.2); }
            80% { transform: translate(-20%, 5%) scale(0.8); }
            100% { transform: translate(0, 0) scale(1); }
          }
        `}</style>
      </div>
    </PageTransition>
  );
}
