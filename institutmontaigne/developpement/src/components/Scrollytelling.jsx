import { useEffect, useRef, useState, useMemo } from 'react';

/*
  Images génériques — remplacer par de vraies photos si besoin.
  Chaque accroche obtient un fond immersif via Unsplash (licence libre).
  Le paramètre w=1200 garde un poids raisonnable.
*/
const BG_IMAGES = [
  'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80', // hémicycle / parlement
  'https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=1200&q=80', // foule / manifestation
  'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&q=80', // vote / urne
  'https://images.unsplash.com/photo-1577415124269-fc1140354569?w=1200&q=80', // drapeaux / europe
  'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1200&q=80', // colonnes / institution
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80', // jeunes / rassemblement
];

export default function Scrollytelling({ accroches }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgLoaded, setBgLoaded] = useState(() => new Set());

  // Préchargement des images
  useEffect(() => {
    BG_IMAGES.forEach((src, i) => {
      const img = new Image();
      img.onload = () => setBgLoaded(prev => new Set(prev).add(i));
      img.src = src;
    });
  }, []);

  return (
    <section ref={containerRef} className="relative bg-navy">
      {/* ─── Fond sticky (à la Le Monde) ─── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Couches d'images — seule l'active est visible */}
        {BG_IMAGES.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center scale-[1.05]"
              style={{ backgroundImage: `url(${src})` }}
            />
          </div>
        ))}

        {/* Gradient overlay pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />

        {/* Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(11,29,58,0.6) 100%)'
        }} />
      </div>

      {/* ─── Blocs de texte qui scrollent PAR-DESSUS le fond ─── */}
      <div className="relative z-10" style={{ marginTop: '-100vh' }}>
        {accroches.map((phrase, i) => (
          <ScrollPanel
            key={i}
            phrase={phrase}
            index={i}
            total={accroches.length}
            isLast={i === accroches.length - 1}
            onEnter={() => setActiveIndex(i % BG_IMAGES.length)}
          />
        ))}
      </div>
    </section>
  );
}

function ScrollPanel({ phrase, index, total, isLast, onEnter }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        const r = entry.intersectionRatio;
        setProgress(r);
        if (r > 0.4) onEnter();
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [onEnter]);

  // Opacité maximale au centre de l'écran, faible en entrée/sortie.
  const opacity = useMemo(() => {
    const distanceToCenter = Math.abs(progress - 0.5) / 0.5;
    return Math.max(0, distanceToCenter);
  }, [progress]);

  const translateY = (1 - Math.min(progress * 2.5, 1)) * 50;
  const scale = 0.95 + Math.min(progress * 2, 1) * 0.05;

  return (
    <div
      ref={ref}
      className="min-h-[88vh] md:min-h-[92vh] flex items-center justify-center px-6 sm:px-10 md:px-16"
    >
      <div
        className="max-w-3xl w-full text-center pointer-events-none"
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
      >
        {/* Phrase d'accroche */}
        <p className="text-[1.5rem] sm:text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-bold leading-[1.25] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
          {phrase}
        </p>
      </div>
    </div>
  );
}
