import { useState } from 'react';
import paroleExpertByNantesLogo from '../assets/paroleExpertByNantesLogo.svg';
import menuIcon from '../assets/menu.svg';
import santeIcon from '../assets/sante.svg';
import territoireEtVilleIcon from '../assets/territoireEtVille.svg';
import teteIcon from '../assets/tete.svg';

const THEMES = [
  { label: 'Santé',                     icon: santeIcon },
  { label: 'Énergies et transitions',   icon: null },
  { label: 'Matières et matériaux',     icon: null },
  { label: 'Territoires et villes',     icon: territoireEtVilleIcon },
  { label: 'Biologie',                  icon: null },
  { label: 'Droit et économie',         icon: null },
  { label: 'Intelligence artificielle', icon: teteIcon },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="absolute top-[27px] left-1/2 -translate-x-1/2">
          <img src={paroleExpertByNantesLogo} alt="Parole d'Expert·E by Nantes Université" width={382} height={77} />
        </div>

        {/* Trait horizontal */}
        <div className="absolute left-0 top-[146px] w-full h-px bg-brand-grey" />
      </header>

      {/* Overlay + panneau menu */}
      {menuOpen && (
        <>
          {/* Fond semi-transparent */}
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setMenuOpen(false)}
          />

          {/* Panneau thématiques */}
          <div className="fixed top-0 left-0 z-50 h-full w-[420px] bg-white flex flex-col pt-[60px] pb-[60px] px-[50px]">

            {/* Bouton FERMER */}
            <button
              className="flex items-center gap-3 mb-[60px] text-[28px] font-bold tracking-wide self-start"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-[32px]">✕</span> FERMER
            </button>

            {/* Titre */}
            <p className="text-[28px] font-bold mb-[32px]">Thématiques</p>

            {/* Liste */}
            <ul className="flex flex-col gap-[24px]">
              {THEMES.map(({ label, icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-4 text-[26px] cursor-pointer hover:opacity-70 transition-opacity"
                >
                  {icon
                    ? <img src={icon} alt={label} className="w-8 h-8 object-contain" />
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