"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RiGithubFill, RiGoogleFill } from "@remixicon/react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { type SignInInput, signInSchema } from "@/features/auth/validations";
import { authClient } from "@/lib/auth-client";

export function SignInForm() {
	const router = useRouter();
	const [remember, setRemember] = useState(true);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInInput>({ resolver: zodResolver(signInSchema) });

	const onSubmit: SubmitHandler<SignInInput> = async (data) => {
		try {
			await authClient.signIn.email(
				{
					...data,
					rememberMe: remember,
				},
				{
					onSuccess: async () => {
						const { data: session } = await authClient.getSession();
						const activeOrgId = session?.session?.activeOrganizationId;

						if (activeOrgId) {
							const { data: org } =
								await authClient.organization.getFullOrganization({
									query: { organizationId: activeOrgId },
								});
							if (org) {
								router.push(`/w/${org.slug}`);
								return;
							}
						}

						const { data: orgs } = await authClient.organization.list();
						if (orgs && orgs.length > 0) {
							await authClient.organization.setActive({
								organizationId: orgs[0].id,
							});
							router.push(`/w/${orgs[0].slug}`);
						} else {
							router.push("/create-workspace");
						}
					},
					onError: (error) => {
						const msg = error.error.message;
						const retry = error.error.retryAfter;
						toast.error(msg, {
							description: retry ? `Try again in ${retry} seconds.` : undefined,
						});
					},
				},
			);
		} catch (_error) {
			toast.error("Something went wrong. Please try again.");
		}
	};

	function handleSocial(provider: string) {
		toast.info(`Continuing with ${provider}`, {
			description: "Redirecting you to authenticate…",
		});
	}

	return (
		<Card className="w-full max-w-sm border-0 bg-transparent shadow-none ring-0">
			<CardHeader className="px-0">
				<CardTitle className="text-2xl font-bold tracking-tight">
					Sign in to Shiplist
				</CardTitle>
				<CardDescription className="text-sm">
					Welcome back. Enter your details to continue.
				</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col gap-6 px-0">
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								aria-invalid={!!errors.email}
								{...register("email")}
							/>
							<FieldError>{errors.email?.message}</FieldError>
						</Field>
						<Field>
							<div className="flex items-center justify-between">
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Button
									variant="link"
									className="h-auto px-0 text-xs"
									render={<Link href="/forget-password" />}
									nativeButton={false}
								>
									Forgot password?
								</Button>
							</div>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								aria-invalid={!!errors.password}
								{...register("password")}
							/>
							<FieldError>{errors.password?.message}</FieldError>
						</Field>

						<Field orientation="horizontal">
							<FieldLabel
								htmlFor="remember"
								className="font-normal text-muted-foreground has-data-checked:bg-transparent has-data-checked:border-transparent dark:has-data-checked:bg-transparent dark:has-data-checked:border-transparent"
							>
								<Checkbox
									id="remember"
									checked={remember}
									onCheckedChange={(checked) => setRemember(checked === true)}
								/>
								Remember me
							</FieldLabel>
						</Field>

						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting ? <Loader2 className="animate-spin" /> : "Sign In"}
						</Button>
					</FieldGroup>
				</form>

				<div className="flex items-center gap-3 text-xs text-muted-foreground">
					<Separator className="flex-1 h-px" />
					Or
					<Separator className="flex-1 h-px" />
				</div>

				<div className="flex flex-col gap-3 sm:flex-row">
					<Button
						type="button"
						variant="outline"
						className="flex-1"
						onClick={() => handleSocial("Google")}
					>
						<RiGoogleFill data-icon="inline-start" />
						Google
					</Button>
					<Button
						type="button"
						variant="outline"
						className="flex-1"
						onClick={() => handleSocial("GitHub")}
					>
						<RiGithubFill data-icon="inline-start" />
						GitHub
					</Button>
				</div>
			</CardContent>

			<CardFooter className="justify-center px-0 text-sm text-muted-foreground bg-transparent">
				Don&apos;t have an account?{" "}
				<Button
					variant="link"
					className="px-1"
					render={<Link href="/sign-up" />}
					nativeButton={false}
				>
					Sign up
				</Button>
			</CardFooter>
		</Card>
	);
}
