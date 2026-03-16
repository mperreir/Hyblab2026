import LinkedResearcherCard from './LinkedResearcherCard';
import SiteFooter from './SiteFooter';
import portraitPhilippeMoreau from '../assets/Philippe-Moreau.png';
import portraitMargotDelon from '../assets/MargotDelon.jpg';
import portraitPierreAntoineGourraud from '../assets/PierreAntoineGourraud.jpg';

const BASE_TOP = 4360;

const LINKED_RESEARCHERS = [
  {
    top: 4435,
    name: "Philippe Moreau",
    role: "Classé parmi les chercheurs les plus cités au monde, il transforme la lutte contre le myélome multiple grâce à l'excellence clinique nantaise.",
    url: "https://www.chu-nantes.fr/nantes-philippe-moreau-parmi-les-chercheurs-les-plus-cites-du-monde-1",
    portrait: portraitPhilippeMoreau,
  },
  {
    top: 4435 + 146,
    name: 'Margot Delon',
    role: "Sociologue au CNRS, elle explore « l'autre histoire des inégalités urbaines » à travers le parcours des enfants des bidonvilles.",
    url: 'https://bu.univ-nantes.fr/animations-culturelles/chercheurs-a-la-bu-lettres',
    portrait: portraitMargotDelon,
  },
  {
    top: 4435 + 146 * 2,
    name: 'Pierre-Antoine Gourraud',
    role: "« L'utilisation de nos données médicales pourrait permettre aux médecins de nous guérir plus efficacement et de prévenir l'apparition de maladies. »",
    url: 'https://fondation.univ-nantes.fr/accueil/big-data-en-sante-a-nantes-les-chercheurs-utilisent-nos-donnees-pour-proposer-un-meilleur-traitement-aux-patients',
    portrait: portraitPierreAntoineGourraud,
  },
];

export default function ResearcherFooter({ offset = 0 }) {
  return (
    <div className="relative z-20">
      {/* ── Right column: "CHERCHEURS À LA UNE" ──────────────────────────── */}
      <p
        className="absolute not-italic m-0 text-[#f9f9f9] text-[36px] leading-normal"
        style={{
          left: '1050px',
          top: `${BASE_TOP + offset}px`,
          fontFamily: "'Chakra Petch', sans-serif",
          fontWeight: 700,
        }}
      >
        CHERCHEUR.ES À LA UNE
      </p>

      {LINKED_RESEARCHERS.map((researcher, i) => (
        <LinkedResearcherCard key={i} {...researcher} top={researcher.top + offset} />
      ))}

      {/* ── Left column: large title block ───────────────────────────────── */}
      <p
        className="absolute not-italic m-0 text-white whitespace-pre-wrap"
        style={{
          left: '135px',
          top: `${4550 + offset}px`,
          width: '780px',
          fontSize: '108px',
          lineHeight: '1',
          fontFamily: "'Chakra Petch', sans-serif",
          fontWeight: 800,
          textShadow: '0px 4px 4px rgba(0,0,0,0.25)',
        }}
      >
        {`DANS LA MÊME THÉMATIQUE`}
      </p>

      {/* ── Site footer ───────────────────────────────────────────────────── */}
      <SiteFooter top={5080 + offset} height={340} />
    </div>
  );
}
