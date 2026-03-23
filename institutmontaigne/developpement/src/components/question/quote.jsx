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
  const [arrowVisible, setArrowVisible] = useState(false);
  const delay = useRef(0.8 + Math.random() * 0.4);
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

  // Observer pour révéler la flèche quand la bulle entre dans la zone de scroll.
  useEffect(() => {
    const scrollEl = containerRef.current?.closest('.dialogue-scroll');
    if (!scrollEl || !containerRef.current) return;
    const obs = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (e && e.isIntersecting) {
        setArrowVisible(true);
        obs.disconnect();
      }
    }, { root: scrollEl, threshold: 0.12 });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative">
      <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>

        {hasImage && (
          <>
            {/* Photo */}
            <div className={`${isLeft ? 'order-1' : 'order-2'} flex`}>
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
              className={`${isLeft ? 'order-2 pl-3' : 'order-1 pr-3'} flex items-end pb-3`}
            >
              <div
                className="print:![clip-path:none] print:![-webkit-clip-path:none] print:!transition-none"
                style={{
                  clipPath: arrowVisible ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                  WebkitClipPath: arrowVisible ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                  transition: `clip-path 620ms cubic-bezier(.22,.9,.34,1) ${delay.current.toFixed(3)}s`,
                  WebkitTransition: `-webkit-clip-path 620ms cubic-bezier(.22,.9,.34,1) ${delay.current.toFixed(3)}s`,
                  transform: isLeft ? 'scaleX(-1)' : 'none',
                  width: 51,
                  height: 51,
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.47896 50.116C1.55477 50.3815 1.40096 50.6582 1.13543 50.734C0.869894 50.8098 0.593184 50.656 0.51738 50.3905L0.998172 50.2532L1.47896 50.116ZM18.1264 12.9511L17.8824 12.5146V12.5146L18.1264 12.9511ZM50.7559 3.98154C50.9079 4.21208 50.8442 4.5222 50.6137 4.67421L46.8568 7.15133C46.6263 7.30334 46.3162 7.23968 46.1642 7.00914C46.0122 6.7786 46.0758 6.46849 46.3064 6.31648L49.6458 4.11459L47.4439 0.775174C47.2919 0.544639 47.3555 0.23452 47.5861 0.0825143C47.8166 -0.0694951 48.1267 -0.00583437 48.2787 0.224705L50.7559 3.98154ZM0.998172 50.2532L0.51738 50.3905C-0.155788 48.0325 -0.148706 44.9093 0.402785 41.4791C0.955791 38.0395 2.06286 34.2502 3.62762 30.5393C6.74915 23.1365 11.7334 15.9513 17.8824 12.5146L18.1264 12.9511L18.3703 13.3875C12.5009 16.6679 7.63172 23.6172 4.54905 30.9278C3.01171 34.5737 1.92901 38.286 1.39011 41.6378C0.849692 44.9991 0.86274 47.9574 1.47896 50.116L0.998172 50.2532ZM18.1264 12.9511L17.8824 12.5146C22.9173 9.70067 28.859 7.07092 34.6281 5.36476C40.3835 3.66262 46.0276 2.86143 50.439 3.76699L50.3384 4.25678L50.2379 4.74657C46.0672 3.8904 40.6129 4.63762 34.9117 6.3237C29.224 8.00577 23.3507 10.604 18.3703 13.3875L18.1264 12.9511Z" 
                    fill={COLOR}/>
                </svg>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bulle de citation */}
      <blockquote className="rounded-2xl pt-6 pb-5 px-5">
        <p
          className="text-sm md:text-base italic text-ink/90 text-center"
          style={{ color: COLOR }}
          dangerouslySetInnerHTML={{ __html: `" ${quote} "` }}
        />
      </blockquote>
    </div>
  );
}