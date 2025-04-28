import { motion } from "framer-motion";
import NavigationButton from "./NavigationButton";

const 







InstructionsScreen = ({
  setCurrentStage,
  currentStage,
  pageVariants,
}) => (
  <motion.div
    key="stage-1"
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={pageVariants}
    className="flex flex-col justify-start mt-[10vh] sm:mt-[15vh] ml-4 sm:ml-[5vw] md:ml-[8vw] pr-4 sm:pr-[5vw]"
  >
    <h1 className="text-white text-3xl xs:text-4xl whitespace-nowrap sm:text-5xl font-medium leading-tight sm:leading-[62.40px]">
      Life Balance Wheel
    </h1>
    <p className="font-inter font-normal text-[14px] text-white block md:hidden">
      This is a subjective assessment. It is not about how your family or
      colleagues or neighbors see you. It is not about success. It is about your
      personal satisfaction at this point in life. Choose your answers quickly,
      without giving much thought to them. Please note, we will not record your
      responses other than the country of your residence and your PIN / ZIP
      code. So, be honest to yourself. After answering all 8 questions, you can
      download a snapshot of your responses today.
    </p>
    <p className="text-white text-base xs:text-lg sm:text-xl font-light leading-relaxed hidden md:block">
      <br className="hidden sm:block" />
      This is a subjective assessment. It is not about how your
      <br className="hidden xs:block" />
      family or colleagues or neighbors see you. It is not about
      <br className="hidden xs:block" />
      success. It is about your personal satisfaction at this point in
      <br className="hidden xs:block" />
      life. Choose your answers quickly, without giving much
      <br className="hidden xs:block" />
      thought to them.
      <br />
      <br />
      Please note, we will not record your responses other than
      <br className="hidden xs:block" />
      the country of your residence and your PIN / ZIP code. So, be
      <br className="hidden xs:block" />
      honest to yourself. After answering all 8 questions, you can
      <br className="hidden xs:block" />
      download a snapshot of your responses today.
    </p>
    <div className="flex justify-end md:justify-start">
    <NavigationButton
      onClick={() => setCurrentStage(currentStage + 1)}
      text="Start"
      className="mt-6 sm:mt-[50px] text-[20px] mb-8 md:mb-0"
    />
    </div>
   
  </motion.div>
);

export default InstructionsScreen;
