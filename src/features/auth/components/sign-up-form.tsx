"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RiGithubFill, RiGoogleFill } from "@remixicon/react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { type SignUpInput, signUpSchema } from "@/features/auth/validations";
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpInput>({ resolver: zodResolver(signUpSchema) });

	const onSubmit: SubmitHandler<SignUpInput> = async (data) =>
		await authClient.signUp.email(
			{
				...data,
				callbackURL: "/",
			},
			{
				onSuccess: () => {
					// toast.success("Successfully created account, verify email.");
					router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
				},
				onError: (error) => {
					toast.error(error.error.message);
				},
			},
		);

	function handleSocial(provider: string) {
		toast.info(`Continuing with ${provider}`, {
			description: "Redirecting you to authenticate…",
		});
	}

	return (
		<Card className="w-full max-w-sm border-0 bg-transparent shadow-none ring-0">
			<CardHeader className="px-0">
				<CardTitle className="text-2xl font-bold tracking-tight">
					Create your account
				</CardTitle>
				<CardDescription className="text-sm">
					Enter your details to get started.
				</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col gap-6 px-0">
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="name">Name</FieldLabel>
							<Input
								id="name"
								type="text"
								placeholder="Your name"
								aria-invalid={!!errors.name}
								{...register("name")}
							/>
							<FieldError>{errors.name?.message}</FieldError>
						</Field>
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
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								aria-invalid={!!errors.password}
								{...register("password")}
							/>
							<FieldError>{errors.password?.message}</FieldError>
						</Field>
						<Field>
							<FieldLabel htmlFor="confirmPassword">
								Confirm password
							</FieldLabel>
							<Input
								id="confirmPassword"
								type="password"
								placeholder="••••••••"
								aria-invalid={!!errors.confirmPassword}
								{...register("confirmPassword")}
							/>
							<FieldError>{errors.confirmPassword?.message}</FieldError>
						</Field>

						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting ? (
								<Loader2 className="animate-spin" />
							) : (
								"Create account"
							)}
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
				Already have an account?{" "}
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
