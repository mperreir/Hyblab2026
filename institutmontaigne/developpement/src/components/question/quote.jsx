import { useEffect, useRef } from 'react';

/**
 * PhotoQuote — bulle de citation avec photo, comme dans le Figma.
 *
 * Usage dans debate.jsx :
 * {
 *   "type": "photo_quote",
 *   "intervenant": "morel",          // pour la flèche et la couleur
 *   "photo": "/img/morel.jpg",        // chemin ou URL de la photo
 *   "quote": "Le texte de la citation avec du <b>gras</b> si besoin.",
 *   "side": "left"                    // "left" (défaut) ou "right"
 * }
 */
export default function Quote({ photo, quote, isLeft = true, etoile }) {
  const COLOR = isLeft ? '#DD7375' : '#872339';
  const starIcon = etoile ?? (isLeft ? '/icons/EtoileBleue.svg' : '/icons/EtoileJaune.svg');
  const containerRef = useRef(null);
  const starRef = useRef(null);

  useEffect(() => {
    const scrollEl = containerRef.current?.closest('.dialogue-scroll');
    if (!scrollEl) return;

    const rotationRef = { current: isLeft ? -5 : 5 };
    const velocityRef = { current: 0 }; // deg/s
    const prevScrollTopRef = { current: scrollEl.scrollTop };
    const prevTimeRef = { current: performance.now() };
    const direction = isLeft ? -1 : 1;
    let frameId = 0;

    const applyTransform = () => {
      if (starRef.current) {
        starRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      }
    };

    const animate = (now) => {
      const dt = Math.max(1, now - prevTimeRef.current);
      prevTimeRef.current = now;

      // Integrate rotation with current velocity.
      rotationRef.current += (velocityRef.current * dt) / 1000;

      // Friction: keeps spinning briefly after scroll, then slows down.
      velocityRef.current *= 0.05;
      if (Math.abs(velocityRef.current) < 0.4) {
        velocityRef.current = 0;
      }

      applyTransform();
      frameId = window.requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - prevTimeRef.current);
      const currentTop = scrollEl.scrollTop;
      const delta = currentTop - prevScrollTopRef.current;
      prevScrollTopRef.current = currentTop;  

      // Convert scroll speed to rotational speed (deg/s), clamped for stability.
      const pxPerMs = delta / dt;
      const boost = Math.max(-400, Math.min(400, pxPerMs * 600));
      velocityRef.current += boost * direction;
      velocityRef.current = Math.max(-300, Math.min(300, velocityRef.current));
    };

    applyTransform();
    frameId = window.requestAnimationFrame(animate);
    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollEl.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, [isLeft]);

  return (
    <div ref={containerRef} className="w-full relative">

      {/* Étoile */}
      <img
        ref={starRef}
        src={starIcon}
        alt=""
        style={{
          position: 'absolute',
          width: 150,
          height: 150,
          top: -30,
          left: isLeft ? 30 : undefined,
          right: isLeft ? undefined : 30,
          transform: `rotate(${isLeft ? -5 : 5}deg)`,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div className={`grid grid-cols-2 items-end ${isLeft ? 'justify-items-start' : 'justify-items-end'}`}>

        {/* Photo */}
        <div className={`${isLeft ? 'order-1' : 'order-2'} flex`}>
          <div
            className="w-36 h-40 overflow-hidden"
            style={{
              transform: `rotate(${isLeft ? '-5deg' : '5deg'}) translateY(15px)`,
            }}
          >
            <img src={photo} alt="" className="w-full h-full object-cover object-top" />
          </div>
        </div>

        {/* Flèche */}
        <div
          className={`${isLeft ? 'order-2' : 'order-1'} flex items-end pb-6`}
          style={{
            transform: `${isLeft ? 'translateX(-35px)' : 'translateX(35px)'} translateY(15px)`,
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: COLOR,
              maskImage: 'url(/icons/quoteArrow.svg)',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: 'url(/icons/quoteArrow.svg)',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              transform: isLeft ? 'scaleX(-1)' : 'none',
            }}
          />
        </div>
      </div>

      {/* Bulle de citation */}
      <blockquote className="rounded-2xl pt-6 pb-5 px-5">
        <p
          className="text-sm md:text-base font-helvetica leading-relaxed text-ink/90 text-center"
          style={{ color: COLOR }}
          dangerouslySetInnerHTML={{ __html: `" ${quote} "` }}
        />
      </blockquote>
    </div>
  );
}