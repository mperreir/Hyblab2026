import { useEffect, useRef, useState } from 'react';

export default function Scrollytelling({ accroches }) {
  return (
    <section className="bg-offwhite">
      {accroches.map((phrase, i) => (
        <AccrocheSlide key={i} phrase={phrase} index={i} total={accroches.length} />
      ))}
    </section>
  );
}

function AccrocheSlide({ phrase, index, total }) {
  const ref = useRef(null);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setRatio(entry.intersectionRatio),
      { threshold: Array.from({ length: 20 }, (_, i) => i / 19) }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Fade in as it enters, fade out as it leaves
  const opacity = ratio < 0.5 ? ratio * 2 : 1;
  const translateY = (1 - Math.min(ratio * 2, 1)) * 30;

  return (
    <div
      ref={ref}
      className="min-h-[80vh] md:min-h-screen flex items-center justify-center px-8 md:px-16"
    >
      <div className="max-w-3xl text-center" style={{ opacity, transform: `translateY(${translateY}px)` }}>
        {/* Index pip */}
        <div className="flex items-center justify-center gap-1.5 mb-8">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-500 ${
                i === index ? 'w-6 h-1.5 bg-navy' : 'w-1.5 h-1.5 bg-navy/20'
              }`}
            />
          ))}
        </div>

        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-[1.2] text-navy">
          {phrase}
        </p>

        {/* Decorative line */}
        <div className="mt-8 mx-auto w-12 h-px bg-navy/15" />
      </div>
    </div>
  );
}
