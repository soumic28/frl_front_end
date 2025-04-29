import { motion } from "framer-motion";
import NavigationButton from "./NavigationButton";

const IntroScreen = ({ setCurrentStage, pageVariants }) => (
  <motion.div
    key="stage-0"
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={pageVariants}
    className="flex flex-col min-h-[calc(40vh-120px)] md:min-h-0 mt-[10vh] sm:mt-[15vh] ml-4 sm:ml-[5vw] md:ml-[8vw] pr-4 sm:pr-[5vw] mb-[20px]"
  >
    <div className="flex-grow">
      <h1 className="h-auto sm:h-14 font-general-sans text-white text-3xl whitespace-nowrap xs:text-4xl sm:text-5xl font-semibold leading-tight sm:leading-[62.40px] -mt-[90px] md:mt-0">
        Life Balance Wheel
      </h1>
      
      <p className="font-inter font-general-sans font-medium text-[14px] text-white block md:hidden ">
        The Life Balance Wheel helps you reflect on eight key areas of your life,
        both external (home, work, relationships) and internal (thoughts,
        feelings). It builds awareness and highlights where change might be
        needed.
      </p>
      <p className="mt-4 sm:mt-7 text-white text-base xs:text-lg sm:text-xl font-light leading-relaxed hidden md:block">
        The Life Balance Wheel Tool will help to raise awareness
        <br className="hidden xs:block" />
        and create insight into your internal and external
        <br className="hidden xs:block" />
        environments. It will give you a picture of what is going
        <br className="hidden xs:block" />
        on in your life, both externally (at home, work, with your
        <br className="hidden xs:block" />
        friends, in relationships) and internally (your own inner
        <br className="hidden xs:block" />
        language, how you feel about a situation).
        <br />
        <br />
        This powerful tool will allow you to evaluate eight areas
        <br className="hidden xs:block" />
        of your life and create awareness around changes that
        <br className="hidden xs:block" />
        you may want to or need to make in.
      </p>
    </div>
    
    <div className="flex justify-end md:justify-start md:my-4">
      <NavigationButton
        onClick={() => setCurrentStage(1)}
        text="Explore Now"
        className="text-[20px] whitespace-nowrap"
      ></NavigationButton>
    </div>
  </motion.div>
);

export default IntroScreen;
