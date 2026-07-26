"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { PRICING } from "@/lib/marketing-data";

export function PricingSection() {
	const ref = useReveal<HTMLDivElement>();
	return (
		<section
			id="pricing"
			className="relative border-t border-line section-wash"
		>
			<div ref={ref} className="reveal mx-auto max-w-[1180px] px-5 py-16">
				<div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
					<h2 className="font-display text-[28px] leading-[1.1] tracking-tightest md:text-[40px]">
						One flat rate per workspace.
						<br />
						Never per user.
					</h2>
					<p className="max-w-[340px] text-[13.5px] leading-[1.55] text-muted">
						A team of three pays the same as a team of thirty sitting at the
						same tier. Add members, don't add dollars.
					</p>
				</div>

				<div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
					{PRICING.map((t) => (
						<div
							key={t.name}
							className={`relative flex flex-col p-5 ${t.featured ? "panel panel-featured" : "panel"}`}
						>
							<div className="flex items-baseline justify-between">
								<span className="text-[18px] font-semibold tracking-tightest">
									{t.name}
								</span>
								{t.featured && (
									<span className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted-2">
										most teams land here
									</span>
								)}
							</div>
							<div className="mt-3 flex items-baseline gap-1">
								<span className="font-display text-[44px] leading-none tabular-nums tracking-tightest">
									{t.price}
								</span>
								<span className="text-[12px] text-muted">{t.cadence}</span>
							</div>
							<p className="mt-3 text-[13px] leading-[1.55] text-muted">
								{t.line}
							</p>
							<ul className="mt-5 space-y-1.5 border-t border-line pt-4">
								{t.specs.map((s) => (
									<li key={s} className="flex items-center gap-2 text-[12.5px]">
										<Check className="h-3 w-3 text-muted" strokeWidth={2.5} />
										<span>{s}</span>
									</li>
								))}
							</ul>
							<a
								href="/sign-up"
								className={`focus-ring mt-6 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-[13px] font-medium ${
									t.featured ? "btn-primary" : "btn-secondary"
								}`}
							>
								{t.cta} <ArrowUpRight className="h-3.5 w-3.5" />
							</a>
						</div>
					))}
				</div>
				<p className="mt-5 text-[11px] text-muted">
					all plans · REST API · webhooks · GitHub + Linear sync · embeddable
					widget
				</p>
			</div>
		</section>
	);
}
