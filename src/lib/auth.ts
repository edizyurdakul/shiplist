import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth/minimal";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import PasswordResetEmail from "../../emails/password-reset-email";
import VerificationEmail from "../../emails/verification-email";
import { env } from "./env";
import { resend } from "./resend";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,

		sendResetPassword: async ({ user, url, token }, request) => {
			void resend.emails.send({
				from: env.EMAIL_FROM,
				to: env.EMAIL_TO,
				subject: "Reset your password",
				react: PasswordResetEmail({ resetUrl: url }),
			});
		},
		onExistingUserSignUp: async ({ user }, request) => {
			void resend.emails.send({
				from: env.EMAIL_FROM,
				to: env.EMAIL_TO,
				subject: "Sign-up attempt with your email",
				text: "Someone tried to create an account using your email address. If this was you, try signing in instead. If not, you can safely ignore this email.",
			});
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,

		sendVerificationEmail: async ({ user, url, token }, request) => {
			void resend.emails.send({
				from: env.EMAIL_FROM,
				to: env.EMAIL_TO,
				subject: "Verify your email address",
				react: VerificationEmail({ verificationUrl: url }),
			});
		},
	},
});
