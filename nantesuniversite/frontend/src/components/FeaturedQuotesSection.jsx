import { useNavigate } from 'react-router-dom';

/* ---------- Figma asset URLs ---------- */
const colin_quote =
  './images/colin_quote.svg';
const imgThierryPiel =
  './images/thierry_quote.svg';
const iaTriche =
  './images/IA_Triche.svg';
const marie =
  './images/marie_quote.svg';
const bronze_elt =
  './images/bronze_quote.svg';

/* ---------- Shared primitives ---------- */


function QuoteMark({ src }) {
  return (
      <img alt="" src={src} className="absolute block max-w-none w-full h-full" />
  );
}

/**
 * Absolutely-positioned card wrapper that floats up on hover.
 * Children should use position:absolute with coords relative to this wrapper.
 */
function HoverCard({ left, top, width, height, onClick, children}) {
  return (
    <div
      className="custom-element"
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
      <HoverCard left={1050} top={1370} width={800} height={500}>
      <QuoteMark src={marie} left={61} top={118} />
    </HoverCard>
  );
}

/** Card 2 — Thierry Piel video (top-right) */
function ThierryPielCard() {
  // Wrapper: left=1100, top=1100, width=800, height=580
  return (
    <HoverCard left={120} top={1590} width={800} height={580}>
      <QuoteMark src={imgThierryPiel} left={61} top={118} />
    </HoverCard>
  );
}

/** Card 3 — CNRS medal photos (bottom-left) */
function IaEtTriche() {
  // Wrapper: left=61, top=1590, width=650, height=535
  return (
    <HoverCard left={1100} top={750} width={650} height={535}>
      <QuoteMark src={iaTriche} left={61} top={118} />
    </HoverCard>
  );
}

/** Card 4 — Colin de la Higuera quote (bottom-right, navigates to researcher page) */
function ColinCard() {
  const navigate = useNavigate();
  // Wrapper: left=720, top=1590, width=1150, height=620
  return (
    <HoverCard left={61} top={900} width={1100} height={620} onClick={() => navigate('/researcher')}>
      {/* Open quote mark — canvas(822,1699) → local(102,109) */}
      <QuoteMark src={colin_quote} left={102} top={109} />
    </HoverCard>
  );
}

function BronzeElt() {
  // Wrapper: left=61, top=1590, width=650, height=535
  return (
    <HoverCard left={1000} top={1890} width={550} height={500}>
      <QuoteMark src={bronze_elt} left={61} top={118} />
    </HoverCard>
  );
}
/* ---------- Section ---------- */

export default function FeaturedQuotesSection() {
  return (
    <section>
      <ColinCard />
      <IaEtTriche />
      <ThierryPielCard />
      <MarieCoupeCard />
      <BronzeElt />
    </section>
  );
}
