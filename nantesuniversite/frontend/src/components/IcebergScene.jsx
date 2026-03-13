import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ResourceCard from './ResourceCard';
import DataIceberg from './DataIceberg';
import data from '../data/data.json';

import prixSvg from "../data/pictogramme/prix.svg";
import articleSvg from "../data/pictogramme/article.svg";
import conferenceSvg from "../data/pictogramme/conference.svg";
import livreSvg from "../data/pictogramme/livre.svg";
import podcastSvg from "../data/pictogramme/podcast.svg";
import rechercheSvg from "../data/pictogramme/recherche.svg";
import biographieSvg from "../data/pictogramme/biographie.svg";
import Popup from "./Popup";
import Robot from "./Robot";

gsap.registerPlugin(ScrollTrigger);
const PICTOGRAMMES = {
  prix: prixSvg,
  article: articleSvg,
  conference: conferenceSvg,
  livre: livreSvg,
  podcast: podcastSvg,
  recherche: rechercheSvg,
  biographie:biographieSvg
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
  { top: 999, left: 620 }, //  1
  { top: 1130, left: 380 }, //  2
  { top: 1170, left: 1180 }, //  3
  // ── Widening ──────────────────────────────────
  { top: 1290, left: 420 }, //  4
  { top: 1320, left: 1240 }, //  5
  { top: 1470, left: 250 }, //  6
  // ── Widest zone ──
  { top: 1500, left: 1100 }, //  7
  { top: 1650, left: 390 }, //  8
  { top: 1670, left: 1200 }, //  9 
  { top: 1890, left: 910 }, // 10
  { top: 1850, left: 100 }, // 11
  { top: 2080, left: 1100 }, // 12
  // ── Narrowing ─────────────────────────────────
  { top: 2040, left: 300 }, // 13
  { top: 2300, left: 1250 }, // 14
  { top: 2270, left: 350 }, // 15
  { top: 2490, left: 1000 }, // 16
  { top: 2450, left: 280 }, // 17
  // ── Lower ─────────────────────────────────────
  { top: 2700, left: 1200 }, // 18
  { top: 2670, left: 500 }, // 19
  { top: 2880, left: 845 }, // 20
  // ── Narrow base ───────────────────────────────
  { top: 3050, left: 500 }, // 21
  { top: 3200, left: 999 },
  { top: 3400, left: 800 },  // 22
];
// ───────────────────────────────────────────────────────────────────────────
// ───────────────────────────────────────────────────────────────────────────

const cardDocuments = data.researcher.documents;


export default function IcebergScene() {
  const containerRef = useRef(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const handleCardClick = (doc) => {
    setSelectedDoc(doc);
    setOpenPopup(true);
  };


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
    <>
      <div ref={containerRef}>
        <div className="absolute left-[45px] top-[775px] w-[1832px] h-[3200px]">
          <DataIceberg className="w-full h-full" />
        </div>



        {cardDocuments.map((doc, i) => (
          <ResourceCard
            key={doc.id}
            pictogramme={PICTOGRAMMES[doc.category.split(" ")[0].toLowerCase()]}
            category={doc.category.toLowerCase()}
            title={doc.title}
            description={doc.description}
            {...CARD_POSITIONS[i]}
            onClick={() => handleCardClick(doc)}
          />
        ))}
      </div>

      <Robot />

      {openPopup && selectedDoc ? (
        <Popup
          pictogramme={PICTOGRAMMES[selectedDoc.category.toLowerCase()]}
          type={selectedDoc.type}
          url={selectedDoc.url}
          title={selectedDoc.title}
          onClick={() => setOpenPopup(false)}
        />
      ) : (
        ""
      )}
    </>
  );
}
