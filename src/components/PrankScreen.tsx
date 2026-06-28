import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import './PrankScreen.css';

interface Props {
  onComplete: () => void;
}

export default function PrankScreen({ onComplete }: Props) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoHover = () => {
    if (!containerRef.current) return;

    // Calculate random position within the container bounds
    const container = containerRef.current.getBoundingClientRect();

    // We want the button to stay within a reasonable radius, but move unpredictably
    const maxMoveX = Math.min(container.width * 0.4, 200);
    const maxMoveY = Math.min(container.height * 0.4, 200);

    const randomX = (Math.random() - 0.5) * 2 * maxMoveX;
    const randomY = (Math.random() - 0.5) * 2 * maxMoveY;

    setNoPosition({ x: randomX, y: randomY });
  };

  return (
    <motion.div
      className="prank-screen-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      ref={containerRef}
    >
      <div className="prank-content">
        <h2>Are you the birthday girl?</h2>

        <div className="prank-buttons">
          <button className="prank-btn yes-btn" onClick={onComplete}>
            Yes
          </button>

          <motion.button
            className="prank-btn no-btn"
            onHoverStart={handleNoHover}
            onTouchStart={handleNoHover} // For mobile users trying to tap
            animate={{ x: noPosition.x, y: noPosition.y }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            No
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
