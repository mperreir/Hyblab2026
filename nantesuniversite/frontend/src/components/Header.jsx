import { useState } from 'react';
import { Link } from 'react-router-dom';
import paroleExpertByNantesLogo from '../assets/paroleExpertByNantesLogo.svg';
import menuIcon from '../assets/menu.svg';
import santeIcon from '../assets/sante.svg';
import territoireEtVilleIcon from '../assets/territoireEtVille.svg';
import teteIcon from '../assets/tete.svg';

function IconEnergies() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="18,3 8,18 15,18 14,29 24,14 17,14" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

function IconMatieres() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="3.5" fill="#6366F1"/>
      <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#6366F1" strokeWidth="1.8" fill="none"/>
      <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#6366F1" strokeWidth="1.8" fill="none" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#6366F1" strokeWidth="1.8" fill="none" transform="rotate(120 16 16)"/>
    </svg>
  );
}

function IconBiologie() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 28C16 28 7 22 7 14C7 9.03 11.03 5 16 5C20.97 5 25 9.03 25 14C25 22 16 28 16 28Z" fill="#34D399" stroke="#059669" strokeWidth="1.5"/>
      <path d="M16 28C16 28 16 14 16 5" stroke="#059669" strokeWidth="1.5"/>
      <path d="M10 11C12 13 20 13 22 11" stroke="#059669" strokeWidth="1.2" fill="none"/>
      <path d="M9 16C11 18 21 18 23 16" stroke="#059669" strokeWidth="1.2" fill="none"/>
    </svg>
  );
}

function IconDroit() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="16" y1="5" x2="16" y2="28" stroke="#92400E" strokeWidth="2" strokeLinecap="round"/>
      <line x1="8" y1="9" x2="24" y2="9" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
      <line x1="8" y1="9" x2="4" y2="18" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="24" y1="9" x2="28" y2="18" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M3 18C3 18 4.5 22 8 22C11.5 22 13 18 13 18Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5"/>
      <path d="M19 18C19 18 20.5 22 24 22C27.5 22 29 18 29 18Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5"/>
      <line x1="12" y1="28" x2="20" y2="28" stroke="#92400E" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

const THEMES = [
  { label: 'Santé',                     icon: santeIcon,            InlineIcon: null },
  { label: 'Énergies et transitions',   icon: null,                 InlineIcon: IconEnergies },
  { label: 'Matières et matériaux',     icon: null,                 InlineIcon: IconMatieres },
  { label: 'Territoires et villes',     icon: territoireEtVilleIcon, InlineIcon: null },
  { label: 'Biologie',                  icon: null,                 InlineIcon: IconBiologie },
  { label: 'Droit et économie',         icon: null,                 InlineIcon: IconDroit },
  { label: 'Intelligence artificielle', icon: teteIcon,             InlineIcon: null },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  function closeMenu() {
    setIsClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
    }, 300);
  }

  return (
    <>
      <header>
        {/* Icône hamburger menu */}
        <div
          className="absolute top-[44px] left-[69px] cursor-pointer z-10"
          onClick={() => setMenuOpen(true)}
        >
          <img src={menuIcon} alt="Menu" width={55} height={44} />
        </div>

        {/* Logo combiné Parole d'Expert·E by Nantes */}
        <Link to="/" className="absolute top-[27px] left-1/2 -translate-x-1/2 cursor-pointer">
          <img src={paroleExpertByNantesLogo} alt="Parole d'Expert·E by Nantes Université" width={382} height={77} />
        </Link>

        {/* Trait horizontal */}
        <div className="absolute left-0 top-[146px] w-full h-px bg-brand-grey" />
      </header>

      {/* Overlay + panneau menu */}
      {menuOpen && (
        <>
          {/* Fond semi-transparent */}
          <div
            className={`fixed inset-0 z-40 bg-black/30 cursor-pointer sidebar-overlay ${isClosing ? 'close' : 'open'}`}
            onClick={closeMenu}
          />

          {/* Panneau thématiques */}
          <div className={`sidebar-panel fixed top-0 left-0 z-50 h-full w-[420px] bg-white flex flex-col pt-[60px] pb-[60px] px-[50px] ${isClosing ? 'close' : 'open'}`}>

            {/* Bouton FERMER */}
            <button
              className="flex items-center gap-3 mb-[60px] text-[28px] font-bold tracking-wide self-start cursor-pointer"
              onClick={closeMenu}
            >
              <span className="text-[32px]">✕</span> FERMER
            </button>

            {/* Titre */}
            <p className="text-[28px] font-bold mb-[32px]">Thématiques</p>

            {/* Liste */}
            <ul className="flex flex-col gap-[24px]">
              {THEMES.map(({ label, icon, InlineIcon }) => (
                <li
                  key={label}
                  className="flex items-center gap-4 text-[26px] cursor-pointer hover:opacity-70 transition-opacity"
                >
                  {icon
                    ? <img src={icon} alt={label} className="w-8 h-8 object-contain" />
                    : InlineIcon
                      ? <InlineIcon />
                      : <span className="w-8" />
                  }
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}