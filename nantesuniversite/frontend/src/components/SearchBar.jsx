import { useState } from 'react';

/**
 * SearchBar – barre de recherche affichée uniquement sur la page d'accueil.
 *
 * Usage dans ParoleExpertHomePage :
 *   import SearchBar from '../components/SearchBar';
 *   ...
 *   <SearchBar />
 *
 * Props:
 *   onSearch {function}  Callback appelé avec la valeur saisie lors de la soumission
 */
export default function SearchBar({ onSearch }) {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (onSearch) onSearch(query);
    // TODO : brancher sur la logique de recherche réelle
    console.log('Recherche :', query);
  }

  return (
    <div className="flex items-center gap-2">
      {open ? (
        /* Champ de saisie ouvert */
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-b-2 border-black pb-1"
        >
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher…"
            className="bg-transparent outline-none text-[20px] w-[220px] font-medium placeholder-gray-400"
          />
          {/* Loupe — soumettre */}
          <button type="submit" className="cursor-pointer hover:opacity-60 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10.5" cy="10.5" r="7" stroke="black" strokeWidth="2.2"/>
              <line x1="16" y1="16" x2="22" y2="22" stroke="black" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </button>
          {/* Fermer */}
          <button
            type="button"
            onClick={() => { setOpen(false); setQuery(''); }}
            className="cursor-pointer hover:opacity-60 transition-opacity ml-1 text-[20px] font-bold"
          >
            ✕
          </button>
        </form>
      ) : (
        /* Bouton "Rechercher" fermé */
        <button
          className="flex items-center gap-2 cursor-pointer hover:opacity-60 transition-opacity bg-transparent border-none"
          onClick={() => setOpen(true)}
        >
          <span className="text-[22px] font-medium">Rechercher</span>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10.5" cy="10.5" r="7" stroke="black" strokeWidth="2.2"/>
            <line x1="16" y1="16" x2="22" y2="22" stroke="black" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
