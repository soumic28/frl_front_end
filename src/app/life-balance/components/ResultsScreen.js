import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ResultsScreen = ({ date, handleDownload, router, pageVariants }) => (
  <motion.div
    key="stage-11"
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={pageVariants}
    className="flex flex-col justify-start mt-[10vh] sm:mt-[15vh] md:mt-[23vh] ml-4 sm:ml-[5vw] md:ml-[10vw] pr-4 sm:pr-[5vw]"
  >
    <h1 className="text-white mt-0 sm:mt-[-20px] md:mt-[-50px] text-3xl xs:text-4xl sm:text-5xl font-medium leading-tight sm:leading-[62.40px]">
      Your Life
      <br />
      Wheel Balance
      <br />
      <em>on {date}</em>
    </h1>
    <p className="text-white mt-3 sm:mt-5 text-base xs:text-lg sm:text-xl font-light leading-relaxed">
      This is how your Life Balance Wheel looks like
      <br />
      now. Scores will change weekly, daily, even
      <br />
      hourly as circumstances change. Do not look for
      <br />
      any ultimate truth, just check in with how you
      <br />
      feel in this moment.
    </p>

    <div className="flex flex-col xs:flex-row space-y-3 xs:space-y-0 xs:space-x-4 sm:space-x-10 mb-4">
      <motion.button
        onClick={handleDownload}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex w-fit items-center px-3 xs:px-4 sm:px-6 lg:px-7 py-1.5 xs:py-2 lg:py-3 mt-4 sm:mt-[50px] bg-white rounded-full text-xs xs:text-sm font-medium sm:h-10 lg:h-12 text-gray-700 sm:text-lg sm:font-semibold text-[18px]"
      >
        Download
        <svg
          className="ml-1.5 xs:ml-2 w-3 h-3 xs:w-4 xs:h-4 lg:w-[19px] lg:h-[15px]"
          viewBox="0 0 19 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.41626 6.51514C0.863975 6.51514 0.41626 6.96285 0.41626 7.51514C0.41626 8.06742 0.863975 8.51514 1.41626 8.51514V6.51514ZM18.1234 8.22224C18.5139 7.83172 18.5139 7.19855 18.1234 6.80803L11.7594 0.444069C11.3689 0.0535445 10.7357 0.0535445 10.3452 0.444069C9.95467 0.834593 9.95467 1.46776 10.3452 1.85828L16.002 7.51514L10.3452 13.172C9.95467 13.5625 9.95467 14.1957 10.3452 14.5862C10.7357 14.9767 11.3689 14.9767 11.7594 14.5862L18.1234 8.22224ZM1.41626 8.51514H17.4163V6.51514H1.41626V8.51514Z"
            fill="#3B3A4D"
          />
        </svg>
      </motion.button>
      <motion.button
        onClick={() => {
          router.push("/resources");
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex w-fit items-center px-3 xs:px-4 sm:px-6 lg:px-7 py-1.5 xs:py-2 lg:py-3 border-white border rounded-full text-xs xs:text-sm font-medium sm:h-10 lg:h-12 text-white sm:text-lg text-[18px] sm:font-semibold"
      >
        Discard
        <svg
          className="ml-1.5 xs:ml-2 w-3 h-3 xs:w-4 xs:h-4 lg:w-[19px] lg:h-[15px]"
          viewBox="0 0 19 15"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.41626 6.51514C0.863975 6.51514 0.41626 6.96285 0.41626 7.51514C0.41626 8.06742 0.863975 8.51514 1.41626 8.51514V6.51514ZM18.1234 8.22224C18.5139 7.83172 18.5139 7.19855 18.1234 6.80803L11.7594 0.444069C11.3689 0.0535445 10.7357 0.0535445 10.3452 0.444069C9.95467 0.834593 9.95467 1.46776 10.3452 1.85828L16.002 7.51514L10.3452 13.172C9.95467 13.5625 9.95467 14.1957 10.3452 14.5862C10.7357 14.9767 11.3689 14.9767 11.7594 14.5862L18.1234 8.22224ZM1.41626 8.51514H17.4163V6.51514H1.41626V8.51514Z"
            fill="white"
          />
        </svg>
      </motion.button>
    </div>

    <p className="text-white mt-3 sm:mt-5  xs:text-lg sm:text-xl  leading-relaxed text-xs xs:text-sm md:text-sm font-normal mb-8 md:mb-0">
      The Life Balance Wheel Tool has been developed by the Academy of
      Leadership Coaching &
      <br className="hidden sm:block" />
      NLP (ALCN). To know more about its work please visit
      https://nlp-leadership-coaching.com/ If
      <br className="hidden sm:block" />
      you want to seek coaching support from ALCN certified professionals in
      India click here
    </p>
    {/* <p className='  mt-3 sm:mt-5  xs:text-lg sm:text-xl  text-white pt-4 sm:pt-10 text-xs xs:text-sm md:text-sm font-normal leading-tight relative md:absolute md:bottom-4 sm:bottom-10 left-0 md:left-4 sm:left-auto w-[90%] sm:w-full md:max-w-[70%]'>
      The Life Balance Wheel Tool has been developed by the Academy of Leadership Coaching & 
      <br className="hidden sm:block"/>NLP (ALCN). To know more about its work please visit https://nlp-leadership-coaching.com/ If 
      <br className="hidden sm:block"/>you want to seek coaching support from ALCN certified professionals in India click here
    </p> */}
  </motion.div>
);

export default ResultsScreen;
