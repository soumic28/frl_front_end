import NavigationButton from './NavigationButton';
import RatingSlider from './RatingSlider';

const QuestionScreen = ({ 
  currentStage, 
  setCurrentStage, 
  question, 
  field, 
  formData, 
  updateFormData,
  handleSubmit = null
}) => (
  <>
    <h1 className='text-white text-3xl xs:text-4xl sm:text-5xl font-medium leading-tight sm:leading-[62.40px]'>
      {question}
    </h1>
    <p className='text-white mt-3 sm:mt-5 text-base xs:text-lg sm:text-xl font-light leading-relaxed'>
      Rate your level of satisfaction in a scale of 1 - 10
    </p>
    <RatingSlider 
      value={formData[field]}
      onChange={(e) => updateFormData(field, parseInt(e.target.value))}
    />
    <NavigationButton 
      onClick={() => {
        if (handleSubmit) handleSubmit();
        setCurrentStage(currentStage + 1);
      }} 
      text="Next" 
      className="mt-6 sm:mt-10"
    />
  </>
);

export default QuestionScreen; 