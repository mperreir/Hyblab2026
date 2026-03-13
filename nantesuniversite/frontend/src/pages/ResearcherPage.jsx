import { useState, useEffect } from 'react';
import Header from '../components/Header';
import TopicTitle from '../components/TopicTitle';
import ExpertQuote from '../components/ExpertQuote';
import ProgressBar from '../components/ProgressBar';
import IcebergScene from '../components/IcebergScene';
import ScrollArrow from '../components/ScrollArrow';
import ResearcherFooter from "../components/ResearcherFooter";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 6000;

export default function ResearcherPage() {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH);

  useEffect(() => {
    const onResize = () => setScale(window.innerWidth / DESIGN_WIDTH);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // state (isPopup)

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
        }}
      >
        <div className="absolute inset-x-0 top-0 h-[1750px]" style={{ background: 'linear-gradient(to bottom, white 0%, #fffbf5 44.231%, #feebc6 100%)' }} />
        <div className="absolute inset-x-0 top-[1750px] bottom-0 bg-gradient-to-b from-[rgba(196,204,255,0.38)] to-[#0e25ae]" />
        <Header />
        <TopicTitle />
        <ExpertQuote />
        <IcebergScene />
        <ResearcherFooter />
      </div>
    </>
  );
}
