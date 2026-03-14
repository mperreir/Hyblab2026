import { useEffect, useRef, useState } from 'react';
import debateDate from '../../data/debate.jsx';

export default function QuizFin({ onScoreComputed }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [cardHeight, setCardHeight] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const containerRef = useRef(null);
  const measureRefs = useRef([]);

  const questions = debateDate.endQuestions;

  const allQuestionsAnswered = Object.keys(responses).length === questions.length;
  const stackOffsetY = 12;
  const visibleStackDepth = 3;
  const stackHeight = cardHeight ? cardHeight + stackOffsetY * (visibleStackDepth - 1) : undefined;

  // Calculer le score de positionnement
  const calculateScore = () => {
    const scores = Object.entries(responses).map(([qIndex, option]) => {
      const optionIndex = questions[qIndex].options.indexOf(option);
      // Inverser : première option = 100, dernière = 0
      return 100 - (optionIndex / (questions[qIndex].options.length - 1)) * 100;
    });
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const handleOptionChange = (questionIndex, option) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionIndex]: option
    }));

    if (questionIndex < questions.length - 1) {
      window.setTimeout(() => {
        setCurrentIndex(questionIndex + 1);
      }, 140);
    }
  };


  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    const currentTouchEnd = e.changedTouches[0].clientX;
    const currentTouchEndY = e.changedTouches[0].clientY;
    handleSwipe(touchStart, currentTouchEnd, touchStartY, currentTouchEndY);
  };

  const handleSwipe = (startX, endX, startY, endY) => {
    const distance = startX - endX;
    const verticalDistance = Math.abs(startY - endY);
    
    // Besoin au moins 100px de mouvement horizontal et moins de 50px de mouvement vertical (pour confirmer que c'est un swipe, pas un scroll)
    if (Math.abs(distance) < 100 || verticalDistance > 50) {
      return;
    }

    const isLeftSwipe = distance > 100;
    const isRightSwipe = distance < -100;

    if (isLeftSwipe && currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const updateCardHeight = () => {
      const heights = measureRefs.current
        .filter(Boolean)
        .map((el) => el.getBoundingClientRect().height);
      if (heights.length > 0) {
        setCardHeight(Math.ceil(Math.max(...heights)));
      }
    };

    // ResizeObserver catches font-load, viewport, and orientation changes
    // that a plain 'resize' listener misses on mobile.
    const ro = new ResizeObserver(updateCardHeight);
    measureRefs.current.filter(Boolean).forEach((el) => ro.observe(el));

    // Also observe the document body width (handles address-bar show/hide).
    ro.observe(document.documentElement);

    updateCardHeight();

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (allQuestionsAnswered && onScoreComputed) {
      onScoreComputed(calculateScore());
    }
  }, [allQuestionsAnswered, onScoreComputed, responses]);

  if (allQuestionsAnswered) return null;

  const QUIZ_BLUE = '#00483B';

  const renderCardBody = (question, idx, isInteractive = false) => (
    <div className="w-full h-full bg-white rounded-[24px] border border-[#D9DFEF] overflow-hidden flex flex-col">
      <div className="bg-[#00483B] px-6 py-7 sm:px-7 sm:py-8">
        <h1 className="text-white uppercase tracking-[0.02em] text-[1.30rem] sm:text-[1.15rem] font-bold leading-[1.05]">
          Votre avis sur le débat
        </h1>
      </div>

      <div className="px-5 sm:px-6 pt-4 pb-6 flex-1 flex flex-col bg-white">
        <div className="flex items-center justify-between mb-5">
          <div className="h-1 rounded-full flex-1 mr-3 bg-[#D9DFEF] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${((idx + 1) / questions.length) * 100}%`, backgroundColor: QUIZ_BLUE }}
            />
          </div>
          <span className="px-2.5 py-0.5 rounded-full border text-xs font-medium leading-none" style={{ color: QUIZ_BLUE, borderColor: QUIZ_BLUE }}>
            {idx + 1}/{questions.length}
          </span>
        </div>

        <h2 className="font-semibold leading-[1.08] mb-5 text-[1.2rem] sm:text-[1.10rem]" style={{ color: QUIZ_BLUE }}>
          {question.question}
        </h2>

        <div className="flex-1 space-y-3 pb-4" style={{ pointerEvents: isInteractive ? 'auto' : 'none' }}>
          {question.options.map((option, optIdx) => {
            const isSelected = responses[idx] === option;

            if (!isInteractive) {
              return (
                <div
                  key={`measure-opt-${idx}-${optIdx}`}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-full border bg-white"
                  style={{ borderColor: '#D9DFEF', boxShadow: '0 4px 14px rgba(27, 41, 90, 0.12)' }}
                >
                  <span className="h-4 w-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: QUIZ_BLUE }}></span>
                  <span className="text-[1.10rem] sm:text-[1.10rem] font-semibold leading-tight" style={{ color: QUIZ_BLUE }}>
                    {option}
                  </span>
                </div>
              );
            }

            return (
              <label
                key={`opt-${idx}-${optIdx}`}
                className="flex items-center gap-4 px-4 py-3.5 rounded-full border bg-white cursor-pointer transition-all"
                style={{
                  borderColor: isSelected ? QUIZ_BLUE : '#D9DFEF',
                  boxShadow: isSelected
                    ? '0 4px 14px rgba(70, 87, 198, 0.22)'
                    : '0 4px 14px rgba(27, 41, 90, 0.12)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="radio"
                  name={`question-${idx}`}
                  value={option}
                  checked={isSelected}
                  onChange={() => handleOptionChange(idx, option)}
                  className="sr-only"
                />
                <span
                  className="h-4 w-4 rounded-full border-2 flex-shrink-0"
                  style={{
                    borderColor: QUIZ_BLUE,
                    backgroundColor: isSelected ? QUIZ_BLUE : 'transparent',
                  }}
                ></span>
                <span className="text-[1.10rem] sm:text-[1rem] font-semibold leading-tight" style={{ color: QUIZ_BLUE }}>
                  {option}
                </span>
              </label>
            );
          })}
        </div>

      </div>
    </div>
  );

  return (
    <div className="relative w-full h-fit max-w-md mx-auto px-3 py-6 sm:py-8 print:!hidden">
      {/* Ghost cards: absolute inside the relative parent so they inherit the exact same width */}
      <div className="absolute left-0 top-0 -z-10 h-0 w-full overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
        {questions.map((question, idx) => (
          <div
            key={`measure-${idx}`}
            ref={(element) => {
              measureRefs.current[idx] = element;
            }}
            className="mb-4 w-full"
          >
            {renderCardBody(question, idx, false)}
          </div>
        ))}
      </div>

      {!allQuestionsAnswered ? (
        // Mode Questions - Card Stack
        <div>
          {/* Card Container with fixed height */}
          <div
            className="relative w-full"
            style={{ height: stackHeight || 'auto', minHeight: stackHeight || undefined }}
          >
            <div
              ref={containerRef}
              onTouchStart={(e) => {
                if (e.target.tagName !== 'INPUT') {
                  handleTouchStart(e);
                }
              }}
              onTouchEnd={(e) => {
                if (e.target.tagName !== 'INPUT') {
                  handleTouchEnd(e);
                }
              }}
              className="absolute inset-0"
              style={{ perspective: '1000px' }}
            >
              {/* Cartes empilées avec décalage visuel */}
              {questions.map((_, idx) => {
                const offset = idx - currentIndex;
                const isVisible = offset >= 0 && offset < 3;
                
                if (!isVisible && offset < 0) return null;
                
                return (
                  <div
                    key={idx}
                    className="absolute top-0 left-0 right-0 transition-all duration-500 ease-out"
                    style={{
                      height: cardHeight || 'auto',
                      transform: `translateY(${offset * stackOffsetY}px) translateX(${offset * 8}px) scale(${1 - offset * 0.015})`,
                      zIndex: questions.length - offset,
                      opacity: offset > 2 ? 0 : offset === 0 ? 1 : 0.8,
                      boxShadow: offset === 0 
                        ? '0 14px 34px rgba(70, 87, 198, 0.20)' 
                        : `0 ${6 + offset * 2}px ${18 + offset * 4}px rgba(70, 87, 198, ${0.14 - offset * 0.03})`,
                      pointerEvents: offset === 0 ? 'auto' : 'none'
                    }}
                  >
                    {renderCardBody(questions[idx], idx, offset === 0)}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Swipe hint — outside the card so it's never clipped */}
          <div className="text-center text-xs mt-5" style={{ color: '#9CA3AF' }}>
            {currentIndex < questions.length - 1 ? '← Balayez pour changer de question →' : 'Une dernière question !'}
          </div>

          {/* Dot Indicators - Below cards */}
          <div className="flex justify-center gap-2 mt-3">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-8' : 'w-2'
                }`}
                style={{ backgroundColor: idx === currentIndex ? QUIZ_BLUE : responses[idx] ? 'rgba(70, 87, 198, 0.62)' : 'rgba(70, 87, 198, 0.34)' }}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
