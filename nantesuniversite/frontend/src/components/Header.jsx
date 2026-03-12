const paroleExpertLogo =
  'https://www.figma.com/api/mcp/asset/73ddd325-bda4-4f74-95d6-61c42d4c17ec';
const nantesLogo =
  'https://www.figma.com/api/mcp/asset/6d0d997b-960e-4ca1-998b-c3997f93e2ae';

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