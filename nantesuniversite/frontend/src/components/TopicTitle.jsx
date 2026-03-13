import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import tete from "../assets/tete.svg"
import data from "../data/data.json";
const expertInfo = data.researcher.identity;
export default function TopicTitle() {
  const iconRef = useRef(null);
  const barRef = useRef(null);
  const topicRef = useRef(null);
  const nameRef = useRef(null);
  const subtopicRef = useRef(null);

  useGSAP(() => {
    // Staggered entrance after the header line finishes drawing (0.4s offset)
    const base = 0.4;
    gsap.from(iconRef.current, { opacity: 0, x: -20, duration: 0.6, ease: 'power2.out', delay: base });
    gsap.from(barRef.current, { scaleY: 0, transformOrigin: 'top center', duration: 0.5, ease: 'power2.out', delay: base + 0.1 });
    gsap.from(topicRef.current, { opacity: 0, x: -28, duration: 0.7, ease: 'power2.out', delay: base + 0.15 });
    gsap.from(nameRef.current, { opacity: 0, y: -18, duration: 0.8, ease: 'power3.out', delay: base + 0.25 });
    gsap.from(subtopicRef.current, { opacity: 0, y: 14, duration: 0.7, ease: 'power2.out', delay: base + 0.38 });
  });

  return (
    <>
      {/* Topic icon */}
      <div ref={iconRef} className="absolute left-[71px] top-[202px] w-[66px] h-[57px]">
        <img src={tete} alt="Tete de robot" className="w-full h-full object-fill" />
      </div>

      {/* Blue vertical bar */}
      <div ref={barRef} className="absolute left-[153px] top-[200px] w-[5px] h-[60px] bg-[#3452ff]" />

      {/* Topic name */}
      <div ref={topicRef} className="absolute left-[172px] top-[195px] w-[596px] h-[134px] text-[#3452ff] text-[36px] font-bold leading-[35px]">
        <p className="m-0">{expertInfo.field.split(" ")[0]}<br></br>{expertInfo.field.split(" ")[1]}</p>
      </div>

      {/* Researcher name */}
      <p
        ref={nameRef}
        className="absolute left-[959px] top-[183px] w-[865px] h-[88px] text-[#3452ff] text-[80px] font-bold text-center leading-normal whitespace-nowrap"
        style={{ fontFamily: "'Chakra Petch', sans-serif" }}
      >
        {expertInfo.full_name.toUpperCase()}
      </p>

      {/* Sub-topic */}
      <p
        ref={subtopicRef}
        className="absolute left-[910px] top-[280px] w-[914px] h-[51px] text-[#3452ff] text-[32px] font-medium text-center leading-normal whitespace-nowrap"
        style={{ fontFamily: "'Chakra Petch', sans-serif" }}
      >
        {expertInfo.goal.toUpperCase()}
      </p>
    </>
  );
}
