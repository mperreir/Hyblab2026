import { useEffect, useRef, useState } from 'react';

export default function Manuscrit({ surrounded = true, color='#AC7DD1', children }) {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);
	const delay = useRef(0.8 + Math.random() * 0.4);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.5 },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const drawStyle = {
		strokeDasharray: '1',
		strokeDashoffset: visible ? '0' : '1',
		transition: visible ? `stroke-dashoffset 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay.current.toFixed(3)}s` : 'none',
	};

	return (
		<span ref={ref} style={{ position: 'relative', display: 'inline', padding: surrounded ? '4px 8px' : '0 0 6px' }}>
			{children}
			{surrounded ? (
				<svg
					viewBox="0 0 101 31"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					aria-hidden="true"
					style={{ position: 'absolute', top: '4px', left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
				>
					<path
						className="print:![stroke-dashoffset:0] print:![stroke-dasharray:none] print:!transition-none"
						d="M25.5641 28.26C42.8666 27.6753 100.173 25.1475 100.002 12.5383C99.74 -6.8369 -9.59644 -0.165142 1.25822 13.8758C10.565 25.9145 43.7938 27.6628 56.66 30.4662"
						stroke={color}
						strokeLinecap="round"
						pathLength="1"
						style={drawStyle}
					/>
				</svg>
			) : (
				<svg
					viewBox="0 0 456 10"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					aria-hidden="true"
					style={{ position: 'absolute', bottom: '0px', left: 0, width: '100%', height: '8px', pointerEvents: 'none' }}
				>
					<path
						className="print:![stroke-dashoffset:0] print:![stroke-dasharray:none] print:!transition-none"
						d="M2 8C90 5 185 3 275 4.5C355 5.8 415 7 454 7.5"
						stroke={color}
						strokeWidth="2"
						strokeLinecap="round"
						pathLength="1"
						style={drawStyle}
					/>
				</svg>
			)}
		</span>
	);
}
