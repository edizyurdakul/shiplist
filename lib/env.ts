import { z } from "zod";
import { createEnv } from "./create-env";

export const env = createEnv({
	server: {
		DATABASE_URL: z.url(),
		BETTER_AUTH_URL: z.url(),
		BETTER_AUTH_SECRET: z.string().min(1),
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
	},
	client: {},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		NODE_ENV: process.env.NODE_ENV,
	},
	emptyStringAsUndefined: true,
});
