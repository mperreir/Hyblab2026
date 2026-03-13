import { useEffect, useState } from 'react';
import ResearcherPage from './pages/ResearcherPage';
import { initLenis, destroyLenis } from './lib/lenis';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    initLenis(({ progress }) => setScrollProgress(progress));
    return destroyLenis;
  }, []);

  return <ResearcherPage scrollProgress={scrollProgress} />;
}
