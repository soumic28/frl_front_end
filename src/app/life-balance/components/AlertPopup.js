import { motion, AnimatePresence } from 'framer-motion';

const AlertPopup = ({ isVisible, message, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <motion.div
            className="fixed inset-0 bg-black/50" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg relative z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="text-center">
              <div className="mx-auto mb-4 flex justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 10V16" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 22C16.5523 22 17 21.5523 17 21C17 20.4477 16.5523 20 16 20C15.4477 20 15 20.4477 15 21C15 21.5523 15.4477 22 16 22Z" fill="#E74C3C"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Please Rate Your Satisfaction</h3>
              <p className="text-sm text-gray-500 mb-4">{message}</p>
              <motion.button
                className="bg-[#19667A] text-white px-6 py-2 rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                OK
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AlertPopup; 