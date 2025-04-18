import { motion } from "framer-motion";
import NavigationButton from "./NavigationButton";
import { countries } from "../data/constants";
import { useState, useEffect, useRef } from "react";

const LocationForm = ({
  formData,
  updateFormData,
  setCurrentStage,
  currentStage,
  pageVariants,
}) => {
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const handleNext = () => {
    if (!formData.country || !formData.zipCode) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    setCurrentStage(currentStage + 1);
  };

  const isNextDisabled = !formData.country || !formData.zipCode;

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
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
        <div className="relative max-w-[280px]" ref={dropdownRef}>
          <div
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-white bg-transparent border border-white rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {formData.country || "Select your country"}
          </div>
          {isDropdownOpen && (
            <div className="absolute z-10 mt-2 bg-white text-black rounded-lg shadow-lg max-h-60 overflow-y-auto w-full">
              <input
                type="text"
                placeholder="Search country"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
              />
              {filteredCountries.map((country) => (
                <div
                  key={country}
                  onClick={() => {
                    updateFormData("country", country);
                    setIsDropdownOpen(false);
                    setSearchTerm("");
                  }}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {country}
                </div>
              ))}
            </div>
          )}
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

      {error && (
        <p className="text-red-500 text-sm sm:text-base mb-4">{error}</p>
      )}

      <NavigationButton
        onClick={handleNext}
        text="Next"
        className="mt-4 text-[20px]"
        disabled={isNextDisabled}
      />
    </motion.div>
  );
};

export default LocationForm;
