import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth/minimal";
import { organization } from "better-auth/plugins";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import PasswordResetEmail from "../../emails/password-reset-email";
import VerificationEmail from "../../emails/verification-email";
import { env } from "./env";
import { getResend } from "./resend";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		minPasswordLength: 8,
		maxPasswordLength: 128,
		autoSignIn: true,
		sendResetPassword: async ({ user, url }) => {
			const { error } = await getResend().emails.send({
				from: env.EMAIL_FROM,
				to: user.email,
				subject: "Reset your password",
				react: PasswordResetEmail({ resetUrl: url }),
			});
			if (error) {
				throw new Error(
					`Failed to send password reset email: ${error.message}`,
				);
			}
		},
		resetPasswordTokenExpiresIn: 3600, // 1 hour
		revokeSessionsOnPasswordReset: true,
		onExistingUserSignUp: async ({ user }) => {
			const { error } = await getResend().emails.send({
				from: env.EMAIL_FROM,
				to: user.email,
				subject: "Sign-up attempt with your email",
				text: "Someone tried to create an account using your email address. If this was you, try signing in instead. If not, you can safely ignore this email.",
			});
			if (error) {
				throw new Error(
					`Failed to send sign-up notification email: ${error.message}`,
				);
			}
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,

		sendVerificationEmail: async ({ user, url }) => {
			void getResend().emails.send({
				from: env.EMAIL_FROM,
				to: user.email,
				subject: "Verify your email address",
				react: VerificationEmail({ verificationUrl: url }),
			});
		},
	},
	plugins: [organization()],
});
