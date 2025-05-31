import ProgressBar from './ProgressBar';

const BackButton = ({ onBack, currentStage }) => {
  return (
    <>
      {/* Desktop back button - fixed at top, aligned with heading */}
      <div className="fixed top-6 left-[8vw] w-auto z-50 hidden md:block">
        <button
          onClick={onBack}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md"
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

      {/* Desktop progress bar - fixed at top, positioned with proper spacing */}
      <div className='fixed top-8 left-[calc(8vw+100px)] w-auto z-50 hidden md:block'>
        <ProgressBar currentStage={currentStage} />
      </div>

      {/* Mobile layout - fixed at top */}
      <div className="fixed top-4 left-0 right-0 w-full z-50 px-4 md:hidden">
        <div className="w-full flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md"
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
          <ProgressBar currentStage={currentStage} />
        </div>
      </div>
    </>
  );
};

export default BackButton; 