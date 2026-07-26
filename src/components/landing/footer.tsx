import Link from "next/link";

const COLUMNS = [
	{
		title: "Product",
		links: ["Feedback board", "Public roadmap", "Changelog", "Pricing"],
	},
	{ title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
	{
		title: "Resources",
		links: ["Docs", "API reference", "Status", "Community"],
	},
	{ title: "Legal", links: ["Privacy", "Terms", "DPA", "Security"] },
];

export function Footer() {
	return (
		<footer className="border-t border-border py-16">
			<div className="w-full max-w-[72rem] mx-auto px-6">
				<div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
					<div>
						<Link href="/" className="flex items-center gap-2">
							<span
								className="flex size-6 items-center justify-center rounded-md"
								style={{ background: "var(--primary)" }}
								aria-hidden="true"
							>
								<svg width="13" height="13" viewBox="0 0 16 16" fill="none">
									<path
										d="M3 11.5 8 2l5 9.5-5-2.4-5 2.4Z"
										fill="currentColor"
										className="text-primary-foreground"
									/>
								</svg>
							</span>
							<span className="text-[0.9375rem] font-semibold tracking-[-0.02em]">
								Shiplist
							</span>
						</Link>
						<p className="mt-4 max-w-xs text-[0.8125rem] leading-relaxed text-muted-foreground">
							A feedback board, a public roadmap, and a changelog in one
							workspace. The one with the best execution.
						</p>
					</div>

					<div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
						{COLUMNS.map((col) => (
							<div key={col.title}>
								<p
									className="text-[0.6875rem] font-medium tracking-[0.16em] uppercase"
									style={{ color: "var(--subtle)" }}
								>
									{col.title}
								</p>
								<ul className="mt-4 space-y-2.5">
									{col.links.map((link) => (
										<li key={link}>
											<a
												href="#"
												className="text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
											>
												{link}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				<div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
					<p className="text-[0.75rem]" style={{ color: "var(--subtle)" }}>
						© 2026 Shiplist · flat-rate, never per-user
					</p>
					<div
						className="flex items-center gap-5 text-[0.75rem]"
						style={{ color: "var(--subtle)" }}
					>
						<span className="inline-flex items-center gap-1.5">
							<span
								className="size-[0.3125rem] flex-none rounded-full"
								style={{ background: "var(--status-shipped)" }}
							/>
							status
						</span>
						<a href="#" className="transition-colors hover:text-foreground">
							docs
						</a>
						<a href="#" className="transition-colors hover:text-foreground">
							security
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
