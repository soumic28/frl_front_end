import NavigationButton from './NavigationButton';
import RatingSlider from './RatingSlider';
import { useState, useEffect } from 'react';

const QuestionScreen = ({ 
  currentStage, 
  setCurrentStage, 
  question, 
  field, 
  formData, 
  updateFormData,
  handleSubmit = null
}) => {
  const [hasMovedSlider, setHasMovedSlider] = useState(false);
  
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

  // Log values to help with debugging
  useEffect(() => {
    console.log('Current slider value:', formData[field]);
    console.log('Has moved slider:', hasMovedSlider);
  }, [formData, field, hasMovedSlider]);

  return (
    <div className="flex flex-col min-h-[calc(55vh-120px)] md:min-h-0 md:mt-[100px]">
      <div className="flex-grow">
        <h1 className='text-white text-xl xs:text-3xl sm:text-5xl font-general-sans font-semibold  '>
          {question}
        </h1>
        <p className='text-white mt-2 sm:mt-5 text-sm xs:text-base sm:text-xl font-general-sans font-medium    md:mx-0'>
          Rate your level of satisfaction in a <br/>scale of 1 - 10
        </p>
        <div className="mt-4 sm:mt-8">
          <RatingSlider 
            initialValue={1}
            value={formData[field] || 1}
            onChange={handleSliderChange}
          />
        </div>
      </div>
      
      <div className="mt-6 sm:mt-10 mb-8 md:mb-0 flex justify-end md:justify-start font-inter">
        <NavigationButton 
          onClick={() => {
            if (handleSubmit) handleSubmit();
            setCurrentStage(currentStage + 1);
          }} 
          text="Next" 
          className="text-[20px]"
          disabled={!hasMovedSlider}
        />
      </div>
    </div>
  );
};

export default QuestionScreen; 