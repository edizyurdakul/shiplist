import { Card } from "@/components/ui/card";
import { STATUS, type StatusKey } from "./status";

const COLUMNS: { status: StatusKey; count: string; example: string }[] = [
	{
		status: "review",
		count: "14",
		example: 'Webhook event for "post upvoted past 100"',
	},
	{
		status: "planned",
		count: "31",
		example: "Link a changelog entry to its source post",
	},
	{
		status: "progress",
		count: "9",
		example: "Drag a post between status columns",
	},
	{
		status: "shipped",
		count: "127",
		example: "OAuth login for the public roadmap",
	},
];

export function StatusFlow() {
	return (
		<section className="border-t border-border py-20 md:py-28">
			<div className="w-full max-w-[72rem] mx-auto px-6 grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
				<div>
					<p className="font-mono text-2xs tracking-[0.08em] uppercase text-subtle">
						1.0 Status flow
					</p>
					<h2 className="mt-3 font-semibold tracking-[-0.035em] leading-[1.03] text-[1.75rem] sm:text-[2rem]">
						A post moves
						<br />
						left to right.
						<br />
						Nothing else.
					</h2>
					<p className="mt-5 max-w-sm text-[0.875rem] leading-relaxed text-muted-foreground">
						Every post on every board lives in one of four states. The count
						under each state is the real number on your board right now — that's
						the whole picture of where you are.
					</p>
				</div>

				<div>
					<Card className="p-5 sm:p-7">
						<div className="grid gap-6 sm:grid-cols-4">
							{COLUMNS.map((col, i) => (
								<div key={col.status} className="relative">
									{i > 0 && (
										<span
											className="absolute -left-3.5 top-1 hidden text-xs sm:block text-subtle"
											aria-hidden="true"
										>
											→
										</span>
									)}
									<p
										className="inline-flex items-center gap-[0.375rem] text-[0.625rem] font-medium tracking-[0.1em] uppercase"
										style={{ color: STATUS[col.status].color }}
									>
										<span
											className="size-[0.3125rem] flex-none rounded-full"
											style={{ background: STATUS[col.status].color }}
										/>
										{STATUS[col.status].label}
									</p>
									<p className="mt-3 text-3xl font-medium tracking-[-0.04em]">
										{col.count}
									</p>
									<p className="mt-2.5 text-xs leading-snug text-subtle">
										{col.example}
									</p>
								</div>
							))}
						</div>
						<div className="mt-7 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-2xs text-subtle">
							<span>181 posts in flight across the Shiplist workspace</span>
							<span>updated live · websocket</span>
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
