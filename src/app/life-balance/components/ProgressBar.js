import React from 'react';

const ProgressBar = ({ currentStage }) => {
  // Calculate progress (questions start at stage 3 and go to 10)
  const totalQuestions = 8;
  const currentQuestion = currentStage - 2; // Adjust for stages 3-10
  
  // Generate array of dots for all questions
  const dots = Array(totalQuestions).fill(0).map((_, index) => {
    // Active if current question index matches or has passed this dot
    const isActive = index < currentQuestion;
    return { isActive, id: index };
  });

  return (
    <div className="flex items-center">
      <span className="text-white text-sm md:text-base font-medium mr-2 md:mr-4 whitespace-nowrap">
        Step {currentQuestion}/{totalQuestions}
      </span>
      <div className="flex space-x-1 md:space-x-2">
        {dots.map((dot) => (
          <div 
            key={dot.id} 
            className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors duration-300 ${
              dot.isActive ? 'bg-teal-400' : 'bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar; 