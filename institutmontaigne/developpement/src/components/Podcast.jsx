import { useState, useRef, useEffect } from 'react';
import { PATH_PUBLIC } from '../data/debate';

export default function Podcast({ src, episode, title, cover }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => setIsPlaying(false);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause(); else audio.play();
    setIsPlaying(!isPlaying);
  };

  const skip = (delta) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + delta));
  };

  const handleWaveClick = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  // Waveform décoratif déterministe
  const bars = Array.from({ length: 60 }, (_, i) => {
    const h = Math.abs(Math.sin(i * 0.42) * 0.55 + Math.sin(i * 1.13) * 0.28 + Math.sin(i * 2.7) * 0.12 + 0.1);
    return Math.max(0.06, Math.min(1, h));
  });

  return (
    <section className="mx-auto max-w-sm bg-white rounded-2xl overflow-hidden shadow-xl my-10 print:!hidden">
      {src && <audio ref={audioRef} src={src} preload="metadata" />}

      <div className="px-5 pt-4 pb-6">
        {/* Titre épisode */}
        <p className="text-center font-sans font-semibold text-navy text-sm leading-snug mb-5">
          {episode && <span className="block">{episode}</span>}
          {title}
        </p>

        {/* Waveform */}
        <div
          className="flex items-center gap-[2px] h-12 cursor-pointer mb-2"
          onClick={handleWaveClick}
          role="slider"
          aria-label="Progression du podcast"
          aria-valuenow={Math.round(progress * 100)}
        >
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-full transition-colors duration-100"
              style={{
                height: `${h * 100}%`,
                backgroundColor: i / bars.length <= progress ? '#0B1D3A' : '#CBD5E1',
              }}
            />
          ))}
        </div>

        {/* Temps */}
        <div className="flex justify-between text-[11px] font-sans text-ink/50 mb-5 px-0.5">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>

        {/* Contrôles */}
        <div className="flex items-center justify-center gap-8">
          {/* Rewind 15s */}
          <button onClick={() => skip(-15)} aria-label="Reculer de 15 secondes" className="text-navy">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <path
                d="M19 6C12.373 6 7 11.373 7 18s5.373 12 12 12 12-5.373 12-12"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
              />
              <path d="M16 6l3-3.5L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="19" y="22" fontSize="9.5" fontFamily="Inter, sans-serif" fontWeight="700"
                fill="currentColor" textAnchor="middle">15</text>
            </svg>
          </button>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Lecture'}
            className="w-14 h-14 rounded-full bg-accent-blue flex items-center justify-center text-white shadow-md active:scale-95 transition-transform"
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect x="4" y="3" width="4" height="14" rx="1.5"/>
                <rect x="12" y="3" width="4" height="14" rx="1.5"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 3.5l12 6.5-12 6.5V3.5z"/>
              </svg>
            )}
          </button>

          {/* Forward 15s */}
          <button onClick={() => skip(15)} aria-label="Avancer de 15 secondes" className="text-navy">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <path
                d="M19 6C25.627 6 31 11.373 31 18s-5.373 12-12 12S7 24.627 7 18"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
              />
              <path d="M22 6l-3-3.5L22 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="19" y="22" fontSize="9.5" fontFamily="Inter, sans-serif" fontWeight="700"
                fill="currentColor" textAnchor="middle">15</text>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
