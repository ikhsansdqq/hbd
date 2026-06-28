import { useState } from 'react';
import { motion } from "motion/react";
import Letter from './Letter';
import './Envelope.css';

export default function Envelope() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="envelope-wrapper" onClick={() => setIsOpen(!isOpen)}>
      <div className="envelope-container">
        <div className="envelope-back" />

        <motion.div
          className="envelope-letter-wrapper"
          initial={false}
          animate={{
            y: isOpen ? -150 : 0,
            zIndex: isOpen ? 10 : 2
          }}
          transition={{
            y: { duration: 0.6, delay: isOpen ? 0.3 : 0, ease: "easeOut" },
            zIndex: { delay: isOpen ? 0.3 : 0 }
          }}
        >
          <Letter />
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
      <p className="envelope-hint">{isOpen ? "Click to close" : "Click to open"}</p>
    </div>
  );
}
