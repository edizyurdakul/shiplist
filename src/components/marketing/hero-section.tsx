"use client";

import { ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import { POSTS } from "@/lib/marketing-data";
import { PostRow } from "./post-row";

export function HeroSection() {
	const [voted, setVoted] = useState<Record<string, boolean>>({
		"P-211": true,
	});
	const toggle = (id: string) => setVoted((v) => ({ ...v, [id]: !v[id] }));

	return (
		<section id="top" className="relative overflow-hidden">
			<div
				className="grid-paper pointer-events-none absolute inset-0 h-[480px]"
				aria-hidden
			/>
			<div className="relative mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-5 pb-16 pt-14 md:grid-cols-12 md:gap-6 md:pb-20 md:pt-20">
				<div className="md:col-span-7 md:pr-8">
					<p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted-2">
						feedback · roadmap · changelog
					</p>
					<h1 className="mt-4 font-display text-[40px] leading-[1.05] tracking-tightest sm:text-[54px] md:text-[64px]">
						Collect feedback.
						<br />
						Plan your roadmap.
						<br />
						Ship what matters.
					</h1>
					<p className="mt-5 max-w-[420px] text-[14.5px] leading-[1.55] text-muted">
						One workspace for the board, the public roadmap, and the changelog.
						Votes and status are the backbone — not a number stuck on a card.
						Flat-rate, never per-user.
					</p>
					<div className="mt-7 flex flex-wrap items-center gap-2.5">
						<a
							href="#pricing"
							className="btn-primary focus-ring inline-flex items-center gap-1.5 px-4 py-2 text-[13.5px] font-medium"
						>
							Open the Acme board <ArrowUpRight className="h-3.5 w-3.5" />
						</a>
						<a
							href="#product"
							className="btn-secondary focus-ring inline-flex items-center gap-2 px-4 py-2 text-[13.5px]"
						>
							See how it works
						</a>
					</div>
					<dl className="mt-9 flex flex-wrap gap-x-9 gap-y-3">
						<div>
							<dt className="text-[10px] uppercase tracking-[0.12em] text-muted-2">
								Posts this week
							</dt>
							<dd className="mt-1 text-[19px] font-semibold tabular-nums tracking-tightest">
								2,481
							</dd>
						</div>
						<div>
							<dt className="text-[10px] uppercase tracking-[0.12em] text-muted-2">
								Votes cast
							</dt>
							<dd className="mt-1 text-[19px] font-semibold tabular-nums tracking-tightest">
								18,940
							</dd>
						</div>
						<div>
							<dt className="text-[10px] uppercase tracking-[0.12em] text-muted-2">
								Shipped YTD
							</dt>
							<dd className="mt-1 text-[19px] font-semibold tabular-nums tracking-tightest">
								127
							</dd>
						</div>
					</dl>
				</div>

				<div className="relative md:col-span-5 md:-mr-5">
					<div
						className="hero-glow pointer-events-none absolute -inset-10 -z-10"
						aria-hidden
					/>
					<div className="panel panel-glow overflow-hidden">
						<div className="flex items-center justify-between border-b border-line px-3.5 py-2.5">
							<div className="flex items-center gap-1.5 text-[12px]">
								<span className="text-muted">acme/web</span>
								<span className="text-muted">/</span>
								<span>Feedback</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="hidden items-center gap-1.5 rounded-md border border-line px-1.5 py-0.5 text-[11px] text-muted sm:flex">
									<Search className="h-2.5 w-2.5" /> filter
								</div>
								<span className="text-[11px] text-muted">5 open</span>
							</div>
						</div>
						<div>
							{POSTS.map((p) => (
								<PostRow
									key={p.id}
									post={p}
									voted={!!voted[p.id]}
									onVote={toggle}
								/>
							))}
						</div>
						<div className="flex items-center justify-between px-3.5 py-2.5 text-[11px] text-muted">
							<span>sorted by: top votes</span>
							<span className="inline-flex items-center gap-1 transition-colors hover:text-[var(--ink)]">
								open board <ArrowUpRight className="h-3 w-3" />
							</span>
						</div>
					</div>
					<p className="mt-2.5 pl-1 text-[11px] text-muted">
						↑ try the vote button — it's the real interaction, not a screenshot
					</p>
				</div>
			</div>
		</section>
	);
}
