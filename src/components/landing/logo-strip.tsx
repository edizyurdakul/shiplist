const TEAMS = ["Northwind", "Basecrate", "Loophole", "Vantage", "Pathline"];

export function LogoStrip() {
	return (
		<section
			className="py-12 md:py-14"
			style={{
				borderImage:
					"linear-gradient(90deg, transparent, oklch(1 0 0 / 12%) 20%, oklch(1 0 0 / 12%) 80%, transparent) 1",
			}}
		>
			<p className="text-center text-2xs font-medium tracking-label uppercase text-subtle">
				Trusted by teams that ship weekly
			</p>
			<div className="mt-7 flex items-center justify-center gap-10">
				{TEAMS.map((team) => (
					<span
						key={team}
						className="text-base-15 font-medium tracking-snug text-muted-foreground"
					>
						{team}
					</span>
				))}
			</div>
		</section>
	);
}
