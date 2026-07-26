import { MessageSquare } from "lucide-react";
import type { Post } from "@/lib/marketing-data";
import { STATUS_META } from "@/lib/marketing-data";
import { StatusPill } from "./status-pill";
import { VoteRail } from "./vote-rail";

export function PostRow({
	post,
	voted,
	onVote,
}: {
	post: Post;
	voted: boolean;
	onVote: (id: string) => void;
}) {
	const m = STATUS_META[post.status];
	return (
		<div className="group relative flex items-stretch gap-0 border-b border-line transition-colors last:border-b-0 hover:bg-surface-2">
			<div style={{ width: 2, backgroundColor: m.color }} aria-hidden />
			<div className="flex w-12 shrink-0 items-center justify-center py-2.5">
				<VoteRail
					votes={post.votes + (voted ? 1 : 0)}
					active={voted}
					onToggle={() => onVote(post.id)}
				/>
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-1 py-2 pr-3">
				<div className="flex items-center gap-2">
					<StatusPill status={post.status} />
					<span className="text-[11px] text-muted">{post.board}</span>
					<span className="text-[11px] text-muted">·</span>
					<span className="text-[11px] text-muted">#{post.id}</span>
				</div>
				<p className="truncate text-[14px] leading-snug">{post.title}</p>
				<div className="flex items-center gap-3 text-[11px] text-muted">
					<span className="inline-flex items-center gap-1">
						<MessageSquare className="h-3 w-3" /> {post.comments}
					</span>
					<span>by {post.author}</span>
					<span className="hidden sm:inline">
						{post.tags.map((t) => `#${t}`).join(" ")}
					</span>
				</div>
			</div>
		</div>
	);
}
