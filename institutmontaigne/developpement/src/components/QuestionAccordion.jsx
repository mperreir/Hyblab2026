import { useState, useRef, useCallback, useEffect } from 'react';

export default function QuestionAccordion({ questions, intervenants }) {
  const [openIndex, setOpenIndex] = useState(null);
  const questionRefs = useRef([]);

  const openQuestion = useCallback((idx) => {
    setOpenIndex(idx);
    // Scroll to the question header after a tick
    setTimeout(() => {
      questionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  const toggle = (i) => {
    if (openIndex === i) {
      setOpenIndex(null);
    } else {
      openQuestion(i);
    }
  };

  const openNext = useCallback(() => {
    setOpenIndex(prev => {
      const next = prev !== null && prev < questions.length - 1 ? prev + 1 : null;
      if (next !== null) {
        setTimeout(() => {
          questionRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      return next;
    });
  }, [questions.length]);

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-xs font-sans uppercase tracking-[0.2em] text-ink/40 mb-10">
          Les questions du débat
        </h2>

        <div className="divide-y divide-ink/10">
          {questions.map((q, i) => (
            <QuestionItem
              key={i}
              ref={el => questionRefs.current[i] = el}
              index={i}
              question={q}
              intervenants={intervenants}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              onFinish={openNext}
              isLast={i === questions.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { forwardRef } from 'react';

const QuestionItem = forwardRef(function QuestionItem(
  { index, question, intervenants, isOpen, onToggle, onFinish, isLast },
  ref
) {
  const scrollContainerRef = useRef(null);
  const [activeSnap, setActiveSnap] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const touchStartY = useRef(0);
  const endScrollCount = useRef(0);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setActiveSnap(0);
      setAtEnd(false);
      endScrollCount.current = 0;
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  }, [isOpen]);

  // Track which snap is active
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isOpen) return;

    const handleScroll = () => {
      const cards = container.querySelectorAll('[data-snap]');
      const containerRect = container.getBoundingClientRect();
      let closest = 0;
      let minDist = Infinity;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.top - containerRect.top);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      setActiveSnap(closest);
      const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      setAtEnd(isBottom);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Wheel: detect scroll past end
  const handleWheel = useCallback((e) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;

    if (isBottom && e.deltaY > 0) {
      endScrollCount.current += 1;
      if (endScrollCount.current >= 2) {
        e.preventDefault();
        endScrollCount.current = 0;
        if (!isLast) {
          onFinish();
        } else {
          onToggle();
        }
      }
    } else {
      endScrollCount.current = 0;
    }
  }, [onFinish, onToggle, isLast]);

  // Touch: detect swipe past end
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = useCallback((e) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const delta = touchStartY.current - e.changedTouches[0].clientY;
    const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;

    if (isBottom && delta > 60) {
      if (!isLast) {
        onFinish();
      } else {
        onToggle();
      }
    }
  }, [onFinish, onToggle, isLast]);

  const getIntervenantInfo = (id) => intervenants.find(p => p.id === id);

  const totalCards = question.dialogue.length;

  return (
    <div ref={ref} className="scroll-mt-4">
      {/* Question header button */}
      <button
        onClick={onToggle}
        className={`w-full text-left py-5 md:py-7 flex items-start gap-3 md:gap-5 group transition-colors duration-200 ${isOpen ? 'pb-4' : 'hover:bg-ink/[0.015]'}`}
      >
        <span className="shrink-0 w-7 text-right text-sm font-sans tabular-nums text-ink/30 mt-0.5">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-base md:text-lg font-serif leading-snug flex-1 text-ink/90 group-hover:text-navy transition-colors">
          {question.question}
        </span>
        <span className={`shrink-0 w-6 h-6 rounded-full border border-ink/15 flex items-center justify-center text-sm transition-all duration-300 mt-0.5 ${isOpen ? 'bg-navy text-white border-navy rotate-45' : 'text-ink/40'}`}>
          +
        </span>
      </button>

      {/* Dialogue panel */}
      {isOpen && (
        <div className="relative mb-4 animate-slide-down">
          {/* Progress bar */}
          <div className="flex items-center gap-2 px-4 pb-4">
            <div className="flex gap-1 flex-1">
              {question.dialogue.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                    i <= activeSnap ? 'bg-navy' : 'bg-ink/10'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-sans text-ink/30 tabular-nums shrink-0">
              {activeSnap + 1}/{totalCards}
            </span>
          </div>

          {/* Scroll-snap container */}
          <div
            ref={scrollContainerRef}
            className="dialogue-scroll h-[70vh] md:h-[75vh] overflow-y-auto snap-y snap-mandatory rounded-xl bg-offwhite"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {question.dialogue.map((block, j) => {
              const info = getIntervenantInfo(block.intervenant);
              const isFirst = block.type === 'interlocuteur1';

              return (
                <DialogueCard
                  key={j}
                  block={block}
                  info={info}
                  isFirst={isFirst}
                  index={j}
                />
              );
            })}

            {/* End sentinel */}
            <div data-snap className="snap-start min-h-[70vh] md:min-h-[75vh] flex items-center justify-center px-6">
              <div className="text-center">
                <div className="w-12 h-px bg-ink/10 mx-auto mb-6" />
                <p className="text-sm font-sans text-ink/30">
                  {isLast ? 'Fin du débat' : 'Continuer vers la question suivante'}
                </p>
                <button
                  onClick={isLast ? onToggle : onFinish}
                  className="mt-4 text-xs font-sans text-navy underline underline-offset-4 hover:text-accent-red transition-colors"
                >
                  {isLast ? 'Revenir aux questions' : 'Question suivante →'}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom hint */}
          {atEnd && !isLast && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-sans text-ink/25 animate-pulse">
              ↓ Défilez pour continuer
            </div>
          )}
        </div>
      )}
    </div>
  );
});

function DialogueCard({ block, info, isFirst, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3, root: el.closest('.dialogue-scroll') }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-snap
      className="snap-start min-h-[70vh] md:min-h-[75vh] flex items-center px-5 md:px-10 py-8"
    >
      <div
        className={`max-w-2xl mx-auto w-full transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Speaker indicator */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-sans font-medium ${
            isFirst ? 'bg-navy' : 'bg-accent-red'
          }`}>
            {info?.nom.split(' ').map(w => w[0]).join('')}
          </div>
          <div>
            <p className={`text-sm font-sans font-medium ${isFirst ? 'text-navy' : 'text-accent-red'}`}>
              {info?.nom}
            </p>
            <p className="text-[10px] font-sans text-ink/35 leading-tight">{info?.titre}</p>
          </div>
        </div>

        {/* Content */}
        <div className={`border-l-2 pl-5 md:pl-7 ${isFirst ? 'border-navy/20' : 'border-accent-red/20'}`}>
          {block.contenu.map((para, k) => (
            <p key={k} className="mb-4 last:mb-0 text-[15px] md:text-base leading-[1.85] text-ink/80 font-serif">
              {para}
            </p>
          ))}
        </div>

        {/* Pull quote */}
        {block.citation && (
          <blockquote className={`mt-8 pl-5 md:pl-7 border-l-2 ${isFirst ? 'border-navy' : 'border-accent-red'}`}>
            <p className={`text-lg md:text-xl font-serif font-bold italic leading-snug ${isFirst ? 'text-navy' : 'text-accent-red'}`}>
              « {block.citation} »
            </p>
          </blockquote>
        )}
      </div>
    </div>
  );
}
