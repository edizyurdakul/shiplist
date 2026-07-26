"use client";

import {
	ArrowLeft,
	ArrowRight,
	Check,
	Globe,
	Loader2,
	Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { slugify } from "@/lib/utils";
import type { Visibility } from "../validations";

export function CreateWorkspaceForm() {
	const router = useRouter();
	const [step, setStep] = useState<1 | 2>(1);
	const [visibility, setVisibility] = useState<Visibility | null>(null);
	const [name, setName] = useState("");
	const [slug, setSlug] = useState("");
	const [slugTouched, setSlugTouched] = useState(false);
	const [slugStatus, setSlugStatus] = useState<
		"idle" | "checking" | "available" | "unavailable"
	>("idle");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

	const autoSlug = !slugTouched;
	useEffect(() => {
		if (autoSlug) setSlug(slugify(name));
	}, [name, autoSlug]);

	const checkSlugAvailability = useCallback(async (value: string) => {
		if (value.length < 3) {
			setSlugStatus("idle");
			return;
		}

		setSlugStatus("checking");
		try {
			const res = await fetch(
				`/api/workspace/check-slug?slug=${encodeURIComponent(value)}`,
			);
			const data = await res.json();
			setSlugStatus(data.available ? "available" : "unavailable");
		} catch {
			setSlugStatus("idle");
		}
	}, []);

	useEffect(() => {
		if (slug.length < 3) {
			setSlugStatus("idle");
			return;
		}

		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			checkSlugAvailability(slug);
		}, 500);

		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [slug, checkSlugAvailability]);

	const mark = name.trim().slice(0, 2).toUpperCase() || "WS";
	const validSlug = slug.length >= 3;
	const available = validSlug && slugStatus === "available";
	const taken = slugStatus === "unavailable";

	const handleCreate = async () => {
		if (!visibility || !available || isSubmitting) return;

		setIsSubmitting(true);
		try {
			const result = await authClient.organization.create({
				name,
				slug,
				metadata: { visibility },
			});

			if (result.error) {
				toast.error(result.error.message || "Failed to create workspace.");
				return;
			}

			await authClient.organization.setActive({
				organizationId: result.data.id,
			});

			toast.success("Workspace created!");
			router.push(`/w/${slug}`);
		} catch {
			toast.error("Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="shell py-20 md:py-28">
			<div className="mx-auto max-w-120">
				<p className="text-2xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
					Step {step} of 2
				</p>
				<h1 className="mt-3 text-[2rem] font-semibold tracking-[-0.035em] md:text-[2.4rem]">
					Create your workspace
				</h1>
				<p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
					One place for your feedback board, public roadmap, and changelog.
				</p>

				{step === 1 && (
					<StepVisibility
						visibility={visibility}
						onSelect={setVisibility}
						onContinue={() => visibility && setStep(2)}
					/>
				)}

				{step === 2 && (
					<StepName
						name={name}
						setName={setName}
						slug={slug}
						setSlug={(v) => {
							setSlugTouched(true);
							setSlug(slugify(v));
						}}
						available={available}
						taken={taken}
						mark={mark}
						visibility={visibility ?? "public"}
						onBack={() => setStep(1)}
						onCreate={handleCreate}
						isSubmitting={isSubmitting}
					/>
				)}
			</div>
		</main>
	);
}

function StepVisibility({
	visibility,
	onSelect,
	onContinue,
}: {
	visibility: Visibility | null;
	onSelect: (v: Visibility) => void;
	onContinue: () => void;
}) {
	const options: {
		value: Visibility;
		icon: React.ReactNode;
		title: string;
		desc: string;
		bullets: string[];
	}[] = [
		{
			value: "public",
			icon: <Globe className="h-4 w-4" />,
			title: "Public board",
			desc: "Anyone can view posts, vote, and leave feedback without an account.",
			bullets: [
				"Open feedback to your customers",
				"Votes and comments from the public",
				"Roadmap and changelog can be shared",
			],
		},
		{
			value: "private",
			icon: <Lock className="h-4 w-4" />,
			title: "Private board",
			desc: "Only invited members can see the board, roadmap, and changelog.",
			bullets: [
				"Invite-only access",
				"Internal feedback and planning",
				"Nothing is indexed or shareable",
			],
		},
	];

	return (
		<div className="mt-10 rounded-xl border border-border bg-card p-6 md:p-7">
			<h2 className="text-[1.0625rem] font-medium tracking-[-0.02em]">
				Who can see this board?
			</h2>
			<p className="mt-2 text-sm-13 leading-relaxed text-muted-foreground">
				You can change this anytime in workspace settings. Public boards can
				still have a private roadmap or changelog.
			</p>

			<div className="mt-6 space-y-3">
				{options.map((o) => {
					const active = visibility === o.value;
					return (
						<button
							key={o.value}
							type="button"
							onClick={() => onSelect(o.value)}
							className={`w-full rounded-xl border p-4 text-left transition-all ${
								active
									? "border-border-strong bg-secondary"
									: "border-border hover:border-border-strong"
							}`}
						>
							<div className="flex items-start gap-3.5">
								<span
									className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors ${
										active
											? "bg-foreground text-background"
											: "bg-secondary text-muted-foreground"
									}`}
								>
									{o.icon}
								</span>
								<div className="min-w-0 flex-1">
									<div className="flex items-center gap-2">
										<span className="text-[0.9375rem] font-medium">
											{o.title}
										</span>
										{active && (
											<span className="grid h-4 w-4 place-items-center rounded-full bg-foreground text-background">
												<Check className="h-2.5 w-2.5" strokeWidth={3} />
											</span>
										)}
									</div>
									<p className="mt-1 text-sm-13 leading-relaxed text-muted-foreground">
										{o.desc}
									</p>
									<ul className="mt-2.5 space-y-1">
										{o.bullets.map((b) => (
											<li
												key={b}
												className="flex items-center gap-2 text-[0.75rem] text-muted-foreground"
											>
												<span
													className="h-1 w-1 rounded-full"
													style={{ background: "var(--subtle)" }}
												/>
												{b}
											</li>
										))}
									</ul>
								</div>
							</div>
						</button>
					);
				})}
			</div>

			<button
				type="button"
				disabled={!visibility}
				onClick={onContinue}
				className="btn btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-40"
			>
				Continue
				<ArrowRight className="h-4 w-4" />
			</button>
		</div>
	);
}

function StepName({
	name,
	setName,
	slug,
	setSlug,
	available,
	taken,
	mark,
	visibility,
	onBack,
	onCreate,
	isSubmitting,
}: {
	name: string;
	setName: (v: string) => void;
	slug: string;
	setSlug: (v: string) => void;
	available: boolean;
	taken: boolean;
	mark: string;
	visibility: Visibility;
	onBack: () => void;
	onCreate: () => void;
	isSubmitting: boolean;
}) {
	const indicator = taken
		? { text: "✗ taken", color: "oklch(0.7 0.14 25)" }
		: available
			? { text: "✓ available", color: "oklch(0.78 0.11 155)" }
			: slug.length >= 3
				? { text: "checking…", color: "var(--muted-foreground)" }
				: null;

	return (
		<form
			className="mt-10 rounded-xl border border-border bg-card p-6 md:p-7"
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<button
				type="button"
				onClick={onBack}
				className="-ml-1 mb-4 inline-flex items-center gap-1 rounded text-[0.75rem] text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeft className="h-3.5 w-3.5" /> Back
			</button>

			<label htmlFor="workspace-name" className="block text-sm-13 font-medium">
				Workspace name
			</label>
			<input
				id="workspace-name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Shiplist Design"
				autoComplete="off"
				className="mt-2 w-full rounded-lg border border-input bg-transparent px-3.5 py-2.5 text-[0.875rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground/35"
			/>

			<div className="mt-6 flex items-baseline justify-between gap-3">
				<label
					htmlFor="workspace-slug"
					className="block text-sm-13 font-medium"
				>
					Slug
				</label>
				{indicator ? (
					<span
						className="font-mono text-[0.6875rem]"
						style={{ color: indicator.color }}
						aria-live="polite"
					>
						{indicator.text}
					</span>
				) : null}
			</div>
			<input
				id="workspace-slug"
				value={slug}
				onChange={(e) => setSlug(slugify(e.target.value))}
				placeholder="shiplist-design"
				autoComplete="off"
				spellCheck={false}
				className="mt-2 w-full rounded-lg border border-input bg-transparent px-3.5 py-2.5 font-mono text-sm-13 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground/35"
			/>

			<p className="mt-2.5 font-mono text-[0.75rem] text-muted-foreground">
				shiplist.app/w/
				<span className="text-foreground">{slug || "your-slug"}</span>
			</p>

			<div className="panel mt-6 flex items-center gap-4 p-4">
				<span
					className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-[0.875rem] font-semibold text-background"
					style={{ background: "var(--primary)" }}
				>
					{mark}
				</span>
				<div className="min-w-0 flex-1">
					<p className="truncate text-[0.875rem] font-medium">
						{name || "Your workspace"}
					</p>
					<p className="truncate font-mono text-[0.6875rem] text-muted-foreground">
						shiplist.app/w/{slug || "…"}
					</p>
				</div>
				<span
					className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[0.625rem] ${
						visibility === "public"
							? "border-border text-status-shipped"
							: "border-border text-muted-foreground"
					}`}
				>
					{visibility === "public" ? (
						<Globe className="h-2.5 w-2.5" />
					) : (
						<Lock className="h-2.5 w-2.5" />
					)}
					{visibility === "public" ? "Public" : "Private"}
				</span>
			</div>

			<button
				type="button"
				disabled={!available || isSubmitting}
				onClick={onCreate}
				className="btn btn-light mt-7 w-full disabled:cursor-not-allowed disabled:opacity-40"
			>
				{isSubmitting ? (
					<Loader2 className="h-4 w-4 animate-spin" />
				) : (
					<>
						Create workspace
						<ArrowRight className="h-4 w-4" />
					</>
				)}
			</button>

			<p className="mt-3 text-center text-[0.6875rem] text-muted-foreground">
				Free plan · 1 board, 3 members, 50 posts. Upgrade anytime.
			</p>
		</form>
	);
}
