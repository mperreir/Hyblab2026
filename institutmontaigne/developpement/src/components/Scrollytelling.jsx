import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(useGSAP);

const STORY_SLIDES = [
  {
    id: 'slide-2',
    parts: [
      {
        id: 's2-left',
        text: 'Le debat sur la reforme du mode de scrutin revient a chaque crise politique,',
        from: 'left',
        positionClass: 'top-[22%] left-[7%] max-w-[76%] sm:max-w-[52%] text-left',
      },
      {
        id: 's2-bottom',
        text: "mais il est aujourd'hui plus brulant que jamais apres la dissolution de l'Assemblee nationale.",
        from: 'bottom',
        positionClass: 'bottom-[18%] left-1/2 -translate-x-1/2 max-w-[84%] sm:max-w-[62%] text-center',
      },
    ],
  },
  {
    id: 'slide-3',
    parts: [
      {
        id: 's3-top',
        text: "La France est la seule de toute l'Union europeenne a elire ses deputes au scrutin majoritaire a deux tours.",
        from: 'top',
        positionClass: 'top-[18%] left-1/2 -translate-x-1/2 max-w-[84%] sm:max-w-[60%] text-center',
      },
    ],
  },
  {
    id: 'slide-4',
    parts: [
      {
        id: 's4-top',
        text: "La France est la seule de toute l'Union europeenne a elire ses deputes au scrutin majoritaire a deux tours.",
        from: 'top',
        positionClass: 'top-[18%] left-1/2 -translate-x-1/2 max-w-[84%] sm:max-w-[60%] text-center',
      },
      {
        id: 's4-bottom',
        text: 'Les 26 autres Etats membres ont opte pour des formes plus ou moins proportionnelles.',
        from: 'bottom',
        positionClass: 'bottom-[18%] left-1/2 -translate-x-1/2 max-w-[84%] sm:max-w-[62%] text-center',
      },
    ],
  },
  {
    id: 'slide-5',
    parts: [
      {
        id: 's5-left',
        text: 'Derriere cette question technique se joue un choix de modele democratique :',
        from: 'left',
        positionClass: 'top-[22%] left-[7%] max-w-[80%] sm:max-w-[52%] text-left',
      },
    ],
  },
  {
    id: 'slide-6',
    parts: [
      {
        id: 's6-top',
        text: 'Derriere cette question technique se joue un choix de modele democratique :',
        from: 'top',
        positionClass: 'top-[18%] left-1/2 -translate-x-1/2 max-w-[84%] sm:max-w-[60%] text-center',
      },
      {
        id: 's6-bottom-left',
        text: 'Veut-on un Parlement tres representatif, au risque de coalitions fragiles ?',
        from: 'bottom',
        positionClass: 'bottom-[18%] left-[7%] max-w-[40%] sm:max-w-[32%] text-left',
      },
      {
        id: 's6-bottom-right',
        text: 'Ou un systeme qui fabrique plus facilement des majorites stables, mais parfois deconnecte des affiliations politiques reelles ?',
        from: 'bottom',
        positionClass: 'bottom-[18%] right-[7%] max-w-[40%] sm:max-w-[32%] text-right',
      },
    ],
  },
  {
    id: 'slide-7',
    parts: [
      {
        id: 's7-left',
        text: "Une crise de confiance profonde est aussi a l'oeuvre :",
        from: 'left',
        positionClass: 'top-[22%] left-[7%] max-w-[76%] sm:max-w-[52%] text-left',
      },
    ],
  },
  {
    id: 'slide-8',
    parts: [
      {
        id: 's8-top',
        text: "Une crise de confiance profonde est aussi a l'oeuvre :",
        from: 'top',
        positionClass: 'top-[18%] left-1/2 -translate-x-1/2 max-w-[84%] sm:max-w-[58%] text-center',
      },
      {
        id: 's8-bottom',
        text: "lors des dernieres legislatives, plus d'un electeur sur deux s'est abstenu, avec des taux d'abstention record chez les jeunes.",
        from: 'bottom',
        positionClass: 'bottom-[18%] left-1/2 -translate-x-1/2 max-w-[84%] sm:max-w-[62%] text-center',
      },
    ],
  },
  {
    id: 'slide-9',
    parts: [
      {
        id: 's9-top',
        text: "Dans le meme temps, des partis comme le Rassemblement national, qui tournent autour d'un tiers des voix au premier tour, peinent encore a transformer ces scores en majorite de sieges, nourrissant un sentiment de sous-representation.",
        from: 'top',
        positionClass: 'top-[18%] left-1/2 -translate-x-1/2 max-w-[84%] sm:max-w-[64%] text-center',
      },
    ],
  },
  {
    id: 'slide-10',
    parts: [
      {
        id: 's10-top',
        text: 'Pour eclairer ces enjeux, cet entretien croise les regards de deux specialistes du droit constitutionnel :',
        from: 'top',
        positionClass: 'top-[18%] left-1/2 -translate-x-1/2 max-w-[84%] sm:max-w-[60%] text-center',
      },
    ],
  },
];

const DIRECTION_OFFSETS = {
  left: { xPercent: -140, yPercent: 0 },
  right: { xPercent: 140, yPercent: 0 },
  top: { xPercent: 0, yPercent: -140 },
  bottom: { xPercent: 0, yPercent: 140 },
};

function getDirectionOffsets(direction) {
  return DIRECTION_OFFSETS[direction] ?? DIRECTION_OFFSETS.bottom;
}

export default function Scrollytelling() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const slideCount = STORY_SLIDES.length;
      const totalScroll = slideCount * window.innerHeight;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${totalScroll}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });

        STORY_SLIDES.forEach((slide, slideIndex) => {
          const baseTime = slideIndex;

          slide.parts.forEach((part) => {
            const selector = `[data-part-id="${part.id}"]`;
            const element = section.querySelector(selector);
            if (!element) return;

            const enter = getDirectionOffsets(part.from);
            const exit = { xPercent: -enter.xPercent, yPercent: -enter.yPercent };

            gsap.set(element, {
              autoAlpha: 0,
              xPercent: enter.xPercent,
              yPercent: enter.yPercent,
            });

            tl.to(
              element,
              {
                autoAlpha: 1,
                xPercent: 0,
                yPercent: 0,
                duration: 0.28,
              },
              baseTime + 0.04
            );

            tl.to(
              element,
              {
                autoAlpha: 0,
                xPercent: exit.xPercent,
                yPercent: exit.yPercent,
                duration: 0.28,
                ease: 'power2.in',
              },
              baseTime + 0.72
            );
          });
        });
      }, section);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative bg-[#d5d5d5] h-screen overflow-hidden" aria-label="Scrollytelling Europe">
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
        {STORY_SLIDES.map((slide) =>
          slide.parts.map((part) => (
            <article
              key={part.id}
              data-part-id={part.id}
              className={`absolute ${part.positionClass}`}
              style={{ willChange: 'transform, opacity' }}
            >
              <p
                className="text-black text-[1.05rem] font-semibold leading-[1.2] tracking-[-0.015em] sm:text-[1.45rem]"
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif',
                }}
              >
                {part.text}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
