"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { type StatusKey, StatusLabel } from "./status";

type Post = {
	id: string;
	votes: number;
	title: string;
	ticket: string;
	board: string;
	tag: string;
	author: string;
	comments: number;
	status: StatusKey;
};

const POSTS: Post[] = [
	{
		id: "1",
		votes: 384,
		title: "OAuth login for the public roadmap",
		ticket: "#P-304",
		board: "shiplist/web",
		tag: "#auth-roadmap",
		author: "lena",
		comments: 23,
		status: "shipped",
	},
	{
		id: "2",
		votes: 143,
		title: "Drag a post between status columns",
		ticket: "#P-211",
		board: "shiplist/web",
		tag: "#roadmap-flow",
		author: "marcus",
		comments: 18,
		status: "progress",
	},
	{
		id: "3",
		votes: 97,
		title: "Link a changelog entry back to its source post",
		ticket: "#P-276",
		board: "shiplist/web",
		tag: "#changelog",
		author: "priya",
		comments: 9,
		status: "planned",
	},
	{
		id: "4",
		votes: 61,
		title: 'Webhook event for "post upvoted past 100"',
		ticket: "#P-233",
		board: "shiplist/web",
		tag: "#webhooks",
		author: "devon",
		comments: 14,
		status: "review",
	},
	{
		id: "5",
		votes: 44,
		title: "Duplicate detection on new post submit",
		ticket: "#P-227",
		board: "shiplist/web",
		tag: "#automation",
		author: "sofie",
		comments: 6,
		status: "planned",
	},
];

const SIDEBAR = [
	{ group: null, items: ["Inbox", "My posts"] },
	{
		group: "Workspace",
		items: ["Feedback", "Roadmap", "Changelog", "Insights"],
	},
	{
		group: "Boards",
		items: ["shiplist/web", "shiplist/mobile", "shiplist/api"],
	},
];

function VoteButton({ base }: { base: number }) {
	const [voted, setVoted] = useState(false);
	return (
		<button
			type="button"
			onClick={() => setVoted((v) => !v)}
			aria-pressed={voted}
			aria-label="Upvote post"
			className="flex w-11 flex-none flex-col items-center gap-0.5 py-1.5 transition-colors bg-[oklch(0.205_0_0_/_70%)] border border-[var(--border)] rounded-[var(--radius-md)]"
			style={
				voted
					? {
							borderColor:
								"color-mix(in oklab, var(--primary) 55%, transparent)",
							background:
								"color-mix(in oklab, var(--primary) 22%, transparent)",
						}
					: undefined
			}
		>
			<span className="text-[0.5625rem] leading-none text-subtle">▲</span>
			<span className="font-mono text-[0.6875rem] leading-none">
				{base + (voted ? 1 : 0)}
			</span>
		</button>
	);
}

