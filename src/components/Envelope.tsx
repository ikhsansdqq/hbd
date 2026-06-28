import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from "motion/react";
import Letter from './Letter';
import './Envelope.css';

export default function Envelope() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new Event('stopScroll'));
    } else {
      window.dispatchEvent(new Event('startScroll'));
    }

    return () => {
      window.dispatchEvent(new Event('startScroll'));
    };
  }, [isOpen]);

  return (
    <div className="envelope-wrapper" onClick={() => setIsOpen(!isOpen)}>
      <div className="envelope-container">
        <div className="envelope-back" />

        <motion.div
          className="envelope-letter-wrapper"
          initial={false}
          animate={{
            y: isOpen ? -50 : 0,
            zIndex: 2
          }}
          transition={{
            y: { duration: 0.6, ease: "easeOut" }
          }}
        >
          {/* We'll leave a small dummy element or a folded paper look inside the envelope just so it's not empty, 
              but the actual letter renders as a modal! */}
          <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--envelope-inside)', border: '2px solid var(--text-primary)' }} />
        </motion.div>

        <div className="envelope-front" />

        <motion.div
          className="envelope-flap"
          initial={false}
          animate={{
            rotateX: isOpen ? 180 : 0,
            zIndex: isOpen ? 1 : 4
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            zIndex: { delay: isOpen ? 0.25 : 0.25 }
          }}
          style={{ transformOrigin: "top center" }}
        />
      </div>
      <p className="envelope-hint">Click to open your ticket</p>

      {/* Fullscreen Boarding Pass Modal */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="boarding-pass-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)} // Clicking outside closes it
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()} // Prevent clicking the ticket from closing it
                style={{ width: '100%', maxWidth: '900px', margin: 'auto' }}
              >
                <Letter onClose={() => setIsOpen(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
