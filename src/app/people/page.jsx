"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import WhiteHeader from "../(components)/WhiteHeader";
import PageTransition from "../(components)/PageTransition";
import Image from "next/image";

const PeoplePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("People");

  // Sample people data based on the image
  const peopleData = [
    {
      id: 1,
      name: "Satrajit Sanyal",
      location: "Agra, In",
      image: "/assets/person1.jpg", // You'll need to add actual images
      values: ["Humility", "Wisdom", "Honesty"],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus."
    },
    {
      id: 2,
      name: "Ajay Nayak",
      location: "Agra, In",
      image: "/assets/person2.jpg",
      values: ["Love", "Respect", "Compassion"],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus."
    },
    {
      id: 3,
      name: "Pinaki Roy",
      location: "Agra, In",
      image: "/assets/person3.jpg",
      values: ["Equality", "Dignity", "Harmony", "Compassion"],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus."
    }
  ];

  const filteredPeople = peopleData.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.values.some(value => value.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <WhiteHeader />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-[#2C5F5F] text-white px-6 py-3 rounded-lg font-medium min-w-[120px] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2C5F5F]/50"
              >
                <option value="People">People</option>
                <option value="All">All</option>
              </select>
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search for Something"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C5F5F]/50 focus:border-[#2C5F5F]"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* People Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPeople.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Profile Image */}
                <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300">
                  {/* Placeholder for actual image */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                  {/* Name */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {person.name}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{person.location}</span>
                  </div>

                  {/* Values Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {person.values.map((value, valueIndex) => (
                      <span
                        key={valueIndex}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200"
                      >
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        {value}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {person.description}
                  </p>

                  {/* Know More Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#8B7355] hover:bg-[#7A6348] text-white font-medium py-3 px-6 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    Know More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredPeople.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-500 text-lg">No people found matching your search.</div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default PeoplePage; 