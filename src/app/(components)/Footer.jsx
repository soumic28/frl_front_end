"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer 
      className="w-full py-16 px-8"
      style={{
        background: 'linear-gradient(90.77deg, #1D6D81 0%, #0F313D 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <div className="mb-8">
              <Image
                src="/assets/logo.svg"
                width={110}
                height={150}
                alt="Forum for Responsible Living Logo"
                className="filter brightness-0 invert"
              />
            </div>
          </div>

          {/* Lorem Ipsum Columns */}
          <div className="flex flex-col">
            <h3 className="text-white text-lg font-semibold mb-6 uppercase tracking-wider">
              LOREM IPSUM
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Lorem Ipsum</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Lorem Ipsum</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Lorem Ipsum</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Lorem Ipsum</a></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="text-white text-lg font-semibold mb-6 uppercase tracking-wider">
              LOREM IPSUM
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Lorem Ipsum</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Lorem Ipsum</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Lorem Ipsum</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Lorem Ipsum</a></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="text-white text-lg font-semibold mb-6 uppercase tracking-wider">
              LOREM IPSUM
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Lorem Ipsum</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Lorem Ipsum</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Lorem Ipsum</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Lorem Ipsum</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 