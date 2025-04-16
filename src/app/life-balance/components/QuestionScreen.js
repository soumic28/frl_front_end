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
    <>
      <h1 className='text-white text-3xl xs:text-4xl sm:text-5xl font-medium leading-tight sm:leading-[62.40px]'>
        {question}
      </h1>
      <p className='text-white mt-3 sm:mt-5 text-base xs:text-lg sm:text-xl font-light leading-relaxed'>
        Rate your level of satisfaction in a scale of 1 - 10
      </p>
      <RatingSlider 
        initialValue={1}
        value={formData[field] || 1}
        onChange={handleSliderChange}
      />
      <NavigationButton 
        onClick={() => {
          if (handleSubmit) handleSubmit();
          setCurrentStage(currentStage + 1);
        }} 
        text="Next" 
        className="mt-6 sm:mt-10 mb-10 md:mb-0 text-[18px]"
        disabled={!hasMovedSlider}
      />
    </>
  );
};

export default QuestionScreen; 