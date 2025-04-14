"use client"
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toJpeg } from "html-to-image";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

import PageTransition from '../(components)/PageTransition';
import ConcentricCircles from './ConcentricCircles';
import { pageVariants, questionData } from './data/constants';

// Component imports
import IntroScreen from './components/IntroScreen';
import InstructionsScreen from './components/InstructionsScreen';
import LocationForm from './components/LocationForm';
import QuestionScreen from './components/QuestionScreen';
import ResultsScreen from './components/ResultsScreen';

const BalanceWheel = dynamic(() => import('./BalanceWheel'), { ssr: false });

export default function Page() {
  const [date, setDate] = useState('');
  const ref = useRef(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [isSwinging, setIsSwinging] = useState(false);
  const router = useRouter();
  
  // Form data state to track all inputs
  const [formData, setFormData] = useState({
    country: '',
    zipCode: '',
    health: 5,
    recreation: 5,
    relationships: 5,
    romance: 5,
    finance: 5,
    environment: 5,
    career: 5,
    spiritual: 5
  });

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  // Function to update form data
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
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
  const currentQuestion = questionData.find(q => q.stage === currentStage);

  return (
    <PageTransition>
      <div className="h-full bg-[#19667A] flex flex-col min-h-screen">
        <div className="flex flex-col md:flex-row w-full">
          {/* Left side - Quiz Content */}
          <div className="w-full md:w-[80%] flex flex-col px-4 sm:px-0">
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
                  className="flex flex-col justify-start mt-[10vh] sm:mt-[15vh] md:mt-[23vh] ml-4 sm:ml-[5vw] md:ml-[10vw] pr-4 sm:pr-[5vw]" 
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

          {/* Right side - Visuals (shown below on mobile, side-by-side on md+) */}
          <div className="w-full md:w-1/2 mt-4  mx-auto md:mr-10 relative flex justify-center md:justify-center items-center h-[300px] md:h-auto">
            {currentStage < 2 && (
              <motion.div
                className="flex justify-center md:mr-32 scale-75 md:scale-100"
                animate={isSwinging ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                }}
              >
                <Image src="/assets/heroDance.svg" width={550} height={500} alt="hero" className='mb-4' />
              </motion.div>
            )}
            
            {currentStage === 2 && (
              <motion.div
                className="flex justify-center md:mr-[25%] scale-75 md:scale-100"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] md:mt-4  rounded-full overflow-hidden flex items-center justify-center bg-white shadow-lg">
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
            
            {currentStage > 2 && currentStage < 11 && 
              <div className="scale-75 md:scale-100 w-full h-full mb-[120px] md:mb-0 flex items-center justify-center">
                <ConcentricCircles stage={currentStage} />
              </div>
            }
            
            {currentStage === 11 && (
              <div className="scale-75 md:scale-100 mt-0 md:mt-[20%] md:mr-[25%] mb-4 w-full h-[300px] md:h-[500px] flex items-center justify-center">
                <BalanceWheel graphRef={ref} formData={formData} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        select, input {
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
    </PageTransition>
  );
}