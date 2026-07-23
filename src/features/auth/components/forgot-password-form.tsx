"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
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
import { type ForgotPasswordInput, forgotPasswordSchema } from "../validations";

export function ForgotPasswordForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordInput>({
		resolver: zodResolver(forgotPasswordSchema),
	});

	const onSubmit: SubmitHandler<ForgotPasswordInput> = async (data) => {
		await authClient.requestPasswordReset(
			{
				...data,
				redirectTo: "/reset-password",
			},
			{
				onError: (error) => {
					toast.error(error.error.message);
				},
				onSuccess: () => {
					toast.success("Password reset email sent.");
				},
			},
		);
	};

	return (
		<Card className="w-full max-w-sm border-0 bg-transparent shadow-none ring-0">
			<CardHeader className="px-0">
				<CardTitle className="text-2xl font-bold tracking-tight">
					Reset Your Password
				</CardTitle>
				<CardDescription className="text-sm">
					Enter details below to send a reset password email.
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
						<div className="flex gap-2">
							<Button
								variant={"outline"}
								nativeButton={false}
								render={<Link href="/sign-in" />}
							>
								Go back
							</Button>
							<Button
								type="submit"
								className="w-full flex-1"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<Loader2 className="animate-spin" />
								) : (
									"Send reset email"
								)}
							</Button>
						</div>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
