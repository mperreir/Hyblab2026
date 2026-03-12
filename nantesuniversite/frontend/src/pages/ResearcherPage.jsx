import { useState, useEffect } from 'react';
import Header       from '../components/Header';
import ExpertQuote  from '../components/ExpertQuote';
import ProgressBar  from '../components/ProgressBar';
import IcebergScene from '../components/IcebergScene';

const DESIGN_WIDTH  = 1920;
const DESIGN_HEIGHT = 4609; // actual Figma frame height (Ecran 1)

export default function ResearcherPage() {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH);

  useEffect(() => {
    const onResize = () => setScale(window.innerWidth / DESIGN_WIDTH);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      {/* Fixed progress bar overlay – centred vertically, always on screen */}
      <div
        className="fixed inset-0 flex items-center pointer-events-none z-50"
        style={{ zoom: scale }}
      >
        <div className="ml-[33px]">
          <ProgressBar level={0.5} />
        </div>
      </div>

      {/* Scrolling design canvas */}
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
        <ExpertQuote />
        <IcebergScene />
      </div>
    </>
  );
}
