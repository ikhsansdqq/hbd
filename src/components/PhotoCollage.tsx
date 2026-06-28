import { motion } from 'motion/react';
import { useRef } from 'react';
import './PhotoCollage.css';

const photos = [
  '/photos/3a988dad-6cd9-492d-a02b-50e2f0658846.webp',
  '/photos/4-up.webp',
  '/photos/7F20D04C-1C85-4DC0-B44E-C3CD4D337E0F.webp',
  '/photos/IMG_0786.webp',
  '/photos/IMG_2270.webp',
  '/photos/IMG_2272.webp',
  '/photos/IMG_2273_SnapseedCopy.webp',
  '/photos/IMG_4346.webp',
  '/photos/IMG_6577.webp',
  '/photos/IMG_6672.webp',
  '/photos/IMG_6824.webp'
];

export default function PhotoCollage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pseudo-random but stable rotations between -15 and 15 degrees
  const getRotation = (index: number) => {
    return Math.sin(index * 999) * 15;
  };

  return (
    <div className="photo-collage-container" ref={containerRef}>
      <motion.h2
        className="collage-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Our Photos Together Btw..
      </motion.h2>

      <div className="collage-masonry">
        {photos.map((src, index) => (
          <motion.div
            key={index}
            className="collage-stamp"
            style={{ rotate: getRotation(index) }}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1], // Custom easing for a smooth pop
              delay: (index % 4) * 0.1 // Stagger by column roughly
            }}
            whileHover={{
              scale: 1.05,
              rotate: 0, // Straighten out on hover
              zIndex: 10,
              transition: { duration: 0.2 }
            }}
          >
            <div className="stamp-inner">
              <img src={src} alt={`Memory ${index + 1}`} loading="lazy" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
