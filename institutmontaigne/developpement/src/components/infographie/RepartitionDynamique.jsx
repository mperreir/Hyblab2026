import { useMemo, useState } from 'react';
import DoughnutChart from './DoughnutChart.jsx';

const DEFAULT_LABELS = [
	'La repartition reelle des voix',
	'Le choix de la circonscription',
	'Le degre de proportionnelle',
	'Le seuil',
];

const DEFAULT_REPARTITIONS = [
	[
		{ label: '', percentage: 13, color: '#4D5BC0' },
		{ label: '', percentage: 5, color: '#93A7CF' },
		{ label: '', percentage: 5, color: '#A8DCC8' },
		{ label: '', percentage: 4, color: '#CFE172' },
		{ label: '', percentage: 10, color: '#005944' },
		{ label: '', percentage: 3, color: '#CFE172' },
		{ label: '', percentage: 4, color: '#A8DCC8' },
		{ label: '', percentage: 4, color: '#93A7CF' },
		{ label: '', percentage: 12, color: '#4D5BC0' },
		{ label: '', percentage: 8, color: '#FF6A00' },
	],
	[
		{ label: '', percentage: 15, color: '#4D5BC0' },
		{ label: '', percentage: 4, color: '#93A7CF' },
		{ label: '', percentage: 4, color: '#A8DCC8' },
		{ label: '', percentage: 5, color: '#93A7CF' },
		{ label: '', percentage: 9, color: '#4D5BC0' },
		{ label: '', percentage: 7, color: '#FF6A00' },
	],
	[
		{ label: '', percentage: 10, color: '#4D5BC0' },
		{ label: '', percentage: 7, color: '#93A7CF' },
		{ label: '', percentage: 6, color: '#A8DCC8' },
		{ label: '', percentage: 5, color: '#CFE172' },
		{ label: '', percentage: 9, color: '#005944' },
		{ label: '', percentage: 2, color: '#CFE172' },
		{ label: '', percentage: 5, color: '#A8DCC8' },
		{ label: '', percentage: 5, color: '#93A7CF' },
		{ label: '', percentage: 10, color: '#4D5BC0' },
		{ label: '', percentage: 6, color: '#FF6A00' },
	],
	[
		{ label: '', percentage: 12, color: '#4D5BC0' },
		{ label: '', percentage: 5, color: '#93A7CF' },
		{ label: '', percentage: 5, color: '#A8DCC8' },
		{ label: '', percentage: 4, color: '#CFE172' },
		{ label: '', percentage: 10, color: '#005944' },
		{ label: '', percentage: 4, color: '#CFE172' },
		{ label: '', percentage: 5, color: '#A8DCC8' },
		{ label: '', percentage: 4, color: '#93A7CF' },
		{ label: '', percentage: 9, color: '#4D5BC0' },
		{ label: '', percentage: 7, color: '#FF6A00' },
	],
];

const PILL_COLORS = ['#4D5BC0', '#F35A25', '#005944', '#A8B352'];

export default function RepartitionDynamique({
	labels = DEFAULT_LABELS,
	repartitions = DEFAULT_REPARTITIONS,
	className = '',
}) {
	const safeLabels = useMemo(
		() => (Array.isArray(labels) && labels.length > 0 ? labels : DEFAULT_LABELS),
		[labels],
	);

	const safeRepartitions = useMemo(() => {
		if (!Array.isArray(repartitions) || repartitions.length === 0) {
			return DEFAULT_REPARTITIONS;
		}

		return repartitions;
	}, [repartitions]);

	const [selectedIndex, setSelectedIndex] = useState(0);

	const maxSelectableIndex = Math.min(safeLabels.length, safeRepartitions.length) - 1;
	const activeIndex = Math.min(selectedIndex, Math.max(maxSelectableIndex, 0));
	const currentSegments = safeRepartitions[activeIndex] ?? [];

	return (
		<section className={className}>
			<div className="mx-auto flex w-full max-w-[900px] flex-col items-center gap-12">
				<div className="flex w-full flex-col items-center gap-4">
					{safeLabels.slice(0, maxSelectableIndex + 1).map((label, index) => {
						const color = PILL_COLORS[index % PILL_COLORS.length];
						const isSelected = index === activeIndex;

						return (
							<button
								key={`${label}-${index}`}
								type="button"
								onClick={() => setSelectedIndex(index)}
								style={{
									color: isSelected ? '#F6F5F1' : color,
									borderColor: color,
									backgroundColor: isSelected ? color : 'transparent',
								}}
								className="rounded-full border-2 px-8 py-2 text-center font-bold leading-none transition-colors duration-200"
							>
								{label}
							</button>
						);
					})}
				</div>

				<DoughnutChart
					className="h-[360px] w-full"
					segments={currentSegments}
				/>
			</div>
		</section>
	);
}
