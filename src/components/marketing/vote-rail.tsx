"use client";

import { ArrowUp } from "lucide-react";

export function VoteRail({
	votes,
	active,
	onToggle,
}: {
	votes: number;
	active: boolean;
	onToggle: () => void;
}) {
	return (
		<div className="flex flex-col items-center gap-1">
			<button
				type="button"
				onClick={onToggle}
				aria-pressed={active}
				aria-label={active ? "Remove your vote" : "Upvote this post"}
				className="focus-ring grid h-8 w-8 place-items-center rounded-full transition-colors"
				style={{
					backgroundColor: active ? "var(--brand)" : "transparent",
					color: active ? "#fff" : "var(--muted)",
					border: `1px solid ${active ? "var(--brand)" : "var(--line)"}`,
				}}
			>
				<ArrowUp className="h-3.5 w-3.5" strokeWidth={2.25} />
			</button>
			<span
				className="text-[13px] font-medium tabular-nums"
				style={{
					color: active ? "var(--brand-strong)" : "var(--ink)",
				}}
			>
				{votes}
			</span>
		</div>
	);
}
