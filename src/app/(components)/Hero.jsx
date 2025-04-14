"use client";
import React from "react";
import { motion } from "framer-motion";
import UpdateCard from "./UpdateCard";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-col-reverse md:flex-row pt-10 md:pt-20">
      <div className="w-full md:w-1/2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Update Cards */}
        <div className="flex justify-center md:justify-start flex-wrap gap-4 mb-10">
          <UpdateCard delay={0.2} />
          <UpdateCard delay={0.4} />
        </div>

        {/* Main Content */}
        <div className="flex flex-col">
          <div className="flex flex-col">
            <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold leading-8 sm:leading-10">
              Investing in people for
              <br />
              Building and Transforming Systems
            </p>
            <p className="text-sky-950 text-lg sm:text-2xl md:text-3xl font-normal leading-7 sm:leading-10 mt-4">
              That can make everyone a part of solutions <br />
              to the Climate Crisis
            </p>
          </div>
          <div className="flex gap-4 mt-8 flex-wrap">
            <button className="w-full sm:w-32 h-11 mix-blend-overlay bg-white rounded-[30px] px-6 py-3 text-sky-950 font-medium hover:bg-sky-100 transition-colors flex items-center gap-2">
              <svg
                className="pt-1"
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0291 10.7499C20.0291 12.713 19.4346 14.5372 18.4158 16.0524C16.7075 18.5929 13.8062 20.2645 10.5146 20.2645C7.2229 20.2645 4.32166 18.5929 2.61334 16.0524C1.59452 14.5372 1 12.713 1 10.7499C1 5.49516 5.25981 1.23535 10.5146 1.23535C15.7693 1.23535 20.0291 5.49516 20.0291 10.7499Z"
                  stroke="#005877"
                  strokeWidth="1.5"
                />
                <path
                  d="M12.8933 7.57847C12.8933 8.89215 11.8283 9.95711 10.5146 9.95711C9.20094 9.95711 8.13599 8.89215 8.13599 7.57847C8.13599 6.26478 9.20094 5.19983 10.5146 5.19983C11.8283 5.19983 12.8933 6.26478 12.8933 7.57847Z"
                  stroke="#005877"
                  strokeWidth="1.5"
                />
                <path
                  d="M13.647 13.9215H7.38211C5.49036 13.9215 3.89236 15.1949 3.37866 16.9412C5.10217 18.9756 7.65971 20.2645 10.5146 20.2645C13.3695 20.2645 15.927 18.9756 17.6505 16.9412C17.1368 15.1949 15.5388 13.9215 13.647 13.9215Z"
                  stroke="#005877"
                  strokeWidth="1.5"
                />
              </svg>

              <p className="justify-start text-sky-800 text-sm sm:text-xl font-medium">
                Login
              </p>
            </button>
            <button className="w-full sm:w-auto px-6 py-3 bg-transparent text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z"
                />
              </svg>
              Play Video
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center md:justify-end md:mr-32">
        <Image
          src={"assets/heroDance.svg"}
          width={550}
          height={500}
          alt="hero"
          className="w-full max-w-xs sm:max-w-md md:max-w-lg"
        />
      </div>
    </div>
  );
}
