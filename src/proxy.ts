import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getRateLimiter, getRateLimitIdentifier } from "./lib/ratelimiter";

export async function proxy(request: NextRequest, event: NextFetchEvent) {
	if (request.method === "POST") {
		const pathname = request.nextUrl.pathname;
		const limiter = getRateLimiter(pathname);

		if (limiter) {
			const ip =
				request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
				request.headers.get("x-real-ip") ??
				"anonymous";

			const identifier = getRateLimitIdentifier(ip, pathname);

			const { success, pending, reset } = await limiter.limit(identifier);

			event.waitUntil(pending);

			if (!success) {
				const retryAfter = Math.ceil((reset - Date.now()) / 1000);
				return NextResponse.json(
					{ error: "Too many requests. Please try again later.", retryAfter },
					{
						status: 429,
						headers: { "Retry-After": String(retryAfter) },
					},
				);
			}
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: "/api/auth/:path*",
};
