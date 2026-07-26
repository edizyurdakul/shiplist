import Link from "next/link";

export function ClosingCta() {
	return (
		<section className="border-t border-border py-28">
			<div className="mx-auto max-w-6xl px-6">
				<div className="relative overflow-hidden rounded-2xl border border-white/8 bg-card/60 px-8 py-20 text-center shadow-panel">
					<div
						aria-hidden
						className="pointer-events-none absolute inset-0"
						style={{
							background:
								"radial-gradient(ellipse 60% 80% at 50% 0%, oklch(1 0 0 / 0.11), transparent 70%)",
						}}
					/>
					<h3 className="relative text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-[54px]">
						Ship what customers
						<br />
						actually want.
					</h3>
					<div className="relative mt-8 flex items-center justify-center gap-5">
						<Link
							href="/sign-up"
							className="rounded-full bg-foreground px-5 py-2.5 text-[13.5px] font-medium text-background transition-all hover:brightness-95"
						>
							Start for free
						</Link>
						<Link
							href="#demo"
							className="text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
						>
							Book a demo →
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
