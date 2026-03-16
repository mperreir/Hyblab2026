import paroleExpertLogo from '../assets/paroleExpertByNantesLogo.svg';

// Figma asset URLs (expire after 7 days — replace with permanent assets when available)
const imgLogoWhite = 'https://www.figma.com/api/mcp/asset/6474731b-6109-4b99-b268-103ea120a50d';
const imgFacebook  = 'https://www.figma.com/api/mcp/asset/adffdc41-103b-49c3-b8ac-bcab99a197e3';
const imgInstagram = 'https://www.figma.com/api/mcp/asset/58a7eb6b-128e-49f3-9cab-2a0806b78398';
const imgLinkedin  = 'https://www.figma.com/api/mcp/asset/64407574-731e-4d03-9bfd-537baf9cb6b0';

/**
 * Reusable site footer rendered in the absolute-positioned design canvas.
 * `top` — Y position within the canvas where the footer background starts.
 * `height` — height of the footer background block (default 300px).
 */
export default function SiteFooter({ top, height = 300 }) {
  const contentTop = top + 20;

  return (
    <>
      {/* Dark background */}
      <div
        className="absolute inset-x-0"
        style={{ top: `${top}px`, height: `${height}px`, background: '#0b0e20' }}
      />

      {/* Separator line */}
      <div
        className="absolute bg-white opacity-30"
        style={{ left: '94px', top: `${contentTop}px`, width: '1732px', height: '1px' }}
      />

      {/* Parole d'expert logo */}
      <img
        src={paroleExpertLogo}
        alt="Parole d'Expert"
        className="absolute"
        style={{
          left: '94px',
          top: `${contentTop + 20}px`,
          width: '382px',
          height: '77px',
          filter: 'brightness(0) invert(1)',
        }}
      />

      {/* Social icons */}
      <div
        className="absolute flex gap-[20px]"
        style={{ left: '126px', top: `${contentTop + 140}px` }}
      >
        <img src={imgFacebook}  alt="Facebook"  className="w-[62px] h-[62px]" />
        <img src={imgInstagram} alt="Instagram" className="w-[62px] h-[62px]" />
        <img src={imgLinkedin}  alt="LinkedIn"  className="w-[62px] h-[62px]" />
      </div>

      {/* Legal text */}
      <div
        className="absolute text-white whitespace-pre-wrap"
        style={{
          left: '799px',
          top: `${contentTop + 20}px`,
          width: '951px',
          fontFamily: "'Massilia', Inter, sans-serif",
          fontSize: '24px',
          lineHeight: '1.4',
        }}
      >
        <p className="m-0 font-bold">Mentions légales</p>
        <p className="m-0 mt-[12px] font-normal">Crédits et aspects légaux</p>
        <p className="m-0 font-normal">Cookies</p>
        <p className="m-0 font-normal">Plan du site</p>
        <p className="m-0 font-normal">Accessibilité : partiellement conforme</p>
      </div>

      {/* Nantes Université white logo */}
      <img
        src={imgLogoWhite}
        alt="Nantes Université"
        className="absolute"
        style={{
          left: '1535px',
          top: `${contentTop + 20}px`,
          width: '201px',
          height: '148px',
          objectFit: 'contain',
        }}
      />
    </>
  );
}
