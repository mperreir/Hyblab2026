function StarBullet({ className = '', color = '#CDDF62' }) {
	return (
		<svg
			viewBox="0 0 34 33"
			aria-hidden="true"
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M17.5617 0.888767L20.2722 11.2476L30.6612 8.57353L23.3404 16.4405L30.6751 24.2946L20.2814 21.6391L17.5897 32.0028L14.4784 21.754L4.19271 24.7958L11.2043 16.6511L3.57558 9.1025L14.0788 11.3735L17.5617 0.888767Z"
				fill={color || '#CDDF62'}
			/>
		</svg>
	);
}

export default function Liste({
	items,
	color = '#CDDF62',
}) {
	return (

				<ul className="space-y-3 pr-7 md:pr-10">
					{items.map((item, index) => (
						<li key={`${item.lead}-${index}`} className="flex items-start gap-3">
							<StarBullet className=" h-8 w-8 shrink-0" color={color}/>
							<p
								className=""
								dangerouslySetInnerHTML={{ __html: `${item}` }}
							/>
						</li>
					))}
				</ul>
	);
}
