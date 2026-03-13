import { useEffect, useRef, useState } from 'react';
import { PATH_PUBLIC } from "../../data/debate";

/**
 * PhotoQuote — bulle de citation avec photo, comme dans le Figma.
 *
 * Usage dans debate.jsx :
 * {
 *   "photo": "/img/morel.jpg",        // chemin ou URL de la photo
 *   "quote": "Le texte de la citation avec du <b>gras</b> si besoin.",
 *   "side": "left"                    // "left" (défaut) ou "right",
 *   "hasImage": true                   // si false, masque la photo et la flèche (pour les citations sans intervenant)
 * }
 */
export default function Quote({ quote, isLeft = true, hasImage = true }) {
  const COLOR = isLeft ? '#AC7DD1' : '#872339';
  const starIcon = isLeft ? PATH_PUBLIC+'/icons/EtoileBleue.svg' : PATH_PUBLIC+'/icons/EtoileJaune.svg';
  const maxImage = isLeft ? 4 : 6;
  const intervenant = isLeft ? 'morel' : 'levade';
  const [photoIdx, setPhotoIdx] = useState(0);
  const containerRef = useRef(null);
  const starRef = useRef(null);
  const photoScrollDistanceRef = useRef(0);
  const photoSwitchTimeRef = useRef(0);

  const imagePath = `${PATH_PUBLIC}/pp/${intervenant}-${photoIdx}.png`;

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

      if (!hasImage) return;

      // Change photo every meaningful scroll movement, not on each tiny wheel tick.
      photoScrollDistanceRef.current += Math.abs(delta);
      const canSwitch = now - photoSwitchTimeRef.current > 130;

      if (photoScrollDistanceRef.current > 80 && canSwitch) {
        photoScrollDistanceRef.current = 0;
        photoSwitchTimeRef.current = now;
        setPhotoIdx((prev) => (prev + 1) % maxImage);
      }
    };

    applyTransform();
    frameId = window.requestAnimationFrame(animate);
    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollEl.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, [hasImage, isLeft, maxImage]);

  return (
    <div ref={containerRef} className="w-full relative">

      {hasImage && (
        <>
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
        </>
      )}

      <div className={`grid grid-cols-2 items-end ${isLeft ? 'justify-items-start' : 'justify-items-end'}`}>

        {hasImage && (
          <>
            {/* Photo */}
            <div className={`${isLeft ? 'order-1' : 'order-2'} flex`}>
              <div
                className="w-36 h-40 overflow-hidden"
                style={{
                  transform: `rotate(${isLeft ? '-5deg' : '5deg'}) translateY(15px)`,
                }}
                >
                <img src={imagePath} alt="" className="w-full h-full object-cover object-top" />
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
                  maskImage: `url(${PATH_PUBLIC}/icons/quoteArrow.svg)`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: `url(${PATH_PUBLIC}/icons/quoteArrow.svg)`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  transform: isLeft ? 'scaleX(-1)' : 'none',
                }}
              />
            </div>
          </>
        )}
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