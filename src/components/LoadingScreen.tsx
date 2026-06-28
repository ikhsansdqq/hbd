import { motion, animate, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import './LoadingScreen.css';

interface Props {
  progress: number;
  onComplete: () => void;
}

export default function LoadingScreen({ progress, onComplete }: Props) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  // Interpolate from dark ink (#1d1d1d) to our accent pastel pink
  const color = useTransform(count, [0, 100], ['#1d1d1d', 'var(--accent-color)']);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const controls = animate(count, progress, { duration: 0.8, ease: "easeOut" });
    return controls.stop;
  }, [progress, count]);

  useEffect(() => {
    if (progress >= 100) {
      // Hold briefly at 100% before the curtain pulls up
      const timer = setTimeout(() => {
        setIsFinished(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ y: 0 }}
      animate={{ y: isFinished ? '-100%' : 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} // Smooth "curtain" easing
      onAnimationComplete={() => {
        if (isFinished) {
          onComplete();
        }
      }}
    >
      <div className="loading-content">
        <motion.span style={{ color }} className="loading-number">
          {rounded}
        </motion.span>
        <motion.span style={{ color }} className="loading-percent">
          %
        </motion.span>
      </div>
    </motion.div>
  );
}
