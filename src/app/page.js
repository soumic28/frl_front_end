"use client"
import Image from "next/image";
import Header from "./(components)/Header";
import Hero from "./(components)/Hero";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#19667A] min-h-[100dvh]"
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <Header/>
        <Hero/>
      </div>
    </motion.div>
  );
}
