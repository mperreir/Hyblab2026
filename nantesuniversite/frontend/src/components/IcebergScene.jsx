import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ResourceCard from './ResourceCard';
import DataIceberg from './DataIceberg';
import data from '../data/data.json';

gsap.registerPlugin(ScrollTrigger);

import prixSvg from '../data/pictogramme/prix.svg';
import articleSvg from '../data/pictogramme/article.svg';
import conferenceSvg from '../data/pictogramme/conference.svg';
import livreSvg from '../data/pictogramme/livre.svg';
import podcastSvg from '../data/pictogramme/podcast.svg';
import rechercheSvg from '../data/pictogramme/recherche.svg';

const PICTOGRAMMES = {
  prix: prixSvg, article: articleSvg, conference: conferenceSvg,
  livre: livreSvg, podcast: podcastSvg, recherche: rechercheSvg,
};

// ─── Adjust card positions here ────────────────────────────────────────────
// Iceberg SVG 0 0 1890 3374, rendered at left=45 top=775 w=1832 h=3200.
// Shape is NARROW at top & bottom, WIDEST around y=1700–1900.
// Card width = 400px. Pictogram overflows 50px to the left.
//
// Usable left range at each depth (pictogram + card must stay inside):
//   y=1100 → [450 –  920]     y=2100 → [215 – 1210]
//   y=1300 → [310 – 1080]     y=2300 → [280 – 1170]
//   y=1500 → [180 – 1250]     y=2500 → [415 – 1090]
//   y=1700 → [150 – 1370] ←wide  y=2700 → [465 – 1080]
//   y=1900 → [150 – 1290] ←wide  y=2900 → [545 – 1030]
//                               y=3100 → [635 –  870]
//                               y=3300 → [670 –  810]
//
const CARD_POSITIONS = [
  // ── Narrow top ────────────────────────────────
  { top: 1130, left: 680 }, //  1
  { top: 1290, left: 430 }, //  2
  { top: 1400, left: 960 }, //  3
  // ── Widening ──────────────────────────────────
  { top: 1490, left: 210 }, //  4
  { top: 1550, left: 1220 }, //  5
  { top: 1650, left: 590 }, //  6
  // ── Widest zone ──
  { top: 1730, left: 1240 }, //  7
  { top: 1820, left: 155 }, //  8
  { top: 1880, left: 660 }, //  9 
  { top: 2000, left: 1200 }, // 10
  { top: 2070, left: 190 }, // 11
  { top: 2170, left: 1060 }, // 12
  // ── Narrowing ─────────────────────────────────
  { top: 2300, left: 370 }, // 13
  { top: 2440, left: 995 }, // 14
  { top: 2550, left: 465 }, // 15
  { top: 2660, left: 945 }, // 16
  { top: 2760, left: 530 }, // 17
  // ── Lower ─────────────────────────────────────
  { top: 2870, left: 900 }, // 18
  { top: 2970, left: 565 }, // 19
  { top: 3065, left: 840 }, // 20
  // ── Narrow base ───────────────────────────────
  { top: 3185, left: 635 }, // 21
  { top: 3370, left: 720 }, // 22
];
// ───────────────────────────────────────────────────────────────────────────
// ───────────────────────────────────────────────────────────────────────────

const cardDocuments = data.researcher.documents;


export default function IcebergScene() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.class-resource-card');
    cards.forEach((card, i) => {
      // Cards on the left half of the iceberg slide in from the left; right half from the right
      const pos = CARD_POSITIONS[i];
      const fromX = pos && pos.left < 750 ? -35 : 35;

      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 92%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: fromX,
        y: 20,
        scale: 0.96,
        duration: 0.5,
        ease: 'power3.out',
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <div className="absolute left-[45px] top-[775px] w-[1832px] h-[3200px]">
        <DataIceberg className="w-full h-full" />
      </div>



      {cardDocuments.map((doc, i) => (
        <ResourceCard
          key={doc.id}
          pictogramme={PICTOGRAMMES[doc.category]}
          category={doc.category}
          title={doc.title}
          description={doc.description}
          {...CARD_POSITIONS[i]}
        />
      ))}
    </div>
  );
}
