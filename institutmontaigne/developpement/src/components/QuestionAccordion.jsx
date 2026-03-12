import { useState, useRef, useCallback, useEffect } from 'react';

export default function QuestionAccordion({ questions, intervenants }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [openDirection, setOpenDirection] = useState('down');
  const questionRefs = useRef([]);
  const lastActionTimeRef = useRef(0);
  const ACTION_LOCK_MS = 650;

  const openQuestion = useCallback((idx) => {
    setOpenDirection('down');
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
    const now = Date.now();
    if (now - lastActionTimeRef.current < ACTION_LOCK_MS) return;
    lastActionTimeRef.current = now;
    setOpenDirection('down');
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

  const openPrev = useCallback(() => {
    const now = Date.now();
    if (now - lastActionTimeRef.current < ACTION_LOCK_MS) return;
    lastActionTimeRef.current = now;
    setOpenDirection('up');
    setOpenIndex(prev => {
      const prevIdx = prev !== null && prev > 0 ? prev - 1 : null;
      if (prevIdx !== null) {
        setTimeout(() => {
          questionRefs.current[prevIdx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      return prevIdx;
    });
  }, []);

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="w-full">
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
            onPrev={openPrev}
            isLast={i === questions.length - 1}
            isFirstItem={i === 0}
            startAtBottom={openIndex === i && openDirection === 'up'}
            color={q.color || '#FF0000'}
            textColor={q.textcolor || '#000000'}
          />
        ))}
      </div>
    </section>
  );
}

import { forwardRef } from 'react';

const QuestionItem = forwardRef(function QuestionItem(
  { index, question, intervenants, isOpen, onToggle, onFinish, onPrev, isLast, isFirstItem, startAtBottom, color, textColor },
  ref
) {
  const scrollContainerRef = useRef(null);
  const [activeSnap, setActiveSnap] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const touchStartY = useRef(0);
  const wasAtBottomOnTouchStart = useRef(false);
  const wasAtTopOnTouchStart = useRef(false);
  const endScrollCount = useRef(0);
  const topScrollCount = useRef(0);
  const lastWheelTime = useRef(Date.now());

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setActiveSnap(0); // Will be recalculated by handleScroll anyway
      setAtEnd(false);
      setAtTop(true);
      endScrollCount.current = 0;
      topScrollCount.current = 0;
      lastWheelTime.current = Date.now();
      if (scrollContainerRef.current) {
        if (startAtBottom) {
          // Attendre que le conteneur soit bien rendu pour obtenir la bonne hauteur finale
          setTimeout(() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
            }
          }, 10);
        } else {
          scrollContainerRef.current.scrollTop = 0;
        }
      }
    }
  }, [isOpen, startAtBottom]);

  // Track which snap is active
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isOpen) return;

    const handleScroll = () => {
      const cards = container.querySelectorAll('[data-card]');
      const containerRect = container.getBoundingClientRect();
      let closest = 0;
      let minDist = Infinity;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        // Distance entre le centre du conteneur et le centre de la carte
        const cardCenter = rect.top + rect.height / 2;
        const containerCenter = containerRect.top + containerRect.height / 2;
        const dist = Math.abs(cardCenter - containerCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      setActiveSnap(closest);
      const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      const isTopPos = container.scrollTop <= 10;
      setAtEnd(isBottom);
      setAtTop(isTopPos);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Wheel: detect scroll past end or top
  const handleWheel = useCallback((e) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
    const isTopPos = container.scrollTop <= 10;
    const now = Date.now();
    const timeSinceLast = now - lastWheelTime.current;
    lastWheelTime.current = now;

    if (e.deltaY > 0) { // Scrolling down
      topScrollCount.current = 0;
      if (!isBottom) {
        endScrollCount.current = 0;
      } else {
        // Needs a distinct pause (150ms) to count as a new scroll gesture
        if (timeSinceLast > 150) {
          endScrollCount.current += 1;
        }
        if (endScrollCount.current >= 1 && timeSinceLast > 150) {
          e.preventDefault();
          endScrollCount.current = 0;
          if (!isLast) {
            onFinish();
          } else {
            onToggle();
          }
        }
      }
    } else if (e.deltaY < 0) { // Scrolling up
      endScrollCount.current = 0;
      if (!isTopPos) {
        topScrollCount.current = 0;
      } else {
        // Needs a distinct pause (150ms) to count as a new scroll gesture
        if (timeSinceLast > 150) {
          topScrollCount.current += 1;
        }
        if (topScrollCount.current >= 1 && timeSinceLast > 150) {
          e.preventDefault();
          topScrollCount.current = 0;
          if (!isFirstItem) {
            onPrev();
          } else {
            onToggle();
          }
        }
      }
    }
  }, [onFinish, onPrev, onToggle, isLast, isFirstItem]);

  // Touch: detect swipe past end or top
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    const container = scrollContainerRef.current;
    if (container) {
      wasAtBottomOnTouchStart.current = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      wasAtTopOnTouchStart.current = container.scrollTop <= 10;
    }
  };

  const handleTouchEnd = useCallback((e) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const delta = touchStartY.current - e.changedTouches[0].clientY;
    const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
    const isTopPos = container.scrollTop <= 10;

    if (isBottom && wasAtBottomOnTouchStart.current && delta > 50) {
      if (!isLast) {
        onFinish();
      } else {
        onToggle();
      }
    } else if (isTopPos && wasAtTopOnTouchStart.current && delta < -50) {
      if (!isFirstItem) {
        onPrev();
      } else {
        onToggle();
      }
    }
  }, [onFinish, onPrev, onToggle, isLast, isFirstItem]);

  const getIntervenantInfo = (id) => intervenants.find(p => p.id === id);

  const totalCards = question.dialogue.length;

  return (
    <div
      ref={ref}
      className="scroll-mt-4"
      style={{ position: 'relative', zIndex: 20 + index, marginTop: index === 0 ? 0 : '-13px' }}
    >
      {/* Question header button */}
      <button
        onClick={onToggle}
        style={{
          backgroundColor: color,
          fontSize: `clamp(16px, 1.5vw, 20px)`,
          fontFamily: 'Helvetica, Arial, sans-serif',
        }}
        className="w-full py-10 flex flex-col items-center justify-center gap-3 transition-all duration-200 rounded-t-2xl"
      >
        <span className="max-w-[75%] mx-auto text-base md:text-lg font-bold italic uppercase text-center leading-tight"
          style={{ color: textColor }}
        >
          {question.question}
        </span>
        <svg
          className={`w-4 h-3 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 14 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: textColor }}
        >
          <path d="M1 1L7 7L13 1" />
        </svg>
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

          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            className="dialogue-scroll h-[70vh] md:h-[75vh] overflow-y-auto rounded-xl bg-offwhite"
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
          </div>
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
      data-card
      className="flex items-center px-5 md:px-10 py-5"
    >
      <div
        className={`max-w-2xl mx-auto w-full transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Speaker indicator */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-8 h-8 rounded-full flex aspect-square items-center justify-center text-white text-xs font-sans font-medium ${
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
        <div>
          {block.contenu.map((para, k) => (
            <p key={k} className="mb-4 last:mb-0 text-[15px] md:text-base leading-[1.85] text-ink/80 font-serif">
              {para}
            </p>
          ))}
        </div>

        {/* Pull quote */}
        {block.citation && (
          <blockquote className='mt-8'>
            <p className={`text-lg md:text-xl font-serif font-bold italic leading-snug ${isFirst ? 'text-navy' : 'text-accent-red'}`}>
              « {block.citation} »
            </p>
          </blockquote>
        )}
      </div>
    </div>
  );
}
