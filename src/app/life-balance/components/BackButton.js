import ProgressBar from './ProgressBar';

const BackButton = ({ onBack, currentStage }) => {
  return (
    <>
      <div className="absolute top-[-40px] md:-top-[65px] -left-[780px] right-0 w-full z-10 px-4 md:px-8 hidden md:block my-3">
        <button
          onClick={onBack}
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
            onClick={onBack}
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
  );
};

export default BackButton; 