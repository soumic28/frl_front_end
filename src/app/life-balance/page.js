"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toJpeg } from "html-to-image";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

import PageTransition from "../(components)/PageTransition";
import ConcentricCircles from "./ConcentricCircles";
import { pageVariants, questionData } from "./data/constants";

// Component imports
import IntroScreen from "./components/IntroScreen";
import InstructionsScreen from "./components/InstructionsScreen";
import LocationForm from "./components/LocationForm";
import QuestionScreen from "./components/QuestionScreen";
import ResultsScreen from "./components/ResultsScreen";
import ProgressBar from "./components/ProgressBar";

const BalanceWheel = dynamic(() => import("./BalanceWheel"), { ssr: false });

export default function Page() {
  const [date, setDate] = useState("");
  const ref = useRef(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [isSwinging, setIsSwinging] = useState(false);
  const router = useRouter();

  // Form data state to track all inputs
  const [formData, setFormData] = useState({
    country: "",
    zipCode: "",
    health: 5,
    recreation: 5,
    relationships: 5,
    romance: 5,
    finance: 5,
    environment: 5,
    career: 5,
    spiritual: 5,
  });

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  // Function to update form data
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  const handleDownload = () => {
    if (ref.current === null) return;

    toJpeg(ref.current, { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "balance-wheel.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Error exporting image", err);
      });
  };

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

  // Get the current question data
  const currentQuestion = questionData.find((q) => q.stage === currentStage);

  return (
    <PageTransition>
      <div className="h-full bg-[#19667A] flex flex-col min-h-[100dvh] overflow-hidden  md:my-0">
        <div className="w-full max-w-screen-[1440px] mx-auto px-4">
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-1/2 md:order-2 mt-[60px] md:mt-4 mx-auto md:mr-10 relative flex justify-center md:justify-center items-center h-auto min-h-[280px] md:min-h-[600px]">
              {currentStage >= 3 && currentStage <= 10 && currentQuestion && (
                <>
                  <div className="absolute top-[-40px] md:top-0 -left-[780px] right-0 w-full z-10 px-4 md:px-8 hidden md:block my-3">
                    <button
                      onClick={() => setCurrentStage(currentStage - 1)}
                      className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-md"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 19L8 12L15 5"
                          stroke="#19667A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute top-[-40px] md:top-0 left-0 right-0 w-full z-10 px-4 md:px-8">
                    <div className="w-full flex items-center justify-between mb-4 md:mb-8">
                      <button
                        onClick={() => setCurrentStage(currentStage - 1)}
                        className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-md md:hidden"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 19L8 12L15 5"
                            stroke="#19667A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div className="md:mx-[120px] md:my-[20px]">
                        <ProgressBar currentStage={currentStage} />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStage < 2 && (
                <motion.div
                  className="flex justify-center md:mr-32 scale-75 md:scale-100"
                  animate={isSwinging ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  {/* Hero image for PC only */}
                  <div className="hidden md:flex  md:w-[500px] md:h-[500px] md:mt-4 rounded-full overflow-hidden items-center justify-center shadow-lg">
                    <Image
                      src="/assets/Life-balance-model.svg"
                      width={300}
                      height={300}
                      className="md:w-[600px] md:h-[600px]"
                      alt="hero-pc"
                    />
                  </div>

                  {/* Hero image for Mobile only */}
                  <div className="flex md:hidden">
                    <Image
                      src="/assets/Life-balance-model.svg"
                      width={550}
                      height={500}
                      alt="hero-mobile"
                      className=""
                    />
                  </div>
                </motion.div>
              )}

              {currentStage === 2 && (
                <motion.div
                  className="flex justify-center md:mr-[25%] scale-75 md:scale-100"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] md:mt-4 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-lg">
                    <Image
                      src="/assets/world.svg"
                      width={300}
                      height={300}
                      className="md:w-[600px] md:h-[600px] object-cover"
                      alt="world map"
                    />
                  </div>
                </motion.div>
              )}

              {currentStage > 2 && currentStage < 11 && (
                <div className="scale-75 md:scale-100 w-full h-full mb-[80px] md:mb-0 flex items-center justify-center">
                  <ConcentricCircles stage={currentStage} />
                </div>
              )}

              {currentStage === 11 && (
                <div
                  className="scale-100 md:scale-100 mt-0 md:mt-[20%] md:mr-[25%] mb-4 w-[280px] h-[280px] md:w-[600px] md:h-[600px] flex items-center justify-center relative md:-top-[70px]"
                  style={{ aspectRatio: "1/1" }}
                >
                  <BalanceWheel graphRef={ref} formData={formData} />
                </div>
              )}
            </div>

            {/* Quiz Content section - Second in mobile column order */}
            <div className="w-full md:w-[80%] md:order-1 flex flex-col px-4 sm:px-0">
              <AnimatePresence mode="wait">
                {currentStage === 0 && (
                  <IntroScreen
                    setCurrentStage={setCurrentStage}
                    pageVariants={pageVariants}
                  />
                )}

                {currentStage === 1 && (
                  <InstructionsScreen
                    setCurrentStage={setCurrentStage}
                    currentStage={currentStage}
                    pageVariants={pageVariants}
                  />
                )}

                {currentStage === 2 && (
                  <LocationForm
                    formData={formData}
                    updateFormData={updateFormData}
                    setCurrentStage={setCurrentStage}
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
                        setCurrentStage={setCurrentStage}
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
