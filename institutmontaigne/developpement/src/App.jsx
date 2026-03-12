import { useState } from 'react';
import Hero from './components/Hero.jsx';
import Header from './components/Header.jsx';
import Scrollytelling from './components/Scrollytelling';
import QuestionAccordion from './components/QuestionAccordion';
import Quiz from './components/Quiz';
import QuizFin from './components/Quiz_fin';
import Resultat from './components/Resultat';
import debateData from './data/debate.jsx';
import Footer from './components/Footer';

export default function App() {
  const [initialScore, setInitialScore] = useState(50);
  const [finalScore, setFinalScore] = useState(null);

  return (
    <div className="min-h-screen">
      <Header meta={debateData.meta} />
      <Hero meta={debateData.meta} />
      <Scrollytelling accroches={debateData.accroches} images={debateData.accrocheImages} />
      <Quiz meta={debateData.meta} onScoreChange={setInitialScore} />
      <QuestionAccordion
        questions={debateData.questions}
        intervenants={debateData.meta.intervenants}
      />
      <QuizFin onScoreComputed={setFinalScore} />
      <Resultat initialScore={initialScore} finalScore={finalScore} />
      <Footer />
    </div>
  );
}