import { useEffect, useRef, useState } from 'react';

export default function Header({ meta }) {
  const [visible, setVisible] = useState(false);
  const chapRef = useRef(null);
  const [chapVisible, setChapVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!chapRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setChapVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(chapRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <header className="relative min-h-screen flex flex-col justify-center items-center px-6 bg-navy text-white overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 flex flex-col items-center">
          <span className={`inline-block px-4 py-1.5 border border-white/20 rounded-full text-[11px] font-sans uppercase tracking-[0.2em] mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            {meta.serie}
          </span>

          <h1 className={`text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-bold text-center max-w-4xl leading-[1.15] transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {meta.titre}
          </h1>

          <div className={`mt-12 flex flex-col sm:flex-row gap-8 sm:gap-16 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {meta.intervenants.map((p, i) => (
              <div key={p.id} className="text-center">
                <div className={`w-10 h-0.5 mx-auto mb-3 ${i === 0 ? 'bg-accent-blue' : 'bg-accent-red'}`} />
                <p className="font-sans font-medium text-sm tracking-wide">{p.nom}</p>
                <p className="text-[11px] text-white/50 mt-1.5 max-w-[220px] leading-relaxed">{p.titre}</p>
              </div>
            ))}
          </div>

          <div className={`mt-8 flex items-center gap-3 text-[11px] font-sans text-white/35 transition-all duration-700 delay-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <span>{meta.thematique}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <time>{meta.date}</time>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-[10px] font-sans uppercase tracking-[0.15em] text-white/30">Défiler</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </header>

      {/* Chapeau */}
      <section
        ref={chapRef}
        className={`bg-white py-16 md:py-24 px-6 transition-all duration-1000 ${chapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-base md:text-lg leading-[1.9] text-ink/80 font-serif">
            {meta.chapeau}
          </p>
          <p className="mt-6 text-xs font-sans text-ink/40 uppercase tracking-widest">
            {meta.credits}
          </p>
        </div>
      </section>
    </>
  );
}