export function Hero() {
	return (
		<section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
			<div
				className="absolute pointer-events-none left-1/2 top-[-14rem] h-[42rem] w-[76rem] -translate-x-1/2 opacity-80 blur-[20px] [background:var(--glow-accent)]"
				aria-hidden="true"
			/>

			<div className="relative w-full max-w-[80rem] mx-auto px-6">
				<h1 className="font-semibold tracking-[-0.035em] leading-[1.03] max-w-4xl text-[clamp(2.5rem,7.4vw,4.5rem)]">
					The feedback system
					<br className="hidden sm:block" /> for teams that ship
				</h1>

				<div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<p className="max-w-lg text-[0.9375rem] leading-relaxed text-muted-foreground">
						A feedback board, a public roadmap, and a changelog in one
						workspace. Votes and status are the backbone. Flat-rate per
						workspace — never per user.
					</p>
				</div>

				{/*<div className="mt-9 flex flex-wrap items-center gap-3">
					<a href="#pricing" className="btn btn-primary">
						Start building
					</a>
					<a href="#product" className="btn btn-outline">
						Open the Shiplist board <span aria-hidden="true">↗</span>
					</a>
				</div>*/}
			</div>

			{/* App-shell product frame */}
			<div className="relative mt-16 md:mt-20">
				<div className="mx-auto max-w-[80rem] px-4 sm:px-6">
					<div className="flex justify-end mb-8">
						<Badge
							render={<Link href="#product" />}
							variant="outline"
							className="h-auto rounded-full bg-[oklch(1_0_0_/_4%)] px-3.5 py-1.5 text-[0.75rem] [a]:hover:bg-[oklch(1_0_0_/_7%)] [a]:hover:border-[var(--border-strong)]"
							aria-label="New: changelog digests"
						>
							<span className="font-medium text-foreground">New</span>
							<span className="text-muted-foreground">Changelog digests</span>
						</Badge>
					</div>
					<div
						className="relative overflow-hidden rounded-[1.25rem] border border-[var(--border)] backdrop-blur-[18px]"
						style={{
							background:
								"linear-gradient(180deg, oklch(1 0 0 / 4%), transparent 22%), var(--panel-raised)",
							boxShadow:
								"0 1px 0 0 oklch(1 0 0 / 8%) inset, 0 60px 120px -50px oklch(0 0 0 / 95%)",
						}}
					>
						<div className="grid grid-cols-1 md:grid-cols-[13rem_minmax(0,1fr)]">
							<aside className="hidden flex-col gap-5 border-r border-border p-4 md:flex">
								<div className="flex items-center gap-2 px-1">
									<span
										className="size-4 rounded-[0.3rem] bg-primary"
										aria-hidden="true"
									/>
									<span className="text-[0.8125rem] font-medium">Shiplist</span>
									<span className="ml-auto text-[0.625rem] text-subtle">⌄</span>
								</div>
								{SIDEBAR.map((section) => (
									<div key={section.group ?? "root"} className="space-y-0.5">
										{section.group ? (
											<p className="px-1 pb-1.5 text-[0.5625rem] font-medium tracking-[0.16em] uppercase text-subtle">
												{section.group}
											</p>
										) : null}
										{section.items.map((item, i) => (
											<p
												key={item}
												className="rounded-md px-1.5 py-1 text-[0.75rem]"
												style={
													section.group === "Workspace" && i === 0
														? {
																background: "oklch(1 0 0 / 6%)",
																color: "var(--foreground)",
															}
														: { color: "var(--muted-foreground)" }
												}
											>
												{item}
											</p>
										))}
									</div>
								))}
							</aside>

							<div className="p-4 sm:p-5">
								<div className="flex items-center justify-between gap-3 pb-3">
									<p className="text-[0.8125rem] font-medium">
										<span className="text-subtle">shiplist/web</span> / Feedback
									</p>
									<div className="flex items-center gap-3 text-[0.6875rem] text-subtle">
										<span>⌕ filter</span>
										<span>5 open</span>
									</div>
								</div>
								<ul className="space-y-1.5">
									{POSTS.map((post) => (
										<li
											key={post.id}
											className="flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-[oklch(1_0_0_/_3%)]"
										>
											<VoteButton base={post.votes} />
											<div className="min-w-0 flex-1">
												<div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
													<StatusLabel status={post.status} />
													<span className="text-[0.6875rem] text-subtle">
														{post.board}
													</span>
													<span className="font-mono text-[0.6875rem] text-subtle">
														{post.ticket}
													</span>
												</div>
												<p className="mt-1.5 truncate text-[0.8125rem] font-medium">
													{post.title}
												</p>
												<div className="mt-1.5 flex flex-wrap items-center gap-x-3 text-[0.6875rem] text-subtle">
													<span>▭ {post.comments}</span>
													<span>by {post.author}</span>
													<span>{post.tag}</span>
												</div>
											</div>
										</li>
									))}
								</ul>
								<div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[0.6875rem] text-subtle">
									<span>sorted by: top votes</span>
									<span>open board →</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<p className="mt-5 text-center text-[0.75rem] text-subtle">
					↑ try the vote button — it's the real interaction, not a screenshot.
				</p>
			</div>
		</section>
	);
}
