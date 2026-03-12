const paroleExpertLogo =
  'https://www.figma.com/api/mcp/asset/73ddd325-bda4-4f74-95d6-61c42d4c17ec';
const nantesLogo =
  'https://www.figma.com/api/mcp/asset/6d0d997b-960e-4ca1-998b-c3997f93e2ae';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 flex items-start justify-between px-[61px] pt-[15px] z-10">
      <div className="w-[180px] h-[54px]">
        <img src={paroleExpertLogo} alt="Parole d'Expert" className="block w-full h-full object-contain" />
      </div>

      <div className="w-[245px] h-[82px]">
        <img src={nantesLogo} alt="Nantes Université" className="block w-full h-full object-contain" />
      </div>

      <div className="absolute left-0 top-[100px] w-full h-px bg-brand-grey" />
    </header>
  );
}
