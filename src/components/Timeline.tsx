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
        Hey! Today's yours anyway!
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
            <p>Our first date was began when we watched Aladdin back in 2019, we had a great time there, and it's just the beginning of our story.</p>
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
            <p>Every day is a new adventure with you.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
