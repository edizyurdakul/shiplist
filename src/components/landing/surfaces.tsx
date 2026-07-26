import { Card } from "@/components/ui/card";
import { STATUS, type StatusKey, StatusLabel } from "./status";

const BOARD_ROWS: {
	votes: number;
	title: string;
	status: StatusKey;
	comments: number;
}[] = [
	{
		votes: 23,
		title: "OAuth login for the public roadmap",
		status: "shipped",
		comments: 23,
	},
	{
		votes: 18,
		title: "Drag a post between status columns",
		status: "progress",
		comments: 18,
	},
	{
		votes: 9,
		title: "Link a changelog entry back to its source post",
		status: "planned",
		comments: 9,
	},
];

const CHANGELOG = [
	{
		tag: "New",
		title: "Public roadmap got drag-and-drop columns",
		version: "v2.4.2",
		date: "18 Jul 26",
		ticket: "#P-211",
	},
	{
		tag: "Improved",
		title: "Vote tally now updates over websockets, no refresh",
		version: "v2.3.2",
		date: "04 Jul 26",
		ticket: "#P-198",
	},
	{
		tag: "Fixed",
		title: "Changelog RSS respected the category filter",
		version: "v2.3.0",
		date: "19 Jun 26",
		ticket: "#P-176",
	},
];

const KANBAN: { status: StatusKey; cards: string[] }[] = [
	{
		status: "planned",
		cards: ["Link changelog to source post", "Duplicate detection"],
	},
	{ status: "progress", cards: ["Drag posts between columns"] },
	{ status: "shipped", cards: ["OAuth for public roadmap"] },
];

export function Surfaces() {
	return (
		<section id="product" className="border-t border-border py-20 md:py-28">
			<div className="w-full max-w-[72rem] mx-auto px-6">
				<p
					className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase"
					style={{ color: "var(--subtle)" }}
				>
					2.0 Surfaces
				</p>
				<h2 className="mt-3 font-semibold tracking-[-0.035em] leading-[1.03] max-w-2xl text-[1.75rem] sm:text-[2.25rem]">
					Three surfaces, one workspace. Each one is the real product, not a
					mockup of one.
				</h2>

				<div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
					<div className="grid gap-5">
						<Card className="p-6 transition-[border-color,box-shadow] duration-200 hover:border-[oklch(1_0_0_/_14%)] hover:shadow-[0px_12px_4px_-4px_#0000,0px_8px_4px_-4px_#00000005,0px_4px_4px_-4px_#0000000a,0px_0px_4px_-4px_#00000011]">
							<p
								className="text-[0.6875rem] font-medium tracking-[0.16em] uppercase"
								style={{ color: "var(--subtle)" }}
							>
								Feedback board
							</p>
							<h3 className="mt-4 text-[1.0625rem] font-medium tracking-[-0.02em]">
								Voting, threads, and status — on every post.
							</h3>
							<p className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
								Sort by top votes, filter by tag, search the full text. Threaded
								comments collapse so a 40-comment thread doesn't bury the post.
							</p>
							<div className="mt-6 p-3 bg-[oklch(0.205_0_0_/_70%)] border border-[var(--border)] rounded-[var(--radius-md)]">
								<div
									className="flex items-center justify-between pb-2 text-[0.6875rem]"
									style={{ color: "var(--subtle)" }}
								>
									<span>shiplist/web</span>
									<span>⌕ dark mode</span>
								</div>
								<ul className="space-y-1">
									{BOARD_ROWS.map((row) => (
										<li
											key={row.title}
											className="flex items-center gap-3 rounded-md px-1.5 py-2 hover:bg-[oklch(1_0_0_/_3%)]"
										>
											<span
												className="w-6 flex-none text-center font-mono text-[0.6875rem]"
												style={{ color: "var(--subtle)" }}
											>
												{row.votes}
											</span>
											<div className="min-w-0 flex-1">
												<p className="truncate text-[0.75rem]">{row.title}</p>
												<div className="mt-1 flex items-center gap-2.5">
													<StatusLabel status={row.status} />
													<span
														className="text-[0.625rem]"
														style={{ color: "var(--subtle)" }}
													>
														▭ {row.comments}
													</span>
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
						</Card>

						<Card className="p-6 transition-[border-color,box-shadow] duration-200 hover:border-[oklch(1_0_0_/_14%)] hover:shadow-[0px_12px_4px_-4px_#0000,0px_8px_4px_-4px_#00000005,0px_4px_4px_-4px_#0000000a,0px_0px_4px_-4px_#00000011]">
							<p
								className="text-[0.6875rem] font-medium tracking-[0.16em] uppercase"
								style={{ color: "var(--subtle)" }}
							>
								Changelog
							</p>
							<h3 className="mt-4 text-[1.0625rem] font-medium tracking-[-0.02em]">
								Versioned, categorized, linked back to the post that asked for
								it.
							</h3>
							<p className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
								New, improved, fixed. Each entry carries a version and a link to
								the source feedback post, so readers see the line from request
								to ship.
							</p>
							<ul className="mt-6 space-y-2">
								{CHANGELOG.map((entry) => (
									<li
										key={entry.version}
										className="flex items-start gap-3 p-3 bg-[oklch(0.205_0_0_/_70%)] border border-[var(--border)] rounded-[var(--radius-md)]"
									>
										<span
											className="w-20 flex-none pt-0.5 text-[0.6875rem] font-medium tracking-[0.16em] uppercase"
											style={{
												color:
													entry.tag === "New"
														? STATUS.shipped.color
														: entry.tag === "Improved"
															? STATUS.planned.color
															: "var(--subtle)",
											}}
										>
											{entry.tag}
										</span>
										<div className="min-w-0">
											<p className="text-[0.75rem]">{entry.title}</p>
											<p
												className="mt-1 font-mono text-[0.625rem]"
												style={{ color: "var(--subtle)" }}
											>
												{entry.version} · {entry.date} · {entry.ticket}
											</p>
										</div>
									</li>
								))}
							</ul>
						</Card>
					</div>

					<Card className="flex h-full flex-col p-6 transition-[border-color,box-shadow] duration-200 hover:border-[oklch(1_0_0_/_14%)] hover:shadow-[0px_12px_4px_-4px_#0000,0px_8px_4px_-4px_#00000005,0px_4px_4px_-4px_#0000000a,0px_0px_4px_-4px_#00000011]">
						<p
							className="text-[0.6875rem] font-medium tracking-[0.16em] uppercase"
							style={{ color: "var(--subtle)" }}
						>
							Public roadmap
						</p>
						<h3 className="mt-4 text-[1.0625rem] font-medium tracking-[-0.02em]">
							A kanban that's public when you want it, private when you don't.
						</h3>
						<p className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
							Drag a post between columns and its status updates everywhere —
							the board, the changelog link, the API. Flip visibility per board.
						</p>
						<div className="mt-auto space-y-5 pt-8">
							{KANBAN.map((col) => (
								<div key={col.status}>
									<StatusLabel status={col.status} />
									<div className="mt-2.5 space-y-2">
										{col.cards.map((card) => (
											<div
												key={card}
												className="px-3 py-2.5 text-[0.75rem] bg-[oklch(0.205_0_0_/_70%)] border border-[var(--border)] rounded-[var(--radius-md)]"
											>
												{card}
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
