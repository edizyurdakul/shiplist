import { SiteHeader } from "@/components/layout/site-header";

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<SiteHeader />
			{children}
		</>
	);
}
