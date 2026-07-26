import type { Metadata } from "next";
import { Suspense } from "react";
import { Automation } from "@/components/landing/automation";
import { ClosingCta } from "@/components/landing/closing-cta";
import { Developers } from "@/components/landing/developers";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { LogoStrip } from "@/components/landing/logo-strip";
import { Pricing } from "@/components/landing/pricing";
import { StatusFlow } from "@/components/landing/status-flow";
import { Surfaces } from "@/components/landing/surfaces";
import { Testimonials } from "@/components/landing/testimonials";

export const metadata: Metadata = {
	title: "Shiplist — Feedback board, public roadmap, changelog",
	description:
		"One workspace for your feedback board, public roadmap, and changelog. Votes and status are the backbone. Flat-rate per workspace, never per user.",
	openGraph: {
		title: "Shiplist — Feedback board, public roadmap, changelog",
		description:
			"One workspace for your feedback board, public roadmap, and changelog. Votes and status are the backbone. Flat-rate per workspace, never per user.",
		type: "website",
	},
	twitter: { card: "summary_large_image" as const },
};

export default function Home() {
	return (
		<div className="grain min-h-screen bg-background">
			<Suspense fallback={<div className="h-13" />}>
				<Header />
			</Suspense>
			<main>
				<Hero />
				<LogoStrip />
				<StatusFlow />
				<Surfaces />
				<Developers />
				<Automation />
				<Pricing />
				<Testimonials />
				<ClosingCta />
			</main>
			<Footer />
		</div>
	);
}
