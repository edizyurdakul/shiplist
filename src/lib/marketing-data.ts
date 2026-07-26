type Status = "review" | "planned" | "progress" | "shipped";

export const STATUS_META: Record<
	Status,
	{ label: string; color: string; bg: string; dot: string }
> = {
	review: {
		label: "Under Review",
		color: "#b34d8a",
		bg: "rgba(179,77,138,0.12)",
		dot: "#b34d8a",
	},
	planned: {
		label: "Planned",
		color: "#7a86d8",
		bg: "rgba(94,106,210,0.12)",
		dot: "#7a86d8",
	},
	progress: {
		label: "In Progress",
		color: "#c99a2e",
		bg: "rgba(201,154,46,0.12)",
		dot: "#c99a2e",
	},
	shipped: {
		label: "Shipped",
		color: "#4f9d69",
		bg: "rgba(79,157,105,0.12)",
		dot: "#4f9d69",
	},
};

export type { Status };

export type Post = {
	id: string;
	title: string;
	board: string;
	status: Status;
	votes: number;
	comments: number;
	author: string;
	tags: string[];
};

export const POSTS: Post[] = [
	{
		id: "P-204",
		title: "OAuth login for the public roadmap",
		board: "acme/web",
		status: "shipped",
		votes: 184,
		comments: 23,
		author: "lena",
		tags: ["auth", "roadmap"],
	},
	{
		id: "P-211",
		title: "Drag a post between status columns",
		board: "acme/web",
		status: "progress",
		votes: 142,
		comments: 18,
		author: "marcus",
		tags: ["roadmap", "ux"],
	},
	{
		id: "P-218",
		title: "Link a changelog entry back to its source post",
		board: "acme/api",
		status: "planned",
		votes: 97,
		comments: 9,
		author: "priya",
		tags: ["changelog", "links"],
	},
	{
		id: "P-223",
		title: 'Webhook event for "post upvoted past 100"',
		board: "acme/api",
		status: "review",
		votes: 61,
		comments: 14,
		author: "devon",
		tags: ["webhooks", "api"],
	},
	{
		id: "P-227",
		title: "Duplicate detection on new post submit",
		board: "acme/web",
		status: "planned",
		votes: 54,
		comments: 6,
		author: "sofia",
		tags: ["automation"],
	},
];

export const PIPELINE: { status: Status; count: number; sample: string }[] = [
	{
		status: "review",
		count: 14,
		sample: "Webhook event for upvote thresholds",
	},
	{
		status: "planned",
		count: 31,
		sample: "Link changelog to source post",
	},
	{
		status: "progress",
		count: 9,
		sample: "Drag posts between columns",
	},
	{
		status: "shipped",
		count: 127,
		sample: "OAuth login for public roadmap",
	},
];

export const CHANGELOG = [
	{
		kind: "new",
		version: "v2.4.0",
		title: "Public roadmap got drag-and-drop columns",
		date: "Jul 18",
		linked: "P-211",
	},
	{
		kind: "improved",
		version: "v2.3.2",
		title: "Vote tally now updates over websockets, no refresh",
		date: "Jul 09",
		linked: "P-188",
	},
	{
		kind: "fixed",
		version: "v2.3.1",
		title: "Changelog RSS respected the category filter",
		date: "Jul 02",
		linked: "P-176",
	},
] as const;

export const PRICING = [
	{
		name: "Free",
		price: "$0",
		cadence: "forever",
		line: "One board, three people, fifty posts. Enough to run a single feedback loop end to end.",
		specs: ["1 workspace", "1 board", "3 members", "50 posts"],
		cta: "Open the Acme board",
		featured: false,
	},
	{
		name: "Team",
		price: "$19",
		cadence: "/ month",
		line: "Most teams land here. Three workspaces, five boards, room for a real roadmap and a changelog.",
		specs: ["3 workspaces", "5 boards", "15 members", "500 posts"],
		cta: "Start with Team",
		featured: true,
	},
	{
		name: "Business",
		price: "$49",
		cadence: "/ month",
		line: "For teams running feedback across several products. Unlimited boards and posts, fifty members.",
		specs: [
			"20 workspaces",
			"Unlimited boards",
			"50 members",
			"Unlimited posts",
		],
		cta: "Start with Business",
		featured: false,
	},
];
