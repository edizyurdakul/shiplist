import { RiSparkling2Line } from "@remixicon/react";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className="grid min-h-svh w-full grid-cols-1 bg-background text-foreground md:grid-cols-2">
			<div className="flex items-center justify-center px-6 py-12 sm:px-10">
				{children}
			</div>

			<div className="dark relative hidden overflow-hidden border-l border-border bg-background text-foreground md:block">
				<div
					aria-hidden="true"
					className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[40px_40px] opacity-[0.07]"
				/>
				<div
					aria-hidden="true"
					className="absolute -top-24 -right-24 size-80 rounded-full bg-foreground/10 blur-3xl"
				/>
				<div
					aria-hidden="true"
					className="absolute -bottom-32 -left-16 size-96 rounded-full bg-foreground/10 blur-3xl"
				/>

				<div className="relative flex h-full flex-col justify-between p-12">
					<div className="flex items-center gap-2.5">
						<span className="grid grid-cols-2 gap-0.5" aria-hidden="true">
							<span className="size-2.5 bg-foreground" />
							<span className="size-2.5 bg-foreground" />
							<span className="size-2.5 bg-foreground" />
							<span className="size-2.5 bg-foreground" />
						</span>
						<span className="text-lg font-semibold tracking-tight">Acme</span>
					</div>

					<div className="max-w-md">
						<span className="inline-flex items-center gap-1.5 border border-foreground/30 bg-foreground/10 px-2.5 py-1 text-xs font-medium">
							<RiSparkling2Line
								data-icon="inline-start"
								className="size-3.5"
								aria-hidden="true"
							/>
							Trusted by 12,000+ teams
						</span>
						<h2 className="mt-6 text-4xl leading-tight font-bold tracking-tight">
							Build faster with blocks you can ship today.
						</h2>
						<p className="mt-4 text-base text-foreground/80">
							Drop-in, production-ready UI for your next product. One workspace
							for your whole team to design, build, and launch.
						</p>
					</div>

					<p className="text-sm text-foreground/70">
						&copy; 2026 Acme, Inc. All rights reserved.
					</p>
				</div>
			</div>
		</section>
	);
}
