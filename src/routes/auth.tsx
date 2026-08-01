import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Client Sign In — Saihaan Digital" },
      {
        name: "description",
        content:
          "Sign in or create a free Saihaan Digital account to save your business details and track your website project.",
      },
      { property: "og:title", content: "Client Sign In — Saihaan Digital" },
      {
        property: "og:description",
        content:
          "Secure client area for Saihaan Digital. Save your business details and project preferences.",
      },
      { property: "og:url", content: "/auth" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/auth" }],
  }),
});

const credentialsSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(72),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) navigate({ to: "/dashboard", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate({ to: "/dashboard", replace: true });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = credentialsSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (error) throw error;
        if (!data.session) {
          setCheckEmail(true);
          toast.success("Check your email to confirm your account.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setLoading(false);
      toast.error("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/dashboard", replace: true });
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="border-b border-border/70">
        <div className="mx-auto flex max-w-6xl items-center gap-2.5 px-5 py-4 sm:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground">
              SD
            </span>
            <span className="truncate font-display text-base font-semibold">Saihaan Digital</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-14 sm:px-8">
        <h1 className="text-3xl font-semibold text-foreground">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          {mode === "signin"
            ? "Sign in to your client area to view and update your business details."
            : "Create a free account to save your business details and project goals."}
        </p>

        {checkEmail ? (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="text-[15px] leading-relaxed">
              Almost there — we sent a confirmation link to <strong>{email}</strong>. Click it to
              activate your account, then come back and sign in.
            </p>
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogle}
              disabled={loading}
              className="h-12 w-full rounded-xl font-semibold"
            >
              Continue with Google
            </Button>

            <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              or
              <span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl"
                  placeholder="you@yourbusiness.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  required
                  minLength={8}
                  maxLength={72}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl"
                  placeholder="At least 8 characters"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl text-base font-semibold"
              >
                {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                {mode === "signin" ? "Create an account" : "Sign in"}
              </button>
            </p>
          </div>
        )}

        <p className="mt-8 text-center text-sm">
          <Link to="/" className="text-muted-foreground underline-offset-4 hover:underline">
            ← Back to the website
          </Link>
        </p>
      </main>
    </div>
  );
}