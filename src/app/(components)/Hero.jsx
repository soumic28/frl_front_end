"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-col lg:flex-row pt-10 md:pt-15 gap-8 mb-8 ">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Notice Board Cards */}
        <div className="flex justify-start flex-wrap gap-4 mb-10">
          <motion.div 
            className="w-64 h-[280px] rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              scale: 1.03,
              transition: { 
                type: "spring",
                stiffness: 300,
                damping: 15
              }
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-4 h-full flex flex-col">
              <div className="w-full h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-3 overflow-hidden relative">
                {/* Placeholder for group image */}
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <div className="text-white text-xs opacity-70">Group Photo</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-white/60 mb-1 uppercase tracking-wide">Notice Board</div>
                <h3 className="text-white text-lg font-semibold leading-tight">Featured Member</h3>
                <p className="text-white/70 text-sm mt-1">Click here to know more</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="w-64 h-[280px] rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              scale: 1.03,
              transition: { 
                type: "spring",
                stiffness: 300,
                damping: 15
              }
            }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-4 h-full flex flex-col">
              <div className="w-full h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-lg mb-3 overflow-hidden relative">
                {/* Placeholder for laptop image */}
                <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                  <div className="text-white text-xs opacity-70">Laptop Image</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-white/60 mb-1 uppercase tracking-wide">Notice Board</div>
                <h3 className="text-white text-lg font-semibold leading-tight">What's New In FRL</h3>
                <p className="text-white/70 text-sm mt-1">Click here to know more</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col">
          <div className="flex flex-col mb-8">
            <h1 className="text-white text-xl md:text-xl lg:text-xl font-bold leading-tight mb-6">
              Co-Creating A Harmonious Thriving Future
            </h1>
            <div className="space-y-4 text-white/80 text-[14px]">
              <p>
                The Forum for Responsible Living (FRL) is a safe space for members to explore how each of us can contribute towards healing ourselves, local communities and ecosystems. Explore
              </p>
              <p>
                FRL supports members to explore fresh perspectives on themselves and the systems that influence social, ecological and economic (SEE) challenges that concern them the most – helping them to emerge as change-makers who are systems-aware & guided by universal values.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4  flex-wrap">
            <button className="px-8 py-3 bg-white rounded-full text-[#0F313D] font-semibold hover:bg-gray-100 transition-colors flex items-center gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0291 10.7499C20.0291 12.713 19.4346 14.5372 18.4158 16.0524C16.7075 18.5929 13.8062 20.2645 10.5146 20.2645C7.2229 20.2645 4.32166 18.5929 2.61334 16.0524C1.59452 14.5372 1 12.713 1 10.7499C1 5.49516 5.25981 1.23535 10.5146 1.23535C15.7693 1.23535 20.0291 5.49516 20.0291 10.7499Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M12.8933 7.57847C12.8933 8.89215 11.8283 9.95711 10.5146 9.95711C9.20094 9.95711 8.13599 8.89215 8.13599 7.57847C8.13599 6.26478 9.20094 5.19983 10.5146 5.19983C11.8283 5.19983 12.8933 6.26478 12.8933 7.57847Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M13.647 13.9215H7.38211C5.49036 13.9215 3.89236 15.1949 3.37866 16.9412C5.10217 18.9756 7.65971 20.2645 10.5146 20.2645C13.3695 20.2645 15.927 18.9756 17.6505 16.9412C17.1368 15.1949 15.5388 13.9215 13.647 13.9215Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              Login
            </button>
            
            <button className="px-6 py-3 bg-transparent text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M8.25 5.25v13.5l10.5-6.75-10.5-6.75z" />
              </svg>
              Play Video
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Life Balance Tool */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <motion.div 
          className="w-full max-w-lg bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Experience Life Balance Tool
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            No matter where we are from and what we do, there are universal values that we share. This magical reality can help us to co-create ecosystems of knowledge. One way to begin is to consciously prioritize personal & planetary well-being. Change begins with you, visualize all the important areas of your life at once, and become aware of how fulfilled you feel in each area.
          </p>
          <button className="px-8 py-3 bg-white rounded-full text-[#0F313D] font-semibold hover:bg-gray-100 transition-colors flex items-center gap-3">
            Explore Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
