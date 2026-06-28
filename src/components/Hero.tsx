import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MusicPlayer from './MusicPlayer';
import { PHOTO_URLS } from '../constants';
import './Hero.css';

interface TrailItem {
  id: number;
  x: number;
  y: number;
  photoUrl: string;
  rotation: number;
}

export default function Hero() {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const [isPlayerFixed, setIsPlayerFixed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });


  useEffect(() => {
    const handleScroll = () => {
      // If the user scrolls past 50% of the viewport height, snap the player to fixed position
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsPlayerFixed(true);
      } else {
        setIsPlayerFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Throttle spawning by distance to fix performance lag
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Only spawn a new photo if the mouse has moved at least 200px
    if (distance < 200 && lastPos.current.x !== 0) return;

    lastPos.current = { x, y };

    const newItem: TrailItem = {
      id: idCounter.current++,
      x,
      y,
      photoUrl: PHOTO_URLS[Math.floor(Math.random() * PHOTO_URLS.length)],
      rotation: Math.random() * 30 - 15 // random rotation between -15 and 15 degrees
    };

    setTrail((prev) => [...prev, newItem]);
  };

  const handleAnimationComplete = (id: number) => {
    setTrail((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      className="hero-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* 3-Column Video Background */}
      <div className="hero-video-grid">
        <div className="video-column">
          <video src="/videos/IMG_5541.MP4" autoPlay loop muted playsInline />
          <div className="video-fallback">Video 1 Placeholder</div>
        </div>
        <div className="video-column">
          <video src="/videos/IMG_5542.MP4" autoPlay loop muted playsInline />
          <div className="video-fallback">Video 2 Placeholder</div>
        </div>
        <div className="video-column">
          <video src="/videos/IMG_5543.MP4" autoPlay loop muted playsInline />
          <div className="video-fallback">Video 3 Placeholder</div>
        </div>
      </div>

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {"Happy Birthday!".split("").map((char, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
              }}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          A beautiful journey together
        </motion.p>

        {/* Render Music Player inside Hero so it can animate between inline and fixed */}
        <MusicPlayer isFixed={isPlayerFixed} />
      </div>

      <AnimatePresence>
        {trail.map((item) => (
          <motion.img
            key={item.id}
            src={item.photoUrl}
            className="trail-element"
            initial={{ opacity: 0, scale: 0.5, left: item.x, top: item.y, rotate: item.rotation }}
            animate={{ opacity: [0, 1, 0], scale: 1, left: item.x, top: item.y + 100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            onAnimationComplete={() => handleAnimationComplete(item.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
