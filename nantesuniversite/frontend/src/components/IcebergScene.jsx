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
import jeuSvg from "../data/pictogramme/jeu.svg";
import videoSvg from "../data/pictogramme/video.svg";
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
  biographie:biographieSvg,
  jeu:jeuSvg,
  video:videoSvg
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
  { top: 999, left: 620 }, //  1 Colin de la Higuera
  { top: 1130, left: 380 }, //  2 Open Education Global Awards
  { top: 1080, left: 1180 }, //  3 Le Prix MERLOT
  // ── Widening ──────────────────────────────────
  { top: 1280, left: 340 }, //  4 Faire en sorte que l’IA serve à mieux apprendre
  { top: 1230, left: 1240 }, //  5 Résultats de la recherche pour «La triche… et si l’IA»
  { top: 1450, left: 100 }, //  6  Article Entretien avec Colin de la Higuera, chaire UNESCO
  // ── Widest zone ──
  { top: 1400, left: 1500 }, //  7 Conference L’éducation ouverte : partager et innover grâce aux 
  { top: 1600, left: 80 }, //  8 L’intelligence artificielle, l’école, les enseignant.es. Partie 1
  { top: 1600, left: 1450 }, //  9 L’intelligence artificielle, l’école, les enseignant.es. Partie 2
  { top: 1610, left: 700 }, // 10 LIVRE
  { top: 1430, left:740 }, // 11 JEU
  { top: 1830, left: 1100 }, // 12 Lancement du reseau unitwin UNOE
  // ── Narrowing ─────────────────────────────────
  { top: 1880, left: 300 }, // 13 Comment mettre l’IA au service de l’autonomisation des femmes ?
  { top: 2050, left: 1250 }, // 14 Les IA génératives bousculent l’éducation, quels impacts sur l’évaluation ?
  { top: 2080, left: 350 }, // 15 Ressources éducatives libres pour et par les enseignants -DNE- Salon Educatec / Educatice
  { top: 2290, left: 1000 }, // 16 Peut-on remplacer un enseignant par une machine ?
  { top: 2300, left: 280 }, // 17 L'inteligence artificielle où en sommes nous?
  // ── Lower ─────────────────────────────────────
  { top: 2500, left: 1200 }, // 18 Penser face à l'IA, à quoi bon ? - restitution de la journée
  { top: 2550, left: 500 }, // 19 Les intelligences artificielle génératives bousculent l'éducation, quels impacts sur l'évaluation?
  { top: 2760, left: 845 }, // 20On the complexity of submap isomorphism and maximum common submap problems
  // ── Narrow base ───────────────────────────────
  { top: 2900, left: 500 }, // 21 Topology of strings: Median string is NP-complete
  { top: 3000, left: 999 },//
  { top: 3200, left: 400 }, //
  { top: 3300, left: 1000 }, // 22
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
    // Defer setup by one tick so ScrollToTop has time to reset scroll to 0
    // before GSAP calculates ScrollTrigger positions.
    const id = setTimeout(() => {
      ScrollTrigger.refresh();
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
    }, 100);
    return () => clearTimeout(id);
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
            //pictogramme={PICTOGRAMMES[doc.category.split(" ")[0].toLowerCase()]}
            pictogramme={
  ["conférence", "podcast", "table ronde"].includes(doc.category.toLowerCase())
    ? videoSvg
    : PICTOGRAMMES[doc.category.split(" ")[0].toLowerCase()]
}



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
          //pictogramme={PICTOGRAMMES[selectedDoc.category.toLowerCase()]}
          pictogramme={
  ["conférence", "podcast", "table ronde"].includes(selectedDoc.category.toLowerCase())
    ? videoSvg
    : PICTOGRAMMES[selectedDoc.category.split(" ")[0].toLowerCase()]
}




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
