import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreateWorkspaceForm } from "@/features/workspace/components/create-workspace-form";
import { auth } from "@/lib/auth";

export default async function CreateWorkspacePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) redirect("/sign-in?callbackURL=/create-workspace");

	return <CreateWorkspaceForm />;
}
