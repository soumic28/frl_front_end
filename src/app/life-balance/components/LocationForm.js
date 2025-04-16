import { motion } from "framer-motion";
import NavigationButton from "./NavigationButton";
import { countries } from "../data/constants";

const LocationForm = ({
  formData,
  updateFormData,
  setCurrentStage,
  currentStage,
  pageVariants,
}) => (
  <motion.div
    key="stage-2"
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={pageVariants}
    className="flex flex-col justify-start mt-[10vh] sm:mt-[15vh] md:mt-[23vh] ml-4 sm:ml-[5vw] md:ml-[10vw] pr-4 sm:pr-[5vw]"
  >
    <h1 className="text-white text-3xl xs:text-4xl sm:text-5xl font-medium leading-tight sm:leading-[62.40px] mb-4 sm:mb-8">
      Where&apos;re you from?
    </h1>

    <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-8">
      <div className="relative max-w-[280px]">
        <select
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-white bg-transparent border border-white rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
          value={formData.country}
          onChange={(e) => updateFormData("country", e.target.value)}
        >
          <option disabled value="" className="text-gray-700">
            Select your country
          </option>
          {countries.map((country) => (
            <option key={country} className="text-gray-700">
              {country}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 pointer-events-none">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>

      <div className="relative max-w-[280px]">
        <input
          type="text"
          placeholder="PIN/ZIP Code"
          value={formData.zipCode}
          onChange={(e) => updateFormData("zipCode", e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-white bg-transparent border border-white rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-white placeholder-white placeholder-opacity-70 text-sm sm:text-base"
        />
      </div>
    </div>

    <NavigationButton
      onClick={() => setCurrentStage(currentStage + 1)}
      text="Next"
      className="mt-4 text-[18px]"
    />
  </motion.div>
);

export default LocationForm;
