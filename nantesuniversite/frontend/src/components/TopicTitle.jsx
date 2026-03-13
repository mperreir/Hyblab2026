import tete from "../assets/tete.svg"

export default function TopicTitle() {
  return (
    <>
      {/* Topic icon */}
      <div className="absolute left-[71px] top-[170px] w-[66px] h-[57px]">
        <img src={tete} alt="Tete de robot" className="w-full h-full object-fill" />
      </div>

      {/* Blue vertical bar */}
      <div className="absolute left-[153px] top-[168px] w-[5px] h-[60px] bg-[#3452ff]" />

      {/* Topic name */}
      <div className="absolute left-[172px] top-[163px] w-[596px] h-[134px] text-[#3452ff] text-[36px] font-bold leading-[35px]">
        <p className="m-0">Intelligence <br></br> Artificielle </p>
      </div>

      {/* Researcher name */}
      <p
        className="absolute left-[959px] top-[151px] w-[865px] h-[88px] text-[#3452ff] text-[80px] font-bold text-center leading-normal whitespace-nowrap"
        style={{ fontFamily: "'Chakra Petch', sans-serif" }}
      >
        COLIN DE LA HIGUERA
      </p>

      {/* Sub-topic */}
      <p
        className="absolute left-[910px] top-[248px] w-[914px] h-[51px] text-[#3452ff] text-[32px] font-medium text-center leading-normal whitespace-nowrap"
        style={{ fontFamily: "'Chakra Petch', sans-serif" }}
      >
        {`ACCOMPAGNER LE DÉPLOIEMENT DE L'IA DANS L'ÉDUCATION`}
      </p>
    </>
  );
}
