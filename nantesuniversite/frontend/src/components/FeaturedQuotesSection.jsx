import { useNavigate } from 'react-router-dom';

/* ---------- Figma asset URLs ---------- */
const imgThierryPiel =
  'https://www.figma.com/api/mcp/asset/44ebea71-b996-4926-a69d-ff8434251980';
const imgImage1 =
  'https://www.figma.com/api/mcp/asset/88a6d824-8e98-4636-9ded-e37907784c55';
const imgImage2 =
  'https://www.figma.com/api/mcp/asset/7433adfa-6ef9-4289-9b4c-03d1c1dd885c';
const imgCalque5 =
  'https://www.figma.com/api/mcp/asset/41bfb5ec-6ca0-413c-8dc1-694162fb2fe9';
const imgCalque6 =
  'https://www.figma.com/api/mcp/asset/1643c228-8c00-4f7f-a95c-03c3ff8098fb';
const imgCalque7 =
  'https://www.figma.com/api/mcp/asset/0af869da-b8ad-4ff1-95b3-ca92b7b391cc';

/* ---------- Shared primitives ---------- */

function BlueBullet({ left, top }) {
  return (
    <div
      className="absolute"
      style={{ left, top, width: 23.833, height: 23.833, background: '#3552ff' }}
    />
  );
}

function QuoteMark({ src, left, top, flipY = false }) {
  return (
    <div
      className="absolute"
      style={{
        left,
        top,
        width: 88,
        height: 67,
        transform: flipY ? 'scaleY(-1) rotate(180deg)' : undefined,
      }}
    >
      <img alt="" src={src} className="absolute block max-w-none w-full h-full" />
    </div>
  );
}

/**
 * Absolutely-positioned card wrapper that floats up on hover.
 * Children should use position:absolute with coords relative to this wrapper.
 */
