import { useEffect, useRef, useState } from 'react';
import debateDate from '../../data/debate.jsx';

// ─── Couleur principale ───────────────────────────────────────────────────────

const COLOR = '#00483B';

// ─── Constantes de la pile de cartes ──────────────────────────────────────────

const STACK_OFFSET_Y   = 12;   // décalage vertical entre les cartes empilées
const STACK_OFFSET_X   = 8;    // décalage horizontal
const VISIBLE_DEPTH    = 3;    // nombre de cartes visibles dans la pile
const SWIPE_MIN_X      = 100;  // distance minimale de swipe horizontal (px)
const SWIPE_MAX_Y      = 50;   // distance verticale max pour valider un swipe
const OPTION_DELAY_MS  = 140;  // délai avant passage à la question suivante

// ─── Composant principal ──────────────────────────────────────────────────────

export default function QuizFin({ onScoreComputed }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [cardHeight, setCardHeight] = useState(0);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const measureRefs = useRef([]);

  const questions = debateDate.endQuestions;
  const allAnswered = Object.keys(responses).length === questions.length;
  const stackHeight = cardHeight ? cardHeight + STACK_OFFSET_Y * (VISIBLE_DEPTH - 1) : undefined;

  // ── Score ─────────────────────────────────────────────────────────────────

  /** Moyenne inversée des réponses, arrondie au multiple de 10. */
  const calculateScore = () => {
    const scores = Object.entries(responses).map(([qIdx, option]) => {
      const i = questions[qIdx].options.indexOf(option);
      return 100 - (i / (questions[qIdx].options.length - 1)) * 100;
    });
    const raw = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(raw / 10) * 10;
  };

  // ── Gestion des réponses ──────────────────────────────────────────────────

  const handleOptionChange = (questionIndex, option) => {
    setResponses((prev) => ({ ...prev, [questionIndex]: option }));
    if (questionIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(questionIndex + 1), OPTION_DELAY_MS);
    }
  };

  // ── Gestion du swipe ──────────────────────────────────────────────────────

  const onTouchStart = (e) => {
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const onTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const dx = touchStart.x - endX;
    const dy = Math.abs(touchStart.y - endY);

    // Ignorer si le geste est trop court ou trop vertical
    if (Math.abs(dx) < SWIPE_MIN_X || dy > SWIPE_MAX_Y) return;

    if (dx > 0 && currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    if (dx < 0 && currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // ── Mesure de la hauteur des cartes (ResizeObserver) ──────────────────────

  useEffect(() => {
    const updateHeight = () => {
      const heights = measureRefs.current.filter(Boolean).map((el) => el.getBoundingClientRect().height);
      if (heights.length) setCardHeight(Math.ceil(Math.max(...heights)));
    };

    const ro = new ResizeObserver(updateHeight);
    measureRefs.current.filter(Boolean).forEach((el) => ro.observe(el));
    ro.observe(document.documentElement); // gère le show/hide de la barre d'adresse mobile
    updateHeight();

    return () => ro.disconnect();
  }, []);

  // ── Envoi du score quand toutes les questions sont répondues ──────────────

  useEffect(() => {
    if (allAnswered && onScoreComputed) onScoreComputed(calculateScore());
  }, [allAnswered, onScoreComputed, responses]);

  // Ne rien afficher une fois toutes les réponses données
  if (allAnswered) return null;

  // ── Rendu d'une carte (utilisé à la fois pour la mesure et l'affichage) ──

  const renderCard = (question, idx, interactive = false) => (
    <div className="w-full h-full bg-white rounded-[24px] border border-[#D9DFEF] overflow-hidden flex flex-col">

      {/* En-tête vert */}
      <div className="bg-[#00483B] px-6 py-7 sm:px-7 sm:py-8">
        <h1 className="text-white uppercase tracking-[0.02em] text-[1.30rem] sm:text-[1.15rem] font-bold leading-[1.05]">
          Votre avis sur le débat
        </h1>
      </div>

      {/* Corps de la carte */}
      <div className="px-5 sm:px-6 pt-4 pb-6 flex-1 flex flex-col bg-white">

        {/* Barre de progression + compteur */}
        <div className="flex items-center justify-between mb-5">
          <div className="h-1 rounded-full flex-1 mr-3 bg-[#D9DFEF] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${((idx + 1) / questions.length) * 100}%`, backgroundColor: COLOR }}
            />
          </div>
          <span className="px-2.5 py-0.5 rounded-full border text-xs font-medium leading-none" style={{ color: COLOR, borderColor: COLOR }}>
            {idx + 1}/{questions.length}
          </span>
        </div>

        {/* Intitulé de la question */}
        <h2 className="font-semibold leading-[1.08] mb-5 text-[1.2rem] sm:text-[1.10rem]" style={{ color: COLOR }}>
          {question.question}
        </h2>

        {/* Options (radio pills) */}
        <div className="flex-1 space-y-3 pb-4" style={{ pointerEvents: interactive ? 'auto' : 'none' }}>
          {question.options.map((option, optIdx) => {
            const selected = responses[idx] === option;

            // Version non interactive (pour la mesure ghost)
            if (!interactive) {
              return (
                <div
                  key={`ghost-${idx}-${optIdx}`}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-full border bg-white"
                  style={{ borderColor: '#D9DFEF', boxShadow: '0 4px 14px rgba(27, 41, 90, 0.12)' }}
                >
                  <span className="h-4 w-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: COLOR }} />
                  <span className="text-[1.10rem] font-semibold leading-tight" style={{ color: COLOR }}>{option}</span>
                </div>
              );
            }

            // Version interactive
            return (
              <label
                key={`opt-${idx}-${optIdx}`}
                className="flex items-center gap-4 px-4 py-3.5 rounded-full border bg-white cursor-pointer transition-all"
                style={{
                  borderColor: selected ? COLOR : '#D9DFEF',
                  boxShadow: selected ? '0 4px 14px rgba(70,87,198,0.22)' : '0 4px 14px rgba(27,41,90,0.12)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="radio"
                  name={`question-${idx}`}
                  value={option}
                  checked={selected}
                  onChange={() => handleOptionChange(idx, option)}
                  className="sr-only"
                />
                <span
                  className="h-4 w-4 rounded-full border-2 flex-shrink-0"
                  style={{ borderColor: COLOR, backgroundColor: selected ? COLOR : 'transparent' }}
                />
                <span className="text-[1.10rem] sm:text-[1rem] font-semibold leading-tight" style={{ color: COLOR }}>
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ── Rendu principal ───────────────────────────────────────────────────────

  return (
    <div className="relative w-full h-fit max-w-md mx-auto px-3 py-6 sm:py-8 print:!hidden">

      {/* Cartes fantômes (invisibles) pour mesurer la hauteur maximale */}
      <div className="absolute left-0 top-0 -z-10 h-0 w-full overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
        {questions.map((q, idx) => (
          <div key={`measure-${idx}`} ref={(el) => { measureRefs.current[idx] = el; }} className="mb-4 w-full">
            {renderCard(q, idx, false)}
          </div>
        ))}
      </div>

      {/* Pile de cartes */}
      <div>
        <div className="relative w-full" style={{ height: stackHeight || 'auto', minHeight: stackHeight }}>
          <div
            ref={containerRef}
            onTouchStart={(e) => { if (e.target.tagName !== 'INPUT') onTouchStart(e); }}
            onTouchEnd={(e)   => { if (e.target.tagName !== 'INPUT') onTouchEnd(e); }}
            className="absolute inset-0"
            style={{ perspective: '1000px' }}
          >
            {questions.map((_, idx) => {
              const offset = idx - currentIndex;
              if (offset < 0 || offset >= VISIBLE_DEPTH) return null;

              return (
                <div
                  key={idx}
                  className="absolute top-0 left-0 right-0 transition-all duration-500 ease-out"
                  style={{
                    height: cardHeight || 'auto',
                    borderRadius: 24,
                    overflow: 'hidden',
                    transform: `translateY(${offset * STACK_OFFSET_Y}px) translateX(${offset * STACK_OFFSET_X}px) scale(${1 - offset * 0.015})`,
                    zIndex: questions.length - offset,
                    opacity: offset === 0 ? 1 : 0.8,
                    boxShadow: offset === 0
                      ? '0 14px 34px rgba(70,87,198,0.20)'
                      : `0 ${6 + offset * 2}px ${18 + offset * 4}px rgba(70,87,198,${0.14 - offset * 0.03})`,
                    pointerEvents: offset === 0 ? 'auto' : 'none',
                  }}
                >
                  {renderCard(questions[idx], idx, offset === 0)}
                </div>
              );
            })}
          </div>
        </div>

        {/* Indication de swipe */}
        <div className="text-center text-xs mt-5" style={{ color: '#9CA3AF' }}>
          {currentIndex < questions.length - 1 ? '← Balayez pour changer de question →' : 'Une dernière question !'}
        </div>

        {/* Indicateurs de progression */}
        <div className="flex justify-center gap-2 mt-3">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${idx === currentIndex ? 'w-8' : 'w-2'}`}
              style={{
                backgroundColor: idx === currentIndex
                  ? COLOR
                  : responses[idx] ? 'rgba(70,87,198,0.62)' : 'rgba(70,87,198,0.34)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
