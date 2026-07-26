const TEAMS = [
	"Northwind",
	"Basecrate",
	"Loophole",
	"Vantage",
	"Runway Labs",
	"Kettle",
	"Pathline",
	"Orbital",
];

export function LogoStrip() {
	return (
		<section
			className="py-12 md:py-14"
			style={{
				borderTop: "1px solid transparent",
				borderImage:
					"linear-gradient(90deg, transparent, oklch(1 0 0 / 12%) 20%, oklch(1 0 0 / 12%) 80%, transparent) 1",
			}}
		>
			<p
				className="text-center text-[0.6875rem] font-medium tracking-[0.16em] uppercase"
				style={{ color: "var(--subtle)" }}
			>
				Trusted by teams that ship weekly
			</p>
			<div
				className="relative mt-7 overflow-hidden"
				style={{
					maskImage:
						"linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
				}}
			>
				<div
					className="flex w-max"
					style={{ animation: "marquee-scroll 38s linear infinite" }}
				>
					{[0, 1].map((pass) => (
						<div
							key={pass}
							className="flex items-center gap-[3.5rem] px-7"
							aria-hidden={pass === 1}
						>
							{TEAMS.map((team) => (
								<span
									key={team}
									className="text-[0.9375rem] font-medium tracking-[-0.02em] text-muted-foreground"
								>
									{team}
								</span>
							))}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
