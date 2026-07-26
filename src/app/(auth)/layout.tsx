import { RiSparkling2Line } from "@remixicon/react";
import { ArrowUp } from "lucide-react";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className="grid min-h-svh w-full grid-cols-1 md:grid-cols-2">
			<div className="flex items-center justify-center px-6 py-12 sm:px-10">
				{children}
			</div>

			<div className="dark relative hidden overflow-hidden border-l border-line md:block">
				<div className="grid-paper absolute inset-0 opacity-100" />
				<div
					aria-hidden="true"
					className="absolute -top-24 -right-24 size-80 rounded-full blur-3xl"
					style={{ backgroundColor: "var(--brand-soft)" }}
				/>
				<div
					aria-hidden="true"
					className="absolute -bottom-32 -left-16 size-96 rounded-full blur-3xl"
					style={{ backgroundColor: "var(--brand-soft)" }}
				/>

				<div className="relative flex h-full flex-col justify-between p-12">
					<div className="flex items-center gap-2">
						<span
							className="grid h-5 w-5 place-items-center rounded-[6px] bg-accent"
							aria-hidden="true"
						>
							<ArrowUp className="h-3 w-3 text-white" strokeWidth={3} />
						</span>
						<span className="text-lg font-semibold tracking-tightest">
							Shiplist
						</span>
					</div>

					<div className="max-w-md">
						<span className="inline-flex items-center gap-1.5 border border-line-strong px-2.5 py-1 text-xs font-medium text-muted">
							<RiSparkling2Line
								data-icon="inline-start"
								className="size-3.5"
								aria-hidden="true"
							/>
							Trusted by 12,000+ teams
						</span>
						<h2 className="mt-6 text-4xl leading-tight font-bold tracking-tightest font-display">
							Build faster with tools you can ship today.
						</h2>
						<p className="mt-4 text-base text-muted">
							Drop-in, production-ready workspace for your next product. One
							platform for your whole team to design, build, and launch.
						</p>
					</div>

					<p className="text-sm text-muted-2">
						&copy; 2026 Shiplist, Inc. All rights reserved.
					</p>
				</div>
			</div>
		</section>
	);
}
