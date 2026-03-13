import paroleExpertLogo from '../assets/paroleExpertLogo.svg';
import nantesLogo from '../assets/nantesLogo.svg';

export default function Header() {
  return (
    <header>
      {/* Logo Parole d'Expert */}
      <div className="absolute top-[34px] left-[69px] w-[245px] h-[82px]">
        <img
          src={nantesLogo}
          alt="Parole d'Expert"
          className="block w-full h-full object-contain"
        />
      </div>

      {/* Logo Nantes Université */}
      <div className="absolute top-[27px] left-[806px] w-[306px] h-[93px]">
        <img
          src={paroleExpertLogo}
          alt="Nantes Université"
          className="block w-full h-full object-contain"
        />
      </div>

      {/* Trait horizontal */}
      <div className="absolute left-0 top-[146px] w-full h-px bg-brand-grey" />
    </header>
  );
}