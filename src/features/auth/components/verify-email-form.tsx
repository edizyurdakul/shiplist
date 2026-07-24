"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export function VerifyEmailForm() {
	const searchParams = useSearchParams();
	const [sending, setSending] = useState(false);
	const [cooldown, setCooldown] = useState(0);

	useEffect(() => {
		if (cooldown <= 0) return;
		const timer = setInterval(() => {
			setCooldown((prev) => prev - 1);
		}, 1000);
		return () => clearInterval(timer);
	}, [cooldown]);
	const email = searchParams.get("email");

	async function handleResend() {
		if (!email || sending || cooldown > 0) return;

		try {
			setSending(true);
			const { error } = await authClient.sendVerificationEmail({
				email,
				callbackURL: `${window.location.origin}/`,
			});
			setSending(false);

			if (error) {
				toast.error(error.message);
			} else {
				toast.success("Verification email sent.");
				setCooldown(60);
			}
		} catch (_error) {
			setSending(false);
			toast.error("Something went wrong. Please try again.");
		}
	}

	const disabled = !email || sending || cooldown > 0;

	return (
		<Card className="w-full max-w-sm border-0 bg-transparent shadow-none ring-0">
			<CardHeader className="px-0">
				<CardTitle className="text-2xl font-bold tracking-tight">
					Verify Email
				</CardTitle>
				<CardDescription className="text-sm">
					{email ? (
						<>
							We sent a verification link to{" "}
							<span className="font-medium text-foreground">{email}</span>.
							Check your inbox.
						</>
					) : (
						<>
							No email provided.{" "}
							<Link href="/forgot-password" className="underline">
								Recover your email
							</Link>{" "}
							or provide your email when signing up.
						</>
					)}
				</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col gap-6 px-0">
				<Button
					type="button"
					className="w-full"
					disabled={disabled}
					onClick={handleResend}
				>
					{sending ? (
						<Loader2 className="animate-spin" />
					) : cooldown > 0 ? (
						`Resend email (${cooldown}s)`
					) : (
						"Resend verification email"
					)}
				</Button>
			</CardContent>
			<CardFooter className="px-0 text-sm text-muted-foreground bg-transparent">
				Already verified email?{" "}
				<Button
					variant="link"
					className="px-1"
					render={<Link href="/sign-in" />}
					nativeButton={false}
				>
					Sign in
				</Button>
			</CardFooter>
		</Card>
	);
}
