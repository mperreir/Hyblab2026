import { useState, useRef, useCallback, useEffect, isValidElement } from 'react';

export default function QuestionAccordion({ questions, intervenants, onQuestionOpenChange }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [openDirection, setOpenDirection] = useState('down');
  const questionRefs = useRef([]);
  const lastActionTimeRef = useRef(0);
  const ACTION_LOCK_MS = 650;

  const NAVBAR_HEIGHT = 61; // px, correspond à la hauteur de la navbar
  const SCROLL_MARGIN = 5; // petit espacement entre le header et la question

  const scrollToWithOffset = (el) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = window.scrollY + rect.top - NAVBAR_HEIGHT - SCROLL_MARGIN;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  // Scroll that tracks the element position during animations (for next/prev)
  const scrollTrackingRef = useRef(null);
  const scrollToTracking = useCallback((el) => {
    if (!el) return;
    // Cancel any previous tracking
    if (scrollTrackingRef.current) cancelAnimationFrame(scrollTrackingRef.current);
    const startTime = Date.now();
    const TRACK_DURATION = 600; // ms, slightly longer than animation
    const tick = () => {
      const rect = el.getBoundingClientRect();
      const top = window.scrollY + rect.top - NAVBAR_HEIGHT - SCROLL_MARGIN;
      window.scrollTo({ top, behavior: 'auto' });
      if (Date.now() - startTime < TRACK_DURATION) {
        scrollTrackingRef.current = requestAnimationFrame(tick);
      }
    };
    scrollTrackingRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    onQuestionOpenChange?.(openIndex !== null);
  }, [openIndex, onQuestionOpenChange]);

  const openQuestion = useCallback((idx) => {
    setOpenDirection('down');
    setOpenIndex(idx);
    // Scroll to the question header after a tick
    setTimeout(() => {
      scrollToWithOffset(questionRefs.current[idx]);
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
            scrollToTracking(questionRefs.current[next]);
        }, 50);
      }
      return next;
    });
  }, [questions.length, scrollToTracking]);

  const openPrev = useCallback(() => {
    const now = Date.now();
    if (now - lastActionTimeRef.current < ACTION_LOCK_MS) return;
    lastActionTimeRef.current = now;
    setOpenDirection('up');
    setOpenIndex(prev => {
      const prevIdx = prev !== null && prev > 0 ? prev - 1 : null;
      if (prevIdx !== null) {
        setTimeout(() => {
            scrollToTracking(questionRefs.current[prevIdx]);
        }, 50);
      }
      return prevIdx;
    });
  }, [scrollToTracking]);

  // Fix mobile viewport height instability (address bar changes)
  useEffect(() => {
    const setVh = () => {
      const h = (window.visualViewport && window.visualViewport.height) ? window.visualViewport.height : window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${h * 0.01}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
      if (window.visualViewport) window.visualViewport.removeEventListener('resize', setVh);
    };
  }, []);

  return (
    <section className="bg-white ">
      <p className="text-center text-montaigne-burgundy text-lg font-helvetica font-bold font-italic mt-16 print:!hidden">LES CHAPITRES DE L'ARTICLE</p> 
      <div className="w-full pt-4 mb-10 px-1">
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
  const ACTION_LOCK_MS = 650;
  const scrollContainerRef = useRef(null);
  const [activeSnap, setActiveSnap] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const touchStartY = useRef(0);
  const ignoreSwipeTouchRef = useRef(false);
  const wasAtBottomOnTouchStart = useRef(false);
  const wasAtTopOnTouchStart = useRef(false);
  const endScrollCount = useRef(0);
  const topScrollCount = useRef(0);
  const lastWheelTime = useRef(Date.now());
  const wheelCooldownRef = useRef(false);
  const cooldownTimerRef = useRef(null);
  const wheelInertiaSettled = useRef(true); // true = prêt à accumuler, false = en attente de stabilisation
  const wheelLastDirection = useRef(0); // 1 = bas, -1 = haut, 0 = indéfini
  const wheelInertiaSettleCount = useRef(0); // nb d'events consécutifs sous le seuil
  const wheelLastAbsDelta = useRef(0); // dernier deltaY absolu observé
  const wheelLastEventTime = useRef(0); // timestamp du dernier event wheel
  const wheelHasSeenDecline = useRef(false); // a-t-on vu l'inertie descendre depuis qu'on est à l'extrémité
  const wheelPeakDelta = useRef(0); // pic max de deltaY observé à l'extrémité

  // Track expansion for closing animation
  const [isExpanded, setIsExpanded] = useState(false);
  // Delay fixed viewport height until after open animation, remove before close animation
  const [isFullHeight, setIsFullHeight] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(130);

  useEffect(() => {
    if (isOpen) {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
      setIsExpanded(true);
      // Apply fixed viewport height after the grid-rows transition finishes
      const timer = setTimeout(() => setIsFullHeight(true), 520);
      return () => clearTimeout(timer);
    } else {
      // Remove fixed height immediately so grid-rows can collapse
      setIsFullHeight(false);
      const timer = setTimeout(() => setIsExpanded(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const showContent = isOpen || isExpanded;

  // Continuously pin scroll to bottom during the opening animation when startAtBottom
  useEffect(() => {
    if (!isOpen || !startAtBottom) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    let rafId;
    const startTime = Date.now();
    const tick = () => {
      if (container.scrollHeight > container.clientHeight) {
        container.scrollTop = container.scrollHeight;
      }
      // Keep pinning for the duration of the grid-rows animation
      if (Date.now() - startTime < 600) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isOpen, startAtBottom]);

  // Reset state when opening
  // Reset wheel state à la fermeture pour garantir un état propre à la réouverture
  useEffect(() => {
    if (!isOpen) {
      clearTimeout(cooldownTimerRef.current);
      wheelCooldownRef.current = false;
      wheelAccumulator.current = 0;
      wheelInertiaSettled.current = false;
      wheelLastDirection.current = 0;
      wheelInertiaSettleCount.current = 0;
      wheelLastAbsDelta.current = 0;
      wheelLastEventTime.current = 0;
      wheelHasSeenDecline.current = false;
    wheelPeakDelta.current = 0;
      wheelPeakDelta.current = 0;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Cooldown initial pour ignorer l'inertie résiduelle de l'action précédente
      wheelCooldownRef.current = true;
      clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(() => {
        // console.log('[wheel] initial cooldown ended');
        wheelCooldownRef.current = false;
        wheelAccumulator.current = 0;
      }, ACTION_LOCK_MS);
      setActiveSnap(0);
      setAtEnd(false);
      setAtTop(true);
      endScrollCount.current = 0;
      topScrollCount.current = 0;
      lastWheelTime.current = Date.now();
      wheelAccumulator.current = 0;
      wheelInertiaSettled.current = false;
      wheelLastDirection.current = 0;
      wheelInertiaSettleCount.current = 0;
      wheelLastAbsDelta.current = 0;
      wheelLastEventTime.current = 0;
      wheelHasSeenDecline.current = false;
    wheelPeakDelta.current = 0;
      wheelPeakDelta.current = 0;
      if (scrollContainerRef.current && !startAtBottom) {
        scrollContainerRef.current.scrollTop = 0;
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

  const wheelAccumulator = useRef(0);

  // Wheel: detect scroll past end or top
  const handleWheel = useCallback((e) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
    const isTopPos = container.scrollTop <= 10;

    // log compact pour ne pas noyer la console
    // // console.log('[wheel]', { deltaY: e.deltaY.toFixed(1), scrollTop: container.scrollTop.toFixed(1), isBottom, isTopPos, cooldown: wheelCooldownRef.current });

    // Détecter changement de direction → reset complet
    const currentDirection = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
    if (currentDirection !== 0 && wheelLastDirection.current !== 0 && currentDirection !== wheelLastDirection.current) {
      // console.log('%c[DIR] 🔄 Changement de sens → reset', 'color: #f87171; font-weight: bold');
      wheelAccumulator.current = 0;
      wheelInertiaSettled.current = false;
      wheelInertiaSettleCount.current = 0;
      wheelLastAbsDelta.current = 0;
      wheelHasSeenDecline.current = false;
    wheelPeakDelta.current = 0;
      wheelPeakDelta.current = 0;
    }
    if (currentDirection !== 0) wheelLastDirection.current = currentDirection;

    // Pas aux extrémités → scroll normal, reset tout
    if (e.deltaY > 0 && !isBottom) { wheelAccumulator.current = 0; wheelInertiaSettled.current = false; wheelHasSeenDecline.current = false; wheelPeakDelta.current = 0; return; }
    if (e.deltaY < 0 && !isTopPos) { wheelAccumulator.current = 0; wheelInertiaSettled.current = false; wheelHasSeenDecline.current = false; wheelPeakDelta.current = 0; return; }

    // Pendant le cooldown : attendre sans accumuler
    if (wheelCooldownRef.current) return;

    // On est à l'extrémité → attendre la fin de l'inertie avant d'accumuler
    const ACCUMULATOR_THRESHOLD = 500;
    // Seuil de descente : l'inertie doit être tombée sous X% du pic pour qu'on accepte un nouveau geste
    const DECLINE_RATIO = 0.2; // 50% du pic = inertie considérée terminée
    const INERTIA_SETTLE_COUNT = 4; // events consécutifs sous le seuil de descente requis

    if (!wheelInertiaSettled.current) {
      const absDelta = Math.abs(e.deltaY);

      // Mettre à jour le pic max observé à l'extrémité
      if (absDelta > wheelPeakDelta.current) {
        wheelPeakDelta.current = absDelta;
        wheelInertiaSettleCount.current = 0; // le pic monte encore, reset le compteur
      }

      const declineThreshold = wheelPeakDelta.current * DECLINE_RATIO;
      const belowDecline = absDelta <= declineThreshold;

      // console.log('%c[INERTIE] ⏳ deltaY=' + absDelta.toFixed(1) + ' pic=' + wheelPeakDelta.current.toFixed(1) + ' seuil=' + declineThreshold.toFixed(1) + ' (' + (belowDecline ? wheelInertiaSettleCount.current+1 : 0) + '/' + INERTIA_SETTLE_COUNT + ')', 'color: #f59e0b');

      if (belowDecline) {
        wheelInertiaSettleCount.current += 1;
        if (wheelInertiaSettleCount.current >= INERTIA_SETTLE_COUNT) {
          wheelInertiaSettled.current = true;
          wheelAccumulator.current = 0;
          wheelInertiaSettleCount.current = 0;
          // console.log('%c[INERTIE] ✅ Inertie terminée (pic=' + wheelPeakDelta.current.toFixed(1) + ' → ' + absDelta.toFixed(1) + ') → prêt à accumuler', 'color: #22c55e; font-weight: bold');
        }
      } else {
        wheelInertiaSettleCount.current = 0;
      }
      return;
    }

    // Inertie stabilisée → accumuler le nouveau geste
    wheelAccumulator.current += Math.abs(e.deltaY);
    const pct = Math.min(100, Math.round(wheelAccumulator.current / ACCUMULATOR_THRESHOLD * 100));
    // console.log('%c[ACCUM] +' + Math.abs(e.deltaY).toFixed(1) + ' → ' + wheelAccumulator.current.toFixed(1) + ' / ' + ACCUMULATOR_THRESHOLD + ' (' + pct + '%)', 'color: #60a5fa');

    if (wheelAccumulator.current < ACCUMULATOR_THRESHOLD) return;

    // Seuil atteint → agir
    e.preventDefault();
    // console.log('%c[ACTION] 🚀 Déclenchée ! accum=' + wheelAccumulator.current.toFixed(1) + ' isBottom=' + isBottom + ' isTopPos=' + isTopPos, 'color: #a855f7; font-weight: bold; font-size: 13px');
    wheelAccumulator.current = 0;

    wheelCooldownRef.current = true;
    wheelInertiaSettled.current = false;
    wheelInertiaSettleCount.current = 0;
    wheelLastAbsDelta.current = 0;
    wheelHasSeenDecline.current = false;
    wheelPeakDelta.current = 0;
    clearTimeout(cooldownTimerRef.current);
    cooldownTimerRef.current = setTimeout(() => {
      // console.log('[wheel] cooldown ended');
      wheelCooldownRef.current = false;
    }, ACTION_LOCK_MS);

    if (e.deltaY > 0) {
      if (!isLast) { 
        // console.log('[wheel] → onFinish()'); 
        onFinish(); }
      else { 
        // console.log('[wheel] → onToggle() last'); 
        onToggle(); }
    } else {
      if (!isFirstItem) { 
        // console.log('[wheel] → onPrev()'); 
        onPrev(); }
      else { 
        // console.log('[wheel] → onToggle() first'); 
        onToggle(); }
    }
  }, [onFinish, onPrev, onToggle, isLast, isFirstItem]);

  // Native wheel listener with { passive: false } to allow preventDefault
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isOpen) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isOpen, handleWheel]);

  // Touch: detect swipe past end or top
  const isBlockedTouchTarget = (target) => {
    return target instanceof Element && !!target.closest('[data-disable-dialogue-swipe="true"]');
  };

  const handleTouchStart = (e) => {
    if (isBlockedTouchTarget(e.target)) {
      ignoreSwipeTouchRef.current = true;
      return;
    }

    ignoreSwipeTouchRef.current = false;
    touchStartY.current = e.touches[0].clientY;
    const container = scrollContainerRef.current;
    if (container) {
      wasAtBottomOnTouchStart.current = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      wasAtTopOnTouchStart.current = container.scrollTop <= 10;
    }
  };

  const handleTouchEnd = useCallback((e) => {
    if (ignoreSwipeTouchRef.current || isBlockedTouchTarget(e.target)) {
      ignoreSwipeTouchRef.current = false;
      return;
    }

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

  const handleTouchCancel = () => {
    ignoreSwipeTouchRef.current = false;
  };

  const getIntervenantInfo = (id) => intervenants.find(p => p.id === id);

  const totalCards = question.dialogue.length;

  return (
    <div
      ref={ref}
      style={isFullHeight ? { height: 'calc(var(--vh, 1vh) * 100 - 61px - 2.5rem)' } : undefined}
      className={`${isFullHeight ? 'flex flex-col' : ''} ${isOpen ? 'mb-10 rounded-2xl' : ''} transition-all duration-500 max-w-3xl mx-auto relative shadow-[0px_0px_13px_4px_rgba(0,_0,_0,_0.2)] rounded-2xl overflow-hidden z-[${20 + index}] ${index === 0 ? '' : '-mt-3'} print:!h-auto print:!overflow-visible print:!mb-10`}
    >
      {/* Question header button */}
      <button
        ref={headerRef}
        onClick={onToggle}
        style={{
          backgroundColor: color,
          fontSize: `clamp(16px, 1.5vw, 20px)`,
          fontFamily: 'Helvetica, Arial, sans-serif',
        }}
        className={`w-full py-10 flex flex-col items-center justify-center gap-3 transition-all duration-200 rounded-t-2xl bg-[${color}] size-4`}
      >
        <span className="max-w-[75%] mx-auto text-base md:text-lg font-bold uppercase text-center leading-tight"
          style={{ color: textColor }}
        >
          {question.question}
        </span>
        <svg
          className={`w-4 h-3 shrink-0 transition-transform duration-300 -translate-y-2 ${isOpen ? 'rotate-180' : ''}`}
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

      {/* Dialogue panel with height animation */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out print:!grid-rows-[1fr] ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        } ${showContent ? 'flex-1 min-h-0' : ''}`}
      >
        <div className="overflow-hidden min-h-0 print:!overflow-visible">
          <div className="relative flex flex-col min-h-0 h-full print:!h-auto print:!overflow-visible">
            {/* Scroll container */}
            <div
              ref={scrollContainerRef}
              className="dialogue-scroll overflow-y-auto overscroll-y-none bg-white print:!overflow-visible print:!max-h-none"
              style={{
                maxHeight: isFullHeight
                  ? '100%'
                  : `calc(var(--vh, 1vh) * 100 - 61px - 2.5rem - ${headerHeight}px)`,
              }}
              onTouchStart={handleTouchStart} 
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchCancel}
            >
              {question.dialogue.map((block, j) => {
                const info = getIntervenantInfo(block.intervenant);
                const intervenantIndex = intervenants.findIndex(p => p.id === block.intervenant);
                return (
                  <DialogueCard
                    key={j}
                    block={block}
                    info={info}
                    intervenantIndex={intervenantIndex}
                    index={j}
                    isLastDialogue={j === question.dialogue.length - 1}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const SPEAKER_COLORS = ['#AC7DD1', '#872339'];

function DialogueCard({ block, intervenantIndex, isLastDialogue }) {
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
    // Fallback: re-check after the grid-rows opening animation finishes,
    // because IntersectionObserver doesn't detect root size changes from CSS transitions.
    const timer = setTimeout(() => {
      obs.unobserve(el);
      obs.observe(el);
    }, 600);
    return () => { clearTimeout(timer); obs.disconnect(); };
  }, []);

  return (
    <div
      ref={ref}
      data-card
      className={`flex items-center px-5 text-justify md:px-10 pb-20 max-w-2xl mx-auto w-full transition-all duration-700 print:!opacity-100 print:!translate-y-0 print:!transform-none ${
           visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
    >
      {/* Content */}
      <div>
        {block.contenu.map((para, k) => {
          const isLeft = block.intervenant === 'morel';
          const borderColor = SPEAKER_COLORS[intervenantIndex] ?? '#888888';
          return isValidElement(para) ? (
            <div
            key={k}
            className={`last:mb-0 text-[15px] md:text-base leading-[1.85] py-3 ${
                isLeft ? 'pl-4 border-l-4' : 'pr-4 border-r-4'
              }`}
              style={{ borderColor }}
              >
              {para}
            </div>
          ) : (
            <p
              key={k}
              className={`last:mb-0 text-[15px] md:text-base leading-[1.85] py-3 ${
                isLeft ? 'pl-4 border-l-4' : 'pr-4 border-r-4'
              }`}
              style={{ borderColor }}
            >
              {para}
            </p>
          );
        })}
        {isLastDialogue && (
          <svg
            className={"w-4 h-3 mt-5 shrink-0 transition-transform mx-auto text-gray-500 duration-300 -translate-y-2"}
            viewBox="0 0 14 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 1L7 7L13 1" />
          </svg>
        )}
      </div>
    </div>
  );
}