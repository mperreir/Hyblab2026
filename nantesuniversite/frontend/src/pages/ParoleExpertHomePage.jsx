import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturedQuotesSection from '../components/FeaturedQuotesSection';
import ResearcherGallery from '../components/ResearcherGallery';
import ExpertCard from '../components/ExpertCard';
import SiteFooter from '../components/SiteFooter';
import imgBande from '../assets/bande.svg';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ---------- Expert card portrait assets ---------- */
const imgSandrine = 'https://www.figma.com/api/mcp/asset/865e7534-2021-4d79-bd07-44c2a5db616f';
const imgSophie   = 'https://www.figma.com/api/mcp/asset/3752d59c-d55a-4458-89e3-ad7d24aa0e16';
const imgColin    = 'https://www.figma.com/api/mcp/asset/e7ab9536-1ef9-4685-b237-00f9b347dcc5';

const colin_researcher = './images/chercheur1.svg';

const EXPERTS = [
  { portrait: imgSandrine, name: 'Sandrine Huclier',      role: 'Professeur des Université.',                                  joined: 'Joined December 2021', featured: true,  left: 128,  width: 497, height: 278 },
  { portrait: imgSophie,   name: 'Sophie Limou',          role: 'Chercheuse à Nantes Université, spécialiste en génétique',   joined: 'Joined December 2021', featured: false, left: 718,  width: 498, height: 334 },
  { portrait: imgColin,    name: 'Colin de la Higuera',   role: 'Professeur des Université.',                                  joined: 'Joined December 2021', featured: false, left: 1309, width: 497, height: 278 },
];

const DESIGN_WIDTH  = 1920;
const DESIGN_HEIGHT = 3600;
const CARDS_TOP     = 2758;

