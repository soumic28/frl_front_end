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
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isZipDropdownOpen, setIsZipDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [zipCode, setZipCode] = useState(formData.zipCode || "");
  const countryDropdownRef = useRef(null);
  const zipDropdownRef = useRef(null);

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
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
      if (zipDropdownRef.current && !zipDropdownRef.current.contains(event.target)) {
        setIsZipDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    setZipCode(value);
    updateFormData("zipCode", value);
  };

  return (
    <motion.div
      key="stage-2"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className="flex flex-col min-h-[calc(50vh-120px)] md:min-h-0 mt-[10vh] sm:mt-[15vh] md:mt-[23vh] ml-4 sm:ml-[5vw] md:ml-[10vw] pr-4 sm:pr-[5vw]"
    >
      <div className="flex-grow -mt-[90px] md:mt-0">
        <h1 className="text-white font-general-sans text-3xl xs:text-4xl sm:text-5xl font-semibold leading-tight sm:leading-[62.40px] mb-8 whitespace-nowrap">
          Where Are You From?
        </h1>

        <div className="flex flex-col gap-[18px] mb-8 max-w-[580px]">
          {/* Country Selection Dropdown */}
          <div className="relative" ref={countryDropdownRef}>
            <div
              className="w-full px-[32px] py-[22px] text-white bg-transparent border-[2px] border-white rounded-[50px] appearance-none focus:outline-none focus:ring-2 focus:ring-white cursor-pointer flex items-center justify-between"
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
            >
              <span className="text-xl">{formData.country || "Select Your Country"}</span>
              <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.99967 6.99992L0.333008 0.333252H13.6663L6.99967 6.99992Z" fill="#EEFCFD"/>
              </svg>
            </div>
            {isCountryDropdownOpen && (
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
                      setIsCountryDropdownOpen(false);
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

          {/* ZIP/PIN Code Dropdown */}
          <div className="relative" ref={zipDropdownRef}>
            <div
              className="w-full px-[32px] py-[22px] text-white bg-transparent border-[2px] border-white rounded-[50px] appearance-none focus:outline-none focus:ring-2 focus:ring-white cursor-pointer flex items-center justify-between"
              onClick={() => setIsZipDropdownOpen(!isZipDropdownOpen)}
            >
              <span className="text-xl">{formData.zipCode || "PIN / ZIP Code"}</span>
              <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.99967 6.99992L0.333008 0.333252H13.6663L6.99967 6.99992Z" fill="#EEFCFD"/>
              </svg>
            </div>
            {isZipDropdownOpen && (
              <div className="absolute z-10 mt-2 bg-white text-black rounded-lg shadow-lg p-4 w-full">
                <input
                  type="text"
                  placeholder="Enter PIN / ZIP Code"
                  value={zipCode}
                  onChange={handleZipCodeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => {
                      updateFormData("zipCode", zipCode);
                      setIsZipDropdownOpen(false);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm sm:text-base mb-4">{error}</p>
        )}
      </div>
      
      <div className="flex justify-end md:justify-start mb-8 md:mb-0">
        <NavigationButton
          onClick={handleNext}
          text="Next"
          className="text-[24px]"
          disabled={isNextDisabled}
        />
      </div>
    </motion.div>
  );
};

export default LocationForm;