export function ShiplistMark({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden="true"
		>
			<rect
				x="1"
				y="10"
				width="14"
				height="2.5"
				rx="1.25"
				fill="currentColor"
				opacity="0.35"
			/>
			<rect
				x="3"
				y="5.5"
				width="10"
				height="2.5"
				rx="1.25"
				fill="currentColor"
				opacity="0.65"
			/>
			<rect x="5" y="1" width="6" height="2.5" rx="1.25" fill="currentColor" />
		</svg>
	);
}
