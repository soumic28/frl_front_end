import { motion } from "framer-motion";
import NavigationButton from "./NavigationButton";

const IntroScreen = ({ setCurrentStage, pageVariants }) => (
  <motion.div
    key="stage-0"
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={pageVariants}
    className="flex flex-col justify-start mt-[10vh] sm:mt-[15vh] ml-4 sm:ml-[5vw] md:ml-[8vw] pr-4 sm:pr-[5vw]"
  >
    <h1 className="h-auto sm:h-14 text-white text-3xl whitespace-nowrap xs:text-4xl sm:text-5xl font-medium leading-tight sm:leading-[62.40px]">
      Life Balance Wheel
    </h1>
    
    <p className="font-inter font-normal text-[14px] text-white block md:hidden">
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
    <NavigationButton
      onClick={() => setCurrentStage(1)}
      text="Explore"
      className="mt-6 sm:mt-[50px]  text-[20px]"
    ></NavigationButton>
  </motion.div>
);

export default IntroScreen;
