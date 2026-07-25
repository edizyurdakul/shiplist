import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const fontSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	title: "Shiplist",
	description:
		"Shiplist is a multi-tenant feedback platform for product teams — crisp boards, a public roadmap, and a changelog your users actually read.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${fontSans.variable} ${fontMono.variable} antialiased dark font-sans`}
			>
				<Toaster />
				{children}
			</body>
		</html>
	);
}
