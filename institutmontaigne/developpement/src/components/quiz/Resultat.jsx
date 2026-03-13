import { useEffect, useRef, useState } from 'react';

// ─── Couleurs ─────────────────────────────────────────────────────────────────

const C_PRIMARY = '#00483B';   // Vert de base
const C_NEUTRAL = '#9CA3AF';   // Gris pour le curseur « Avant »

// ─── Constantes de layout de la barre ─────────────────────────────────────────

const TRACK_H = 64;  // hauteur totale de la zone barre + curseurs
const BAR_H   = 8;   // épaisseur de la barre
const BAR_Y   = TRACK_H - BAR_H / 2;  // centre vertical de la barre

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Borne une valeur pour que le curseur ne colle pas aux bords. */
function clamp(v, min = 4, max = 96) {
  return Math.min(Math.max(v, min), max);
}

/** Couleur du curseur selon la position (<40 ou >60 → vert, entre → gris). */
function getCursorColor(value) {
  if (value <= 40 || value >= 60) return C_PRIMARY;
  return C_NEUTRAL;
}

// ─── Sous-composant : curseur sur la barre ────────────────────────────────────

function TrackCursor({ percent, label, ghost = false }) {
  const p = clamp(percent);
  const color = ghost ? C_NEUTRAL : getCursorColor(percent);
  const transition = ghost ? 'none' : 'left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ transition, zIndex: ghost ? 1 : 2 }}>

      {/* Label au-dessus */}
      {label && (
        <span
          className="absolute -translate-x-1/2 text-[10px] font-sans uppercase tracking-widest whitespace-nowrap"
          style={{ left: `${p}%`, top: 0, color, fontWeight: 700 }}
        >
          {label}
        </span>
      )}

      {/* Tige verticale */}
      <div
        className="absolute -translate-x-1/2"
        style={{ left: `${p}%`, top: BAR_Y - 30, width: 2, height: 30, background: color, transition }}
      />

      {/* Cercle du curseur */}
      <div
        className="absolute w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${p}%`, top: BAR_Y, background: color, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', transition }}
      />
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function Resultat({ initialScore, finalScore }) {
  const [animatedPercent, setAnimatedPercent] = useState(null);
  const hasAnimated = useRef(false);

  // Animation : affiche initialScore puis glisse vers finalScore
  useEffect(() => {
    if (initialScore == null || finalScore == null || hasAnimated.current) return;
    setAnimatedPercent(initialScore);
    const timer = setTimeout(() => {
      setAnimatedPercent(finalScore);
      hasAnimated.current = true;
    }, 400);
    return () => clearTimeout(timer);
  }, [initialScore, finalScore]);

  if (initialScore == null || finalScore == null) return null;

  const delta = finalScore - initialScore;
  const evolutionLabel =
    delta === 0
      ? 'Position inchangée'
      : delta > 0
        ? `+${delta} pts vers l'accord`
        : `−${Math.abs(delta)} pts vers le désaccord`;

  return (
    <div className="w-full py-10 px-4 flex justify-center">
      <div
        className="w-full max-w-sm rounded-2xl bg-white px-6 pt-7 pb-6"
        style={{ boxShadow: '0 8px 32px rgba(0,72,59,0.13), 0 1.5px 4px rgba(0,72,59,0.07)' }}
      >
        {/* Titre */}
        <h2
          className="text-center font-bold uppercase tracking-[0.06em] mb-2"
          style={{ fontSize: '1.35rem', color: C_PRIMARY }}
        >
          Votre position
        </h2>

        {/* Barre + curseurs */}
        <div className="relative w-full" style={{ height: TRACK_H }}>
          {/* Barre horizontale (couleur unie) */}
          <div
            className="absolute left-0 right-0 rounded-full"
            style={{ bottom: 0, height: BAR_H, background: C_PRIMARY }}
          />
          {/* Curseur « Avant » (gris, visible uniquement s'il y a eu un changement) */}
          {delta !== 0 && <TrackCursor percent={initialScore} label="Avant" ghost />}
          {/* Curseur actuel (animé) */}
          {animatedPercent !== null && <TrackCursor percent={animatedPercent} />}
        </div>

        {/* Labels Contre / Pour */}
        <div className="flex justify-between mt-2 mb-6">
          <span className="text-xs font-bold" style={{ color: C_PRIMARY }}>Contre</span>
          <span className="text-xs font-bold" style={{ color: C_PRIMARY }}>Pour</span>
        </div>

        {/* Score + Évolution */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div
              className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ border: `2px solid ${C_PRIMARY}`, color: C_PRIMARY }}
            >
              Score
            </div>
            <p className="mt-2 font-bold" style={{ color: C_PRIMARY }}>{finalScore}%</p>
          </div>
          <div>
            <div
              className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ border: `2px solid ${C_PRIMARY}`, color: C_PRIMARY }}
            >
              Évolution
            </div>
            <p className="mt-2 font-bold" style={{ color: C_PRIMARY }}>{evolutionLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}