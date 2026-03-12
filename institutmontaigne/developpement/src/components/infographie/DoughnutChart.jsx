import {
	ArcElement,
	Chart as ChartJS,
	Legend,
	Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DEFAULT_SEGMENTS = [
	{ label: 'LFI', percentage: 12, color: '#E3F280' },
	{ label: '', percentage: 63, color: '#D2D2D2' },
	{ label: 'RN', percentage: 25, color: '#A4BAE8' },
];

function buildSegmentLabel(label, percentage) {
	if (!label) {
		return '';
	}

	return `${label} ${percentage}%`;
}

export default function DoughnutChart({ segments = DEFAULT_SEGMENTS, className = '' }) {
	const safeSegments = segments
		.filter((segment) => segment && Number.isFinite(segment.percentage) && segment.percentage >= 0)
		.map((segment) => ({
			label: segment.label ?? '',
			percentage: segment.percentage,
			color: segment.color ?? '#D2D2D2',
		}));

	const insideLabelPlugin = {
		id: 'insideLabelPlugin',
		afterDatasetsDraw(chart) {
			const { ctx } = chart;
			const meta = chart.getDatasetMeta(0);
			const labels = chart.data.labels ?? [];

			ctx.save();
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			meta.data.forEach((arc, index) => {
				const label = labels[index];

				if (!label) {
					return;
				}

				const angle = (arc.startAngle + arc.endAngle) / 2;
				const radius = (arc.innerRadius + arc.outerRadius) / 2;
				const x = arc.x + Math.cos(angle) * radius;
				const y = arc.y + Math.sin(angle) * radius;

				ctx.fillStyle = '#1F2937';
				ctx.font = '600 14px "Source Sans Pro", sans-serif';
				ctx.fillText(String(label), x, y);
			});

			ctx.restore();
		},
	};

	const data = {
		labels: safeSegments.map((segment) => buildSegmentLabel(segment.label, segment.percentage)),
		datasets: [
			{
				data: safeSegments.map((segment) => segment.percentage),
				backgroundColor: safeSegments.map((segment) => segment.color),
				borderWidth: 0,
				hoverOffset: 0,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		rotation: 270,
		circumference: 180,
		cutout: '38%',
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: false,
			},
		},
	};

	return (
		<div className={className}>
			<Doughnut data={data} options={options} plugins={[insideLabelPlugin]} />
		</div>
	);
}
