"use client";

import { CalendarDays, GitBranch, MessageSquare, Search } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { CHANGELOG, POSTS, STATUS_META } from "@/lib/marketing-data";
import { StatusPill } from "./status-pill";

function FeaturePanel({
	className,
	tag,
	title,
	body,
	demo,
	vertical,
}: {
	className?: string;
	tag: string;
	title: string;
	body: string;
	demo: React.ReactNode;
	vertical?: boolean;
}) {
	return (
		<div
			className={`panel group flex flex-col transition-colors hover:border-line-strong ${className ?? ""}`}
		>
			<div className={`flex flex-col gap-5 p-5 ${vertical ? "flex-1" : ""}`}>
				<div>
					<span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-2">
						{tag}
					</span>
					<h3 className="mt-2.5 font-display text-[21px] leading-[1.15] tracking-tightest md:text-[23px]">
						{title}
					</h3>
					<p className="mt-2.5 text-[13px] leading-[1.55] text-muted">{body}</p>
				</div>
				<div className={vertical ? "mt-auto" : ""}>{demo}</div>
			</div>
		</div>
	);
}

function BoardDemo() {
	return (
		<div className="overflow-hidden rounded-[10px] border border-line bg-[var(--base)]">
			<div className="flex items-center gap-2 border-b border-line px-3 py-2">
				<span className="text-[10px] text-muted">acme/web</span>
				<div className="ml-auto flex items-center gap-1.5 rounded-md border border-line px-1.5 py-0.5 text-[10px] text-muted">
					<Search className="h-2.5 w-2.5" /> dark mode
				</div>
			</div>
			{POSTS.slice(0, 3).map((p) => {
				const m = STATUS_META[p.status];
				return (
					<div
						key={p.id}
						className="relative flex items-center gap-2.5 border-b border-line px-3 py-2 last:border-b-0"
					>
						<div
							style={{ width: 2, backgroundColor: m.color }}
							className="absolute left-0 top-0 h-full"
							aria-hidden
						/>
						<div className="flex w-9 shrink-0 flex-col items-center">
							<MessageSquare className="h-3 w-3 text-muted" strokeWidth={2.5} />
							<span className="text-[11px] font-medium tabular-nums">
								{p.comments}
							</span>
						</div>
						<div className="min-w-0 flex-1">
							<p className="truncate text-[12px] leading-tight">{p.title}</p>
							<div className="mt-1 flex items-center gap-2 text-[10px] text-muted">
								<StatusPill status={p.status} />
								<span className="inline-flex items-center gap-0.5">
									<MessageSquare className="h-2.5 w-2.5" />
									{p.comments}
								</span>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

function RoadmapDemo() {
	const cols: {
		status: "planned" | "progress" | "shipped";
		items: string[];
	}[] = [
		{
			status: "planned",
			items: ["Link changelog to source post", "Duplicate detection"],
		},
		{ status: "progress", items: ["Drag posts between columns"] },
		{ status: "shipped", items: ["OAuth for public roadmap"] },
	];
	return (
		<div className="flex flex-col gap-2.5 rounded-[10px] border border-line bg-[var(--base)] p-2.5">
			{cols.map((c) => {
				const m = STATUS_META[c.status];
				return (
					<div key={c.status} className="rounded-md border border-line p-2">
						<div className="mb-1.5 flex items-center gap-1.5">
							<span
								className="h-1.5 w-1.5 rounded-full"
								style={{ backgroundColor: m.dot }}
							/>
							<span
								className="text-[10px] font-medium uppercase tracking-[0.06em]"
								style={{ color: m.color }}
							>
								{m.label}
							</span>
						</div>
						{c.items.map((t) => (
							<div
								key={t}
								className="mb-1 last:mb-0 rounded-md border border-line bg-surface px-2 py-1.5 text-[11px] leading-tight"
							>
								{t}
							</div>
						))}
					</div>
				);
			})}
		</div>
	);
}

function ChangelogDemo() {
	const kindColor: Record<string, string> = {
		new: "#4f9d69",
		improved: "#7a86d8",
		fixed: "#c99a2e",
	};
	return (
		<div className="overflow-hidden rounded-[10px] border border-line bg-[var(--base)]">
			{CHANGELOG.map((e, i) => (
				<div
					key={e.version}
					className={`flex items-start gap-2.5 px-3.5 py-2.5 ${i < CHANGELOG.length - 1 ? "border-b border-line" : ""}`}
				>
					<span
						className="mt-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.04em]"
						style={{
							color: kindColor[e.kind],
							backgroundColor: `${kindColor[e.kind]}1f`,
						}}
					>
						{e.kind}
					</span>
					<div className="min-w-0 flex-1">
						<p className="text-[12.5px] leading-snug">{e.title}</p>
						<div className="mt-1 flex items-center gap-2.5 text-[10px] text-muted">
							<span>{e.version}</span>
							<span className="inline-flex items-center gap-1">
								<CalendarDays className="h-2.5 w-2.5" />
								{e.date}
							</span>
							<span className="inline-flex items-center gap-1 text-muted">
								<GitBranch className="h-2.5 w-2.5" />
								{e.linked}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export function FeaturesSection() {
	const ref = useReveal<HTMLDivElement>();
	return (
		<section className="border-t border-line">
			<div ref={ref} className="reveal mx-auto max-w-[1180px] px-5 py-16">
				<h2 className="max-w-[600px] font-display text-[28px] leading-[1.12] tracking-tightest md:text-[40px]">
					Three surfaces, one workspace. Each one is the real product, not a
					mockup of one.
				</h2>

				<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6">
					<FeaturePanel
						className="md:col-span-4"
						tag="feedback board"
						title="Voting, threads, and status — on every post."
						body="Sort by top votes, filter by tag, search the full text. Threaded comments collapse so a 40-comment thread doesn't bury the post."
						demo={<BoardDemo />}
					/>
					<FeaturePanel
						className="md:col-span-2 md:row-span-2"
						tag="public roadmap"
						title="A kanban that's public when you want it, private when you don't."
						body="Drag a post between columns and its status updates everywhere — the board, the changelog link, the API. Flip visibility per board."
						demo={<RoadmapDemo />}
						vertical
					/>
					<FeaturePanel
						className="md:col-span-4"
						tag="changelog"
						title="Versioned, categorized, linked back to the post that asked for it."
						body="New, improved, fixed. Each entry carries a version and a link to the source feedback post, so readers see the line from request to ship."
						demo={<ChangelogDemo />}
					/>
				</div>
			</div>
		</section>
	);
}
