import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

/* ---------- Figma asset URLs ---------- */
const imgCalque1 = 'https://www.figma.com/api/mcp/asset/e3b3c517-ec4f-4a6f-ba90-998f89667624';
const imgCalque2 = 'https://www.figma.com/api/mcp/asset/cd39dc93-d278-47b7-8bef-345d78168b09';
const imgCalque3 = 'https://www.figma.com/api/mcp/asset/08b55e8f-4a5e-48c3-9dea-cfdd3ccbd61d';
const imgCalque4 = 'https://www.figma.com/api/mcp/asset/543c1b75-44a5-40af-a95e-840c3a4aa340';
const imgCalque8 = 'https://www.figma.com/api/mcp/asset/a0a6e4a2-fbf9-4a72-a0ff-9ed9cab2718f';
const imgVector1 = 'https://www.figma.com/api/mcp/asset/66692520-20fa-4a4c-85da-ff1fe35bdcf1';

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
  const titleRef = useRef(null);

  // Refs for each decorative element
  const bar1Ref = useRef(null); // top-right  → comes from top-right
  const bar2Ref = useRef(null); // left        → comes from left
  const bar3Ref = useRef(null); // bottom-left → comes from bottom-left
  const bar4Ref = useRef(null); // right       → comes from right

  const calque1Ref = useRef(null); // bottom-left  → comes from bottom-left
  const calque2Ref = useRef(null); // top-center   → comes from top
  const calque3Ref = useRef(null); // bottom-right → comes from bottom-right
  const calque4Ref = useRef(null); // top-left     → comes from top-left
  const calque8Ref = useRef(null); // top-right    → comes from top-right

  useEffect(() => {
    const decors = [
      // [ref, fromX, fromY]  — large values so they start off-screen
      { ref: bar1Ref,    x:  400, y: -300 }, // top-right
      { ref: bar2Ref,    x: -400, y:    0 }, // left
      { ref: bar3Ref,    x: -300, y:  400 }, // bottom-left
      { ref: bar4Ref,    x:  400, y:  200 }, // right

      { ref: calque1Ref, x: -400, y:  400 }, // bottom-left
      { ref: calque2Ref, x:    0, y: -400 }, // top
      { ref: calque3Ref, x:  400, y:  400 }, // bottom-right
      { ref: calque4Ref, x: -400, y: -300 }, // top-left
      { ref: calque8Ref, x:  400, y: -300 }, // top-right
    ];

    // Set initial off-screen positions (already opacity:0 via style)
    decors.forEach(({ ref, x, y }) => {
      if (ref.current) {
        gsap.set(ref.current, { x, y, opacity: 0 });
      }
    });

    // Timeline : decorations fly in, then title appears
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Step 1 — all decorations animate to their natural position
    tl.to(
      decors.map(d => d.ref.current).filter(Boolean),
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.08,
      }
    );

    // Step 2 — title appears with SplitText word-by-word
    tl.add(() => {
      if (!titleRef.current) return;

      const split = new SplitText(titleRef.current, { type: 'words,chars' });

      gsap.set(titleRef.current, { opacity: 1 });
      gsap.from(split.words, {
        opacity: 0,
        y: 60,
        rotationX: -45,
        transformOrigin: '50% 50% -30px',
        duration: 0.7,
        stagger: 0.06,
        ease: 'back.out(1.4)',
        onComplete: () => split.revert(),
      });
    }, '-=0.1'); // slight overlap with end of previous step

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section>
      {/* ── Blue highlight rectangle behind "CHERCHEURS" ── */}
      <div
        className="absolute bg-[#3452ff]"
        style={{ left: 655, top: 476, width: 672, height: 112 }}
      />

      {/* ── Hero title (hidden until GSAP reveals it) ── */}
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
          opacity: 0, // hidden until animation starts
        }}
      >
        <p style={{ margin: 0 }}>DÉCOUVREZ{'  '}L'UNIVERS</p>
        <p style={{ margin: 0 }}>
          DES <span style={{ color: '#fff' }}>CHERCHEURS</span> DE
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

      {/* ── Wavy underline below title ── */}
      <div
        className="absolute"
        style={{ left: 562, top: 708.5, width: 745, height: 27.5 }}
      >
        <div className="absolute" style={{ inset: '-9.09% 0 -9.08% 0' }}>
          <img alt="" src={imgVector1} className="block max-w-none w-full h-full" />
        </div>
      </div>
    </section>
  );
}