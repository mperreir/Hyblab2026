const TEAM_MEMBERS = [
	['Gabriel Teigné', 'https://inquisitseo.com'],
	['Soizic Menuet', ''],
	['Tom Daniaud', 'https://inquisitseo.com'],
	['Florian Petiot', ''],
	['Eliza Medvedev', ''],
	['Noa Marquet', ''],
	['Tiffenn Barbé', ''],
];

export default function Footer() {
	return (
		<footer className="bg-montaigne-burgundy text-white pt-10">
			<div className="max-w-5xl mx-auto px-6">
				<p className="text-center text-[11px] font-sans uppercase tracking-[0.16em] text-white/60">
					Equipe projet
				</p>

				<ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-sans text-white/85">
					{TEAM_MEMBERS.map(([member, url]) => (
						<li key={member}>
							<a href={url}>{member}</a>
						</li>
					))}
				</ul>
                <p className="text-center text-[11px] mb-6 mt-10 font-sans uppercase tracking-[0.16em] text-white/60">
					Partenaires
				</p>
				<div className="max-w-6xl mx-auto pb-6">
					<a href="http://www.hyblab.fr/" className="block w-fit mx-auto">
						<img id="hyblab" src="/logos/logo_hyblab.png" alt="Hyblab DataSport" className="h-8 w-auto" />
					</a>

					<ul className="mt-4 flex flex-wrap items-center justify-center gap-4">
						<li>
							<a href="https://lecolededesign.com/">
								<img src="/logos/logo_edna.png" alt="Ecole de Design Nantes Atlantique" className="h-6 w-auto" />
							</a>
						</li>
						<li>
							<a href="https://www.polytech.univ-nantes.fr/">
								<img src="/logos/logo_polytech.png" alt="Polytech Nantes" className="h-6 w-auto" />
							</a>
						</li>
					</ul>

					<ul className="mt-4 flex flex-wrap items-center justify-center gap-4">
						<li>
							<a href="https://www.ouestmedialab.fr/">
								<img src="/logos/logo_oml.png" alt="Ouest Medialab" className="h-6 w-auto" />
							</a>
						</li>
						<li>
							<ul>
								<li className="stacked">
									<img id="cc" src="/logos/logo_cc.png" alt="Creative commons" className="h-4 w-auto" />
								</li>
								<li className="stacked mt-1">
									<img id="opensource" src="/logos/logo_opensource.png" alt="Open source" className="h-4 w-auto" />
								</li>
							</ul>
						</li>
						<li>
							<a href="https://www.mon-porteur-de-projet.org">
								<img src="/logos/no-logo.png" alt="Logo de mon porteur de projet" className="h-6 w-auto" />
							</a>
						</li>
						<li>
							<a href="https://www.nantesmetropole.fr/">
								<img
									className="institutionnel h-8 w-auto"
									src="/logos/logo_nantesmetropole.png"
									alt="Nantes Metropole"
								/>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}
