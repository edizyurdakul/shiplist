import { z } from "zod";

export const signUpSchema = z
	.object({
		name: z.string().min(1, "Name is required"),
		email: z.email("Enter a valid email address."),
		password: z.string().min(1, "Password is required"),
		confirmPassword: z.string().min(1, "Passwords don't match"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
	email: z.email("Enter a valid email address."),
	password: z.string().min(1, "Password is required"),
});

export type SignInInput = z.infer<typeof signInSchema>;
