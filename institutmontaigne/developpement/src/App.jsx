import { useState } from 'react';
import Hero from './components/Hero.jsx';
import Header from './components/Header.jsx';
import Scrollytelling from './components/Scrollytelling';
import QuestionAccordion from './components/QuestionAccordion';
import Quiz from './components/quiz/Quiz.jsx';
import QuizFin from './components/quiz/Quiz_fin.jsx';
import Resultat from './components/quiz/Resultat.jsx';
import Podcast from './components/Podcast';
import debateData from './data/debate.jsx';
import Footer from './components/Footer';
import CTA from './components/CTA.jsx';

export default function App() {
  const [initialScore, setInitialScore] = useState(50);
  const [finalScore, setFinalScore] = useState(null);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header meta={debateData.meta} isQuestionOpen={isQuestionOpen} />
      <Hero meta={debateData.meta} />
      <Scrollytelling accroches={debateData.accroches} images={debateData.accrocheImages} />
      <Quiz meta={debateData.meta} onScoreChange={setInitialScore} />
      <CTA className='w-fit mx-auto my-6'/>
      <QuestionAccordion
        questions={debateData.questions}
        intervenants={debateData.meta.intervenants}
        onQuestionOpenChange={setIsQuestionOpen}
      />
      <QuizFin onScoreComputed={setFinalScore} />
      <Resultat initialScore={initialScore} finalScore={finalScore} />
      <Podcast
        episode={debateData.podcast.episode}
        title={debateData.podcast.title}
        cover={debateData.podcast.cover}
        id="podcast"
      />
      <Footer />
    </div>
  );
}