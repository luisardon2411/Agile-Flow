import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface ErrorModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const ModalError: React.FC<ErrorModalProps> = ({ isOpen, onClose, message }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          exit={{ opacity: 0}}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
        >
          <div className="fixed inset-0 bg-black/40"></div>
          <motion.div
            className="relative bg-white rounded-lg shadow-lg max-w-sm mx-auto p-5 z-50"
            layout
          >
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 hover:text-gray-900 transition ease-in-out duration-150"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto my-4 h-16 w-16 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-medium text-gray-900 mb-2">Error</h2>
              <p className="text-gray-500">{message}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ModalError;