function HoverCard({ left, top, width, height, onClick, children }) {
  return (
    <div
      className="absolute cursor-pointer transition-[transform,filter] duration-300 ease-out hover:-translate-y-3 hover:drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
      style={{ left, top, width, height }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  );
}

/* ---------- Four content cards ----------
 *
 * All child positions are expressed relative to each card wrapper's top-left.
 *
 * Canvas origin offsets used to convert:
 *   Card 1: wrapper at (61, 1100)
 *   Card 2: wrapper at (1100, 1100)
 *   Card 3: wrapper at (61, 1590)
 *   Card 4: wrapper at (720, 1590)
 */

/** Card 1 — Marie coupé quote (top-left) */
function MarieCoupeCard() {
  // Wrapper: left=61, top=1100, width=920, height=580
  return (
    <HoverCard left={61} top={1100} width={920} height={580}>
      {/* Open quote mark:  canvas(122,1218) → local(61,118) */}
      <QuoteMark src={imgCalque5} left={61} top={118} />

      {/* Quote — canvas center x=523 → local center x=462 */}
      <p
        className="absolute text-center text-black"
        style={{
          left: 462,
          transform: 'translateX(-50%)',
          top: 126,
          width: 710,
          fontFamily: "'Massilia', Inter, sans-serif",
          fontWeight: 800,
          fontSize: 64,
          lineHeight: '70px',
          letterSpacing: '-1.92px',
        }}
      >
        Innover pour demain, c'est ce qui me donne chaque jour de l'énergie
      </p>

      {/* Close quote mark:  canvas(872,1344) → local(811,244) */}
      <QuoteMark src={imgCalque7} left={811} top={244} flipY />

      {/* Blue bullet:  canvas(618,1459) → local(557,359) */}
      <BlueBullet left={557} top={359} />

      {/* Attribution — canvas right-edge=847, top=1452 → local right=134, top=352 */}
      <div
        className="absolute text-right text-black"
        style={{ right: 134, top: 352, width: 547, fontFamily: 'Inter, sans-serif' }}
      >
        <p className="m-0 font-bold text-[32px] leading-normal">Marie coupé</p>
        <p className="m-0 font-normal text-[24px] leading-normal">
          Ingénieure à l'Institut de recherche technologique Jules Verne
        </p>
      </div>
    </HoverCard>
  );
}

/** Card 2 — Thierry Piel video (top-right) */
function ThierryPielCard() {
  // Wrapper: left=1100, top=1100, width=800, height=580
  return (
    <HoverCard left={1100} top={1100} width={800} height={580}>
      {/* Image — canvas(1162,1115) → local(62,15) */}
      <div
        className="absolute rounded-[38px] overflow-hidden"
        style={{ left: 62, top: 15, width: 610, height: 338 }}
      >
        <img alt="Thierry Piel" src={imgThierryPiel} className="w-full h-full object-cover" />
      </div>

      {/* Blue bullet — canvas(1548,1476) → local(448,376) */}
      <BlueBullet left={448} top={376} />

      {/* Attribution — canvas right-edge=1762, top=1468 → local right=138, top=368 */}
      <div
        className="absolute text-right text-black"
        style={{ right: 138, top: 368, width: 527, fontFamily: 'Inter, sans-serif' }}
      >
        <p className="m-0 font-bold text-[32px] leading-normal">Thierry Piel</p>
        <p className="m-0 font-normal text-[20px] leading-normal">
          Maître de conférence en histoire ancienne et agrégé d'histoire à Nantes Université
        </p>
        <p className="m-0 text-[24px] leading-normal">
          « Caligula, Itinéraire d'un empereur romain réputé "monstrueux" »
        </p>
      </div>
    </HoverCard>
  );
}

/** Card 3 — CNRS medal photos (bottom-left) */
function CnrsCard() {
  // Wrapper: left=61, top=1590, width=650, height=535
  return (
    <HoverCard left={61} top={1590} width={650} height={535}>
      {/* Photo 1 — canvas(128,1605) → local(67,15) */}
      <div className="absolute rounded-[68px] overflow-hidden" style={{ left: 67, top: 15, width: 281, height: 351 }}>
        <img alt="" src={imgImage1} className="w-full h-full object-cover" />
      </div>

      {/* Photo 2 — canvas(385,1605) → local(324,15) */}
      <div className="absolute rounded-[68px] overflow-hidden" style={{ left: 324, top: 15, width: 280, height: 351 }}>
        <img alt="" src={imgImage2} className="w-full h-full object-cover" />
      </div>

      {/* Caption — canvas(122,1971) → local(61,381) */}
      <p className="absolute text-black" style={{ left: 61, top: 381, width: 489 }}>
        <span
          style={{
            fontFamily: "'Massilia', Inter, sans-serif",
            fontWeight: 800,
            fontStyle: 'italic',
            fontSize: 24,
            lineHeight: 'normal',
          }}
        >
          Médaille de bronze du CNRS 2024
        </span>
        <span
          style={{
            fontFamily: "'Massilia', Inter, sans-serif",
            fontWeight: 500,
            fontStyle: 'italic',
            fontSize: 24,
            lineHeight: 'normal',
          }}
        >
          {' '}
          : une chercheuse et un chercheur nantais lauréats !
        </span>
      </p>
    </HoverCard>
  );
}

/** Card 4 — Colin de la Higuera quote (bottom-right, navigates to researcher page) */
function ColinCard() {
  const navigate = useNavigate();
  // Wrapper: left=720, top=1590, width=1150, height=620
  return (
    <HoverCard left={720} top={1590} width={1150} height={620} onClick={() => navigate('/researcher')}>
      {/* Open quote mark — canvas(822,1699) → local(102,109) */}
      <QuoteMark src={imgCalque6} left={102} top={109} />

      {/* Quote — canvas center x=1302 → local center x=582 */}
      <p
        className="absolute text-center text-black"
        style={{
          left: 582,
          transform: 'translateX(-50%)',
          top: 131,
          width: 848,
          fontFamily: "'Massilia', Inter, sans-serif",
          fontWeight: 500,
          fontStyle: 'italic',
          fontSize: 50,
          lineHeight: 'normal',
        }}
      >
        L'alphabétisation à l'intelligence artificielle n'est pas une option pour les experts,
        c'est une condition de la citoyenneté au XXIe siècle.
      </p>

      {/* Close quote mark — canvas(1718,1860) → local(998,270) */}
      <QuoteMark src={imgCalque7} left={998} top={270} flipY />

      {/* Attribution — canvas right-edge=1689, top=1993 → local right=181, top=403 */}
      <div
        className="absolute text-right text-black"
        style={{ right: 181, top: 403, width: 948, fontFamily: 'Inter, sans-serif' }}
      >
        <p className="m-0 font-bold text-[32px] leading-normal">Colin de la Higuera</p>
        <p className="m-0 text-[24px] underline leading-normal">Professeur à Nantes Université.</p>
        <p className="m-0 text-[24px] underline leading-normal">Titulaire de la Chaire UNESCO RELIA</p>
      </div>
    </HoverCard>
  );
}

/* ---------- Section ---------- */

export default function FeaturedQuotesSection() {
  return (
    <section>
      <MarieCoupeCard />
      <ThierryPielCard />
      <CnrsCard />
      <ColinCard />
    </section>
  );
}
