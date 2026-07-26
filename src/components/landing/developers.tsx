import { Boxes, Code2, GitBranch, Webhook } from "lucide-react";
import { Card } from "@/components/ui/card";

const ITEMS = [
	{
		icon: Code2,
		label: "REST API",
		desc: "read posts, cast votes, manage boards",
	},
	{
		icon: Webhook,
		label: "Webhooks",
		desc: "post.created · post.status_changed · post.upvoted",
	},
	{
		icon: Boxes,
		label: "TypeScript & React SDKs",
		desc: "drop-in board and widget components",
	},
	{
		icon: GitBranch,
		label: "GitHub + Linear sync",
		desc: "two-way link between issues and posts",
	},
];

export function Developers() {
	return (
		<section id="developers" className="border-t border-border py-20 md:py-28">
			<div className="w-full max-w-[72rem] mx-auto px-6 grid gap-12 lg:grid-cols-2 lg:gap-16">
				<div>
					<p
						className="text-[0.6875rem] font-medium tracking-[0.16em] uppercase"
						style={{ color: "var(--subtle)" }}
					>
						For the people who wire it up
					</p>
					<h2 className="mt-5 text-[1.75rem] sm:text-[2rem] font-semibold tracking-[-0.035em] leading-[1.03]">
						A REST API, webhooks, typed SDKs, and a widget you can embed.
					</h2>
					<p className="mt-5 max-w-md text-[0.875rem] leading-relaxed text-muted-foreground">
						Shiplist is meant to be the system of record for feedback, not a
						walled garden. Read posts, cast votes, subscribe to status changes,
						and sync with the tools you already run.
					</p>
					<ul className="mt-10 space-y-5">
						{ITEMS.map(({ icon: Icon, label, desc }) => (
							<li key={label} className="flex items-start gap-3.5">
								<Icon
									className="mt-0.5 size-4 flex-none"
									strokeWidth={1.5}
									style={{ color: "var(--subtle)" }}
									aria-hidden="true"
								/>
								<p className="text-[0.8125rem] leading-relaxed">
									<span className="font-medium">{label}</span>{" "}
									<span className="text-muted-foreground">{desc}</span>
								</p>
							</li>
						))}
					</ul>
				</div>

				<div>
					<Card className="overflow-hidden">
						<div className="flex items-center justify-between border-b border-border px-5 py-3">
							<p
								className="font-mono text-[0.6875rem]"
								style={{ color: "var(--subtle)" }}
							>
								POST /v1/posts/P-211/vote
							</p>
							<span
								className="font-mono text-[0.625rem]"
								style={{ color: "var(--subtle)" }}
							>
								copy
							</span>
						</div>
						<pre className="overflow-x-auto px-5 py-5 font-mono text-[0.6875rem] leading-relaxed text-muted-foreground">
							<code>{`curl https://api.shiplist.dev/v1/posts/P-211/vote \\
  -H "Authorization: Bearer $SHIPLIST_KEY" \\
  -X POST

# → 200 OK
{
  "id": "P-211",
  "title": "Drag a post between status columns",
  "status": "in_progress",
  "votes": 143,
  "board": { "slug": "acme/web" },
  "linked": { "linear": "ENG-402", "github": 88 }
}`}</code>
						</pre>
						<div className="border-t border-border px-5 py-3">
							<p
								className="font-mono text-[0.625rem]"
								style={{ color: "var(--subtle)" }}
							>
								webhook fired: post.upvoted → acme/webhook
							</p>
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
