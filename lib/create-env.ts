import { type ZodType, z } from "zod";

type Schema = Record<string, ZodType>;

interface Options<TServer extends Schema, TClient extends Schema> {
	server?: TServer;
	client?: TClient;
	runtimeEnv: Record<string, string | undefined>;
	skipValidation?: boolean;
	emptyStringAsUndefined?: boolean;
}

export function createEnv<
	TServer extends Schema = Record<string, never>,
	TClient extends Schema = Record<string, never>,
>(opts: Options<TServer, TClient>) {
	const {
		server = {},
		client = {},
		runtimeEnv,
		skipValidation,
		emptyStringAsUndefined,
	} = opts;
	const isServer = typeof window === "undefined";
	const schema = z.object({ ...client, ...server });

	if (skipValidation) return runtimeEnv as z.infer<typeof schema>;

	const input = emptyStringAsUndefined
		? Object.fromEntries(
				Object.entries(runtimeEnv).map(([k, v]) => [
					k,
					v === "" ? undefined : v,
				]),
			)
		: runtimeEnv;

	const parsed = schema.safeParse(input);
	if (!parsed.success) {
		console.error(
			"❌ Invalid environment variables:",
			JSON.stringify(z.treeifyError(parsed.error), null, 2),
		);
		throw new Error(
			"Invalid environment variables, check console for details.",
		);
	}

	return new Proxy(parsed.data, {
		get(target, prop) {
			if (
				typeof prop === "string" &&
				!isServer &&
				prop in server &&
				!(prop in client)
			) {
				throw new Error(
					`❌ Tried to access server-only env var "${prop}" on the client`,
				);
			}
			return target[prop as keyof typeof target];
		},
	}) as z.infer<typeof schema>;
}
