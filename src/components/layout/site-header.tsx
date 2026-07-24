import { cookies, headers } from "next/headers";
import Link from "next/link";
import { SignOut } from "@/features/auth/actions";
import { getActiveOrganizationSlug } from "@/features/workspace/helpers";
import { auth } from "@/lib/auth";
import { ShiplistMark } from "../icons/shiplist-mark";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export async function SiteHeader() {
	let session = null;
	try {
		session = await auth.api.getSession({
			headers: await headers(),
		});
	} catch {
		const cookieStore = await cookies();
		cookieStore.delete("better-auth.session_token");
	}

	const slug = await getActiveOrganizationSlug(session);

	return (
		<header className="sticky top-0 z-40 backdrop-blur-xl border-b ">
			<nav className="max-w-7xl mx-auto h-16 flex items-center px-6">
				<ul className="flex items-center w-full">
					<li className="flex-1">
						<Link href="/" className="flex gap-2 items-center">
							<ShiplistMark className="h-4 w-4 mt-2" />
							Shiplist
						</Link>
					</li>
					<li className="flex gap-4 items-center">
						<ul className="flex">
							<li>
								<Button
									render={<Link href="#features" />}
									nativeButton={false}
									variant={"nav"}
								>
									Features
								</Button>
							</li>
							<li>
								<Button
									render={<Link href="#pricing" />}
									nativeButton={false}
									variant={"nav"}
								>
									Pricing
								</Button>
							</li>
							<li>
								<Button
									render={<Link href="/docs" />}
									nativeButton={false}
									variant={"nav"}
								>
									Docs
								</Button>
							</li>
						</ul>
						<Separator orientation="vertical" className="w-px h-8" />
						<ul className="flex gap-1">
							{session ? (
								<>
									<li>
										<form action={SignOut}>
											<Button type="submit" variant={"nav"}>
												Sign Out
											</Button>
										</form>
									</li>
									<li>
										<Button
											render={
												<Link
													href={slug ? `/w/${slug}` : "/create-workspace"}
												/>
											}
											nativeButton={false}
											className={"rounded-full"}
										>
											Open App
										</Button>
									</li>
								</>
							) : (
								<>
									<li>
										<Button
											render={<Link href="/sign-in" />}
											nativeButton={false}
											variant={"nav"}
										>
											Sign In
										</Button>
									</li>
									<li>
										<Button
											render={<Link href="/sign-up" />}
											nativeButton={false}
											className={"rounded-full"}
										>
											Sign Up
										</Button>
									</li>
								</>
							)}
						</ul>
					</li>
				</ul>
			</nav>
		</header>
	);
}
