"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { SignOut } from "@/features/auth/actions";

export function Nav({ isLoggedIn }: { isLoggedIn: boolean }) {
	return (
		<header className="sticky top-0 z-40 border-b border-line bg-[var(--base)]/80 backdrop-blur-md">
			<div className="mx-auto flex h-13 max-w-[1180px] items-center justify-between px-5 py-3">
				<Link href="/" className="focus-ring flex items-center gap-2 rounded">
					<span
						className="grid h-5 w-5 place-items-center rounded-[6px] bg-accent"
						aria-hidden
					>
						<ArrowUp className="h-3 w-3 text-white" strokeWidth={3} />
					</span>
					<span className="text-[15px] font-semibold tracking-tightest">
						Shiplist
					</span>
				</Link>
				<nav className="hidden items-center gap-6 text-[13px] text-muted md:flex">
					<a
						href="#product"
						className="focus-ring rounded transition-colors hover:text-[var(--ink)]"
					>
						Product
					</a>
					<a
						href="#developers"
						className="focus-ring rounded transition-colors hover:text-[var(--ink)]"
					>
						Developers
					</a>
					<a
						href="#pricing"
						className="focus-ring rounded transition-colors hover:text-[var(--ink)]"
					>
						Pricing
					</a>
					<a
						href="#changelog"
						className="focus-ring rounded transition-colors hover:text-[var(--ink)]"
					>
						Changelog
					</a>
				</nav>
				<div className="flex items-center gap-1.5">
					{isLoggedIn ? (
						<>
							<form action={SignOut}>
								<button
									type="submit"
									className="focus-ring hidden rounded px-2.5 py-1.5 text-[13px] text-muted transition-colors hover:text-[var(--ink)] sm:inline"
								>
									Sign Out
								</button>
							</form>
							<Link
								href="/create-workspace"
								className="btn-primary focus-ring inline-flex items-center gap-1.5  text-[13px] font-medium"
							>
								Open App
							</Link>
						</>
					) : (
						<>
							<Link
								href="/sign-in"
								className="focus-ring hidden rounded px-2.5 py-1.5 text-[13px] text-muted transition-colors hover:text-[var(--ink)] sm:inline"
							>
								Sign in
							</Link>
							<Link
								href="/sign-up"
								className="btn-primary focus-ring inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-medium"
							>
								Sign up
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
