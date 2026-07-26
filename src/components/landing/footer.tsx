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
			<div className="w-full max-w-6xl mx-auto px-6">
				<div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
					<div>
						<Link href="/" className="flex items-center gap-2">
							<span
								className="flex size-6 items-center justify-center rounded-md bg-primary"
								aria-hidden="true"
							>
								<svg width="13" height="13" viewBox="0 0 16 16" fill="none">
									<title>Shiplist Logo</title>
									<path
										d="M3 11.5 8 2l5 9.5-5-2.4-5 2.4Z"
										fill="currentColor"
										className="text-primary-foreground"
									/>
								</svg>
							</span>
							<span className="text-base-15 font-semibold tracking-snug">
								Shiplist
							</span>
						</Link>
						<p className="mt-4 max-w-xs text-sm-13 leading-relaxed text-muted-foreground">
							A feedback board, a public roadmap, and a changelog in one
							workspace. The one with the best execution.
						</p>
					</div>

					<div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
						{COLUMNS.map((col) => (
							<div key={col.title}>
								<p className="text-2xs font-medium tracking-label uppercase text-subtle">
									{col.title}
								</p>
								<ul className="mt-4 space-y-2.5">
									{col.links.map((link) => (
										<li key={link}>
											<Link
												href="#"
												className="text-sm-13 text-muted-foreground transition-colors hover:text-foreground"
											>
												{link}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				<div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
					<p className="text-xs text-subtle">
						© 2026 Shiplist · flat-rate, never per-user
					</p>
					<div className="flex items-center gap-5 text-xs text-subtle">
						<span className="inline-flex items-center gap-1.5">
							<span className="size-1.25 flex-none rounded-full bg-status-shipped" />
							status
						</span>
						<Link
							href="/docs"
							className="transition-colors hover:text-foreground"
						>
							docs
						</Link>
						<Link
							href="/security"
							className="transition-colors hover:text-foreground"
						>
							security
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
