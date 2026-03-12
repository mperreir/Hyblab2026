import Hero from './components/Hero.jsx';
import Scrollytelling from './components/Scrollytelling';
import QuestionAccordion from './components/QuestionAccordion';
import Quiz from './components/Quiz';
import debateData from './data/debate.jsx';
import Timeline from './components/infographie/Timeline.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero meta={debateData.meta} />
      <Scrollytelling accroches={debateData.accroches} images={debateData.accrocheImages} />
      <Quiz meta={debateData.meta} />
      <QuestionAccordion
        questions={debateData.questions}
        intervenants={debateData.meta.intervenants}
      />
      <Footer />
    </div>
  );
}
