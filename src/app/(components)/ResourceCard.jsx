"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const ResourceCard = ({ resource, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2 * (index + 1),
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-row p-4 lg:p-0 "
    >
      <div className="mb-4 md:mr-5">
        <Image
          src={resource.icon}
          alt={resource.title}
          width={140}
          height={100}
        />
      </div>
      <div className="">
        <h2 className="text-lg sm:text-xl  mb-2 w-40 justify-start text-[#0477A0] lg:text-4xl font-semibold leading-10">
          {resource.title}
        </h2>
        <p className=" text-sm  w-56 justify-start text-neutral-700 lg:text-2xl font-normal ">
          {resource.description}
        </p>
        <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
          <Link
            href={resource.link}
            className=" inline-flex items-center justify-start text-orange-400 text-2xl font-semibold leading-loose"
          >
            MORE
            <svg
              className="ml-2 mt-1"
              width="20"
              height="23"
              viewBox="0 0 29 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.59155 10.0629C0.763125 10.0629 0.0915527 10.7345 0.0915527 11.5629C0.0915528 12.3914 0.763126 13.0629 1.59155 13.0629L1.59155 10.0629ZM28.5242 12.6236C29.1099 12.0378 29.1099 11.0881 28.5242 10.5023L18.9782 0.956324C18.3924 0.370537 17.4427 0.370537 16.8569 0.956324C16.2711 1.54211 16.2711 2.49186 16.8569 3.07764L25.3422 11.5629L16.8569 20.0482C16.2711 20.634 16.2711 21.5837 16.8569 22.1695C17.4427 22.7553 18.3924 22.7553 18.9782 22.1695L28.5242 12.6236ZM1.59155 13.0629L27.4635 13.0629L27.4635 10.0629L1.59155 10.0629L1.59155 13.0629Z"
                fill="#FF8D34"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
