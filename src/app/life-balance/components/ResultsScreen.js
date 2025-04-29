import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ResultsScreen = ({ date, handleDownload, router, pageVariants }) => (
  <motion.div
    key="stage-11"
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={pageVariants}
    className="flex flex-col min-h-[calc(60vh-120px)] md:min-h-0 mt-[2vh] sm:mt-[15vh] md:mt-[23vh] ml-4 sm:ml-[5vw] md:ml-[10vw] pr-4 sm:pr-[5vw] mb-[40px] md:mb-0 "
  >
    <div className="flex-grow">
      <h1 className="text-white font-general-sans  mt-0 sm:mt-[-20px] md:mt-[-50px] text-2xl xs:text-4xl sm:text-5xl font-semibold leading-tight sm:leading-[62.40px] md:whitespace-nowrap " >
        Your Life Wheel Balance
        <br />
        on {date}
      </h1>
      <p className="text-white mt-3 sm:mt-5 text-base xs:text-lg sm:text-xl font-semibold hidden sm:block font-general-sans">
        This is how your life balance wheel looks like now. Scores will change
        weekly, daily, even hourly as circumstances change. do not look for any
        ultimate truth, just check in with how you feel in this moment.
      </p>
      <p className="text-[#E6E6E6] block lg:hidden font-general-sans font-medium text-[15px] mt-4 sm:mt-6">
        This is how your life balance wheel looks like now. Scores will change
        weekly, daily, even hourly as circumstances change. do not look for any
        ultimate truth, just check in with how you feel in this moment.
      </p>
      
      <p className="text-[#EBEBEB] md:text-[14px] max-w-[100%] mt-6 hidden sm:block font-general-sans font-semibold">
        The Life Balance Wheel Tool has been developed by the Academy of
        Leadership Coaching & NLP (ALCN). To know more about its work please visit
        <span className="underline mx-1">https://nlp-leadership-coaching.com/</span>
        If you want to seek coaching support
        from ALCN certified professionals in India click here
      </p>
    </div>
    
    <div className="mt-4 sm:mt-8 mb-8 md:mb-0 -mx-3">
      <div className="flex flex-row items-center gap-4 sm:gap-6 mx-auto sm:mx-0">
        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex w-fit text-[20px] items-center justify-center bg-white text-gray-700 rounded-[32px] font-medium sm:font-semibold"
          style={{
            width: "",
            height: "64px",
            padding: "15px 28px",
            gap: "10px",
          }}
        >
          Download
          <svg
            className="ml-2 w-4 h-4 lg:w-[19px] lg:h-[15px]"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 12.175V0L9 0V12.175L14.6 6.575L16 8L8 16L0 8L1.4 6.575L7 12.175Z"
              fill="#2D201B"
            />
          </svg>
        </motion.button>
        <motion.button
          onClick={() => {
            router.push("/resources");
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex w-fit text-[20px] items-center justify-center border-white border text-white rounded-[32px] font-medium sm:font-semibold"
          style={{
            // width: "216px",
            height: "64px",
            padding: "15px 28px",
            gap: "10px",
          }}
        >
          Share
          <svg
            className="ml-2 w-4 h-4 lg:w-[19px] lg:h-[15px]"
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 20C14.1667 20 13.4583 19.7083 12.875 19.125C12.2917 18.5417 12 17.8333 12 17C12 16.9 12.025 16.6667 12.075 16.3L5.05 12.2C4.78333 12.45 4.475 12.6458 4.125 12.7875C3.775 12.9292 3.4 13 3 13C2.16667 13 1.45833 12.7083 0.875 12.125C0.291667 11.5417 0 10.8333 0 10C0 9.16667 0.291667 8.45833 0.875 7.875C1.45833 7.29167 2.16667 7 3 7C3.4 7 3.775 7.07083 4.125 7.2125C4.475 7.35417 4.78333 7.55 5.05 7.8L12.075 3.7C12.0417 3.58333 12.0208 3.47083 12.0125 3.3625C12.0042 3.25417 12 3.13333 12 3C12 2.16667 12.2917 1.45833 12.875 0.875C13.4583 0.291667 14.1667 0 15 0C15.8333 0 16.5417 0.291667 17.125 0.875C17.7083 1.45833 18 2.16667 18 3C18 3.83333 17.7083 4.54167 17.125 5.125C16.5417 5.70833 15.8333 6 15 6C14.6 6 14.225 5.92917 13.875 5.7875C13.525 5.64583 13.2167 5.45 12.95 5.2L5.925 9.3C5.95833 9.41667 5.97917 9.52917 5.9875 9.6375C5.99583 9.74583 6 9.86667 6 10C6 10.1333 5.99583 10.2542 5.9875 10.3625C5.97917 10.4708 5.95833 10.5833 5.925 10.7L12.95 14.8C13.2167 14.55 13.525 14.3542 13.875 14.2125C14.225 14.0708 14.6 14 15 14C15.8333 14 16.5417 14.2917 17.125 14.875C17.7083 15.4583 18 16.1667 18 17C18 17.8333 17.7083 18.5417 17.125 19.125C16.5417 19.7083 15.8333 20 15 20Z"
              fill="#EEFCFD"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  </motion.div>
);

export default ResultsScreen;
