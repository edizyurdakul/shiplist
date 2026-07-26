import { headers } from "next/headers";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { SignOut } from "@/features/auth/actions";
import { auth } from "@/lib/auth";

const LINKS = [
	{ label: "Product", href: "#product" },
	{ label: "Developers", href: "#developers" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Changelog", href: "#changelog" },
];

export async function Header() {
	let session = null;
	try {
		session = await auth.api.getSession({
			headers: await headers(),
		});
	} catch {
		// No valid session
	}

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
			<div className="w-full max-w-[72rem] mx-auto px-6 flex h-13 items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<span
						className="flex size-5 items-center justify-center rounded-[0.35rem]"
						style={{ background: "var(--primary)" }}
						aria-hidden="true"
					>
						<svg
							width="11"
							height="11"
							viewBox="0 0 16 16"
							fill="none"
							aria-hidden="true"
						>
							<path
								d="M3 11.5 8 2l5 9.5-5-2.4-5 2.4Z"
								fill="currentColor"
								className="text-primary-foreground"
							/>
						</svg>
					</span>
					<span className="text-[0.9375rem] font-semibold tracking-[-0.02em]">
						Shiplist
					</span>
				</Link>

				<nav className="hidden items-center gap-7 md:flex">
					{LINKS.map((link) => (
						<a
							key={link.label}
							href={link.href}
							className="text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
						>
							{link.label}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-3">
					{session ? (
						<>
							<form action={SignOut}>
								<Button variant="ghost" size="sm" type="submit">
									Sign out
								</Button>
							</form>
							<Link
								href="/dashboard"
								className={buttonVariants({ variant: "invert", size: "sm" })}
							>
								Open App
							</Link>
						</>
					) : (
						<>
							<a
								href="/sign-in"
								className={buttonVariants({ variant: "ghost", size: "sm" })}
							>
								Sign in
							</a>
							<a
								href="/sign-up"
								className={buttonVariants({ variant: "invert", size: "sm" })}
							>
								Sign up
							</a>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
