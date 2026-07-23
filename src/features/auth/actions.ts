"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function SignOut(_formData: FormData) {
	const reqHeaders = await headers();

	const session = await auth.api.getSession({
		headers: reqHeaders,
	});

	if (!session) return;

	await auth.api.signOut({
		headers: reqHeaders,
	});

	redirect("/");
}
