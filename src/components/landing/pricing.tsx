import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PLANS = [
	{
		name: "Free",
		price: "$0",
		period: "forever",
		note: null as string | null,
		blurb:
			"One board, three people, fifty posts. Enough to run a single feedback loop end to end.",
		features: ["1 workspace", "1 board", "3 members", "50 posts"],
		cta: "Open the Shiplist board ↗",
		primary: false,
	},
	{
		name: "Team",
		price: "$19",
		period: "/ month",
		note: "most teams land here",
		blurb:
			"Most teams land here. Three workspaces, five boards, room for a real roadmap and a changelog.",
		features: ["3 workspaces", "5 boards", "15 members", "500 posts"],
		cta: "Start with Team ↗",
		primary: true,
	},
	{
		name: "Business",
		price: "$49",
		period: "/ month",
		note: null,
		blurb:
			"For teams running feedback across several products. Unlimited boards and posts, fifty members.",
		features: [
			"20 workspaces",
			"Unlimited boards",
			"50 members",
			"Unlimited posts",
		],
		cta: "Start with Business ↗",
		primary: false,
	},
];

export function Pricing() {
	return (
		<section id="pricing" className="border-t border-border py-20 md:py-28">
			<div className="w-full max-w-[72rem] mx-auto px-6">
				<p
					className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase"
					style={{ color: "var(--subtle)" }}
				>
					5.0 Pricing
				</p>
				<h2 className="mt-3 max-w-2xl text-[1.75rem] sm:text-[2.25rem] font-semibold tracking-[-0.035em] leading-[1.03]">
					One flat rate per workspace.
					<br />
					Never per user.
				</h2>
				<p className="mt-4 max-w-xl text-[0.875rem] leading-relaxed text-muted-foreground">
					A team of three pays the same as a team of thirty sitting at the same
					tier. Add members, don't add dollars.
				</p>

				<div className="mt-12 grid gap-5 md:grid-cols-3">
					{PLANS.map((plan) => (
						<Card
							key={plan.name}
							className="p-6 transition-[border-color,box-shadow] duration-200 hover:border-[oklch(1_0_0_/_14%)] hover:shadow-[0px_12px_4px_-4px_#0000,0px_8px_4px_-4px_#00000005,0px_4px_4px_-4px_#0000000a,0px_0px_4px_-4px_#00000011]"
						>
							<div className="flex items-baseline justify-between gap-3">
								<p className="text-[0.8125rem] font-medium">{plan.name}</p>
								{plan.note && (
									<p
										className="text-[0.6875rem] font-medium tracking-[0.16em] uppercase"
										style={{ color: "var(--subtle)" }}
									>
										{plan.note}
									</p>
								)}
							</div>
							<p className="mt-5 flex items-baseline gap-1.5">
								<span className="text-4xl font-medium tracking-[-0.04em]">
									{plan.price}
								</span>
								<span
									className="text-[0.75rem]"
									style={{ color: "var(--subtle)" }}
								>
									{plan.period}
								</span>
							</p>
							<p className="mt-4 text-[0.8125rem] leading-relaxed text-muted-foreground">
								{plan.blurb}
							</p>
							<ul className="mt-7 space-y-2.5">
								{plan.features.map((f) => (
									<li
										key={f}
										className="flex items-center gap-2.5 text-[0.8125rem]"
									>
										<span
											className="text-[0.6875rem]"
											style={{ color: "var(--subtle)" }}
										>
											✓
										</span>
										{f}
									</li>
								))}
							</ul>
							<a
								href="#"
								className={buttonVariants({
									variant: plan.primary ? "invert" : "outline",
									className: "mt-8 w-full",
								})}
							>
								{plan.cta}
							</a>
						</Card>
					))}
				</div>

				<p className="mt-8 text-[0.75rem]" style={{ color: "var(--subtle)" }}>
					all plans · REST API · webhooks · GitHub + Linear sync · embeddable
					widget
				</p>
			</div>
		</section>
	);
}
