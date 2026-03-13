import { useEffect, useRef, useState } from "react";
import { PATH_PUBLIC } from '../../data/debate';

function getMessage(score) {
  if (score < 20) return "Très en désaccord";
  if (score < 40) return "Plutôt en désaccord";
  if (score < 60) return "Neutre";
  if (score < 80) return "Plutôt d'accord";
  return "Très d'accord";
}

// Clamp pour que le curseur ne déborde jamais sur les images
function clamp(value, min = 4, max = 96) {
  return Math.min(Math.max(value, min), max);
}

function Cursor({ percent, label, ghost = false }) {
  const clamped = clamp(percent);
  return (
    <div
      className="absolute -translate-x-1/2 flex flex-col items-center"
      style={{
        left: `${clamped}%`,
        bottom: 10,
        transition: ghost ? "none" : "left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
        zIndex: ghost ? 1 : 2,
      }}
    >
      {/* Label au-dessus */}
      <span
        className="mb-1 text-[10px] font-sans uppercase tracking-widest whitespace-nowrap"
        style={{
          color: ghost ? "rgba(11,29,58,0.3)" : "#0B1D3A",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      {/* Tick */}
      <div
        className="w-0.5 rounded-full"
        style={{
          height: 20,
          background: ghost ? "rgba(11,29,58,0.2)" : "#0B1D3A",
        }}
      />
      {/* Diamond */}
      <div
        className="w-2.5 h-2.5 rotate-45 -mt-1"
        style={{
          background: ghost ? "rgba(11,29,58,0.2)" : "#0B1D3A",
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
      ? "Position inchangée"
      : delta > 0
      ? `+${delta} pts vers l'accord`
      : `${Math.abs(delta)} pts vers le désaccord`;

  return (
    <div className="w-full pb-12 px-6 bg-white">
      <div className="max-w-2xl mx-auto">

        <h2 className="text-2xl font-serif font-bold text-navy text-center mb-8">
          Votre position
        </h2>

        {/* Layout : image | barre | image */}
        <div className="flex items-center gap-5">

          <div className="flex-shrink-0 w-14 h-14">
            <img src={`${PATH_PUBLIC}/img/2.png`} alt="Pas d'accord" className="w-full h-full object-cover" />
          </div>

          {/* Barre + curseurs */}
          <div className="relative flex-1" style={{ height: 60 }}>
            {/* Barre centrée verticalement */}
            <div
              className="absolute left-0 right-0 rounded-full"
              style={{
				bottom: 10,
                height: 6,
                background: "linear-gradient(90deg, #3B82F6 0%, #D1D5DB 50%, #EF4444 100%)",
              }}
            />

            {delta !== 0 && (
              <Cursor percent={initialScore} label="Avant" ghost />
            )}

            {animatedPercent !== null && (
              <Cursor percent={animatedPercent} label="" />
            )}
			
          </div>

          <div className="flex-shrink-0 w-14 h-14">
            <img src={`${PATH_PUBLIC}/img/1.png`} alt="D'accord" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Score + évolution */}
        <div className="mt-8 flex items-center justify-center gap-8 text-center">
          <div>
            <p className="text-xs font-sans uppercase tracking-widest text-navy/50 mb-1">Score</p>
            <p className="text-3xl font-serif font-bold text-navy">{finalScore}%</p>
          </div>
          {delta !== 0 && (
            <>
              <div className="w-px h-10 bg-navy/10" />
              <div>
                <p className="text-xs font-sans uppercase tracking-widest text-navy/50 mb-1">Évolution</p>
                <p className="text-base font-sans font-semibold text-navy">{evolutionLabel}</p>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}