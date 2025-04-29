"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toJpeg } from "html-to-image";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import html2canvas from "html2canvas";

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
    // Utility function to fetch and embed the SVG
    const fetchAndEmbedSVG = async (url, container) => {
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`Failed to fetch SVG: ${response.status}`);
        const svgText = await response.text();
        container.innerHTML = svgText;
        return true;
      } catch (error) {
        console.error("Error embedding SVG:", error);
        return false;
      }
    };

    // Create a container element that will hold our full card for download
    const cardContainer = document.createElement("div");
    cardContainer.style.width = "800px";
    cardContainer.style.height = "1200px";
    cardContainer.style.background =
      "linear-gradient(180deg, #19667A 0%, #003644 100%)";
    cardContainer.style.borderRadius = "20px";
    cardContainer.style.padding = "60px";
    cardContainer.style.display = "flex";
    cardContainer.style.flexDirection = "column";
    cardContainer.style.color = "white";
    cardContainer.style.fontFamily =
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif, general-sans";
    cardContainer.style.boxSizing = "border-box";
    cardContainer.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
    cardContainer.style.position = "fixed";
    cardContainer.style.zIndex = "-9999";
    cardContainer.style.top = "0";
    cardContainer.style.left = "0";
    cardContainer.style.transform = "scale(0.8)";
    cardContainer.style.transformOrigin = "top left";

    // Format date as DD/MM/YYYY to match the image
    const formattedDate = date.split("/").reverse().join("/");

    // Create the wheel container wrapper for positioning
    const wheelWrapper = document.createElement("div");
    wheelWrapper.style.position = "relative";
    wheelWrapper.style.width = "700px";
    wheelWrapper.style.height = "700px";
    wheelWrapper.style.margin = "0 auto 60px";
    cardContainer.appendChild(wheelWrapper);

    // Create SVG container
    const svgContainer = document.createElement("div");
    svgContainer.style.position = "absolute";
    svgContainer.style.top = "0";
    svgContainer.style.left = "0";
    svgContainer.style.width = "100%";
    svgContainer.style.height = "100%";
    svgContainer.style.zIndex = "1";
    wheelWrapper.appendChild(svgContainer);

    // Create a container for the actual wheel chart
    const wheelContainer = document.createElement("div");
    wheelContainer.style.position = "absolute";
    wheelContainer.style.width = "500px";
    wheelContainer.style.height = "500px";
    wheelContainer.style.top = "100px";
    wheelContainer.style.left = "100px";
    wheelContainer.style.zIndex = "2";
    wheelContainer.setAttribute("data-wheel-container", "true");
    wheelWrapper.appendChild(wheelContainer);

    // Add card title AFTER the wheel
    const titleContainer = document.createElement("div");
    titleContainer.style.marginBottom = "30px";
    cardContainer.appendChild(titleContainer);

    const title = document.createElement("h1");
    title.style.fontSize = "48px";
    title.style.fontWeight = "600";
    title.style.margin = "0";
    title.style.letterSpacing = "-0.5px";
    title.textContent = "Your Life Balance Wheel";
    titleContainer.appendChild(title);

    // Add date
    const dateDiv = document.createElement("h2");
    dateDiv.style.fontSize = "32px";
    dateDiv.style.fontWeight = "normal";
    dateDiv.style.margin = "10px 0 0 0";
    dateDiv.style.fontStyle = "italic";
    dateDiv.textContent = `On ${formattedDate}`;
    titleContainer.appendChild(dateDiv);

    // Add description
    const description = document.createElement("p");
    description.style.fontSize = "22px";
    description.style.lineHeight = "1.6";
    description.style.marginBottom = "30px";
    description.style.maxWidth = "90%";
    description.style.opacity = "0.9";
    description.textContent =
      "This Is How Your Life Balance Wheel Looks Like Now. Scores Will Change Weekly, Daily, Even Hourly As Circumstances Change. Do Not Look For Any Ultimate Truth, Just Check In With How You Feel In This Moment.";
    cardContainer.appendChild(description);

    // Temporarily append to document to capture, but hide it
    document.body.appendChild(cardContainer);

    // Copy the real wheel chart first
    if (ref.current) {
      const wheelParent = ref.current.closest('[data-wheel-container="true"]');

      if (wheelParent) {
        const wheelClone = wheelParent.cloneNode(true);
        wheelClone.style.position = "absolute";
        wheelClone.style.top = "0";
        wheelClone.style.left = "0";
        wheelClone.style.width = "100%";
        wheelClone.style.height = "100%";
        wheelContainer.appendChild(wheelClone);
      } else {
        const wheelClone = ref.current.cloneNode(true);
        wheelClone.style.position = "absolute";
        wheelClone.style.top = "50%";
        wheelClone.style.left = "50%";
        wheelClone.style.transform = "translate(-50%, -50%)";
        wheelClone.style.width = "100%";
        wheelClone.style.height = "100%";
        wheelContainer.appendChild(wheelClone);
      }
    }

    // Fetch and embed the SVG then generate the image
    fetchAndEmbedSVG("/assets/roundtext.svg", svgContainer)
      .then(() => {
        // Ensure SVG elements have the right styling
        const svgElement = svgContainer.querySelector("svg");
        if (svgElement) {
          svgElement.setAttribute("width", "700");
          svgElement.setAttribute("height", "700");
          svgElement.style.width = "100%";
          svgElement.style.height = "100%";

          // Make sure text elements are visible
          const textElements = svgElement.querySelectorAll("text");
          textElements.forEach((text) => {
            text.style.fill = "white";
            text.style.fontFamily =
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
            text.style.fontWeight = "bold";
          });
        }

        // Now capture the image
        return html2canvas(cardContainer, {
          backgroundColor: "transparent",
          useCORS: true,
          scale: 2,
          allowTaint: true,
          foreignObjectRendering: true,
          onclone: (clonedDoc, element) => {
            element.style.zIndex = "auto";
            element.style.transform = "none";
            element.style.top = "0";
            element.style.left = "0";
            element.style.position = "absolute";
          },
        });
      })
      .then((canvas) => {
        // Convert to JPEG
        const imageData = canvas.toDataURL("image/jpeg", 0.95);

        // Create download link
        const link = document.createElement("a");
        link.download = "life-balance-wheel.jpg";
        link.href = imageData;

        // Trigger download
        link.click();

        // Clean up
        document.body.removeChild(cardContainer);
      })
      .catch((err) => {
        console.error("Error generating card image:", err);
        // Fallback to the original method
        if (ref.current) {
          toJpeg(ref.current, { quality: 0.95 }).then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "balance-wheel.jpeg";
            link.href = dataUrl;
            link.click();
          });
        }

        // Make sure to remove the container even on error
        if (document.body.contains(cardContainer)) {
          document.body.removeChild(cardContainer);
        }
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
      <div className="h-full bg-[#19667A] flex flex-col min-h-[100dvh] overflow-hidden md:my-0 items-center justify-center">
        <div className="w-full max-w-screen-[1440px] mx-auto px-4 flex items-center justify-center">
          <div className="flex flex-col md:flex-row w-full justify-center items-center">
            <div className="w-full md:w-1/2 md:order-2 mt-[60px] md:mt-4 mx-auto md:mr-10 relative flex justify-center md:justify-center items-center h-auto min-h-[280px] md:min-h-[600px]">
              {currentStage >= 3 && currentStage <= 10 && currentQuestion && (
                <>
                  <div className="absolute top-[-40px] md:-top-[65px] -left-[780px] right-0 w-full z-10 px-4 md:px-8 hidden md:block my-3">
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
                  <div className="absolute top-[-65px] md:top-0 left-0 right-0 w-full z-10 px-4 md:px-8 my-4">
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
                      <div className="md:mx-[120px] md:relative -top-[60px]">
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
                  className="scale-100 md:scale-100 mt-0 md:mt-[20%] md:mr-[25%] mb-4 w-[280px] h-[280px] md:w-[600px] md:h-[600px] flex items-center justify-center relative "
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
