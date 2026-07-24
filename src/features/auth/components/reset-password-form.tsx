"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
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
import { authClient } from "@/lib/auth-client";
import { type ResetPasswordInput, resetPasswordSchema } from "../validations";

export function ResetPasswordForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ResetPasswordInput>({
		resolver: zodResolver(resetPasswordSchema),
	});

	useEffect(() => {
		if (!token) {
			router.push("/");
		}
	}, [token, router]);

	if (!token) return null;

	const onSubmit: SubmitHandler<ResetPasswordInput> = async (data) => {
		if (!token) return;

		try {
			await authClient.resetPassword(
				{
					newPassword: data.password,
					token,
				},
				{
					onSuccess: () => {
						toast.success("Successful password reset.");
						router.push("/sign-in");
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

	return (
		<Card className="w-full max-w-sm border-0 bg-transparent shadow-none ring-0">
			<CardHeader className="px-0">
				<CardTitle className="text-2xl font-bold tracking-tight">
					Password Reset
				</CardTitle>
				<CardDescription className="text-sm">
					Enter your details to get started.
				</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col gap-6 px-0">
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="password">New password</FieldLabel>
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
								Confirm new password
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
								"Reset password"
							)}
						</Button>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
