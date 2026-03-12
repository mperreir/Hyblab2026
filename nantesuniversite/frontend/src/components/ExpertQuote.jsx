import DotPattern from './DotPattern';
import portrait from '../assets/colin.png';
import portraitOverlay from '../assets/u_under_colin.svg';


// Section starts at absolute top=300; child positions are section-relative.
export default function ExpertQuote() {
  return (
    <section className="absolute top-[300px] left-0 right-0">
      {/* Portrait photo: abs left=158, top=312 → section top=12 */}
      <div className="absolute left-[158px] top-[12px] w-[442px] h-[373px] overflow-hidden">
        <img src={portrait} alt="Portrait de Colin de la Higuera" className="w-full h-full object-cover" />
      </div>

      {/* Colorful overlay on portrait: abs left=134, top=514 → section top=214 */}
      <div className="absolute left-[134px] top-[214px] w-[479px] h-[281px] pointer-events-none">
        <img src={portraitOverlay} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Left decorative dot pattern: abs left=583, top=372 → section top=72 */}
      <div className="absolute left-[583px] top-[72px]">
        <DotPattern dotSize={22} />
      </div>

      {/* Italic quote: abs left=736, top=410 → section top=110 */}
      <p className="absolute left-[736px] top-[110px] w-[925px] h-[135px] italic text-black text-[36px] leading-normal font-sans">
        &thinsp;Je m&apos;en sors habituellement en observant que ce qu&apos;on
        entend par intelligence est mouvant et qu&apos;au fur du temps, des
        activités qu&apos;on tenait pour intelligentes ne le sont plus.&thinsp;
      </p>

      <div className="absolute left-[1270px] top-[364px] w-[24px] h-[24px] bg-[#3552ff]" />

      <div className="absolute left-[696px] top-[350px] w-[943px] text-right text-black font-sans">
        <p className="font-bold text-[36px] mb-0">Colin de la Higuera</p>
        <p className="text-[30px] underline mb-0">Professeur à l&apos;Université de Nantes</p>
        <p className="text-[30px] underline">Titulaire de la Chaire UNESCO RELIA</p>
      </div>

      <div className="absolute left-[1673px] top-[161px]">
        <DotPattern dotSize={22} mirror />
      </div>

    </section>
  );
}
