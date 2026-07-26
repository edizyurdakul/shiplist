import z from "zod";

export const createWorkspaceSchema = z.object({
	workspaceName: z.string().min(1, "Workspace name is required"),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;

export type Visibility = "public" | "private";
