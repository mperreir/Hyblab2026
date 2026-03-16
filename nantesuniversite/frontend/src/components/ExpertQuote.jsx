import DotPattern from './DotPattern';
import portraitOverlay from '../assets/u_under_colin.svg';
import data from "../data/data.json";

const expertInfo = data.researcher.identity;
export default function ExpertQuote() {
  return (
    <section className="absolute top-[300px] left-0 right-0">
      {/* Portrait photo */}
      <div className="absolute left-[175px] top-[23px]">
        <div className="w-[380px] h-[370px] overflow-hidden">
          <img src={expertInfo.picture} alt="Portrait de Colin de la Higuera" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Colorful overlay on portrait: abs left=134, top=514 → section top=214 */}
      <div className="absolute left-[134px] top-[218px] w-[479px] h-[281px] pointer-events-none">
        <img src={portraitOverlay} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Left decorative dot pattern: abs left=583, top=372 → section top=72 */}
      <div className="absolute left-[583px] top-[72px]">
        <DotPattern dotSize={22} />
      </div>

      {/* Italic quote: abs left=736, top=410 → section top=110 */}
      <p className="absolute left-[736px] top-[110px] w-[925px] h-[135px] italic text-black text-[36px] leading-normal font-sans">
        {expertInfo.quote}
      </p>

      <div className="absolute left-[1270px] top-[364px] w-[24px] h-[24px] bg-[#3552ff]" />

      <div className="absolute left-[696px] top-[350px] w-[943px] text-right text-black font-sans">
        <p className="font-bold text-[36px] mb-0">{expertInfo.full_name}</p>
        <p className="text-[30px] mb-0">{expertInfo.profession}</p>
        <p className="text-[30px] underline">{expertInfo.position}</p>
      </div>

      <div className="absolute left-[1673px] top-[161px]">
        <DotPattern dotSize={22} mirror />
      </div>

    </section>
  );
}
