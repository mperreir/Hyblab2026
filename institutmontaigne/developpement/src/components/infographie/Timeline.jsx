import { useEffect, useId, useRef, useState } from 'react';

export default function Timeline({
	className = '',
	animate = true,
	duration = 1400,
	delay = 0,
	dates = ['1958', '1969', '1988', '2024'],
}) {
	const clipId = useId();
	const figureRef = useRef(null);
	const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
	const dateAnchors = [24, 110, 190, 320];

	useEffect(() => {
		if (!animate) return;
		const el = figureRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				setHasEnteredViewport(true);
				observer.disconnect();
			},
			{ threshold: 0.35 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [animate]);

	const shouldAnimate = animate && hasEnteredViewport;
	const effectiveDelay = 1000 + delay;

	return (
		<figure
			ref={figureRef}
			className={className}
			aria-label="Frise chronologique animee"
			style={
				shouldAnimate
					? {
							'--timeline-duration': `${duration}ms`,
							'--timeline-delay': `${effectiveDelay}ms`,
						}
					: undefined
			}
		>
			<svg
				width="341"
				height="81"
				viewBox="0 0 341 81"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				role="img"
			>
				<rect x="5" y="52" width="336" height="15" rx="7.5" fill="#00483B" />
				<rect x="320" y="34" width="7" height="44" rx="3.5" fill="#00483B" />
				<rect x="22" y="34" width="7" height="44" rx="3.5" fill="#00483B" />

				{dateAnchors.map((x, i) => (
					<text
						key={`date-${x}`}
						x={x}
						y="25"
						textAnchor="middle"
						className={`timeline-date${
							animate && (i === 1 || i === 2) ? ' timeline-date--range' : ''
						}${
							shouldAnimate && i === 1 ? ' timeline-date--range-start' : ''
						}${
							shouldAnimate && i === 2 ? ' timeline-date--range-end' : ''
						}`}
					>
						{dates[i] ?? ''}
					</text>
				))}

				{/* Revealed blue range */}
				<g
					clipPath={`url(#${clipId})`}
					className={shouldAnimate ? 'timeline-reveal-group' : ''}
				>
					<rect x="112" y="36.1753" width="8" height="44" rx="4" fill="#4657C6" />
					<rect x="116" y="36" width="77" height="44" fill="#4657C6" fillOpacity="0.46" />
					<rect x="189" y="36.1753" width="8" height="44" rx="4" fill="#4657C6" />
				</g>

				<defs>
					<clipPath id={clipId}>
						<rect x="112" y="34" width="85" height="48" rx="4" className={shouldAnimate ? 'timeline-clip-rect' : ''} />
					</clipPath>
				</defs>
			</svg>

			<style>{`
				.timeline-date {
					fill: #4657C6;
					font-family: 'Helvetica', sans-serif;
					font-size: 17px;
					letter-spacing: 0.01em;
				}

				.timeline-date--range {
					opacity: 0;
				}

				.timeline-date--range-start {
					animation: timelineDateAppear 180ms ease-out var(--timeline-delay, 120ms) forwards;
				}

				.timeline-date--range-end {
					animation: timelineDateAppear 180ms ease-out calc(var(--timeline-delay, 120ms) + var(--timeline-duration, 1400ms) - 180ms) forwards;
				}

				.timeline-clip-rect {
					transform-box: fill-box;
					transform-origin: left center;
					transform: scaleX(0);
					animation-name: timelineRevealEaseOut;
					animation-duration: var(--timeline-duration, 1400ms);
					animation-delay: var(--timeline-delay, 120ms);
					animation-fill-mode: forwards;
					animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
				}

				.timeline-reveal-group .timeline-clip-rect {
					animation-play-state: running;
				}

				@keyframes timelineRevealEaseOut {
					0% {
						transform: scaleX(0);
					}
					100% {
						transform: scaleX(1);
					}
				}

				@keyframes timelineDateAppear {
					0% {
						opacity: 0;
					}
					100% {
						opacity: 1;
					}
				}
			`}</style>
		</figure>
	);
}
