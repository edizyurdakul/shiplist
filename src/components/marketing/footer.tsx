import { ArrowUp } from "lucide-react";
import { CHANGELOG } from "@/lib/marketing-data";

export function Footer() {
	return (
		<footer id="changelog" className="border-t border-line">
			<div className="mx-auto max-w-[1180px] px-5 py-14">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
					<div className="md:col-span-5">
						<div className="flex items-center gap-2">
							<span
								className="grid h-5 w-5 place-items-center rounded-[6px] bg-accent"
								aria-hidden
							>
								<ArrowUp className="h-3 w-3 text-white" strokeWidth={3} />
							</span>
							<span className="text-[15px] font-semibold tracking-tightest">
								Shiplist
							</span>
						</div>
						<p className="mt-3 max-w-[300px] text-[12.5px] leading-[1.55] text-muted">
							A feedback board, a public roadmap, and a changelog in one
							workspace. The one with the best execution.
						</p>
					</div>
					<div className="md:col-span-3">
						<p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-2">
							Product
						</p>
						<ul className="mt-3 space-y-1.5 text-[12.5px]">
							<li>
								<a
									href="#product"
									className="focus-ring rounded text-muted transition-colors hover:text-[var(--ink)]"
								>
									Feedback board
								</a>
							</li>
							<li>
								<a
									href="#product"
									className="focus-ring rounded text-muted transition-colors hover:text-[var(--ink)]"
								>
									Public roadmap
								</a>
							</li>
							<li>
								<a
									href="#product"
									className="focus-ring rounded text-muted transition-colors hover:text-[var(--ink)]"
								>
									Changelog
								</a>
							</li>
							<li>
								<a
									href="#pricing"
									className="focus-ring rounded text-muted transition-colors hover:text-[var(--ink)]"
								>
									Pricing
								</a>
							</li>
						</ul>
					</div>
					<div className="md:col-span-4">
						<p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-2">
							Latest from the changelog
						</p>
						<ul className="mt-3 space-y-2">
							{CHANGELOG.map((e) => (
								<li
									key={e.version}
									className="flex items-center gap-2 text-[12.5px]"
								>
									<span className="text-[11px] text-muted">{e.date}</span>
									<span className="truncate text-muted">{e.title}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="mt-10 flex flex-col gap-3 border-t border-line pt-5 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
					<span>
						© {new Date().getFullYear()} Shiplist · flat-rate, never per-user
					</span>
					<span className="flex items-center gap-4">
						<a
							href="/status"
							className="focus-ring rounded transition-colors hover:text-[var(--ink)]"
						>
							status
						</a>
						<a
							href="/docs"
							className="focus-ring rounded transition-colors hover:text-[var(--ink)]"
						>
							docs
						</a>
						<a
							href="/security"
							className="focus-ring rounded transition-colors hover:text-[var(--ink)]"
						>
							security
						</a>
					</span>
				</div>
			</div>
		</footer>
	);
}
