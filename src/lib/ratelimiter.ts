import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const rateLimiters = {
	signIn: new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(5, "60 s"),
		prefix: "rl:sign-in",
	}),

	passwordReset: new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(3, "900 s"),
		prefix: "rl:password-reset",
	}),

	signUp: new Ratelimit({
		redis,
		limiter: Ratelimit.fixedWindow(3, "3600 s"),
		prefix: "rl:sign-up",
	}),

	verificationEmail: new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(3, "3600 s"),
		prefix: "rl:verify-email",
	}),
};

export function getRateLimiter(pathname: string) {
	if (pathname.includes("/sign-in")) return rateLimiters.signIn;
	if (pathname.includes("/sign-up")) return rateLimiters.signUp;
	if (pathname.includes("/request-password-reset"))
		return rateLimiters.passwordReset;
	if (pathname.includes("/send-verification-email"))
		return rateLimiters.verificationEmail;

	return null;
}

export function getRateLimitIdentifier(ip: string, pathname: string) {
	const action = pathname.includes("/sign-in")
		? "sign-in"
		: pathname.includes("/sign-up")
			? "sign-up"
			: pathname.includes("/request-password-reset")
				? "request-password-reset"
				: pathname.includes("/send-verification-email")
					? "send-verification-email"
					: "other";

	return `${ip}:${action}`;
}
