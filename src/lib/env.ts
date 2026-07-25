import { z } from "zod";
import { createEnv } from "./create-env";

export const env = createEnv({
	server: {
		DATABASE_URL: z.url(),
		BETTER_AUTH_URL: z.url(),
		BETTER_AUTH_SECRET: z.string().min(1),
		RESEND_API_KEY: z.string().min(1),
		EMAIL_FROM: z.string().min(1),
		EMAIL_TO: z.string().min(1),
		UPSTASH_REDIS_REST_URL: z.string().min(1),
		UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
	},
	client: {},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		EMAIL_FROM: process.env.EMAIL_FROM,
		EMAIL_TO: process.env.EMAIL_TO,
		UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
		UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
		NODE_ENV: process.env.NODE_ENV,
	},
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});
