import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default async function WLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className="min-h-screen bg-background">
			<header className="border-b border-border">
				<div className="shell flex h-13 items-center justify-between">
					<Link href="/" className="flex items-center gap-2">
						<span
							className="flex size-5 items-center justify-center rounded-[0.35rem]"
							style={{ background: "var(--primary)" }}
							aria-hidden="true"
						>
							<ArrowUp
								className="size-3 text-primary-foreground"
								strokeWidth={3}
							/>
						</span>
						<span className="text-base font-semibold tracking-snug">
							Shiplist
						</span>
					</Link>
				</div>
			</header>
			{children}
		</section>
	);
}
