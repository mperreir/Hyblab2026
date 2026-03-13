import { useEffect, useState, useRef, useCallback } from 'react';

// ─── Config ───────────────────────────────────────────────────────────────────

const DEFAULT_COLORS = {
  left: '#00483B',
  neutral: '#CEDCD9',
  right: '#00483B',
  labels: '#00483B',
};

const COMPARISONS = [
  {
    logo: '/icons/LogoInstitut.svg',
    alt: 'Institut Montaigne',
    value: 30,
    direction: 'contre',
    color: '#08275F',
    text: (pct) =>
      `À la majorité, les lecteur·ices de Montaigne sont à ${pct}% contre.`,
  },
  {
    logo: '/img/LogoFrance.png',
    alt: 'Français',
    value: 75,
    direction: 'pour',
    color: '#872339',
    text: (pct) =>
      `À la majorité, les français·es sont à ${pct}% pour. D'après une étude de Odoxa, 2025.`,
  },
];

// Helpers

const hexToRgb = (hex) => {
  const cleaned = hex.replace('#', '');
  const full = cleaned.length === 3
    ? cleaned.split('').map((c) => `${c}${c}`).join('')
    : cleaned;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
};

const mix = (from, to, t) => ({
  r: Math.round(from.r + (to.r - from.r) * t),
  g: Math.round(from.g + (to.g - from.g) * t),
  b: Math.round(from.b + (to.b - from.b) * t),
});

const getThumbColor = (value, colors) => {
  const l = hexToRgb(colors.left);
  const n = hexToRgb(colors.neutral);
  const r = hexToRgb(colors.right);
  const c = value <= 50 ? mix(l, n, value / 50) : mix(n, r, (value - 50) / 50);
  return `rgb(${c.r},${c.g},${c.b})`;
};

// Comparaison

function ComparisonRow({ logo, alt, text, value, color }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <img
        src={logo}
        alt={alt}
        className="object-contain flex-shrink-0 mt-0.5"
        style={{ width: 32, height: 32 }}
      />
      <p style={{ fontFamily: 'Helvetica, serif', fontSize: '0.82rem', color, lineHeight: 1.45, fontWeight: 500 }}>
        {text(value)}
      </p>
    </div>
  );
}

export default function Quiz({ meta = {}, onScoreChange }) {
  const [response, setResponse] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const trackRef = useRef(null);
  const sliderStep = Math.max(1, meta?.sliderStep ?? 10);

  const colors = {
    left:    meta?.quizColors?.left    ?? DEFAULT_COLORS.left,
    neutral: meta?.quizColors?.neutral ?? DEFAULT_COLORS.neutral,
    right:   meta?.quizColors?.right   ?? DEFAULT_COLORS.right,
    labels:  meta?.quizColors?.labels  ?? DEFAULT_COLORS.labels,
  };

  useEffect(() => {
    if (onScoreChange) onScoreChange(response);
  }, [onScoreChange, response]);

  const snapToStep = useCallback((value) => {
    const snapped = Math.round(value / sliderStep) * sliderStep;
    return Math.max(0, Math.min(100, snapped));
  }, [sliderStep]);

  const getValueFromClientX = useCallback((clientX) => {
    const track = trackRef.current;
    if (!track) return undefined;
    const rect = track.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return snapToStep((x / rect.width) * 100);
  }, [snapToStep]);

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

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging) return;
      const val = getValueFromClientX(e.clientX ?? e.touches?.[0]?.clientX);
      if (val !== undefined) setResponse(val);
    };
    const onTouchMove = (e) => {
      if (!isDragging) return;
      const val = getValueFromClientX(e.touches[0].clientX);
      if (val !== undefined) setResponse(val);
    };
    const onUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setHasInteracted(true);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging, getValueFromClientX]);

  const thumbColor = getThumbColor(response, colors);

  return (
    <div className="w-full pt-10 px-6 bg-white">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <p style={{ fontFamily: 'Helvetica, serif', fontSize: '0.95rem', color: colors.labels, textAlign: 'center', marginBottom: 4 }}>
          Pour commencer,
        </p>
        <h2
          className="text-center mb-8 leading-tight"
          style={{
            fontFamily: 'Helvetica, "Times New Roman", serif',
            fontSize: 'clamp(1.15rem, 3vw, 1.7rem)',
            fontWeight: 700,
            color: colors.labels,
          }}
        >
          AVEZ-VOUS UN AVIS SUR LE SCRUTIN PROPORTIONNEL ?
        </h2>

        {/* Slider */}
        <div className="relative select-none" style={{ paddingLeft: 28, paddingRight: 28, overflow: 'visible' }}>
          <div
            ref={trackRef}
            onClick={handleTrackClick}
            style={{ position: 'relative', height: 70, overflow: 'visible', cursor: isDragging ? 'grabbing' : 'pointer' }}
          >
            {/* Solid bar */}
            <div style={{
              position: 'absolute', top: '50%', left: 0, right: 0, height: 12,
              transform: 'translateY(-50%)', borderRadius: 9999,
              background: colors.left,
              pointerEvents: 'none',
            }} />

            {/* Comparison markers — shown after interaction */}
            {hasInteracted && !isDragging && COMPARISONS.map((c) => (
              <div key={c.alt}>
                {/* Vertical tick — starts at bar center, goes down only */}
                <div style={{
                  position: 'absolute', left: `${c.value}%`, top: '50%',
                  transform: 'translateX(-50%)',
                  width: 2, height: 24,
                  backgroundColor: colors.left, pointerEvents: 'none', zIndex: 6,
                }} />
                {/* Logo — below bar, no circle border */}
                <img
                  src={c.logo} alt={c.alt}
                  style={{
                    position: 'absolute', left: `${c.value}%`, top: '50%',
                    transform: 'translate(-50%, 24px)',
                    width: 36, height: 36,
                    objectFit: 'contain',
                    pointerEvents: 'none', zIndex: 7,
                  }}
                />
              </div>
            ))}

            {/* Thumb — always gray */}
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{
                position: 'absolute', top: '50%', left: `${response}%`,
                transform: 'translate(-50%, -50%)',
                width: 54, height: 54, borderRadius: '50%',
                background: 'white', border: '5px solid #9CA3AF',
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
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            {['Plutôt\ncontre', 'Plutôt\npour'].map((label, i) => (
              <div key={i} style={{ textAlign: i === 0 ? 'left' : 'right' }}>
                {label.split('\n').map((line, j) => (
                  <span key={j} style={{
                    display: 'block',
                    fontFamily: 'Helvetica, serif',
                    fontSize: j === 0 ? '0.8rem' : '1rem',
                    fontWeight: j === 0 ? 400 : 700,
                    color: colors.labels,
                  }}>
                    {line}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Lignes de comparaison — après interaction */}
          {hasInteracted && !isDragging && (
            <div className="mt-5 px-1">
              {COMPARISONS.map((c) => (
                <ComparisonRow
                  key={c.alt}
                  logo={c.logo}
                  alt={c.alt}
                  text={c.text}
                  value={c.value}
                  color={c.color}
                />
              ))}
            </div>
          )}

          {/* Bannière de fin — inside GreenShape */}
          {hasInteracted && !isDragging && (
            <div
              className="mt-6 flex items-center justify-center"
              style={{ position: 'relative', width: '100%', minHeight: 90 }}
            >
              <img
                src="/icons/GreenShape.svg"
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