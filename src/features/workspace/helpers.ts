import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { organization } from "@/lib/db/schema";

export async function getActiveOrganizationSlug(
	session: {
		session: { activeOrganizationId?: string | null };
	} | null,
): Promise<string | null> {
	const activeOrgId = session?.session?.activeOrganizationId;
	if (!activeOrgId) return null;

	const [org] = await db
		.select({ slug: organization.slug })
		.from(organization)
		.where(eq(organization.id, activeOrgId))
		.limit(1);

	return org?.slug ?? null;
}
