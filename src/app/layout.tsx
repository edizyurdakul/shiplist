import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

const fontMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://shiplist.dev"),
	title: "Shiplist — Collect feedback. Plan your roadmap. Ship what matters.",
	description:
		"A feedback board, public roadmap, and changelog in one workspace. Flat-rate, never per-user. Built for small software teams.",
	openGraph: {
		title: "Shiplist",
		description:
			"A feedback board, public roadmap, and changelog in one workspace. Flat-rate, never per-user.",
		type: "website",
	},
	twitter: { card: "summary_large_image" },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.variable} ${fontMono.variable} antialiased dark font-sans`}
			>
				<Toaster />
				{children}
			</body>
		</html>
	);
}
