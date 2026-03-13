import { useEffect, useState, useRef, useCallback } from 'react';
import { PATH_PUBLIC } from '../../data/debate';

export default function Quiz({ meta = {}, onScoreChange }) {
  const [response, setResponse] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    if (onScoreChange) {
      onScoreChange(response);
    }
  }, [onScoreChange, response]);

  const getValueFromClientX = useCallback((clientX) => {
    const track = trackRef.current;
    if (!track) return undefined;
    const rect = track.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(0, Math.min(x, rect.width));
    return Math.round((clamped / rect.width) * 100);
  }, []);

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
    if (val !== undefined) setResponse(val);
  }, [getValueFromClientX]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const val = getValueFromClientX(e.clientX);
      if (val !== undefined) setResponse(val);
    };
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const val = getValueFromClientX(e.touches[0].clientX);
      if (val !== undefined) setResponse(val);
    };
    const handleUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, getValueFromClientX]);

  // Interpolate thumb colour: bordeaux (#7B1E3A) left → rose (#E8A0B0) right
  const r = Math.round(123 + (232 - 123) * (response / 100));
  const g = Math.round(30 + (160 - 30) * (response / 100));
  const b = Math.round(58 + (176 - 58) * (response / 100));
  const thumbColor = `rgb(${r},${g},${b})`;

  const pct = response / 100;

  return (
    <div className="w-full pt-10 px-6 bg-white print:!hidden">
      <div className="max-w-2xl mx-auto">

        {/* Title */}
        <h2
          className="text-center mb-10 leading-tight"
          style={{
            fontFamily: 'Helvetica, "Times New Roman", serif',
            fontSize: 'clamp(1.25rem, 3vw, 1.85rem)',
            fontWeight: 700,
            color: '#8C2D42',
          }}
        >
          {'QUEL EST VOTRE AVIS SUR LE SCRUTIN PROPORTIONNEL ?'}
        </h2>

        {/*
          Outer wrapper has horizontal padding = half the cap icon width so the
          overflowing SVG caps are visible but don't cause layout overflow.
          We use overflow:visible on every ancestor so nothing clips them.
        */}
        <div
          className="relative select-none"
          style={{ paddingLeft: 28, paddingRight: 28, overflow: 'visible' }}
        >
          {/* ── Track zone (ref for hit-testing) ── */}
          <div
            ref={trackRef}
            onClick={handleTrackClick}
            style={{
              position: 'relative',
              height: 70,
              overflow: 'visible',
              cursor: isDragging ? 'grabbing' : 'pointer',
            }}
          >
            {/* Gradient bar — sits flush with the track div's left/right edges */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: 15,
                transform: 'translateY(-50%)',
                borderRadius: 9999,
                background:
                  'linear-gradient(to right, #8C2D42 0%, #A84060 20%, #C87080 40%, #E8C0C8 65%, #FFD1DB 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Barre gauche */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 15,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            >
              <img src={`${PATH_PUBLIC}/icons/BarreGauche.svg`} alt="" style={{ height: 44, width: 'auto', display: 'block' }} />
            </div>

            {/* Barre droite */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: 15,
                transform: 'translate(50%, -50%)',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            >
              <img src={`${PATH_PUBLIC}/icons/BarreDroite.svg`} alt="" style={{ height: 44, width: 'auto', display: 'block' }} />
            </div>

            {/* Draggable thumb */}
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{
                position: 'absolute',
                top: '50%',
                left: `${pct * 100}%`,
                transform: 'translate(-50%, -50%)',
                width: 58,
                height: 58,
                borderRadius: '50%',
                background: 'white',
                border: `5px solid ${thumbColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isDragging ? 'grabbing' : 'grab',
                boxShadow: isDragging
                  ? '0 6px 20px rgba(123,30,58,0.22)'
                  : '0 2px 8px rgba(123,30,58,0.12)',
                transition: isDragging ? 'none' : 'box-shadow 0.2s',
                zIndex: 20,
                userSelect: 'none',
                touchAction: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'Helvetica, serif',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: thumbColor,
                  lineHeight: 1,
                  userSelect: 'none',
                  transition: 'color 0.15s',
                }}
              >
                {response}%
              </span>
            </div>
          </div>

          {/* Labels */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginTop: 12,
            }}
          >
            <span style={{ fontFamily: 'Helvetica, serif', fontWeight: 700, fontSize: '1.05rem', color: '#8C2D42', minWidth: 60 }}>
              Contre
            </span>
            <span style={{ fontFamily: 'Helvetica, serif', fontWeight: 700, fontSize: '1.05rem', color: '#8C2D42', textAlign: 'center' }}>
              Neutre
            </span>
            <span style={{ fontFamily: 'Helvetica, serif', fontWeight: 700, fontSize: '1.05rem', color: '#8C2D42', textAlign: 'right', minWidth: 60 }}>
              Pour
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}