import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    id: 's3-top',
    text: <>La France est la seule de toute l'Union europeenne a elire ses deputes au <strong>scrutin majoritaire a deux tours</strong>.</>,
    from: 'top',
    startScene: 1,
    endScene: 1,
    positionClass: 'top-[18%] left-1/2 -translate-x-1/2 w-[84%] sm:w-[60%] text-center',
  },
  {
    id: 's4-top',
    text: <>La France est la seule de toute l'Union europeenne a elire ses deputes au scrutin majoritaire a deux tours.</>,
    from: 'top',
    startScene: 2,
    endScene: 2,
    positionClass: 'top-[18%] left-1/2 -translate-x-1/2 w-[84%] sm:w-[60%] text-center',
  },
  {
    id: 's4-bottom',
    text: <>Les 26 autres Etats membres ont opte pour des formes plus ou moins <strong>proportionnelles</strong>.</>,
    from: 'bottom',
    startScene: 2,
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
//   {
//     id: 's7-8-top',
//     text: <>Une <strong>crise de confiance profonde</strong> est aussi a l'oeuvre :</>,
//     from: 'left',
//     startScene: 5,
//     endScene: 6,
//     positionClass: 'top-[22%] left-[7%] w-[76%] sm:w-[52%] text-left',
//   },  
  {
    id: 's8-bottom',
    text: <>lors des dernieres legislatives, <strong>plus d'un electeur sur deux s'est abstenu</strong>, avec des taux d'abstention record chez les jeunes.</>,
    from: 'bottom',
    startScene: 6,
    endScene: 6,
    positionClass: 'bottom-[18%] left-1/2 -translate-x-1/2 w-[84%] sm:w-[62%] text-center',
  },
  {
    id: 's9-top',
    text: <>Dans le meme temps, des partis comme le Rassemblement national, qui tournent autour d'un tiers des voix au premier tour, peinent encore a transformer ces scores en majorite de sieges, <strong>nourrissant un sentiment de sous-representation</strong>.</>,
    from: 'top',
    startScene: 7,
    endScene: 7,
    positionClass: 'top-[18%] left-1/2 -translate-x-1/2 w-[84%] sm:w-[64%] text-center',
  },
  {
    id: 's10-top',
    text: <>Pour eclairer ces enjeux, cet entretien croise les regards de deux specialistes du <strong>droit constitutionnel</strong> :</>,
    from: 'top',
    startScene: 8,
    endScene: 8,
    positionClass: 'top-[18%] left-1/2 -translate-x-1/2 w-[84%] sm:w-[60%] text-center',
  },
];

const SCENE_COUNT = 9;

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
  const [errorMsg, setErrorMsg] = useState(null);

  useGSAP(
    () => {
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

          gsap.set(element, {
            autoAlpha: 0,
            x: enter.x,
            y: enter.y,
          });

          tl.to(
            element,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.24,
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
      } catch (err) {
        console.error('GSAP Error:', err);
        setErrorMsg(err.message || String(err));
      }
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
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/story/europe.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center center',
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        {STORY_PARTS.map((part) => (
          <article
            key={part.id}
            data-part-id={part.id}
            className={`absolute ${part.positionClass}`}
          >
            <div data-anim-node="true" style={{ willChange: 'transform, opacity' }}>
              <p
                className="text-black text-[1.05rem] font-semibold leading-[1.14] tracking-[-0.03em] sm:text-[1.45rem]"
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif',
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
