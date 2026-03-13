import { useEffect, useRef, useState } from "react";
import { PATH_PUBLIC } from '../../data/debate';

// Quiz palette
const C_LEFT    = '#00483B';
const C_NEUTRAL = '#9CA3AF';
const C_RIGHT   = '#4657C6';

function clamp(v, min = 4, max = 96) {
  return Math.min(Math.max(v, min), max);
}

function getTrackColor(value) {
  if (value <= 40) {
    return C_LEFT;
  }
  else if (value >= 60) {
    return C_RIGHT;
  }
  return C_NEUTRAL;
}

function TrackCursor({ percent, label, ghost = false, trackCenterY }) {
  const p = clamp(percent);
  const markerColor = ghost ? C_NEUTRAL : getTrackColor(percent);
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        transition: ghost ? 'none' : 'left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: ghost ? 1 : 2,
      }}
    >
      {label && (
        <span
          className="absolute -translate-x-1/2 text-[10px] font-sans uppercase tracking-widest whitespace-nowrap"
          style={{ left: `${p}%`, top: 0, color: ghost ? C_NEUTRAL : markerColor, fontWeight: 700 }}
        >
          {label}
        </span>
      )}
      {/* Style curseurs */}
      <div
        className="absolute -translate-x-1/2"
        style={{
          left: `${p}%`,
          top: trackCenterY - 30,
          width: 2,
          height: 30,
          background: markerColor,
          transition: ghost ? 'none' : 'left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      />
      <div
        className="absolute w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${p}%`,
          top: trackCenterY,
          background: markerColor,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          transition: ghost ? 'none' : 'left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      />
    </div>
  );
}

export default function Resultat({ initialScore, finalScore }) {
  const [animatedPercent, setAnimatedPercent] = useState(null);
  const hasAnimated = useRef(false);

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

  const TRACK_H = 64;
  const BAR_H = 8;
  const BAR_BOTTOM = 0;
  const TRACK_CENTER_Y = TRACK_H - BAR_BOTTOM - BAR_H / 2;

  return (
    <div className="w-full py-10 px-4 flex justify-center">
      <div
        className="w-full max-w-sm rounded-2xl bg-white px-6 pt-7 pb-6"
        style={{ boxShadow: '0 8px 32px rgba(0,72,59,0.13), 0 1.5px 4px rgba(0,72,59,0.07)' }}
      >
        {/* Titre */}
        <h2
          className="text-center font-bold uppercase tracking-[0.06em] mb-2"
          style={{ fontSize: '1.35rem', color: C_RIGHT }}
        >
          Votre position
        </h2>

        {/* Barre + curseurs */}
        <div className="relative w-full" style={{ height: TRACK_H }}>
          {/* Track gradient */}
          <div
            className="absolute left-0 right-0 rounded-full"
            style={{
              bottom: BAR_BOTTOM,
              height: BAR_H,
              background: `linear-gradient(to right, ${C_LEFT} 0%, #CEDCD9 50%, ${C_RIGHT} 100%)`,
            }}
          />
          {/* Curseur avant */}
          {delta !== 0 && <TrackCursor percent={initialScore} label="Avant" ghost trackCenterY={TRACK_CENTER_Y} />}
          {/* Curseur courant */}
          {animatedPercent !== null && <TrackCursor percent={animatedPercent} label="" trackCenterY={TRACK_CENTER_Y} />}
        </div>

        {/* Labels sous la barre */}
        <div className="flex justify-between mt-2 mb-6">
          <span className="text-xs font-bold" style={{ color: C_LEFT }}>Contre</span>
          <span className="text-xs font-bold" style={{ color: C_NEUTRAL }}>Neutre</span>
          <span className="text-xs font-bold" style={{ color: C_RIGHT }}>Pour</span>
        </div>

        {/* Score + évolution affichés en même temps */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div
              className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ border: `2px solid ${C_RIGHT}`, color: C_RIGHT }}
            >
              Score
            </div>
            <p className="mt-2 font-bold" style={{ color: C_RIGHT }}>{finalScore}%</p>
          </div>
          <div>
            <div
              className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ border: `2px solid ${C_RIGHT}`, color: C_RIGHT }}
            >
              Évolution
            </div>
            <p className="mt-2 font-bold" style={{ color: C_RIGHT }}>
              {evolutionLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}