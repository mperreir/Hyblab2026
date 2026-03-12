import Header from './components/Header';
import Scrollytelling from './components/Scrollytelling';
import QuestionAccordion from './components/QuestionAccordion';
import Quiz from './components/Quiz';
import debateData from './data/debate.jsx';
import Timeline from './components/infographie/Timeline.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Header meta={debateData.meta} />
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
