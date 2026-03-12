export default function Manuscrit({ surrounded = true, children }) {
	return (
		<span style={{ position: 'relative', display: 'inline', padding: surrounded ? '4px 8px' : '0 0 6px' }}>
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
					<path d="M25.5641 28.26C42.8666 27.6753 100.173 25.1475 100.002 12.5383C99.74 -6.8369 -9.59644 -0.165142 1.25822 13.8758C10.565 25.9145 43.7938 27.6628 56.66 30.4662" stroke="#4657C6" strokeLinecap="round"/>
				</svg>
			) : (
				<svg
					viewBox="0 0 456 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					aria-hidden="true"
					style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '10px', pointerEvents: 'none' }}
				>
					<path d="M1.00051 14.5594C48.0325 7.36678 115.5 1.00018 196.995 0.99981C262.227 0.999511 380.727 4.07127 454.306 14.5592" stroke="#4657C6" strokeWidth="2" strokeLinecap="round"/>
				</svg>
			)}
		</span>
	);
}
