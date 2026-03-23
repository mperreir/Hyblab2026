import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ---------- Figma asset URLs ---------- */
const colin_quote   = './images/colin_quote.svg';
const imgThierryPiel = './images/thierry_quote.svg';
const iaTriche      = './images/IA_Triche.svg';
const marie         = './images/marie_quote.svg';
const bronze_elt    = './images/bronze_quote.svg';

/* ---------- Shared primitives ---------- */

function QuoteMark({ src }) {
  return (
    <img alt="" src={src} className="absolute block max-w-none w-full h-full" />
  );
}

function HoverCard({ left, top, width, height, onClick, children, animRef }) {
  return (
    <div
      ref={animRef}
      className="custom-element"
      style={{ left, top, width, height }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  );
}

/* ---------- Cards ---------- */

function MarieCoupeCard({ animRef }) {
  return (
    <HoverCard animRef={animRef} left={1050} top={1370} width={800} height={500}>
      <QuoteMark src={marie} left={61} top={118} />
    </HoverCard>
  );
}

function ThierryPielCard({ animRef }) {
  return (
    <HoverCard animRef={animRef} left={120} top={1590} width={800} height={580}>
      <QuoteMark src={imgThierryPiel} left={61} top={118} />
    </HoverCard>
  );
}

function IaEtTriche({ animRef }) {
  return (
    <HoverCard animRef={animRef} left={1100} top={750} width={650} height={535}>
      <QuoteMark src={iaTriche} left={61} top={118} />
    </HoverCard>
  );
}

function ColinCard({ animRef }) {
  const navigate = useNavigate();
  return (
    <HoverCard animRef={animRef} left={61} top={900} width={1100} height={620} onClick={() => navigate('/researcher')}>
      <QuoteMark src={colin_quote} left={102} top={109} />
    </HoverCard>
  );
}

function BronzeElt({ animRef }) {
  return (
    <HoverCard animRef={animRef} left={1000} top={1890} width={550} height={500}>
      <QuoteMark src={bronze_elt} left={61} top={118} />
    </HoverCard>
  );
}

/* ---------- Animation config per card ----------
 *
 * fromX / fromY  : starting offset (px) — defines which edge it enters from
 * rotation       : slight tilt at start for a more organic feel
 * ease           : chaque carte a sa propre personnalité
 */
const CARD_CONFIGS = [
  // Colin — gauche, grand mouvement, léger tilt
  {
    fromX: -700, fromY: 80,
    rotation: -8,
    ease: 'back.out(1.8)',
    duration: 1.1,
    trigger: 'top 85%',
  },
  // IaEtTriche — droite en haut, tilt opposé
  {
    fromX: 700, fromY: -60,
    rotation: 6,
    ease: 'elastic.out(1, 0.6)',
    duration: 1.4,
    trigger: 'top 80%',
  },
  // ThierryPiel — bas gauche, rotation dramatique
  {
    fromX: -500, fromY: 150,
    rotation: -12,
    ease: 'back.out(2.2)',
    duration: 1.0,
    trigger: 'top 82%',
  },
  // Marie — droite, glisse avec rebond
  {
    fromX: 600, fromY: 100,
    rotation: 10,
    ease: 'back.out(2)',
    duration: 1.2,
    trigger: 'top 80%',
  },
  // Bronze — bas, remonte avec élasticité
  {
    fromX: 0, fromY: 300,
    rotation: -5,
    ease: 'elastic.out(1.2, 0.5)',
    duration: 1.5,
    trigger: 'top 88%',
  },
];

/* ---------- Section ---------- */

export default function FeaturedQuotesSection() {
  const colinRef   = useRef(null);
  const iaRef      = useRef(null);
  const thierryRef = useRef(null);
  const marieRef   = useRef(null);
  const bronzeRef  = useRef(null);

  const refs = [colinRef, iaRef, thierryRef, marieRef, bronzeRef];

  useEffect(() => {
    // Set all cards invisible + offset before any scroll
    refs.forEach((ref, i) => {
      if (!ref.current) return;
      const { fromX, fromY, rotation } = CARD_CONFIGS[i];
      gsap.set(ref.current, {
        x: fromX,
        y: fromY,
        rotation,
        opacity: 0,
        willChange: 'transform, opacity',
      });
    });

    // Create one ScrollTrigger per card
    const triggers = refs.map((ref, i) => {
      if (!ref.current) return null;
      const { ease, duration, trigger } = CARD_CONFIGS[i];

      return gsap.to(ref.current, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        duration,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start: trigger, 
          toggleActions: 'play none none reverse', 
        },
      });
    });

    return () => {
      triggers.forEach(t => t?.scrollTrigger?.kill());
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section>
      <ColinCard    animRef={colinRef}   />
      <IaEtTriche   animRef={iaRef}      />
      <ThierryPielCard animRef={thierryRef} />
      <MarieCoupeCard  animRef={marieRef}   />
      <BronzeElt    animRef={bronzeRef}  />
    </section>
  );
}