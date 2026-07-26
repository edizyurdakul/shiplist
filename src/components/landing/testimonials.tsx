const TESTIMONIALS = [
	{
		quote:
			"Shiplist replaced three tools we were duct-taping together. The votes alone changed how we prioritize.",
		name: "Sarah Chen",
		role: "Head of Product, Meridian",
		gradient:
			"linear-gradient(135deg, oklch(0.25 0.01 285), oklch(0.2 0.005 285))",
	},
	{
		quote:
			"Our public roadmap gets more engagement than our blog. Customers love seeing what's coming.",
		name: "Marcus Rivera",
		role: "CTO, Basecrate",
		gradient:
			"linear-gradient(135deg, oklch(0.22 0.02 180), oklch(0.18 0.01 200))",
	},
	{
		quote:
			"Flat-rate pricing meant we could onboard the whole team on day one. No per-seat math.",
		name: "Aiko Tanaka",
		role: "Engineering Lead, Pathline",
		gradient:
			"linear-gradient(135deg, oklch(0.24 0.015 150), oklch(0.19 0.008 170))",
	},
];

export function Testimonials() {
	return (
		<section className="border-t border-border py-20 md:py-28">
			<div className="w-full max-w-[72rem] mx-auto px-6">
				<p className="font-mono text-2xs tracking-kicker uppercase text-subtle">
					6.0 Teams
				</p>
				<h2 className="mt-3 max-w-2xl section-heading">
					Trusted by teams that ship weekly.
				</h2>

				<div className="mt-12 grid gap-5 md:grid-cols-3">
					{TESTIMONIALS.map((t) => (
						<div
							key={t.name}
							className="flex flex-col justify-between rounded-2xl border border-white/[0.06] p-6 transition-[border-color,box-shadow] duration-200 hover:border-white/[0.12]"
							style={{
								background: t.gradient,
								boxShadow:
									"0 1px 0 0 oklch(1 0 0 / 4%) inset, 0 24px 60px -30px oklch(0 0 0 / 85%)",
							}}
						>
							<p className="text-base-15 leading-relaxed text-foreground/90">
								"{t.quote}"
							</p>
							<div className="mt-8 flex items-center gap-3">
								<div className="size-8 rounded-full bg-white/10" />
								<div>
									<p className="text-sm-13 font-medium">{t.name}</p>
									<p className="text-2xs text-subtle">{t.role}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
