import { CalendarDays, Copy, FileText, Sparkles, Tag } from "lucide-react";

const items = [
	{
		icon: <Copy className="h-4 w-4" />,
		label: "Duplicate detection",
		detail: "on new post submit",
	},
	{
		icon: <FileText className="h-4 w-4" />,
		label: "Comment summarization",
		detail: "on threads over 10",
	},
	{
		icon: <Tag className="h-4 w-4" />,
		label: "Auto-tagging",
		detail: "by board rules",
	},
	{
		icon: <FileText className="h-4 w-4" />,
		label: "Changelog draft",
		detail: "from shipped posts",
	},
	{
		icon: <CalendarDays className="h-4 w-4" />,
		label: "Weekly digest",
		detail: "to the workspace",
	},
];

export function AutomationSection() {
	return (
		<section className="border-t border-line">
			<div className="mx-auto max-w-[1180px] px-5 py-14">
				<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div className="max-w-[540px]">
						<span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-2">
							<Sparkles className="h-3 w-3" /> automation
						</span>
						<h2 className="mt-2.5 font-display text-[24px] leading-[1.15] tracking-tightest md:text-[28px]">
							The boring parts of running a feedback board, handled quietly.
						</h2>
					</div>
					<p className="max-w-[300px] text-[12.5px] leading-[1.55] text-muted">
						Not a copilot. Five small automations that save a moderator a few
						minutes each — and never post on your behalf.
					</p>
				</div>
				<ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
					{items.map((it) => (
						<li
							key={it.label}
							className="panel p-4 transition-colors hover:border-line-strong"
						>
							<span className="icon-chip">{it.icon}</span>
							<p className="mt-3 text-[12.5px] text-[var(--ink)]">{it.label}</p>
							<p className="mt-0.5 text-[11px] text-muted">{it.detail}</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
