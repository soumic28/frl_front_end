"use client"
import React from 'react';
import { motion } from 'framer-motion';
import WhiteHeader from '../(components)/WhiteHeader';
import ResourceCard from '../(components)/ResourceCard';
import PageTransition from '../(components)/PageTransition';
import { useRouter } from 'next/navigation';

const ResourcesPage = () => {
  const router = useRouter()
  const resources = [
    {
      title: 'Podcasts',
      description: 'about this in 2-3 line lorem ipsum lorem',
      icon: '/assets/podcasts.svg',
      link: '/resources/podcasts'
    },
    {
      title: 'Events',
      description: 'about this in 2-3 line lorem ipsum lorem',
      icon: '/assets/events.svg',
      link: '/resources/events'
    },
    {
      title: 'More . . .',
      description: 'about this in 2-3 line lorem ipsum lorem',
      icon: '/assets/more.svg',
      link: '/resources/more'
    },
    {
      title: 'Blogs',
      description: 'about this in 2-3 line lorem ipsum lorem',
      icon: '/assets/blogs.svg',
      link: '/resources/blogs'
    },
    {
      title: 'Films',
      description: 'about this in 2-3 line lorem ipsum lorem',
      icon: '/assets/films.svg',
      link: '/resources/films'
    },
    {
      title: 'Publications',
      description: 'about this in 2-3 line lorem ipsum lorem',
      icon: '/assets/publications.svg',
      link: '/resources/publications'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <WhiteHeader />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-6 py-8 lg:py-12"
        >
          {/* Life Balance Wheel Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-[#696983] rounded-[20px] p-6 lg:pt-[60px] lg:pl-[76px] lg:h-80 mb-8 lg:mb-16"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-5xl text-white font-light lg:font-semibold lg:leading-[62.40px] mb-4 lg:mb-[77px] lg:w-[724.19px]">
              Explore our Life Balance Wheel
            </h1>
            <motion.button
            onClick={()=>{
              router.push('life-balance')
            }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 sm:px-6 lg:px-7 py-2 lg:py-3 bg-white rounded-full text-sm font-medium lg:h-12 text-gray-700 sm:text-lg sm:font-semibold leading-tight"
            >
              Explore
              <svg className="ml-2 w-4 h-4 lg:w-[19px] lg:h-[15px]" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.41626 6.51514C0.863975 6.51514 0.41626 6.96285 0.41626 7.51514C0.41626 8.06742 0.863975 8.51514 1.41626 8.51514V6.51514ZM18.1234 8.22224C18.5139 7.83172 18.5139 7.19855 18.1234 6.80803L11.7594 0.444069C11.3689 0.0535445 10.7357 0.0535445 10.3452 0.444069C9.95467 0.834593 9.95467 1.46776 10.3452 1.85828L16.002 7.51514L10.3452 13.172C9.95467 13.5625 9.95467 14.1957 10.3452 14.5862C10.7357 14.9767 11.3689 14.9767 11.7594 14.5862L18.1234 8.22224ZM1.41626 8.51514H17.4163V6.51514H1.41626V8.51514Z" fill="#3B3A4D"/>
              </svg>
            </motion.button>
          </motion.div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {resources.map((resource, index) => (
              <ResourceCard 
                key={resource.title}
                resource={resource}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default ResourcesPage; 