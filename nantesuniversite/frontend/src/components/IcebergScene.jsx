import { useMemo, useRef, useState } from 'react';
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
  video:videoSvg,
  publication:rechercheSvg
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
  { top: 999,  left: 620  }, //  1 Colin de la Higuera
  { top: 1130, left: 410  }, //  2 Open Education Global Awards
  { top: 1130, left: 900  }, //  3 Le Prix MERLOT               [was 1180 – outside right]
  // ── Widening ──────────────────────────────────
  { top: 1280, left: 320  }, //  4 Faire en sorte que l’IA serve à mieux apprendre
  { top: 1280, left: 1040 }, //  5 Résultats de la recherche pour «La triche… et si l’IA»  [was 1240 – outside right]
  { top: 1450, left: 190  }, //  6 Article Entretien avec Colin de la Higuera, chaire UNESCO  [was 100 – outside left]
  // ── Widest zone ──
  { top: 1430, left: 1200 }, //  7 Conférence L’éducation ouverte : partager et innover grâce aux  [was 1500 – outside right]
  { top: 1600, left: 165  }, //  8 L’intelligence artificielle, l’école, les enseignant.es. Partie 1  [was 80 – outside left]
  { top: 1600, left: 1290 }, //  9 L’intelligence artificielle, l’école, les enseignant.es. Partie 2  [was 1450 – outside right]
  { top: 1615, left: 720  }, // 10 LIVRE
  { top: 1440, left: 745  }, // 11 JEU
  { top: 1830, left: 1080 }, // 12 Lancement du reseau unitwin UNOE
  // ── Narrowing ─────────────────────────────────
  { top: 1880, left: 295  }, // 13 Comment mettre l’IA au service de l’autonomisation des femmes ?
  { top: 2050, left: 1190 }, // 14 Les IA génératives bousculent l’éducation, quels impacts sur l’évaluation ?  [was 1250 – outside right]
  { top: 2080, left: 330  }, // 15 Ressources éducatives libres pour et par les enseignants -DNE- Salon Educatec / Educatice
  { top: 2290, left: 990  }, // 16 Peut-on remplacer un enseignant par une machine ?
  { top: 2310, left: 285  }, // 17 L’inteligence artificielle où en sommes nous?
  // ── Lower ─────────────────────────────────────
  { top: 2510, left: 1055 }, // 18 Penser face à l’IA, à quoi bon ? - restitution de la journée  [was 1200 – outside right]
  { top: 2555, left: 475  }, // 19 Les intelligences artificielle génératives bousculent l’éducation, quels impacts sur l’évaluation?
  { top: 2760, left: 773  }, // 20 On the complexity of submap isomorphism and maximum common submap problems
  // ── Narrow base ─ only 2 cards; iceberg too narrow for more ───────────────
  { top: 2930, left: 545  }, // 21 Topology of strings: Median string is NP-complete
  { top: 3100, left: 820  }, // 22 — right-side card at the deepest visible point
  { top: 2930, left: 1050}
  // cards 23 & 24 removed: iceberg is too narrow at y=3200-3300 to avoid overlap
];
// ───────────────────────────────────────────────────────────────────────────
// ───────────────────────────────────────────────────────────────────────────

const cardDocuments = data.researcher.documents;
const NATURE_ORDER = ["general", "journalistique", "expert"];
const RESOURCE_PROMPTS_BY_CATEGORY = {
  article: "Et si on plongeait dans un article ?",
  biographie: "Et si on faisait connaissance avec cette biographie ?",
  conference: "On descend d'un niveau avec une conference ?",
  livre: "Un livre pour aller plus en profondeur, ca vous tente ?",
  podcast: "Et si on se laissait porter par un podcast ?",
  prix: "Un prix a explorer, ca vous dit ?",
  recherche: "On part explorer une recherche un peu plus en profondeur ?",
};

function normalizeNature(value) {
  return value?.toLowerCase() ?? '';
}

const levelRanges = NATURE_ORDER.reduce((ranges, nature) => {
  const tops = cardDocuments
    .map((doc, index) => ({
      nature: normalizeNature(doc.nature),
      top: CARD_POSITIONS[index]?.top,
    }))
    .filter((entry) => entry.nature === nature && entry.top != null)
    .map((entry) => entry.top);

  if (tops.length === 0) {
    return ranges;
  }

  const start = Math.min(...tops);
  const end = Math.max(...tops);

  ranges[nature] = {
    start,
    end,
    center: Math.round((start + end) / 2),
  };

  return ranges;
}, {});

export default function IcebergScene() {
  const containerRef = useRef(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [resourceInteractionTick, setResourceInteractionTick] = useState(0);

  const resourcePromptByLevel = useMemo(() => {
    const categoriesByLevel = NATURE_ORDER.reduce((accumulator, nature) => {
      accumulator[nature] = [];
      return accumulator;
    }, {});

    cardDocuments.forEach((doc) => {
      const nature = normalizeNature(doc.nature);
      if (!categoriesByLevel[nature]) {
        return;
      }

      const category = doc.category.toLowerCase();
      if (!categoriesByLevel[nature].includes(category)) {
        categoriesByLevel[nature].push(category);
      }
    });

    return Object.fromEntries(
      Object.entries(categoriesByLevel).map(([nature, categories]) => {
        const firstCategory = categories[0];
        if (!firstCategory) {
          return [nature, null];
        }

        return [nature, RESOURCE_PROMPTS_BY_CATEGORY[firstCategory] ?? "On explore cette piste ?"];
      }),
    );
  }, []);

  const registerResourceInteraction = () => {
    setResourceInteractionTick((current) => current + 1);
  };

  const handleCardClick = (doc) => {
    registerResourceInteraction();
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
      <div ref={containerRef} className="relative z-20">
        <div className="absolute left-[45px] top-[775px] w-[1832px] h-[3200px]">
          <DataIceberg className="w-full h-full" />
        </div>

        {cardDocuments.map((doc, i) => {
          if (!CARD_POSITIONS[i]) return null;
          return <ResourceCard
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
            onClick={doc.url || doc.type === "biographie" ? () => handleCardClick(doc) : undefined}
          />;
        })}
      </div>

      <Robot
        levelRanges={levelRanges}
        resourcePromptByLevel={resourcePromptByLevel}
        resourceInteractionTick={resourceInteractionTick}
        pauseResourcePrompt={openPopup}
      />

      {openPopup && selectedDoc ? (
        <div className="relative z-30">
          <Popup
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
        </div>
      ) : (
        ""
      )}
    </>
  );
}
