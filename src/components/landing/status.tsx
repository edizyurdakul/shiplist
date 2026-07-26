export type StatusKey = "review" | "planned" | "progress" | "shipped";

export const STATUS: Record<StatusKey, { label: string; color: string }> = {
	review: { label: "Review", color: "var(--status-review)" },
	planned: { label: "Planned", color: "var(--status-planned)" },
	progress: { label: "In Progress", color: "var(--status-progress)" },
	shipped: { label: "Shipped", color: "var(--status-shipped)" },
};

export function StatusLabel({ status }: { status: StatusKey }) {
	const s = STATUS[status];
	return (
		<span
			className="inline-flex items-center gap-[0.375rem] text-[0.625rem] font-medium tracking-[0.1em] uppercase"
			style={{ color: s.color }}
		>
			<span
				className="size-[0.3125rem] flex-none rounded-full"
				style={{ background: s.color }}
			/>
			{s.label}
		</span>
	);
}
