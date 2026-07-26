"use client";

import { Code2, Copy, GitBranch, Plug, Webhook } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

function DevRow({
	icon,
	label,
	detail,
}: {
	icon: React.ReactNode;
	label: string;
	detail: string;
}) {
	return (
		<li className="flex items-start gap-3 border-b border-line pb-2.5 last:border-b-0 last:pb-0">
			<span className="icon-chip mt-0.5">{icon}</span>
			<div className="pt-0.5">
				<span className="text-[var(--ink)]">{label}</span>
				<span className="ml-2 text-muted">{detail}</span>
			</div>
		</li>
	);
}

export function DeveloperSection() {
	const ref = useReveal<HTMLDivElement>();
	return (
		<section
			id="developers"
			className="relative border-t border-line section-wash"
		>
			<div ref={ref} className="reveal mx-auto max-w-[1180px] px-5 py-16">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
					<div className="md:col-span-5">
						<span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-2">
							for the people who wire it up
						</span>
						<h2 className="mt-3 font-display text-[28px] leading-[1.12] tracking-tightest md:text-[36px]">
							A REST API, webhooks, typed SDKs, and a widget you can embed.
						</h2>
						<p className="mt-4 max-w-[400px] text-[13.5px] leading-[1.55] text-muted">
							Shiplist is meant to be the system of record for feedback, not a
							walled garden. Read posts, cast votes, subscribe to status
							changes, and sync with the tools you already run.
						</p>
						<ul className="mt-6 space-y-2.5 text-[13px]">
							<DevRow
								icon={<Code2 className="h-4 w-4" />}
								label="REST API"
								detail="read posts, cast votes, manage boards"
							/>
							<DevRow
								icon={<Webhook className="h-4 w-4" />}
								label="Webhooks"
								detail="post.created · post.status_changed · post.upvoted"
							/>
							<DevRow
								icon={<Plug className="h-4 w-4" />}
								label="TypeScript & React SDKs"
								detail="drop-in board and widget components"
							/>
							<DevRow
								icon={<GitBranch className="h-4 w-4" />}
								label="GitHub + Linear sync"
								detail="two-way link between issues and posts"
							/>
						</ul>
					</div>

					<div className="md:col-span-7">
						<div className="panel panel-glow overflow-hidden">
							<div className="flex items-center justify-between border-b border-line px-3.5 py-2.5">
								<span className="font-mono text-[11px] text-muted">
									POST /v1/posts/P-211/vote
								</span>
								<button
									type="button"
									className="focus-ring inline-flex items-center gap-1 rounded text-[11px] text-muted transition-colors hover:text-[var(--ink)]"
								>
									<Copy className="h-3 w-3" /> copy
								</button>
							</div>
							<pre className="overflow-x-auto px-3.5 py-3.5 font-mono text-[12px] leading-[1.65]">
								{`curl https://api.shiplist.dev/v1/posts/P-211/vote \\
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
}`}
							</pre>
							<div className="border-t border-line px-3.5 py-2.5 text-[11px] text-muted">
								webhook fired: <span className="text-muted">post.upvoted</span>{" "}
								→ acme/webhook
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
