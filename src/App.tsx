import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import PhotoCollage from './components/PhotoCollage';
import Wishes from './components/Wishes';
import LoadingScreen from './components/LoadingScreen';
import { PHOTO_URLS, VIDEO_URLS } from './constants';

function App() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
    // Only initialize Lenis smooth scrolling once the loading screen is fully gone
    // This prevents the user from scrolling the timeline while videos are still loading.
    if (isLoading) return;

    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <div className="app-container">
      {isLoading && (
        <LoadingScreen
          progress={progress}
          onComplete={() => setIsLoading(false)}
        />
      )}

      <Hero />
      <Timeline />
      <PhotoCollage />
      <Wishes />
    </div>
  );
}

export default App;
