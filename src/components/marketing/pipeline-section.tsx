"use client";

import { useReveal } from "@/hooks/use-reveal";
import { PIPELINE, STATUS_META } from "@/lib/marketing-data";

export function PipelineSection() {
	const ref = useReveal<HTMLDivElement>();
	const total = PIPELINE.reduce((s, p) => s + p.count, 0);
	return (
		<section
			id="product"
			className="relative border-t border-line section-wash"
		>
			<div ref={ref} className="reveal mx-auto max-w-[1180px] px-5 py-16">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
					<div className="md:col-span-4">
						<h2 className="font-display text-[28px] leading-[1.1] tracking-tightest md:text-[36px]">
							A post moves
							<br />
							left to right.
							<br />
							Nothing else.
						</h2>
						<p className="mt-4 max-w-[300px] text-[13.5px] leading-[1.55] text-muted">
							Every post on every board lives in one of four states. The count
							under each state is the real number on your board right now —
							that's the whole picture of where you are.
						</p>
					</div>

					<div className="md:col-span-8">
						<div className="panel p-5 sm:p-6">
							<div className="relative">
								<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
									{PIPELINE.map((stage, i) => {
										const m = STATUS_META[stage.status];
										return (
											<div key={stage.status} className="relative">
												<div className="flex items-center gap-1.5">
													<span
														className="h-1.5 w-1.5 rounded-full"
														style={{ backgroundColor: m.dot }}
														aria-hidden
													/>
													<span
														className="text-[11px] font-medium uppercase tracking-[0.06em]"
														style={{ color: m.color }}
													>
														{m.label}
													</span>
												</div>
												<div className="mt-2.5 font-display text-[36px] leading-none tabular-nums tracking-tightest">
													{stage.count}
												</div>
												<p className="mt-2.5 line-clamp-2 text-[12px] leading-[1.45] text-muted">
													{stage.sample}
												</p>
												{i < PIPELINE.length - 1 && (
													<svg
														className="absolute -right-2.5 top-1 hidden h-2 w-2.5 text-muted-2 sm:block"
														viewBox="0 0 12 8"
														fill="none"
														role="img"
														aria-label="Arrow"
													>
														<path
															d="M1 4h9m0 0L7 1m3 3L7 7"
															stroke="currentColor"
															strokeWidth="1.2"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												)}
											</div>
										);
									})}
								</div>
								<div className="relative mt-5 h-px w-full bg-line">
									<div
										className="absolute inset-y-0 left-0 animate-flow"
										style={{
											width: "100%",
											background:
												"linear-gradient(90deg, var(--st-review), var(--st-planned), var(--st-progress), var(--st-shipped))",
											opacity: 0.45,
										}}
										aria-hidden
									/>
								</div>
							</div>
							<div className="mt-5 flex items-center justify-between text-[11px] text-muted">
								<span>{total} posts in flight across the Acme workspace</span>
								<span className="hidden sm:inline">
									updated live · websocket
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
