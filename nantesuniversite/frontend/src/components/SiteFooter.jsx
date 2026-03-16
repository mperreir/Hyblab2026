import { useState } from 'react';
import paroleExpertLogo from '../assets/paroleExpertByNantesLogo.svg';
import imgLogoWhite from '../assets/figma/nantes-logo-white.png';
import imgFacebook  from '../assets/figma/facebook-icon.svg';
import imgInstagram from '../assets/figma/instagram-icon.svg';
import imgLinkedin  from '../assets/figma/linkedin-icon.svg';
import Popup from './Popup';
/**
 * Reusable site footer rendered in the absolute-positioned design canvas.
 * `top` — Y position within the canvas where the footer background starts.
 * `height` — height of the footer background block (default 300px).
 */
export default function SiteFooter({ top, height = 300 }) {
  const contentTop = top + 20;
  const [showCredits, setShowCredits] = useState(false);

  return (
    <>
      {/* Dark background */}
      <div
        className="absolute inset-x-0"
        style={{ top: `${top}px`, height: `${height}px`, background: '#0b0e20' }}
      />

      {/* Separator line */}
      {/* <div
        className="absolute bg-white opacity-30"
        style={{ left: '94px', top: `${contentTop}px`, width: '1732px', height: '1px' }}
      /> */}

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
        <p className="m-0 font-bold underline">Mentions légales</p>
        <p className="m-0 mt-[12px] font-normal">Crédits et aspects légaux</p>
        <p className="m-0 font-normal">Cookies</p>
        <p className="m-0 font-normal">Plan du site</p>
        <p className="m-0 font-normal">Accessibilité : partiellement conforme</p>
        <p className="m-0 font-normal cursor-pointer underline" onClick={() => setShowCredits(true)}>Crédits</p>
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

      {showCredits && (
        <Popup
          type="credits"
          title="Crédits"
          onClick={() => setShowCredits(false)}
        />
      )}
    </>
  );
}
