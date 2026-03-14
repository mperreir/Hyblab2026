import Manuscrit from "./infographie/Manuscrit";

export default function CTA({
	href = '#podcast',
	texte = <>Retrouvez la version longue <br/>de cet article <b>en podcast</b><br/><Manuscrit surrounded={false} color="#4657C6"> en bas de la page</Manuscrit></>,
}) {
	return (
		<div className="print:hidden">
			<a
				href={href}
				className="mx-auto block w-full rounded-[30px] text-center shadow-[0_12px_28px_rgba(0,0,0,0.14)] transition-transform duration-200 hover:-translate-y-0.5"
			>
				<div className="px-8 pb-9 pt-6 md:pt-8">
					<p className="font-normal leading-[1.12] text-[#4657C6] md:text-[38px]">
					    {texte}
                    </p>
				</div>
			</a>
		</div>
	);
}
