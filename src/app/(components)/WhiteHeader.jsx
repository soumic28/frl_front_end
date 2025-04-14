"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
function WhiteHeader() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const navLinks = [
  {
    title : "Resources",
    link : "/resources"
  },
  {
    title : "People",
    link : "/people"
  },
  {
    title : "About Us",
    link : "/about-us"
  },
  {
    title : "Feed",
    link : "/feed"
  },
]
  // Change header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  return (
    <motion.header 
      className="w-full z-50 pt-[30px]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div 
        className={`w-full h-full ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left section - Logo */}
            <motion.div 
              className="flex-shrink-0 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <motion.span 
              onClick={()=>{
                router.push("/")
              }}
                className="text-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Image
                src="assets/Bluelogo.svg"
                width={110}
                height={150}
                alt="logo"

                />
              </motion.span>
            </motion.div>

            {/* Middle section - Navigation */}
            <div className="hidden md:flex items-top justify-center flex-1 space-x-8">
              {navLinks.map((item, i) => (
                <motion.a 
                  key={i}
                  href={item.link} 
                  className=" hover:text-[#0477A0] px-3 py-2 relative align-text-top text-[#979797] text-lg font-normal uppercase leading-7 tracking-[3px]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.1 + (i * 0.1), 
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.title}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Right section - Login button */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.button 
                className="flex items-center space-x-1 px-5 py-1.5 rounded-full text-sm font-medium text-[#005877] backdrop-blur-sm  focus:outline-none transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 17 
                }}
              >
                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.931 11.0463C19.931 13.0094 19.3364 14.8336 18.3176 16.3488C16.6093 18.8893 13.7081 20.5609 10.4164 20.5609C7.12476 20.5609 4.22352 18.8893 2.5152 16.3488C1.49638 14.8336 0.901855 13.0094 0.901855 11.0463C0.901855 5.79155 5.16167 1.53174 10.4164 1.53174C15.6712 1.53174 19.931 5.79155 19.931 11.0463Z" stroke="#005877" stroke-width="1.5"/>
<path d="M12.795 7.87487C12.795 9.18856 11.73 10.2535 10.4164 10.2535C9.10267 10.2535 8.03772 9.18856 8.03772 7.87487C8.03772 6.56118 9.10267 5.49623 10.4164 5.49623C11.73 5.49623 12.795 6.56118 12.795 7.87487Z" stroke="#005877" stroke-width="1.5"/>
<path d="M13.5489 14.2179H7.28396C5.39221 14.2179 3.79421 15.4913 3.28052 17.2376C5.00402 19.272 7.56156 20.5609 10.4164 20.5609C13.2713 20.5609 15.8288 19.272 17.5524 17.2376C17.0387 15.4913 15.4407 14.2179 13.5489 14.2179Z" stroke="#005877" stroke-width="1.5"/>
</svg>

                <span>Login</span>
              </motion.button>
            </motion.div>

            {/* Mobile menu button */}
            <motion.div 
              className="md:hidden flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.button 
                type="button" 
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" 
                aria-expanded={isMenuOpen}
                onClick={toggleMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                <svg 
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Icon when menu is open */}
                <svg 
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu, show/hide based on menu state */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['Home', 'About', 'Services', 'Contact'].map((item, i) => (
                <motion.a 
                  key={item}
                  href="#" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default WhiteHeader;
