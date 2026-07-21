import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function HeroSection() {
	return (
		<section className="relative border-b">
			<div className="absolute inset-0 bg-radial-glow pointer-events-none" />
			<div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
			<div className="relative max-w-7xl mx-auto px-6 pt-24 pb-24">
				<Badge
					variant={"outline"}
					className="font-mono text-muted-foreground py-3 px-2.5 uppercase flex items-center justify-center gap-2 "
				>
					<span className="h-1 w-1 rounded-full bg-neutral-50" />
					SHIPLIST &middot; v0.1 preview
				</Badge>
				<h1
					className="mt-6 font-display text-5xl lg:text-7xl tracking-tighter text-white max-w-4xl animate-fade-up"
					style={{ animationDelay: "60ms" }}
				>
					Feedback, <span className="text-neutral-500">but designed</span>{" "}
					<br className="hidden sm:block" />
					for teams that ship.
				</h1>
				<p
					className="mt-6 max-w-xl text-base md:text-lg text-neutral-400 leading-relaxed animate-fade-up"
					style={{ animationDelay: "120ms" }}
				>
					Shiplist is a multi-tenant feedback platform for product teams &mdash;
					crisp boards, a public roadmap, and a changelog your users actually
					read. Built with the calmness of Linear.
				</p>
				<div
					className="mt-10 flex items-center gap-3 animate-fade-up"
					style={{ animationDelay: "180ms" }}
				>
					<Button
						render={<Link href="/w/shiplist/board" />}
						nativeButton={false}
						className={"rounded-full"}
					>
						Create your workspace
						<ArrowUpRight className="h-4 w-4" />
					</Button>
					<Button
						render={<Link href="/sign-up" />}
						nativeButton={false}
						className={"rounded-full"}
						variant={"ghost"}
					>
						View Demo
					</Button>
				</div>
			</div>
		</section>
	);
}
