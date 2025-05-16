import NavigationButton from "./NavigationButton";
import RatingSlider from "./RatingSlider";
import AlertPopup from "./AlertPopup";
import { useState, useEffect } from "react";

const QuestionScreen = ({
  currentStage,
  setCurrentStage,
  question,
  field,
  formData,
  updateFormData,
  handleSubmit = null,
}) => {
  const [hasMovedSlider, setHasMovedSlider] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Set initial value to 1 if not already set
  useEffect(() => {
    if (!formData[field]) {
      updateFormData(field, 1);
    }
  }, [field, formData, updateFormData]);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    updateFormData(field, newValue);
    // Set hasMovedSlider to true if the value is not 1
    if (newValue !== 1) {
      setHasMovedSlider(true);
    } else {
      setHasMovedSlider(false);
    }
  };

  const handleNextClick = () => {
    if (hasMovedSlider) {
      if (handleSubmit) handleSubmit();
      setCurrentStage(currentStage + 1);
    } else {
      setShowPopup(true);
    }
  };

  // Log values to help with debugging
  useEffect(() => {
    console.log("Current slider value:", formData[field]);
    console.log("Has moved slider:", hasMovedSlider);
  }, [formData, field, hasMovedSlider]);

  return (
    <div className="flex flex-col min-h-[calc(55vh-120px)] md:min-h-0 md:mt-[100px]">
      <div className="-mt-12 md:-mt-0">
        <h1 className="text-white text-xl xs:text-5xl sm:text-5xl font-general-sans font-semibold">
          {question}
        </h1>
        <p className="text-white mt-2 sm:mt-5 text-sm xs:text-base sm:text-xl font-general-sans font-medium md:mx-0">
          Rate your level of satisfaction in a <br />
          scale of 1 - 10
        </p>
      </div>

      {/* Mobile view: Fixed position container */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#19667A] py-4 px-4 z-10">
        <div className="mb-6">
          <RatingSlider
            initialValue={1}
            value={formData[field] || 1}
            onChange={handleSliderChange}
          />
        </div>

        <div className="flex justify-end font-inter mb-2">
          <NavigationButton
            onClick={handleNextClick}
            text="Next"
            className="text-[20px]"
          />
        </div>
      </div>

      {/* Desktop view: Normal layout */}
      <div className="hidden md:block">
        <div className="mt-6 sm:mt-8">
          <RatingSlider
            initialValue={1}
            value={formData[field] || 1}
            onChange={handleSliderChange}
          />
        </div>

        <div className="mt-6 sm:mt-10 mb-8 md:mb-0 flex justify-start font-inter">
          <NavigationButton
            onClick={handleNextClick}
            text="Next"
            className="text-[20px]"
          />
        </div>
      </div>

      <AlertPopup
        isVisible={showPopup}
        message="Please move the slider to rate your satisfaction before proceeding."
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
};

export default QuestionScreen;
