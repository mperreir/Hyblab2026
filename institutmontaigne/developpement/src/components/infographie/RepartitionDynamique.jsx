import { useEffect, useState } from 'react';
import DoughnutChart from './DoughnutChart.jsx';
import { PATH_PUBLIC } from '../../data/debate.jsx';

function hexToGreyscale(hex) {
	if (!hex || hex.length < 7) return '#888888';
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	const grey = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
	const h = grey.toString(16).padStart(2, '0');
	return `#${h}${h}${h}`;
}

function ChartView({ title, segments, seats, showLabels = true }) {
	return (
		<div className="w-full">
			{title && <p className="mb-2 text-center font-bold">{title}</p>}
			<DoughnutChart className="h-40 w-full" segments={segments} seats={seats} showLabels={showLabels} />
		</div>
	);
}

function GifView({ src, alt }) {
	return (
		<div className="flex w-full justify-center py-6">
			<img src={src} alt={alt ?? ''} className="max-h-64 object-contain" />
		</div>
	);
}

function AlternatingView({ title, titles, repartitions, seats }) {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!Array.isArray(repartitions) || repartitions.length < 2) return;
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % repartitions.length);
		}, 2000);
		return () => clearInterval(interval);
	}, [repartitions]);

	const segments = repartitions?.[current] ?? [];
	const activeTitle = Array.isArray(titles) && titles.length > 0
		? titles[current % titles.length]
		: title;

	return (
		<div className="w-full">
			{activeTitle && <p className="mb-2 text-center font-bold">{activeTitle}</p>}
			<DoughnutChart className="h-40 w-full" segments={segments} seats={seats} />
		</div>
	);
}

const BASE_SEGMENTS = [
	{ label: 'NFP', percentage: 26, color: '#4D5BC0' },
	{ label: 'LREM', percentage: 5, color: '#93A7CF' },
	{ label: 'LR', percentage: 5, color: '#A8DCC8' },
	{ label: 'PS', percentage: 4, color: '#CFE172' },
	{ label: 'EELV', percentage: 10, color: '#005944' },
	{ label: 'Div.', percentage: 3, color: '#89C9A0' },
	{ label: 'UDI', percentage: 4, color: '#A8DCC8' },
	{ label: 'LFI', percentage: 4, color: '#93A7CF' },
	{ label: 'RN', percentage: 12, color: '#4D5BC0' },
	{ label: 'RN+', percentage: 8, color: '#FF6A00' },
];

const DEFAULT_ITEMS = [
	{
		label: <>La répartition réelle des voix</>,
		color: '#4D5BC0',
		type: 'chart',
		title: <>Répartition des voix</>,
		segments: BASE_SEGMENTS,
	},
	{
		label: 'Le choix de la circonscription',
		color: '#F35A25',
		type: 'gif',
		src: `./img/france-circonception.gif`,
		alt: 'Choix de la circonscription',
	},
	{
		label: 'Le degré de proportionnelle',
		color: '#005944',
		type: 'alternating',
		seats: 74,
		titles: [
			<>PROPORTIONNELLE<br/>Seuil à 3%</>,
			<>PROPORTIONNELLE<br/>Seuil à 5%</>,
		],
		repartitions: [
			[
				{ label: 'NFP', percentage: 15, color: '#4D5BC0' },
				{ label: 'LR', percentage: 7, color: '#93A7CF' },
				{ label: 'EELV', percentage: 6, color: '#A8DCC8' },
				{ label: 'LREM', percentage: 9, color: '#005944' },
				{ label: 'RN', percentage: 9, color: '#4D5BC0' },
				{ label: 'RN+', percentage: 7, color: '#FF6A00' },
			],
			[
				{ label: 'NFP', percentage: 10, color: '#4D5BC0' },
				{ label: 'LR', percentage: 5, color: '#93A7CF' },
				{ label: 'PS', percentage: 12, color: '#A8DCC8' },
				{ label: 'LREM', percentage: 7, color: '#CFE172' },
				{ label: 'RN', percentage: 10, color: '#4D5BC0' },
				{ label: 'RN+', percentage: 6, color: '#FF6A00' },
			],
		],
	},
	{
		label: 'Le seuil',
		color: '#A8B352',
		type: 'chart',
		seats: 0,
		showLabels: false,
		title: <>-3% des voix</>,
		segments: BASE_SEGMENTS.map((s) => ({ ...s, color: hexToGreyscale(s.color) })),
	},
];

export default function RepartitionDynamique({ items = DEFAULT_ITEMS, className = '' }) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const activeItem = items[Math.min(selectedIndex, items.length - 1)] ?? items[0];

	return (
		<section className={className}>
			<div className="mx-auto flex w-full max-w-[900px] flex-col items-center">
				<div className="flex w-full flex-col items-center gap-2">
					{items.map((item, index) => {
						const isSelected = index === selectedIndex;
						return (
							<button
								key={`${item.label}-${index}`}
								type="button"
								onClick={() => setSelectedIndex(index)}
								style={{
									color: isSelected ? '#F6F5F1' : item.color,
									borderColor: item.color,
									backgroundColor: isSelected ? item.color : 'transparent',
								}}
								className="rounded-full border-2 px-8 py-2 text-center font-bold leading-none transition-colors duration-200"
							>
								{item.label}
							</button>
						);
					})}
				</div>

				<div className="my-6 mt-10 w-full">
					{activeItem.type === 'chart' && (
						<ChartView title={activeItem.title} segments={activeItem.segments ?? []} seats={activeItem.seats ?? null} showLabels={activeItem.showLabels ?? true} />
					)}
					{activeItem.type === 'gif' && (
						<GifView src={activeItem.src ?? ''} alt={activeItem.alt ?? ''} />
					)}
					{activeItem.type === 'alternating' && (
						<AlternatingView title={activeItem.title} titles={activeItem.titles} repartitions={activeItem.repartitions ?? []} seats={activeItem.seats ?? null} />
					)}
				</div>
			</div>
		</section>
	);
}
