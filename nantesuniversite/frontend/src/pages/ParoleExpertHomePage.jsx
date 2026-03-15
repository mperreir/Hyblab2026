import { useEffect, useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturedQuotesSection from '../components/FeaturedQuotesSection';
import ResearcherGallery from '../components/ResearcherGallery';
import ExpertCard from '../components/ExpertCard';
import imgBande from '../assets/bande.svg';

/* ---------- Expert card portrait assets ---------- */
const imgSandrine =
  'https://www.figma.com/api/mcp/asset/865e7534-2021-4d79-bd07-44c2a5db616f';
const imgSophie =
  'https://www.figma.com/api/mcp/asset/3752d59c-d55a-4458-89e3-ad7d24aa0e16';
const imgColin =
  'https://www.figma.com/api/mcp/asset/e7ab9536-1ef9-4685-b237-00f9b347dcc5';

const colin_researcher = './images/chercheur1.svg'
/* ---------- Expert data ---------- */
const EXPERTS = [
  {
    portrait: imgSandrine,
    name: 'Sandrine Huclier',
    role: 'Professeur des Université.',
    joined: 'Joined December 2021',
    featured: true,
    left: 128,
    width: 497,
    height: 278,
  },
  {
    portrait: imgSophie,
    name: 'Sophie Limou',
    role: 'Chercheuse à Nantes Université, spécialiste en génétique',
    joined: 'Joined December 2021',
    featured: false,
    left: 718,
    width: 498,
    height: 334,
  },
  {
    portrait: imgColin,
    name: 'Colin de la Higuera',
    role: 'Professeur des Université.',
    joined: 'Joined December 2021',
    featured: false,
    left: 1309,
    width: 497,
    height: 278,
  },
];

const DESIGN_WIDTH  = 1920;
const DESIGN_HEIGHT = 3200;
const CARDS_TOP     = 2758;

export default function ParoleExpertHomePage() {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH);

  useEffect(() => {
    const onResize = () => setScale(window.innerWidth / DESIGN_WIDTH);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div
      className="relative bg-white font-sans"
      style={{
        zoom: scale,
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
      }}
    >
      {/* ── Shared header ── */}
      <Header />

      {/* ── Hero: title + coloured shapes + wave ── */}
      <HeroSection />

      {/* ── Featured quotes + researcher images ── */}
      <FeaturedQuotesSection />
      <div
        className="absolute"
        style={{ left: -450, top: 2200, width: 2687, height: 543 }}
      >
        <img alt="" src={imgBande} className="block w-full h-full" />
      </div>
      <div
        className="absolute"
        style={{ left: 40, top: 2700}}
      >
        <p className='class-all-researchers-title'>Découvrir nos chercheurs dans différents domaines </p>
      </div>
      <div
        className="absolute class-all-researchers"
        style={{ left: 40, top: 2800}}
      >
        <img alt="" src={colin_researcher} className="block w-full h-full" />
        <img alt="" src={colin_researcher} className="block w-full h-full" />
        <img alt="" src={colin_researcher} className="block w-full h-full" />
        <img alt="" src={colin_researcher} className="block w-full h-full" />
      </div>


      {/* ── "Fiers de nos chercheuses" gallery ── */}
      {/* <ResearcherGallery /> */}

      {/* ── Expert profile cards ── */}
      {/* {EXPERTS.map((expert) => (
        <ExpertCard
          key={expert.name}
          portrait={expert.portrait}
          name={expert.name}
          role={expert.role}
          joined={expert.joined}
          featured={expert.featured}
          style={{
            position: 'absolute',
            left: expert.left,
            top: CARDS_TOP,
            width: expert.width,
          }}
        />
      ))} */}
    </div>
  );
}
