import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DoughnutChart from './infographie/DoughnutChart';

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(useGSAP);

const STORY_PARTS = [
  {
    id: 's2-left',
    text: <>Le debat sur la reforme du mode de scrutin revient a chaque <strong>crise politique</strong>,</>,
    from: 'left',
    startScene: 0,
    endScene: 0,
    positionClass: 'top-[22%] left-[7%] w-[76%] sm:w-[52%] text-left',
  },
  {
    id: 's2-bottom',
    text: <>mais il est aujourd'hui plus brulant que jamais apres la <strong>dissolution de l'Assemblee nationale</strong>.</>,
    from: 'bottom',
    startScene: 0,
    endScene: 0,
    positionClass: 'bottom-[18%] left-1/2 -translate-x-1/2 w-[84%] sm:w-[62%] text-center',
  },
  {
    id: 's3-4-top',
    text: <>La France est la seule de toute l'Union europeenne a elire ses deputes au <strong>scrutin majoritaire a deux tours</strong>.</>,
    from: 'top',
    startScene: 1,
    endScene: 2,
    positionClass: 'top-[18%] left-1/2 -translate-x-1/2 w-[84%] sm:w-[60%] text-center',
  },
  {
    id: 's4-bottom',
    text: <>Les 26 autres Etats membres ont opte pour des formes plus ou moins <strong>proportionnelles</strong>.</>,
    from: 'bottom',
    startScene: 1,
    endScene: 2,
    positionClass: 'bottom-[18%] left-1/2 -translate-x-1/2 w-[84%] sm:w-[62%] text-center',
  },
  {
    id: 's5-6-top',
    text: <>Derriere cette question technique se joue un choix de <strong>modele democratique</strong> :</>,
    from: 'left',
    startScene: 3,
    endScene: 4,
    positionClass: 'top-[22%] left-[7%] w-[80%] sm:w-[52%] text-left',
  },
  {
    id: 's6-bottom-left',
    text: <>Veut-on un Parlement <strong>tres representatif</strong>, au risque de coalitions fragiles ?</>,
    from: 'bottom',
    startScene: 4,
    endScene: 4,
    positionClass: 'bottom-[18%] left-[7%] w-[40%] sm:w-[32%] text-left',
  },
  {
    id: 's6-bottom-right',
    text: <>Ou un systeme qui fabrique plus facilement des <strong>majorites stables</strong>, mais parfois deconnecte des affiliations politiques reelles ?</>,
    from: 'bottom',
    startScene: 4,
    endScene: 4,
    positionClass: 'bottom-[18%] right-[7%] w-[40%] sm:w-[32%] text-right',
  },
  {
    id: 's7-8-top',
    text: <>Une <strong>crise de confiance profonde</strong> est aussi a l'oeuvre :</>,
    from: 'left',
    startScene: 5,
    endScene: 5,
    positionClass: 'top-[22%] left-[7%] w-[76%] sm:w-[52%] text-left',
  },  
  {
    id: 's8-bottom',
    text: <>lors des dernieres legislatives, <strong>plus d'un electeur sur deux s'est abstenu</strong>, avec des taux d'abstention record chez les jeunes.</>,
    from: 'bottom',
    startScene: 5,
    endScene: 5,
    positionClass: 'bottom-[18%] left-1/2 -translate-x-1/2 w-[84%] sm:w-[62%] text-center',
  },
  {
    id: 's9-top',
    text: <>Dans le meme temps, des partis comme le Rassemblement national, qui tournent autour d'un tiers des voix au premier tour, peinent encore a transformer ces scores en majorite de sieges, <strong>nourrissant un sentiment de sous-representation</strong>.</>,
    from: 'top',
    startScene: 6,
    endScene: 6,
    positionClass: 'top-[18%] left-1/2 -translate-x-1/2 w-[84%] sm:w-[64%] text-center',
  },
  {
    id: 's10-top',
    text: <>Pour eclairer ces enjeux, cet entretien croise les regards de deux specialistes du <strong>droit constitutionnel</strong> :</>,
    from: 'top',
    startScene: 7,
    endScene: 8,
    positionClass: 'top-[18%] left-1/2 -translate-x-1/2 w-[84%] sm:w-[60%] text-center',
  },
  {
    id: 's11-bottom',
    text: <>Ensemble, ils interrogent un même dilemme : la proportionnelle peut-elle réellement répondre à la crise démocratique française, ou risque-t-elle d'ouvrir un nouveau cycle de désillusions ?.</>,
    from: 'bottom',
    startScene: 8,
    endScene: 8,
    positionClass: 'bottom-[18%] left-1/2 -translate-x-1/2 w-[84%] sm:w-[62%] text-center',
  }
];

const SCENE_COUNT = 9;
const FRANCE_ZOOM_SCALE = 2;
const EUROPE_ZOOM_SCALE = 1;

