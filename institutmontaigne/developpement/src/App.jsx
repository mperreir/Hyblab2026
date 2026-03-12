import { useState } from 'react';
import Hero from './components/Hero.jsx';
import Header from './components/Header';
import Scrollytelling from './components/Scrollytelling';
import QuestionAccordion from './components/QuestionAccordion';
import Quiz from './components/Quiz';
import debateData from './data/debate.jsx';
import Timeline from './components/infographie/Timeline.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer';

export default function App() {
  const [initialScore, setInitialScore] = useState(50);
  const [finalScore, setFinalScore] = useState(null);

  return (
    <div className="min-h-screen">
      <Header meta={debateData.meta} />
      <Scrollytelling accroches={debateData.accroches} />
      <Quiz meta={debateData.meta} />
      <QuestionAccordion
        questions={debateData.questions}
        intervenants={debateData.meta.intervenants}
      />

      {/* Footer */}
      <footer className="bg-navy text-white py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/30">
            {debateData.meta.serie}
          </span>
          <p className="mt-3 text-sm font-sans text-white/50">
            {debateData.meta.credits}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="text-xs font-sans text-white/25">{debateData.meta.thematique}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-xs font-sans text-white/25">{debateData.meta.date}</span>
          </div>
          <div className="mt-8 w-16 h-px bg-white/10 mx-auto" />
          <p className="mt-4 text-[10px] font-sans text-white/20">
            Institut Montaigne × Hyblab 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
