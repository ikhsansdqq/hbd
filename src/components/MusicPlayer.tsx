import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import './MusicPlayer.css';

function formatTime(seconds: number) {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function MusicPlayer({ isFixed = true }: { isFixed?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Attempt autoplay immediately
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked by browser. Add global event listener to play on first interaction.
        const playOnInteract = () => {
          if (audioRef.current) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
          }
          document.removeEventListener('click', playOnInteract);
          document.removeEventListener('touchstart', playOnInteract);
        };
        document.addEventListener('click', playOnInteract);
        document.addEventListener('touchstart', playOnInteract);

        return () => {
          document.removeEventListener('click', playOnInteract);
          document.removeEventListener('touchstart', playOnInteract);
        };
      });
    }
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => { });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <motion.div
      layout
      className={`music-player-container flat-panel ${isFixed ? 'fixed' : 'inline'}`}
    >
      <audio
        ref={audioRef}
        src="/music/a-thousand-years.mp3"
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="music-player-controls">
        <button
          className="music-play-btn"
          onClick={togglePlay}
          aria-label="Toggle music"
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>

        <div className="music-progress-wrapper">
          <span className="music-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="music-scrubber"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
          />
          <span className="music-time">{formatTime(duration)}</span>
        </div>
      </div>
    </motion.div>
  );
}
