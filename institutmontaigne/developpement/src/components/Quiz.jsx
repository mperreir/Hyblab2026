import { useState } from 'react';

export default function Quiz({ meta = {} }) {
  const [response, setResponse] = useState(50);

  const handleSliderChange = (e) => {
    setResponse(parseInt(e.target.value));
  };

  const position = response / 100; // 0 à 1

  // Déterminer la couleur du curseur basée sur la position
  const getCursorColor = () => {
    if (response < 35) return 'bg-accent-blue';
    if (response > 65) return 'bg-accent-red';
    return 'bg-gray-400';
  };

  // Déterminer le message selon la position
  const getPositionMessage = () => {
    if (response < 20) return 'Très en désaccord';
    if (response < 40) return 'Plutôt en désaccord';
    if (response < 60) return 'Neutre';
    if (response < 80) return 'Plutôt d\'accord';
    return 'Très d\'accord';
  };

  return (
    <div className="w-full py-8 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Intro */}
        <div className="mb-6 text-center">
          <span className="inline-block px-4 py-1.5 border border-navy/20 rounded-full text-[11px] font-sans uppercase tracking-[0.2em] mb-4 text-navy">
            Votre avis
          </span>
        </div>

        {/* Slider Container */}
        <div className="bg-white rounded-xl p-6 border border-navy/10">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy leading-tight mb-6 text-center">
            "{meta.titre || 'Le sujet du débat'}"
          </h2>
          <style>{` 
            input[type="range"]::-webkit-slider-thumb {
              appearance: none;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: var(--thumb-color, #9CA3AF);
              border: 3px solid white;
              cursor: grab;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
              transition: transform 0.2s, box-shadow 0.2s, background-color 0.1s;
              opacity: 1;
            }
            input[type="range"]::-webkit-slider-thumb:active {
              cursor: grabbing;
              transform: scale(1.1);
              box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            }
            input[type="range"]::-moz-range-thumb {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: var(--thumb-color, #9CA3AF);
              border: 3px solid white;
              cursor: grab;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
              transition: transform 0.2s, box-shadow 0.2s, background-color 0.1s;
              opacity: 1;
            }
            input[type="range"]::-moz-range-thumb:active {
              cursor: grabbing;
              transform: scale(1.1);
              box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            }
          `}</style>

          {/* Labels */}
          <div className="flex justify-between items-center gap-4 mb-5">
            <div className="flex flex-col items-start gap-1.5">
              <p className="text-xs font-sans font-bold text-navy uppercase tracking-wide">
                ← D'accord 
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <p className="text-xs font-sans font-bold text-navy uppercase tracking-wide">
                Pas d'accord →
              </p>
            </div>
          </div>

          {/* Slider */}
          <div className="relative py-5 flex items-center">
            {/* Track background with gradient */}
            <div className="absolute inset-x-0 top-1/2 h-2.5 bg-gradient-to-r from-accent-blue via-gray-300 to-accent-red rounded-full transform -translate-y-1/2" />

            {/* Slider input */}
            <input
              type="range"
              min="0"
              max="100"
              value={response}
              onChange={handleSliderChange}
              className="relative z-10 w-full appearance-none bg-transparent cursor-pointer py-2.5"
              style={{ '--thumb-color': response < 35 ? '#2563EB' : response > 65 ? '#C41E3A' : '#D1D5DB' }}
            />

            {/* Center marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-3 bg-navy/30 pointer-events-none" />
          </div>

          {/* Position feedback */}
          <div className="mt-6 pt-6 border-t border-navy/10 text-center">
            <p className="text-xs font-sans uppercase tracking-widest text-navy/60 mb-3">Votre position</p>
            
            {/* Big percentage display */}
            <div className="mb-4 text-center">
              <span className="text-5xl font-serif font-bold text-navy">
                {response}
              </span>
              <span className="text-xl font-sans text-navy/60">%</span>
            </div>

            {/* Status message */}
            <div className={`inline-flex items-center justify-center w-56 h-10 px-6 rounded-full font-sans font-bold text-xs uppercase tracking-widest text-white ${
              response < 40 ? 'bg-accent-blue' :
              response > 60 ? 'bg-accent-red' : 'bg-gray-400'
            }`}>
              {getPositionMessage()}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 text-center">
          <p className="text-xs font-sans text-navy/60">
            Glissez le curseur pour vous positionner.
          </p>
        </div>
      </div>
    </div>
  );
}
