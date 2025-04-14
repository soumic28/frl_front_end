"use client"
import React from 'react';
import * as framerMotion from 'framer-motion';
const { motion } = framerMotion;

const UpdateCard = ({ delay = 0 }) => {
  return (
    <motion.div 
      className="w-36 h-44 rounded-xl border border-white/20 relative"
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
      transition={{ duration: 0.5, delay }}
    >
      <div 
        className="flex justify-center w-36 h-44 bg-gradient-to-b from-stone-50/80 to-white/0 rounded-xl border-white/20 overflow-hidden"
      >
        <div className="pt-[10px]">
          <div 
            className="w-32 h-28 bg-sky-700 rounded-[5px] overflow-hidden relative"
          >
            {/* Subtle shine effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
              animate={{ 
                translateX: ['0%', '200%']
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "loop", 
                duration: 2,
                ease: "linear",
                repeatDelay: 0.5
              }}
            />
          </div>
          <div className="pt-2 space-y-1">
            <h3 
              className="text-stone-50 text-sm font-semibold leading-3 tracking-tight"
            >
              Latest Updates
            </h3>
            <p 
              className="text-xs text-stone-50 text-[8.73px] font-normal leading-3 tracking-tight"
            >
              Notice Board
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UpdateCard; 