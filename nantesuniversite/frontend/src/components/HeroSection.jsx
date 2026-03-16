import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

import imgCalque1 from '../assets/figma/calque1.svg';
import imgCalque2 from '../assets/figma/calque2.svg';
import imgCalque3 from '../assets/figma/calque3.svg';
import imgCalque4 from '../assets/figma/calque4.svg';
import imgCalque8 from '../assets/figma/calque8.svg';
import imgVector1 from '../assets/figma/vector1.svg';

/* ---------- Sub-components ---------- */

function RotatedBar({ color, left, top, containerW, containerH, deg, animRef }) {
  return (
    <div
      ref={animRef}
      className="absolute flex items-center justify-center"
      style={{ left, top, width: containerW, height: containerH, opacity: 0 }}
    >
      <div style={{ transform: `rotate(${deg}deg)` }}>
        <div style={{ background: color, width: 26, height: 56 }} />
      </div>
    </div>
  );
}

function CalqueDecor({ src, left, top, width, height, containerW, containerH, deg = 0, flipY = false, animRef }) {
  const transform = [
    deg !== 0 ? `rotate(${deg}deg)` : '',
    flipY ? 'scaleY(-1)' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const innerStyle = transform ? { transform } : {};

  if (containerW && containerH) {
    return (
      <div
        ref={animRef}
        className="absolute flex items-center justify-center"
        style={{ left, top, width: containerW, height: containerH, opacity: 0 }}
      >
        <div style={{ ...innerStyle, width, height, position: 'relative' }}>
          <img alt="" src={src} className="absolute block max-w-none w-full h-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={animRef}
      className="absolute"
      style={{ left, top, width, height, opacity: 0 }}
    >
      <img alt="" src={src} className="absolute block max-w-none w-full h-full" />
    </div>
  );
}

/* ---------- Main component ---------- */

export default function HeroSection() {
  const titleRef      = useRef(null);
  const highlightRef  = useRef(null); // blue rect behind "CHERCHEURS"
  const wavyRef       = useRef(null); // wavy underline wrapper

  const bar1Ref    = useRef(null);
  const bar2Ref    = useRef(null);
  const bar3Ref    = useRef(null);
  const bar4Ref    = useRef(null);
  const calque1Ref = useRef(null);
  const calque2Ref = useRef(null);
  const calque3Ref = useRef(null);
  const calque4Ref = useRef(null);
  const calque8Ref = useRef(null);

  useEffect(() => {
    /* ── 1. Decorative elements config ─────────────────────────── */
    const decors = [
      { ref: bar1Ref,    x:  500, y: -300 }, // top-right
      { ref: bar2Ref,    x: -500, y:    0 }, // left
      { ref: bar3Ref,    x: -400, y:  500 }, // bottom-left
      { ref: bar4Ref,    x:  500, y:  300 }, // right

      { ref: calque1Ref, x: -500, y:  500 }, // bottom-left
      { ref: calque2Ref, x:    0, y: -500 }, // top
      { ref: calque3Ref, x:  500, y:  500 }, // bottom-right
      { ref: calque4Ref, x: -500, y: -400 }, // top-left
      { ref: calque8Ref, x:  500, y: -400 }, // top-right
    ];

    decors.forEach(({ ref, x, y }) => {
      if (ref.current) gsap.set(ref.current, { x, y, opacity: 0 });
    });

    // Wavy underline starts from top, hidden
    if (wavyRef.current) gsap.set(wavyRef.current, { y: -120, opacity: 0 });

    // Highlight starts at scaleX 0 (grows left→right)
    if (highlightRef.current) {
      gsap.set(highlightRef.current, { scaleX: 0, transformOrigin: 'left center', opacity: 1 });
    }

    /* ── 2. Master timeline ─────────────────────────────────────── */
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Step 1 — decorative shapes fly in with bounce on landing
    tl.to(
      decors.map(d => d.ref.current).filter(Boolean),
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'back.out(2)',   // <-- bounce/overshoot on arrival
        stagger: 0.08,
      }
    );

    // Step 2 — title appears word by word (SplitText)
    tl.add(() => {
      if (!titleRef.current) return;

      gsap.set(titleRef.current, { opacity: 1 });

      const split = new SplitText(titleRef.current, { type: 'words' });

      gsap.from(split.words, {
        opacity: 0,
        y: 60,
        rotationX: -45,
        transformOrigin: '50% 50% -30px',
        duration: 0.6,
        stagger: 0.07,
        ease: 'back.out(1.6)',
        onComplete: () => {
          split.revert();
          // Step 3 — blue highlight grows left→right once all words are visible
          gsap.to(highlightRef.current, {
            scaleX: 1,
            duration: 0.55,
            ease: 'power2.inOut',
            // Step 4 — wavy underline drops in with bounce right after
            onComplete: () => {
              gsap.to(wavyRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'back.out(2.5)',
              });
            },
          });
        },
      });
    }, '-=0.1');

    return () => { tl.kill(); };
  }, []);

  return (
    <section>
      {/* ── Blue highlight — starts scaleX:0, revealed by GSAP ── */}
      <div
        ref={highlightRef}
        className="absolute bg-[#3452ff]"
        style={{ left: 616, top: 476, width: 750, height: 112, opacity: 0 }}
      />

      {/* ── Hero title ── */}
      <div
        ref={titleRef}
        className="absolute text-center whitespace-pre-wrap"
        style={{
          left: 0,
          right: 0,
          top: 374,
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 800,
          fontSize: 96,
          lineHeight: '106px',
          color: '#000',
          opacity: 0,
        }}
      >
        <p style={{ margin: 0 }}>DÉCOUVREZ{'  '}L'UNIVERS</p>
        <p style={{ margin: 0 }}>
          DES <span style={{ color: '#fff' }}>CHERCHEUR.ES</span> DE
        </p>
        <p style={{ margin: 0 }}>NANTES UNIVERSITÉ</p>
      </div>

      {/* ── Coloured rotating bars ── */}
      <RotatedBar animRef={bar1Ref} color="#9c1ef1" left={1484} top={196}  containerW={61.662} containerH={49.121} deg={117.81} />
      <RotatedBar animRef={bar2Ref} color="#ffcc02" left={178}  top={469}  containerW={56.953} containerH={58.892} deg={42.38}  />
      <RotatedBar animRef={bar3Ref} color="#00c6fe" left={562}  top={806}  containerW={52.202} containerH={61.153} deg={-32.82} />
      <RotatedBar animRef={bar4Ref} color="#02c15e" left={1618} top={611}  containerW={52.202} containerH={61.153} deg={-32.82} />

      {/* ── Calque image decorations ── */}
      <CalqueDecor animRef={calque1Ref} src={imgCalque1} left={136}  top={709} width={136}     height={74}     containerW={152.963} containerH={115.42}  deg={19.65}  />
      <CalqueDecor animRef={calque2Ref} src={imgCalque2} left={860}  top={214} width={122.949} height={67.289} containerW={134.477} containerH={91.979}  deg={167.68} />
      <CalqueDecor animRef={calque3Ref} src={imgCalque3} left={1309} top={719} width={92.656}  height={50.711} containerW={105.542} containerH={86.635}  deg={153.59} />
      <CalqueDecor animRef={calque4Ref} src={imgCalque4} left={235}  top={219} width={80}      height={61} />
      <CalqueDecor animRef={calque8Ref} src={imgCalque8} left={1663} top={367} width={80}      height={61}     containerW={93.64}   containerH={100.035} deg={58.77}  />

      {/* ── Wavy underline — animated last ── */}
      <div
        ref={wavyRef}
        className="absolute"
        style={{ left: 562, top: 708.5, width: 745, height: 27.5, opacity: 0 }}
      >
        <div className="absolute" style={{ inset: '-9.09% 0 -9.08% 0' }}>
          <img alt="" src={imgVector1} className="block max-w-none w-full h-full" />
        </div>
      </div>
    </section>
  );
}