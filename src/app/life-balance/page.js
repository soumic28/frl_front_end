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
                    className="flex flex-col justify-start mt-[60px] md:mt-[20vh] ml-2 sm:ml-[5vw] md:ml-[10vw] pr-2 sm:pr-[5vw]"
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

                {/* Results stage */}
                {currentStage === 11 && (
                  <ResultsScreen
                    date={date}
                    handleDownload={handleDownload}
                    router={router}
                    pageVariants={pageVariants}
                  />
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
        `}</style>
      </div>
    </PageTransition>
  );
}
