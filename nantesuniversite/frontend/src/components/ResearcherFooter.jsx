import LinkedResearcherCard from './LinkedResearcherCard';
import portraitPhilippeMoreau from '../assets/Philippe-Moreau.png';
import portraitMargotDelon from '../assets/MargotDelon.jpg';
import portraitPierreAntoineGourraud from '../assets/PierreAntoineGourraud.jpg';

// Placeholder portrait used for "CHERCHEURS À LA UNE" cards (Figma node 77:6/15/18)
const placeholderPortrait =
  'https://www.figma.com/api/mcp/asset/c99f5c46-a420-4e25-ae16-044c79976af9';

/**
 * Placeholder researcher entries for the "CHERCHEURS À LA UNE" section.
 * Replace with real data once the multi-researcher API is available.
 */

const LINKED_RESEARCHERS = [
  {
    top: 4835,
    name: "Philippe Moreau",
    role: "Classé parmi les chercheurs les plus cités au monde, il transforme la lutte contre le myélome multiple grâce à l'excellence clinique nantaise.",
    url: "https://www.chu-nantes.fr/nantes-philippe-moreau-parmi-les-chercheurs-les-plus-cites-du-monde-1",
    portrait: portraitPhilippeMoreau
  },

  {
    top: 4967,
    name: 'Margot Delon',
    role: "Sociologue au CNRS, elle explore « l'autre histoire des inégalités urbaines » à travers le parcours des enfants des bidonvilles.",
    url: 'https://bu.univ-nantes.fr/animations-culturelles/chercheurs-a-la-bu-lettres',
    portrait: portraitMargotDelon,
  },
  {
    top: 5099,
    name: 'Pierre-Antoine Gourraud',
    role: "« L'utilisation de nos données médicales pourrait permettre aux médecins de nous guérir plus efficacement et de prévenir l'apparition de maladies. »",
    url: 'https://fondation.univ-nantes.fr/accueil/big-data-en-sante-a-nantes-les-chercheurs-utilisent-nos-donnees-pour-proposer-un-meilleur-traitement-aux-patients',
    portrait: portraitPierreAntoineGourraud,
  },
];

/**
 * Footer section at the bottom of the researcher page.
 *
 * Left column  : large "AU-DELÀ DE L'ICEBERG" / "OU" / "DANS LA MÊME THÉMATIQUE"
 * Right column : "CHERCHEURS À LA UNE" heading + 3 LinkedResearcherCards
 *
 * Typography:
 *  - Poppins ExtraBold  (Google Font, added in index.css)
 *  - Massilia Bold/Light (brand font — add @font-face in index.css when available;
 *                         falls back to Inter)
 */
export default function ResearcherFooter() {
  return (
    <>
      {/* ── Right column: "CHERCHEURS À LA UNE" ──────────────────────────── */}

      <p
        className="absolute not-italic m-0 text-[#f9f9f9] text-[36px] leading-normal"
        style={{
          left: '1050px',
          top: '4760px',
          fontFamily: "'Massilia', Inter, sans-serif",
          fontWeight: 700,
        }}
      >
        CHERCHEURS À LA UNE
      </p>

      {LINKED_RESEARCHERS.map((researcher, i) => (
        <LinkedResearcherCard key={i} {...researcher} />
      ))}

      {/* ── Left column: large title block ───────────────────────────────── */}

      {/* "AU-DELÀ DE L'ICEBERG" */}
      <p
        className="absolute not-italic m-0 text-white whitespace-pre-wrap"
        style={{
          left: '176px',
          top: '4900px',
          width: '780px',
          fontSize: '128px',
          lineHeight: '1',
          fontFamily: "'Poppins', Inter, sans-serif",
          fontWeight: 800,
          textShadow: '0px 4px 4px rgba(0,0,0,0.25)',
        }}
      >
        {`DANS LA MEME THEMATIQUE`}
      </p>

      {/* "OU" separator 
      <p
        className="absolute not-italic m-0 text-white"
        style={{
          left: '431px',
          top: '5041px',
          height: '35px',
          fontSize: '48px',
          lineHeight: '50px',
          fontFamily: "'Poppins', Inter, sans-serif",
          fontWeight: 800,
          textShadow: '0px 4px 4px rgba(0,0,0,0.25)',
        }}
      >
        OU
      </p>

       "DANS LA MÊME THÉMATIQUE" *
      <p
        className="absolute not-italic m-0 text-white"
        style={{
          left: '176px',
          top: '5130px',
          width: '978px',
          height: '435px',
          fontSize: '110px',
          lineHeight: '140px',
          fontFamily: "'Poppins', Inter, sans-serif",
          fontWeight: 800,
          textShadow: '0px 4px 4px rgba(0,0,0,0.25)',
        }}
      >
        DANS LA MÊME THÉMATIQUE
      </p>*/}
    </>
  );
}
