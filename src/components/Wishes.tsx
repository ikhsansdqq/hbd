import { motion } from "motion/react";
import { useState } from 'react';
import './Wishes.css';

export default function Wishes() {
  const [wish, setWish] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wish.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="wishes-container">
      <motion.div
        className="wishes-content pinned-letter"
        initial={{ opacity: 0, y: 50, scale: 0.95, rotate: 0 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: -2 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="pushpin"></div>
        <motion.h2
          className="brush-text"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2.5, ease: "linear" }}
        >
          Happy Birthday to my beloved people, wish you all the best
        </motion.h2>
        <p>Leave a message to celebrate this special day.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="wishes-form">
            <textarea
              className="wishes-textarea flat-border"
              placeholder="Write your wishes here..."
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              rows={5}
            />
            <button type="submit" className="wishes-submit flat-border">
              Send Wishes
            </button>
          </form>
        ) : (
          <motion.div
            className="wishes-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3>Thank you! ❤️</h3>
            <p>Your beautiful wishes have been recorded.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
