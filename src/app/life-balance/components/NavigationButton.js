/* "use client" */
import { motion } from 'framer-motion';

const NavigationButton = ({ onClick, text, className, disabled = false }) => (
  <motion.button
    onClick={onClick}
    whileHover={disabled ? {} : { scale: 1.05 }}
    whileTap={disabled ? {} : { scale: 0.95 }}
    className={`flex h-[60px] w-fit items-center px-[28px] py-[12px] lg:py-[15px] bg-white rounded-[32px]  font-medium  lg:h-[64px] text-[#2D201B]  sm:font-semibold font-general-sans gap-[10px] ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    disabled={disabled}
  >
    {text}
    <svg className="ml-1.5 xs:ml-2 w-5 h-5 xs:w-4 xs:h-4 lg:w-[19px] lg:h-[15px]" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.41626 6.51514C0.863975 6.51514 0.41626 6.96285 0.41626 7.51514C0.41626 8.06742 0.863975 8.51514 1.41626 8.51514V6.51514ZM18.1234 8.22224C18.5139 7.83172 18.5139 7.19855 18.1234 6.80803L11.7594 0.444069C11.3689 0.0535445 10.7357 0.0535445 10.3452 0.444069C9.95467 0.834593 9.95467 1.46776 10.3452 1.85828L16.002 7.51514L10.3452 13.172C9.95467 13.5625 9.95467 14.1957 10.3452 14.5862C10.7357 14.9767 11.3689 14.9767 11.7594 14.5862L18.1234 8.22224ZM1.41626 8.51514H17.4163V6.51514H1.41626V8.51514Z" fill="#3B3A4D" />
    </svg>
  </motion.button>
);

export default NavigationButton; 