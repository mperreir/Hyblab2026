import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import tete from "../assets/tete.svg"
import data from "../data/data.json";
const expertInfo = data.researcher.identity;
export default function TopicTitle() {
  const topicRef = useRef(null);

  useGSAP(() => {
    // Slide out from behind the bar (overflow-hidden on parent clips until text emerges)
    gsap.from(topicRef.current, { x: -220, duration: 0.7, ease: 'power2.out', delay: 0.4 });
  });

  return (
    <>
      {/* Topic icon */}
      <div className="absolute left-[71px] top-[202px] w-[66px] h-[57px]">
        <img src={tete} alt="Tete de robot" className="w-full h-full object-fill" />
      </div>

      {/* Blue vertical bar */}
      <div className="absolute left-[153px] top-[200px] w-[5px] h-[60px] bg-[#3452ff]" />

      {/* Topic name — overflow-hidden clips the text while it slides out from the bar */}
      <div className="absolute left-[172px] top-[195px] w-[596px] h-[134px] overflow-hidden">
        <div ref={topicRef} className="text-[#3452ff] text-[36px] font-bold leading-[35px]">
          <p className="m-0">{expertInfo.field.split(" ")[0]}<br />{expertInfo.field.split(" ")[1]}</p>
        </div>
      </div>

      {/* Researcher name */}
      <p
        className="absolute left-[959px] top-[183px] w-[865px] h-[88px] text-[#3452ff] text-[80px] font-bold text-center leading-normal whitespace-nowrap"
        style={{ fontFamily: "'Chakra Petch', sans-serif" }}
      >
        {expertInfo.full_name.toUpperCase()}
      </p>

      {/* Sub-topic */}
      <p
        className="absolute left-[910px] top-[280px] w-[914px] h-[51px] text-[#3452ff] text-[32px] font-medium text-center leading-normal whitespace-nowrap"
        style={{ fontFamily: "'Chakra Petch', sans-serif" }}
      >
        {expertInfo.goal.toUpperCase()}
      </p>
    </>
  );
}
