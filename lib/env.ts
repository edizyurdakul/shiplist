import { z } from "zod";
import { createEnv } from "./create-env";

export const env = createEnv({
	server: {
		DATABASE_URL: z.url(),
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
	},
	client: {},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
	},
	emptyStringAsUndefined: true,
});
