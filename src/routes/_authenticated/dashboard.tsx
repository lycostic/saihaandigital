import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Your Client Dashboard — Saihaan Digital" },
      {
        name: "description",
        content:
          "Save and update your business details, industry and website goals in your Saihaan Digital client dashboard.",
      },
      { property: "og:title", content: "Your Client Dashboard — Saihaan Digital" },
      {
        property: "og:description",
        content: "Private client dashboard for Saihaan Digital website projects.",
      },
      { property: "og:url", content: "/dashboard" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/dashboard" }],
  }),
});

const profileSchema = z.object({
  full_name: z.string().trim().max(100).optional(),
  business_name: z.string().trim().max(120).optional(),
  industry: z.string().trim().max(80).optional(),
  website_url: z.string().trim().max(255).optional(),
  goal: z.string().trim().max(1000).optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

const emptyForm: ProfileForm = {
  full_name: "",
  business_name: "",
  industry: "",
  website_url: "",
  goal: "",
};

function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const userQuery = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    },
  });

  const dataQuery = useQuery({
    queryKey: ["user_data", userQuery.data?.id],
    enabled: Boolean(userQuery.data?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_data")
        .select("full_name, business_name, industry, website_url, goal, updated_at")
        .eq("user_id", userQuery.data!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (dataQuery.data) {
      setForm({
        full_name: dataQuery.data.full_name ?? "",
        business_name: dataQuery.data.business_name ?? "",
        industry: dataQuery.data.industry ?? "",
        website_url: dataQuery.data.website_url ?? "",
        goal: dataQuery.data.goal ?? "",
      });
    }
  }, [dataQuery.data]);

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = profileSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    const userId = userQuery.data?.id;
    if (!userId) return;

    setSaving(true);
    const { error } = await supabase
      .from("user_data")
      .upsert({ user_id: userId, ...parsed.data }, { onConflict: "user_id" });
    setSaving(false);

    if (error) {
      toast.error("We couldn't save your details. Please try again.");
      return;
    }
    toast.success("Your details are saved.");
    queryClient.invalidateQueries({ queryKey: ["user_data", userId] });
  }

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground">
              SD
            </span>
            <span className="truncate font-display text-base font-semibold">Saihaan Digital</span>
          </Link>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="h-11 rounded-xl px-4 font-semibold"
          >
            Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
          Your project details
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          Signed in as{" "}
          <span className="font-semibold text-foreground">{userQuery.data?.email}</span>. Everything
          you save here is private to your account and only visible to you.
        </p>

        <form
          onSubmit={handleSave}
          className="mt-10 space-y-5 rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-9"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="full_name">Your name</Label>
              <Input
                id="full_name"
                maxLength={100}
                value={form.full_name ?? ""}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business_name">Business name</Label>
              <Input
                id="business_name"
                maxLength={120}
                value={form.business_name ?? ""}
                onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                maxLength={80}
                placeholder="Plumbing, roofing, tutoring…"
                value={form.industry ?? ""}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website_url">Current website</Label>
              <Input
                id="website_url"
                maxLength={255}
                placeholder="yourbusiness.com"
                value={form.website_url ?? ""}
                onChange={(e) => setForm({ ...form, website_url: e.target.value })}
                className="h-12 rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="goal">Your main goal</Label>
            <Textarea
              id="goal"
              rows={5}
              maxLength={1000}
              placeholder="More phone calls, more booked jobs, a fresh look…"
              value={form.goal ?? ""}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <Button
            type="submit"
            disabled={saving || dataQuery.isLoading}
            className="h-13 w-full rounded-xl py-3.5 text-base font-semibold sm:w-auto sm:px-8"
          >
            {saving ? "Saving…" : "Save details"}
          </Button>
          {dataQuery.data?.updated_at && (
            <p className="text-sm text-muted-foreground">
              Last saved {new Date(dataQuery.data.updated_at).toLocaleString()}
            </p>
          )}
        </form>
      </main>
    </div>
  );
}