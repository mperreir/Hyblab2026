import { useState, useEffect } from 'react';
import Header from '../components/Header';
import TopicTitle from '../components/TopicTitle';
import ExpertQuote from '../components/ExpertQuote';
import ProgressBar from '../components/ProgressBar';
import IcebergScene from '../components/IcebergScene';
import ScrollArrow from '../components/ScrollArrow';

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 4609;

export default function ResearcherPage() {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH);

  useEffect(() => {
    const onResize = () => setScale(window.innerWidth / DESIGN_WIDTH);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <div className="fixed bottom-[33px] left-[33px] pointer-events-none z-50" style={{ zoom: 0.6 }}>
        <ProgressBar level={0.2} />
      </div>

      <div className="fixed bottom-[33px] right-[60px] z-50">
        <ScrollArrow direction="up" scale={0.5} />
      </div>

      <div
        className="relative font-sans"
        style={{
          zoom: scale,
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          background: 'linear-gradient(to bottom, white 0%, white 35%, var(--color-brand-blue) 100%)',
        }}
      >
        <Header />
        <TopicTitle />
        <ExpertQuote />
        <IcebergScene />
      </div>
    </>
  );
}
