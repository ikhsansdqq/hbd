import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import PhotoCollage from './components/PhotoCollage';
import Wishes from './components/Wishes';
import LoadingScreen from './components/LoadingScreen';
import PrankScreen from './components/PrankScreen';
import { PHOTO_URLS, VIDEO_URLS } from './constants';

function App() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPrankPassed, setIsPrankPassed] = useState(false);

  useEffect(() => {
    let loaded = 0;
    const total = PHOTO_URLS.length + VIDEO_URLS.length;

    const increment = () => {
      loaded++;
      setProgress(Math.round((loaded / total) * 100));
    };

    // Preload images
    PHOTO_URLS.forEach(url => {
      const img = new Image();
      img.onload = increment;
      img.onerror = increment; // ensure progress continues on error
      img.src = url;
    });

    // Preload videos
    VIDEO_URLS.forEach(url => {
      const vid = document.createElement('video');
      vid.oncanplaythrough = increment;
      vid.onerror = increment;
      vid.src = url;
      vid.load();
    });

    // 15-second safety fallback
    const fallback = setTimeout(() => {
      if (loaded < total) {
        setProgress(100);
      }
    }, 15000);

    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    // Only initialize Lenis smooth scrolling once the loading screen AND prank are gone
    if (isLoading || !isPrankPassed) return;

    const lenis = new Lenis();

    const stop = () => lenis.stop();
    const start = () => lenis.start();

    window.addEventListener('stopScroll', stop);
    window.addEventListener('startScroll', start);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('stopScroll', stop);
      window.removeEventListener('startScroll', start);
      lenis.destroy();
    };
  }, [isLoading, isPrankPassed]);

  return (
    <div className="app-container">
      {isLoading && (
        <LoadingScreen
          progress={progress}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {(!isLoading && !isPrankPassed) && (
        <PrankScreen onComplete={() => setIsPrankPassed(true)} />
      )}

      {/* Hide the main site content until the prank is passed */}
      <div
        style={{
          opacity: (!isLoading && isPrankPassed) ? 1 : 0,
          pointerEvents: (!isLoading && isPrankPassed) ? 'auto' : 'none',
          transition: 'opacity 0.5s ease-in'
        }}
      >
        <Hero />
        <Timeline />
        <PhotoCollage />
        <Wishes />
      </div>
    </div>
  );
}

export default App;
