import type { Status } from "@/lib/marketing-data";
import { STATUS_META } from "@/lib/marketing-data";

export function StatusPill({ status }: { status: Status }) {
	const m = STATUS_META[status];
	return (
		<span
			className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em]"
			style={{ color: m.color, backgroundColor: m.bg }}
		>
			<span
				className="h-1.5 w-1.5 rounded-full"
				style={{ backgroundColor: m.dot }}
				aria-hidden
			/>
			{m.label}
		</span>
	);
}