function getBackgroundScale(sceneProgress) {
  if (sceneProgress < 1.3) return FRANCE_ZOOM_SCALE;

  if (sceneProgress < 1.9) {
    const progress = (sceneProgress - 1.3) / (1.9 - 1.3);
    return FRANCE_ZOOM_SCALE + (EUROPE_ZOOM_SCALE - FRANCE_ZOOM_SCALE) * progress;
  }

  if (sceneProgress < 2.3) return EUROPE_ZOOM_SCALE;

  if (sceneProgress < 2.9) {
    const progress = (sceneProgress - 2.3) / (2.9 - 2.3);
    return EUROPE_ZOOM_SCALE + (FRANCE_ZOOM_SCALE - EUROPE_ZOOM_SCALE) * progress;
  }

  return FRANCE_ZOOM_SCALE;
}

function getDirectionOffsets(direction) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  switch (direction) {
    case 'left':
      return { x: -width * 1.1, y: 0 };
    case 'right':
      return { x: width * 1.1, y: 0 };
    case 'top':
      return { x: 0, y: -height * 0.7 };
    case 'bottom':
    default:
      return { x: 0, y: height * 0.7 };
  }
}

export default function Scrollytelling() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const urnContainerRef = useRef(null);
  const handEnvelopeRef = useRef(null);
  const hemicycleContainerRef = useRef(null);
  const expertsContainerRef = useRef(null);
  const expertLeftRef = useRef(null);
  const expertRightRef = useRef(null);
  const hemicycleProgressRef = useRef({ value: 0 });
  const [errorMsg, setErrorMsg] = useState(null);
  const [hemicycleValue, setHemicycleValue] = useState(0);

  const hemicycleSegments = [
    { label: '', percentage: Math.max(0, 100 - hemicycleValue), color: '#D2D2D2' },
    { label: 'RN', percentage: Math.max(0, hemicycleValue), color: '#A4BAE8' },
  ];

  useGSAP(
    () => {
      let bgZoomTrigger = null;

      try {
        if (!sectionRef.current) return;
        const totalScroll = SCENE_COUNT * window.innerHeight;

        const q = gsap.utils.selector(sectionRef);

        const tl = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${totalScroll}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });

        const urnEl = urnContainerRef.current;
        const handEl = handEnvelopeRef.current;
        const hemicycleEl = hemicycleContainerRef.current;
        const expertsEl = expertsContainerRef.current;
        const expertLeftEl = expertLeftRef.current;
        const expertRightEl = expertRightRef.current;

        if (urnEl) gsap.set(urnEl, { autoAlpha: 0 });
        if (handEl) gsap.set(handEl, { y: -50, autoAlpha: 1 });
        if (hemicycleEl) gsap.set(hemicycleEl, { autoAlpha: 0 });
        hemicycleProgressRef.current.value = 0;
        setHemicycleValue(0);
        if (expertsEl) gsap.set(expertsEl, { autoAlpha: 0 });
        if (expertLeftEl) gsap.set(expertLeftEl, { x: -150, autoAlpha: 0 });
        if (expertRightEl) gsap.set(expertRightEl, { x: 100, y: 100, autoAlpha: 0 });

        // --- Background zoom/dezoom ---
        // Keep zoom fully tied to scroll progress so it remains reliable with scrub.
        const bgEl = bgRef.current;
        if (bgEl) {
          gsap.set(bgEl, { scale: FRANCE_ZOOM_SCALE, transformOrigin: '0% 95%' });

          bgZoomTrigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${totalScroll}`,
            onUpdate: (self) => {
              const sceneProgress = self.progress * SCENE_COUNT;
              const nextScale = getBackgroundScale(sceneProgress);
              gsap.set(bgEl, { scale: nextScale });
            },
          });
        }

        // --- Text animations ---
        STORY_PARTS.forEach((part) => {
          const rawSelector = `[data-part-id="${part.id}"] [data-anim-node="true"]`;
          const elements = q(rawSelector);
          if (!elements || elements.length === 0) {
            console.warn(`Could not find ${rawSelector}`);
            return;
          }
          const element = elements[0];

          const enter = getDirectionOffsets(part.from);
          const exit = { x: -enter.x, y: -enter.y };
          const enterStart = part.startScene + 0.06;
          const exitStart = part.endScene + 0.78;

          // Utilisation de fromTo avec immediateRender pour garantir 
          // qu'ils sont invisibles au départ et parfaitement gérés dans la timeline
          tl.fromTo(
            element,
            { autoAlpha: 0, x: enter.x, y: enter.y },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.24,
              immediateRender: true,
            },
            enterStart
          );

          tl.to(
            element,
            {
              autoAlpha: 0,
              x: exit.x,
              y: exit.y,
              duration: 0.22,
              ease: 'power2.in',
            },
            exitStart
          );
        });

        // --- Scene 5: Abstention / Urne ---
        if (urnEl && handEl) {
          // Apparition de l'ensemble (Urne + Main à leur position de départ)
          tl.to(urnEl, { autoAlpha: 1, duration: 0.2 }, 5);
          
          // La main s'éloigne vers la droite et le bas pour simuler le refus
          tl.fromTo(
            handEl,
            { xPercent: 0, yPercent: 0, rotation: 0 },
            { 
              xPercent: 40,    // Se décale vers la droite
              yPercent: 30,    // Descend légèrement
              rotation: 15,    // Tourne un peu pour accompagner le mouvement
              duration: 0.8, 
              ease: 'power2.out' 
            },
            5.2
          );

          // Disparition de l'ensemble
          tl.to(urnEl, { autoAlpha: 0, duration: 0.2 }, 6);
        }

        // --- Scene 6.1: Hemicycle gauge ---
        if (hemicycleEl) {
          tl.to(hemicycleEl, { autoAlpha: 1, duration: 0.15 }, 6.1);
          tl.to(
            hemicycleProgressRef.current,
            {
              value: 50,
              duration: 0.5,
              ease: 'power1.out',
              onUpdate: () => setHemicycleValue(hemicycleProgressRef.current.value),
            },
            6.1
          );
          tl.to(
            hemicycleProgressRef.current,
            {
              value: 22,
              duration: 0.4,
              ease: 'power1.out',
              onUpdate: () => setHemicycleValue(hemicycleProgressRef.current.value),
            },
            6.5
          );
          tl.to(hemicycleEl, { autoAlpha: 0, duration: 0.2 }, 6.8);
        }

        // --- Scene 7.1: Experts ---
        if (expertsEl && expertLeftEl && expertRightEl) {
          tl.to(expertsEl, { autoAlpha: 1, duration: 0.01 }, 7.1);
          tl.to(
            expertLeftEl,
            { x: 0, autoAlpha: 1, duration: 0.45, ease: 'power2.out' },
            7.1
          );
          tl.to(
            expertRightEl,
            { x: 0, y: 0, autoAlpha: 1, duration: 0.45, ease: 'power2.out' },
            7.1
          );
        }
      } catch (err) {
        console.error('GSAP Error:', err);
        setErrorMsg(err.message || String(err));
      }

      return () => {
        if (bgZoomTrigger) {
          bgZoomTrigger.kill();
        }
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section ref={sectionRef} className="relative bg-[#d5d5d5] h-screen overflow-hidden" aria-label="Scrollytelling Europe">
      {errorMsg && (
        <div className="absolute z-50 bg-red-500 font-bold text-white p-4 top-0 left-0 w-full whitespace-pre-wrap">
          Désolé, une erreur technique : {errorMsg}
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          ref={bgRef}
          src="/story/europe.svg"
          className="w-full h-full object-cover object-[20%_100%] sm:object-center"
          alt="Map of Europe"
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Scene 6: Abstention / Urne */}
      <div 
        ref={urnContainerRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[500px] flex items-center justify-between pointer-events-none" 
        style={{ visibility: 'hidden' }}
      >
        {/* L'urne à gauche */}
        <div className="w-[45%]">
          <img src="/story/MainUrne.svg" alt="Urne" className="w-full h-auto" />
        </div>

        {/* La main à droite */}
        <div className="w-[45%]">
          <img
            ref={handEnvelopeRef}
            src="/story/MainVote%20.svg"
            alt="Main et enveloppe"
            className="w-full h-auto origin-top-left" 
          />
        </div>
      </div>

      {/* Scene 7.1: Hemicycle */}
      <div ref={hemicycleContainerRef} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ visibility: 'hidden' }}>
        <div className="w-[52%] max-w-[500px] h-[250px] sm:h-[300px]">
          <DoughnutChart segments={hemicycleSegments} className="w-full h-full" />
        </div>
      </div>

      {/* Scene 8.1: Experts */}
      <div ref={expertsContainerRef} className="absolute inset-0 pointer-events-none" style={{ visibility: 'hidden' }}>
        {/* Ajout d'un max-w et mx-auto pour éviter qu'ils soient trop éloignés sur grand écran (desktop) */}
        <div className="relative w-full h-full max-w-5xl mx-auto">
          
          {/* Expert Gauche (Benjamin Morel)*/}
          <div 
            ref={expertLeftRef} 
            className="absolute left-[2%] sm:left-[10%] bottom-[28%] sm:bottom-[15%] w-[46%] max-w-[320px]"
          >
            <img src="/story/MOREL.svg" alt="Portrait Benjamin Morel" className="w-full h-auto" />
          </div>

          {/* Expert Droite (Anne Levade) */}
          <div 
            ref={expertRightRef} 
            className="absolute right-[2%] sm:right-[10%] bottom-[26%] sm:bottom-[30%] w-[46%] max-w-[320px]"
          >
            <img src="/story/LEVADE.svg" alt="Portrait Anne Levade" className="w-full h-auto" />
          </div>
          
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {STORY_PARTS.map((part) => (
          <article
            key={part.id}
            data-part-id={part.id}
            className={`absolute ${part.positionClass}`}
          >
            <div data-anim-node="true" className="opacity-0" style={{ willChange: 'transform, opacity' }}>
              <p
                className="text-black text-[1.05rem] font-semibold leading-[1.14] tracking-[-0.03em] sm:text-[1.45rem]"
                style={{
                  fontFamily: 'Helvetica',
                }}
              >
                {part.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
