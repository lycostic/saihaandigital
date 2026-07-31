import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const BUSINESS_EMAIL = "saihaan746@gmail.com";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  business: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional(),
  website: z.string().trim().max(255).optional(),
  message: z.string().trim().min(10, "Tell me a little about your project").max(1500),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        next[issue.path[0] as keyof Errors] = issue.message;
      }
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    const v = parsed.data;
    const body = [
      `Name: ${v.name}`,
      `Business: ${v.business || "—"}`,
      `Email: ${v.email}`,
      `Phone: ${v.phone || "—"}`,
      `Current website: ${v.website || "—"}`,
      "",
      v.message,
    ].join("\n");

    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(
      `Free website review — ${v.business || v.name}`,
    )}&body=${encodeURIComponent(body)}`;

    toast.success("Opening your email app to send the request.");
  }

  const field = "mt-2 h-12 rounded-xl border-border bg-background text-base";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="cf-name">Your name</Label>
          <Input id="cf-name" name="name" autoComplete="name" className={field} />
          {errors.name && (
            <p className="mt-1.5 text-sm text-destructive">{errors.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="cf-business">Business name</Label>
          <Input id="cf-business" name="business" autoComplete="organization" className={field} />
        </div>
        <div>
          <Label htmlFor="cf-email">Email</Label>
          <Input id="cf-email" name="email" type="email" autoComplete="email" className={field} />
          {errors.email && (
            <p className="mt-1.5 text-sm text-destructive">{errors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="cf-phone">Phone (optional)</Label>
          <Input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
      </div>
      <div>
        <Label htmlFor="cf-website">Current website (optional)</Label>
        <Input id="cf-website" name="website" placeholder="example.ca" className={field} />
      </div>
      <div>
        <Label htmlFor="cf-message">What do you need?</Label>
        <Textarea
          id="cf-message"
          name="message"
          rows={5}
          placeholder="e.g. I run a plumbing company and my site looks outdated on phones."
          className="mt-2 min-h-36 rounded-xl border-border bg-background text-base"
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-destructive">{errors.message}</p>
        )}
      </div>
      <Button type="submit" size="lg" className="h-14 rounded-xl text-base font-semibold">
        Send my free website review request
      </Button>
      <p className="text-sm text-muted-foreground">
        Replies usually within one business day. No obligation, no pressure.
      </p>
    </form>
  );
}
