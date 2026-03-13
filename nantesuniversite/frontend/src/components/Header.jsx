import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import paroleExpertLogo from "../assets/paroleExpertLogo.svg"
import nantesLogo from "../assets/nantesLogo.svg"

export default function Header() {
  const nantesLogoRef = useRef(null);
  const paroleExpertLogoRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    // Logos fade in from above, staggered
    gsap.from([nantesLogoRef.current, paroleExpertLogoRef.current], {
      opacity: 0,
      y: -24,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.15,
    });

    // Line draws in from the left
    gsap.from(lineRef.current, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.1,
      ease: 'power2.out',
      delay: 0.3,
    });
  });

  return (
    <header>
      {/* Logo Nantes Université */}
      <div ref={nantesLogoRef} className="absolute top-[34px] left-[69px] w-[245px] h-[82px]">
        <img
          src={nantesLogo}
          alt="Parole d'Expert"
          className="block w-full h-full object-contain"
        />
      </div>

      {/* Logo Parole d'Expert */}
      <div ref={paroleExpertLogoRef} className="absolute top-[27px] left-[806px] w-[306px] h-[93px]">
        <img
          src={paroleExpertLogo}
          alt="Nantes Université"
          className="block w-full h-full object-contain"
        />
      </div>

      {/* Trait horizontal */}
      <div ref={lineRef} className="absolute left-0 top-[146px] w-full h-px bg-brand-grey" />
    </header >
  );
}
