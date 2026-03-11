import { useState, useRef } from 'react';

export default function QuizFin() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef(null);

  const questions = [
    {
      question: "Pensez-vous que la proportionnelle serait bénéfique pour la représentation ?",
      options: [
        "Absolument, c'est la meilleure solution",
        "Plutôt oui, avec quelques ajustements",
        "Neutre, ça dépend du contexte",
        "Plutôt non, le système actuel fonctionne mieux",
        "Pas du tout, c'est une mauvaise idée"
      ]
    },
    {
      question: "Quelle est votre plus grande préoccupation avec cette réforme ?",
      options: [
        "La stabilité gouvernementale pourrait être compromise",
        "Les petits partis auraient trop de pouvoir",
        "Les coûts politiques seraient trop élevés",
        "Les citoyens pourraient être confus par le changement",
        "Je n'ai pas de préoccupation majeure"
      ]
    },
    {
      question: "Seriez-vous en faveur d'une transition progressive ?",
      options: [
        "Oui, c'est la meilleure approche",
        "Peut-être, si les détails sont bien pensés",
        "J'hésite, c'est compliqué",
        "Plutôt un changement complet si c'est nécessaire",
        "Non, maintenons le statu quo"
      ]
    }
  ];

  const currentQuestion = questions[currentIndex];
  const currentResponse = responses[currentIndex];
  const allQuestionsAnswered = Object.keys(responses).length === questions.length;

  // Calculer le score de positionnement
  const calculateScore = () => {
    const scores = Object.entries(responses).map(([qIndex, option]) => {
      const optionIndex = questions[qIndex].options.indexOf(option);
      // Inverser : première option = 100, dernière = 0
      return 100 - (optionIndex / (questions[qIndex].options.length - 1)) * 100;
    });
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  // Déterminer le message selon le score
  const getPositionMessage = () => {
    const score = calculateScore();
    if (score < 20) return 'Très en désaccord';
    if (score < 40) return 'Plutôt en désaccord';
    if (score < 60) return 'Neutre';
    if (score < 80) return 'Plutôt d\'accord';
    return 'Très d\'accord';
  };

  const handleOptionChange = (option) => {
    setResponses({
      ...responses,
      [currentIndex]: option
    });
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getAnswerColor = (option) => {
    if (currentResponse === option) {
      return 'border-navy bg-navy/5';
    }
    return 'border-navy/20 hover:border-navy/40 hover:bg-navy/2';
  };

  const score = allQuestionsAnswered ? calculateScore() : 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {!allQuestionsAnswered ? (
        // Mode Questions
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {/* Intro */}
          <div className="mb-6 text-center">
          <span className="inline-block px-4 py-1.5 border border-navy/20 rounded-full text-[11px] font-sans uppercase tracking-[0.2em] mb-4 text-navy">
              Votre avis
          </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-navy mb-6">Votre position</h1>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-navy h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Text */}
          <h2 className="text-xl font-semibold text-navy mb-6">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, idx) => (
              <label
                key={idx}
                className={`flex items-start p-4 rounded-lg border-2 transition-all cursor-pointer ${getAnswerColor(option)}`}
              >
                <input
                  type="radio"
                  name={`question-${currentIndex}`}
                  value={option}
                  checked={currentResponse === option}
                  onChange={() => handleOptionChange(option)}
                  className="mt-1 mr-4 cursor-pointer"
                  style={{ accentColor: '#0B1D3A' }}
                />
                <span className="text-lg font-sans">{option}</span>
              </label>
            ))}
          </div>

          {/* Question Counter */}
          <div className="text-center text-sm text-navy/60 font-medium">
            Question {currentIndex + 1} / {questions.length}
          </div>

          {/* Swipe Indicator */}
          <div className="text-center text-xs text-navy/40 mt-4">
            {currentIndex < questions.length - 1 ? '← Balayez pour naviguer →' : 'Répondez à toutes les questions'}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-navy w-8' : 'bg-navy/30 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        // Mode Score Final
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-navy mb-6">Votre position</h1>

          {/* Progress Bar - Complete */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div className="bg-navy h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>

          {/* Score Display */}
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-5xl font-bold text-navy mb-4">{score}%</div>
            <div
              className={`w-56 h-10 rounded-lg font-semibold text-white flex items-center justify-center transition-all`}
              style={{
                backgroundColor:
                  score < 20
                    ? '#C41E3A'
                    : score < 40
                    ? '#FF6B6B'
                    : score < 60
                    ? '#D1D5DB'
                    : score < 80
                    ? '#93C5FD'
                    : '#2563EB',
              }}
            >
              {getPositionMessage()}
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setResponses({});
              }}
              className="px-6 py-3 bg-navy text-white rounded-lg hover:bg-navy/90 transition-all"
            >
              Recommencer le quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
