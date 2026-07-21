"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function SignOut(_formData: FormData) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) return;

	await auth.api.signOut({
		headers: await headers(),
	});

	redirect("/");
}
