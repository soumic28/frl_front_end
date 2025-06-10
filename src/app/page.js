"use client"
import Image from "next/image";
import Header from "./(components)/Header";
import Hero from "./(components)/Hero";
import Footer from "./(components)/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0F313D] min-h-[100dvh] overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto px-4 ">
        <Header/>
        <Hero/>
      </div>
      <Footer />
    </motion.div>
  );
}
