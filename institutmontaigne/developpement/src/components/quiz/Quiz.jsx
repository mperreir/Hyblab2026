import { useEffect, useState, useRef, useCallback } from 'react';

// ─── Couleurs ─────────────────────────────────────────────────────────────────

const COLOR_PRIMARY = '#00483B';  // Vert de base
const COLOR_THUMB   = '#9CA3AF';  // Gris neutre pour le curseur

// ─── Données de comparaison (affichées après interaction) ─────────────────────

const COMPARISONS = [
  {
    logo: './icons/LogoInstitut.svg',
    alt: 'Institut Montaigne',
    value: 30,
    color: '#08275F',
    text: (pct) => `À la majorité, les lecteur·ices de Montaigne sont à ${pct}% contre.`,
  },
  {
    logo: './img/LogoFrance.png',
    alt: 'Français',
    value: 75,
    color: '#872339',
    text: (pct) => `À la majorité, les français·es sont à ${pct}% pour. D'après une étude de Odoxa, 2025.`,
  },
];

// ─── Sous-composant : ligne de comparaison (logo + phrase) ────────────────────

function ComparisonRow({ logo, alt, text, value, color }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <img src={logo} alt={alt} className="object-contain flex-shrink-0 mt-0.5" style={{ width: 32, height: 32 }} />
      <p style={{ fontFamily: 'Helvetica, serif', fontSize: '0.82rem', color, lineHeight: 1.45, fontWeight: 500 }}>
        {text(value)}
      </p>
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function Quiz({ meta = {}, onScoreChange }) {
  const [response, setResponse] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);  // true après le premier relâchement
  const trackRef = useRef(null);

  // Pas du curseur (en %). Configurable via meta.sliderStep, par défaut 10.
  const sliderStep = Math.max(1, meta?.sliderStep ?? 10);

  // Remonte le score au parent à chaque changement
  useEffect(() => {
    if (onScoreChange) onScoreChange(response);
  }, [onScoreChange, response]);

  // ── Helpers slider ────────────────────────────────────────────────────────

  /** Arrondit une valeur au pas le plus proche, bornée [0, 100]. */
  const snapToStep = useCallback(
    (value) => Math.max(0, Math.min(100, Math.round(value / sliderStep) * sliderStep)),
    [sliderStep],
  );

  /** Convertit une position clientX en valeur 0-100 snappée. */
  const getValueFromClientX = useCallback((clientX) => {
    const track = trackRef.current;
    if (!track) return undefined;
    const { left, width } = track.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - left, width));
    return snapToStep((x / width) * 100);
  }, [snapToStep]);

  // ── Événements souris / tactile ───────────────────────────────────────────

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    const val = getValueFromClientX(e.clientX);
    if (val !== undefined) setResponse(val);
  }, [getValueFromClientX]);

  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    const val = getValueFromClientX(e.touches[0].clientX);
    if (val !== undefined) setResponse(val);
  }, [getValueFromClientX]);

  const handleTrackClick = useCallback((e) => {
    const val = getValueFromClientX(e.clientX);
    if (val !== undefined) {
      setResponse(val);
      setHasInteracted(true);
    }
  }, [getValueFromClientX]);

  // Écoute globale du drag (souris + tactile)
  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e) => {
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      const val = getValueFromClientX(clientX);
      if (val !== undefined) setResponse(val);
    };
    const onUp = () => {
      setIsDragging(false);
      setHasInteracted(true);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging, getValueFromClientX]);

  // ── Conditions d'affichage des résultats ──────────────────────────────────

  const showResults = hasInteracted && !isDragging;

  // ── Rendu ─────────────────────────────────────────────────────────────────

  return (
    <div className="w-full pt-10 px-6 bg-white print:!hidden">
      <div className="max-w-2xl mx-auto">

        {/* Titre */}
        <p style={{ fontFamily: 'Helvetica, serif', fontSize: '0.95rem', color: COLOR_PRIMARY, textAlign: 'center', marginBottom: 4 }}>
          Pour commencer,
        </p>
        <h2
          className="text-center mb-8 leading-tight"
          style={{
            fontFamily: 'Helvetica, "Times New Roman", serif',
            fontSize: 'clamp(1.15rem, 3vw, 1.7rem)',
            fontWeight: 700,
            color: COLOR_PRIMARY,
          }}
        >
          AVEZ-VOUS UN AVIS SUR LE SCRUTIN PROPORTIONNEL ?
        </h2>

        {/* Zone slider */}
        <div className="relative select-none" style={{ paddingLeft: 28, paddingRight: 28, overflow: 'visible' }}>

          {/* Piste cliquable / draggable */}
          <div
            ref={trackRef}
            onClick={handleTrackClick}
            style={{ position: 'relative', height: 70, overflow: 'visible', cursor: isDragging ? 'grabbing' : 'pointer' }}
          >
            {/* Barre horizontale (couleur unie) */}
            <div style={{
              position: 'absolute', top: '50%', left: 0, right: 0, height: 12,
              transform: 'translateY(-50%)', borderRadius: 9999,
              background: COLOR_PRIMARY, pointerEvents: 'none',
            }} />

            {/* Marqueurs de comparaison (logos + ticks) — visibles après interaction */}
            {showResults && COMPARISONS.map((c) => (
              <div key={c.alt}>
                {/* Tick vertical (du centre de la barre vers le bas) */}
                <div style={{
                  position: 'absolute', left: `${c.value}%`, top: '50%',
                  transform: 'translateX(-50%)',
                  width: 2, height: 24,
                  backgroundColor: COLOR_PRIMARY, pointerEvents: 'none', zIndex: 6,
                }} />
                {/* Logo sous la barre */}
                <img
                  src={c.logo} alt={c.alt}
                  style={{
                    position: 'absolute', left: `${c.value}%`, top: '50%',
                    transform: 'translate(-50%, 24px)',
                    width: 36, height: 36, objectFit: 'contain',
                    pointerEvents: 'none', zIndex: 7,
                  }}
                />
              </div>
            ))}

            {/* Curseur (toujours gris) */}
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{
                position: 'absolute', top: '50%', left: `${response}%`,
                transform: 'translate(-50%, -50%)',
                width: 54, height: 54, borderRadius: '50%',
                background: 'white', border: `5px solid ${COLOR_THUMB}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: isDragging ? 'grabbing' : 'grab',
                boxShadow: isDragging ? '0 6px 20px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.10)',
                transition: isDragging ? 'none' : 'box-shadow 0.2s',
                zIndex: 20, userSelect: 'none', touchAction: 'none',
              }}
            >
              <span style={{
                fontFamily: 'Helvetica, serif', fontWeight: 700,
                fontSize: '0.9rem', color: '#6B7280', userSelect: 'none',
              }}>
                {response}%
              </span>
            </div>
          </div>

          {/* Labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: -14 }}>
            {['Plutôt\ncontre', 'Plutôt\npour'].map((label, i) => (
              <div key={i} style={{ textAlign: i === 0 ? 'left' : 'right' }}>
                {label.split('\n').map((line, j) => (
                  <span key={j} style={{
                    display: 'block',
                    fontFamily: 'Helvetica, serif',
                    fontSize: j === 0 ? '0.8rem' : '1rem',
                    fontWeight: j === 0 ? 400 : 700,
                    color: COLOR_PRIMARY,
                  }}>
                    {line}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Phrases de comparaison (Institut Montaigne + France) */}
          {showResults && (
            <div className="mt-5 px-1">
              {COMPARISONS.map((c) => (
                <ComparisonRow key={c.alt} logo={c.logo} alt={c.alt} text={c.text} value={c.value} color={c.color} />
              ))}
            </div>
          )}

          {/* Bannière « Merci » dans la GreenShape */}
          {showResults && (
            <div className="mt-6 flex items-center justify-center" style={{ position: 'relative', width: '100%', minHeight: 90 }}>
              <img
                src="./icons/GreenShape.svg"
                alt=""
                style={{
                  width: '65%', height: 'auto',
                  transform: 'rotate(-5deg) translateX(6px)',
                  display: 'block',
                }}
              />
              <p style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Helvetica, serif', fontWeight: 700,
                fontSize: '0.82rem', color: '#C6F9E6', lineHeight: 1.4,
                textAlign: 'center', padding: '0 28px',
                transform: 'rotate(-5deg) translateX(6px)',
              }}>
                Merci, c'est noté,<br />
                rendez-vous à la fin <br />
                de votre lecture&nbsp;!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}