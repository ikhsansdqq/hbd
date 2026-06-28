import { motion } from "motion/react";
import Envelope from './Envelope';
import './Timeline.css';

export default function Timeline() {
  return (
    <div className="timeline-container">
      <motion.h2
        className="timeline-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        Our Journey
      </motion.h2>

      <div className="timeline-wrapper">
        <div className="timeline-line" />

        <motion.div
          className="timeline-item left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <div className="timeline-dot" />
          <div className="timeline-content flat-panel">
            <h3>The First Date</h3>
            <p>Where it all began. A simple coffee that turned into hours of talking.</p>
          </div>
        </motion.div>

        <motion.div
          className="timeline-item right"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <div className="timeline-dot" />
          <div className="timeline-content">
            <Envelope />
          </div>
        </motion.div>

        <motion.div
          className="timeline-item left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <div className="timeline-dot" />
          <div className="timeline-content flat-panel">
            <h3>And Many More...</h3>
            <p>Every day is a new adventure with you. Let's make more memories.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
