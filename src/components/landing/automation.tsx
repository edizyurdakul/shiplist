import { Copy, FileText, Mail, MessagesSquare, Tags } from "lucide-react";
import { Card } from "@/components/ui/card";

const ITEMS = [
	{ icon: Copy, label: "Duplicate detection", sub: "on new post submit" },
	{
		icon: MessagesSquare,
		label: "Comment summarization",
		sub: "on threads over 10",
	},
	{ icon: Tags, label: "Auto-tagging", sub: "by board rules" },
	{ icon: FileText, label: "Changelog draft", sub: "from shipped posts" },
	{ icon: Mail, label: "Weekly digest", sub: "to the workspace" },
];

export function Automation() {
	return (
		<section className="border-t border-border py-20 md:py-28">
			<div className="w-full max-w-6xl mx-auto px-6">
				<div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
					<div>
						<p className="font-mono text-2xs tracking-[0.08em] uppercase text-subtle">
							4.0 Automation
						</p>
						<h2 className="mt-5 max-w-xl text-[1.75rem] sm:text-[2rem] font-semibold tracking-[-0.035em] leading-[1.03]">
							The boring parts of running a feedback board, handled quietly.
						</h2>
					</div>
					<p className="text-[0.875rem] leading-relaxed text-muted-foreground lg:text-right">
						Not a copilot. Five small automations that save a moderator a few
						minutes each — and never post on your behalf.
					</p>
				</div>

				<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
					{ITEMS.map(({ icon: Icon, label, sub }) => (
						<Card
							key={label}
							className="h-full p-5 transition-[border-color,box-shadow] duration-200 hover:border-[oklch(1_0_0/14%)] hover:shadow-[0px_12px_4px_-4px_#0000,0px_8px_4px_-4px_#00000005,0px_4px_4px_-4px_#0000000a,0px_0px_4px_-4px_#00000011]"
						>
							<Icon
								className="size-4 text-subtle"
								strokeWidth={1.5}
								aria-hidden="true"
							/>
							<p className="mt-8 text-sm-13 font-medium">{label}</p>
							<p className="mt-1 text-2xs text-subtle">{sub}</p>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
