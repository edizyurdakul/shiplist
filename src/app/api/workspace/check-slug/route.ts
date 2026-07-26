import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { organization } from "@/lib/db/schema";

export async function GET(request: NextRequest) {
	const slug = request.nextUrl.searchParams.get("slug");

	if (!slug || slug.length < 3) {
		return NextResponse.json({ available: false, reason: "too_short" });
	}

	if (!/^[a-z0-9-]+$/.test(slug)) {
		return NextResponse.json({ available: false, reason: "invalid_chars" });
	}

	const [existing] = await db
		.select({ id: organization.id })
		.from(organization)
		.where(eq(organization.slug, slug))
		.limit(1);

	return NextResponse.json({
		available: !existing,
		slug,
	});
}