export default function ParoleExpertHomePage() {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH);

  /* ── Refs ── */
  const heroWrapRef        = useRef(null); // wraps HeroSection
  const quotesWrapRef      = useRef(null); // wraps FeaturedQuotesSection
  const bandeRef           = useRef(null);
  const titleRef           = useRef(null);
  const researchersRef     = useRef(null); // wraps the 4 images
  const researcherImgRefs  = useRef([]);   // individual image refs

  useEffect(() => {
    const onResize = () => setScale(window.innerWidth / DESIGN_WIDTH);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    /* ────────────────────────────────────────────────────────────
     * 1.  FeaturedQuotesSection ne démarre qu'après HeroSection
     * ──────────────────────────────────────────────────────────── */
    if (quotesWrapRef.current) {
      gsap.set(quotesWrapRef.current, { opacity: 0, y: 60 });

      ScrollTrigger.create({
        trigger: quotesWrapRef.current,  // ← trigger sur les quotes elles-mêmes, pas le hero
        start: 'top 90%',                // ← déclenche quand les quotes entrent dans le viewport
        onEnter: () => {
          gsap.to(quotesWrapRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(quotesWrapRef.current, {
            opacity: 0,
            y: 60,
            duration: 0.5,
            ease: 'power2.in',
          });
        },
      });
    }

    /* ────────────────────────────────────────────────────────────
     * 2.  Bande — rebond venant du bas
     * ──────────────────────────────────────────────────────────── */
    if (bandeRef.current) {
      gsap.set(bandeRef.current, { y: 300, opacity: 0 });

      ScrollTrigger.create({
        trigger: bandeRef.current,
        start: 'top 90%',
        onEnter: () =>
          gsap.to(bandeRef.current, {
            y: 0, opacity: 1,
            duration: 1.1,
            ease: 'back.out(2.2)',
          }),
        onLeaveBack: () =>
          gsap.to(bandeRef.current, {
            y: 300, opacity: 0,
            duration: 0.6,
            ease: 'power2.in',
          }),
      });
    }

/* ────────────────────────────────────────────────────────────
 * 3.  Titre — effet mots qui apparaissent
 * ──────────────────────────────────────────────────────────── */
if (titleRef.current) {
  gsap.set(titleRef.current, { opacity: 0, y: 40, scale: 0.95 });

  let splitInstance = null; // garde une référence pour pouvoir revert proprement

  ScrollTrigger.create({
    trigger: titleRef.current,
    start: 'top 85%',
    onEnter: () => {
      // Nettoie l'instance précédente si elle existe
      if (splitInstance) {
        splitInstance.revert();
        splitInstance = null;
      }

      splitInstance = new SplitText(titleRef.current, { type: 'words' });

      gsap.set(splitInstance.words, { opacity: 0, y: 30, rotationX: -40, transformOrigin: '50% 50% -20px' });
      gsap.set(titleRef.current, { opacity: 1, y: 0, scale: 1 });

      gsap.to(splitInstance.words, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: 'back.out(1.8)',
        onComplete: () => {
          splitInstance.revert();
          splitInstance = null;
        },
      });
    },
    onLeaveBack: () => {
      // Tue toute animation en cours sur le titre
      gsap.killTweensOf(titleRef.current);
      if (splitInstance) {
        gsap.killTweensOf(splitInstance.words);
        splitInstance.revert();
        splitInstance = null;
      }
      // Remet le titre dans son état initial pour pouvoir rejouer
      gsap.set(titleRef.current, { opacity: 0, y: 40, scale: 0.95 });
    },
  });
}

    /* ────────────────────────────────────────────────────────────
     * 4.  Images chercheurs — apparition gauche → droite en stagger
     * ──────────────────────────────────────────────────────────── */
    const imgs = researcherImgRefs.current.filter(Boolean);

    if (imgs.length) {
      gsap.set(imgs, { x: -200, opacity: 0 });

      ScrollTrigger.create({
        trigger: researchersRef.current,
        start: 'top 88%',
        onEnter: () =>
          gsap.to(imgs, {
            x: 0, opacity: 1,
            duration: 0.75,
            ease: 'back.out(1.7)',
            stagger: 0.15,
          }),
        onLeaveBack: () =>
          gsap.to(imgs, {
            x: -200, opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            stagger: { each: 0.08, from: 'end' },
          }),
      });
    }

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);
  const navigate = useNavigate();
  return (
    <div
      className="relative bg-white font-sans"
      style={{ zoom: scale, width: DESIGN_WIDTH, height: DESIGN_HEIGHT }}
    >
      <Header />

      {/* ── Hero — référencé pour retarder les quotes ── */}
      <div ref={heroWrapRef}>
        <HeroSection />
      </div>

      {/* ── Featured quotes — invisible jusqu'à la fin du Hero ── */}
      <div ref={quotesWrapRef}>
        <FeaturedQuotesSection />
      </div>

      {/* ── Bande ── */}
      <div
        ref={bandeRef}
        className="absolute"
        style={{ left: -450, top: 2200, width: 2687, height: 543 }}
      >
        <img alt="" src={imgBande} className="block w-full h-full" />
      </div>

      {/* ── Titre machine à écrire ── */}
      <div
        className="absolute"
        style={{ left: 40, top: 2700 }}
      >
        <p
          ref={titleRef}
          className="class-all-researchers-title"
          style={{ opacity: 0 }}
        >
          Découvrir nos chercheurs dans différents domaines
        </p>
      </div>

      {/* ── Galerie chercheurs ── */}
      <div
        ref={researchersRef}
        className="absolute class-all-researchers"
        style={{ top: 2800}}
      >
        {[0, 1, 2].map((i) => (
          <img
            key={i}
            ref={(el) => (researcherImgRefs.current[i] = el)}
            alt=""
            src={colin_researcher}
            onClick={() => navigate('/researcher')}
            className="block w-[589px] h-[250px]"
            style={{ opacity: 0 }}
          />
        ))}
      </div>

      {/* ── Site footer ── */}
      <SiteFooter top={3260} height={340} />
    </div>
  );
}