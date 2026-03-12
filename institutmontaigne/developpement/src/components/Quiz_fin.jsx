import { useEffect, useRef, useState } from 'react';
import debateDate from '../data/debate.jsx';

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
        .map((element) => element.getBoundingClientRect().height);

      if (heights.length > 0) {
        setCardHeight(Math.ceil(Math.max(...heights)));
      }
    };

    const frame = window.requestAnimationFrame(updateCardHeight);
    window.addEventListener('resize', updateCardHeight);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateCardHeight);
    };
  }, []);

  useEffect(() => {
    if (allQuestionsAnswered && onScoreComputed) {
      onScoreComputed(calculateScore());
    }
  }, [allQuestionsAnswered, onScoreComputed, responses]);

  if (allQuestionsAnswered) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="absolute left-0 top-0 -z-10 w-full max-w-4xl invisible pointer-events-none" aria-hidden="true">
        {questions.map((question, idx) => (
          <div
            key={`measure-${idx}`}
            ref={(element) => {
              measureRefs.current[idx] = element;
            }}
            className="mb-4"
          >
            <div className="w-full bg-white rounded-lg p-5 sm:p-8 border border-navy/10 flex flex-col">
              <div className="absolute top-4 right-4 text-xs font-sans text-navy/40 font-medium">
                {idx + 1}/{questions.length}
              </div>

              <div className="mb-3 text-center flex-shrink-0">
                <span className="inline-block px-4 py-1.5 border border-navy/20 rounded-full text-[11px] font-sans uppercase tracking-[0.2em] text-navy">
                  Votre avis
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-3 flex-shrink-0">Votre position</h1>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-5 flex-shrink-0">
                <div
                  className="bg-navy h-2 rounded-full"
                  style={{ width: `${((idx + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              <h2 className="text-base sm:text-lg font-semibold text-navy mb-4 flex-shrink-0 p-3.5">
                {question.question}
              </h2>

              <div className="flex-1 space-y-2 mb-4">
                {question.options.map((option, optionIdx) => (
                  <div
                    key={optionIdx}
                    className="flex items-start p-3 rounded-lg border-2 border-navy/20 flex-shrink-0"
                  >
                    <div className="mt-1 mr-3 h-4 w-4 rounded-full border border-navy/40 flex-shrink-0"></div>
                    <span className="text-sm font-sans text-navy flex-1">{option}</span>
                  </div>
                ))}
              </div>

              <div className="text-center text-xs text-navy/40 flex-shrink-0">
                {idx < questions.length - 1 ? '← Balayez pour continuer →' : 'Une dernière question !'}
              </div>
            </div>
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
                        ? '0 10px 40px rgba(11, 29, 58, 0.15)' 
                        : `0 ${4 + offset * 2}px ${20 + offset * 5}px rgba(11, 29, 58, ${0.1 - offset * 0.03})`,
                      pointerEvents: offset === 0 ? 'auto' : 'none'
                    }}
                  >
                    <div className="w-full h-full bg-white rounded-lg p-5 sm:p-8 border border-navy/10 flex flex-col">
                      {/* Indicateur de carte */}
                      <div className="absolute top-4 right-4 text-xs font-sans text-navy/40 font-medium">
                        {idx + 1}/{questions.length}
                      </div>

                      {/* Intro */}
                      <div className="mb-3 text-center flex-shrink-0">
                        <span className="inline-block px-4 py-1.5 border border-navy/20 rounded-full text-[11px] font-sans uppercase tracking-[0.2em] text-navy">
                          Votre avis
                        </span>
                      </div>

                      {/* Title */}
                      <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-3 flex-shrink-0">Votre position</h1>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-5 flex-shrink-0">
                        <div
                          className="bg-navy h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((idx + 1) / questions.length) * 100}%` }}
                        ></div>
                      </div>

                      {/* Question Text */}
                      <h2 className="text-base sm:text-lg font-semibold text-navy mb-4 flex-shrink-0">
                        {questions[idx].question}
                      </h2>

                      {/* Options */}
                      <div className="flex-1 space-y-2 mb-4" style={{ pointerEvents: offset === 0 ? 'auto' : 'none' }}>
                        {questions[idx].options.map((option, optIdx) => {
                          const isSelected = responses[idx] === option;
                          return (
                            <label
                              key={optIdx}
                              className={`flex items-start p-3 rounded-lg border-2 transition-all cursor-pointer flex-shrink-0 ${
                                isSelected
                                  ? 'border-navy bg-navy/5'
                                  : 'border-navy/20 hover:border-navy/40 hover:bg-navy/2'
                              }`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                type="radio"
                                name={`question-${idx}`}
                                value={option}
                                checked={isSelected}
                                onChange={() => handleOptionChange(idx, option)}
                                className="mt-1 mr-3 cursor-pointer flex-shrink-0"
                                style={{ accentColor: '#0B1D3A' }}
                              />
                              <span className="text-sm font-sans text-navy flex-1">
                                {option}
                              </span>
                            </label>
                          );
                        })}
                      </div>

                      {/* Swipe Indicator */}
                      {idx === currentIndex && (
                        <div className="text-center text-xs text-navy/40 flex-shrink-0">
                          {currentIndex < questions.length - 1 ? '← Balayez pour continuer →' : 'Une dernière question !'}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dot Indicators - Below cards */}
          <div className="flex justify-center gap-2 mt-8 sm:mt-12">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-navy w-8' : responses[idx] ? 'bg-navy/40 w-2' : 'bg-navy/20 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
