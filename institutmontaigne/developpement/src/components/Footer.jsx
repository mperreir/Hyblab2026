const TEAM_MEMBERS = [
	{ name: 'Florian Petiot', href: 'https://www.linkedin.com/in/florian-petiot/' },
	{ name: 'Tiffenn Barbe', href: 'https://www.linkedin.com/in/tiffenn-barbe/' },
	{ name: 'Gabriel Teigne', href: 'https://performanceauto.fr' },
	{ name: 'Tom Daniaud', href: 'https://inquisitseo.com' },
	{ name: 'Eliza Medvedev', href: 'https://www.linkedin.com/in/eliza-medvedev/' },
	{ name: 'Noa Marquet', href: 'https://www.linkedin.com/in/noa-marquet-33343b267/?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
	{ name: 'Soizic Menuet', href: 'https://www.linkedin.com/in/soizic-menuet-599643233?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
];

const TEAM_ROWS = [
	[0, 1],
	[2, 3, 4],
	[5, 6],
];

const TOP_LINKS = [
	'Cohesion sociale',
	'Competitivite economique',
	'Efficacite de l Etat',
	'Cooperations internationales',
];

const MIDDLE_LINKS = [
	'Rapports et Notes',
	'Expressions',
	'Rencontres',
	'Series',
];

const BOTTOM_LINKS = [
	'Qui sommes-nous',
	'Gouvernance',
	'Experts',
	'Recrutement',
	'Devenir adherent',
	'Presse',
	'Contact',
];

export default function Footer() {
	return (
		<footer className="bg-montaigne-burgundy pb-8 pt-0 text-sm text-white">
			<div className="mx-auto max-w-[760px] overflow-hidden">
				<div className="px-2 pb-8 pt-9 md:px-14">
					<div className="flex items-start justify-between gap-5 mx-4">
						<div className="flex items-center gap-4">
							{/* TODO image: footer-logo-institut-montaigne.png */}
							<img src="./footer/logo-montaigne.png" alt="Institut Montaigne" className="h-8 w-auto" />
						</div>
						<p className="text-right text-sm font-medium leading-[1.18]">59, rue la Boetie<br />75008 Paris</p>
					</div>

					<hr className="my-7 mx-4 border-white/80" />

					<h3 className="text-center text-2xl font-extrabold uppercase tracking-[0.01em]">Equipe projet</h3>

					<div className="relative mx-auto mt-6 w-[86%] max-w-[560px]">
						{/* TODO image: footer-forme-etoile-bleue.svg */}
						<img
							src="./footer/equipe.svg"
							alt=""
							aria-hidden="true"
							className="object-cover scale-150 my-12 mb-24"
						/>

					</div>

					<div className="mx-auto mt-10 max-w-[620px] space-y-3 text-center font-medium leading-[1.08]">
						{TEAM_ROWS.map((row, rowIndex) => (
							<ul
								key={`team-row-${rowIndex}`}
								className="flex items-center justify-center gap-x-10"
							>
								{row.map((memberIndex) => {
									const member = TEAM_MEMBERS[memberIndex];
									return (
										<li key={member.name}>
											<a
												href={member.href}
												className="underline underline-offset-2 transition-opacity hover:opacity-80"
											>
												{member.name}
											</a>
										</li>
									);
								})}
							</ul>
						))}
					</div>

					<h3 className="mt-14 text-center  text-2xl font-extrabold uppercase tracking-[0.01em]">Partenaires</h3>

					<div className="mt-8 flex justify-center">
						{/* TODO image: footer-logo-hyblab-sticker.png */}
						<img src="./footer/hyblab-logo.svg" alt="Hyblab" className="h-auto w-26" />
					</div>
				</div>

				<div className="relative -m-3">
					{/* TODO image: footer-ruban-partenaires-blanc.svg */}
					<img src="./footer/partenaires.png" alt="" aria-hidden="true" className="h-auto w-full" />
				</div>

				<div className="px-8  pt-12 font-medium leading-[1.24] md:px-14">
					<ul className="space-y-1">
						{TOP_LINKS.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>

					<hr className="my-7 border-white/80" />

					<ul className="space-y-1">
						{MIDDLE_LINKS.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>

					<hr className="my-7 border-white/80" />

					<ul className="space-y-1">
						{BOTTOM_LINKS.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>

					<hr className="mb-8 mt-10 border-white/80" />

					<div className="text-center">
						<div className="flex items-center justify-center gap-12">
							<span>Politique de confidentialite</span>
							<span>Mention legales</span>
						</div>
						<p className="mt-5">Droits d auteur</p>
						<p className="mt-7">© Institut Montaigne 2026</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
