import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ResearcherPage from './pages/ResearcherPage';
import ParoleExpertHomePage from './pages/ParoleExpertHomePage';
import ScrollToTop from './components/ScrollToTop';
import { initLenis, destroyLenis } from './lib/lenis';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    initLenis(({ progress }) => setScrollProgress(progress));
    return destroyLenis;
  }, []);

  return (
    <>
      <ScrollToTop />
    <Routes>
      <Route path="/" element={<ParoleExpertHomePage />} />
      <Route path="/researcher" element={<ResearcherPage scrollProgress={scrollProgress} />} />
    </Routes>
    </>
  );
}
