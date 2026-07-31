import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Clock,
  Gauge,
  Layout,
  MapPin,
  MessageSquare,
  Monitor,
  Phone,
  Search,
  Smartphone,
  Sparkles,
  Target,
  Wallet,
  Wrench,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/site/ContactForm";
import heroImage from "@/assets/hero.jpg";
import plumbingImage from "@/assets/work-plumbing.jpg";

const EMAIL = "saihaan746@gmail.com";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Saihaan Digital — Websites That Win Local Customers" },
      {
        name: "description",
        content:
          "Saihaan Digital builds fast, mobile-first websites for plumbers, electricians, HVAC, roofers and other local service businesses in Toronto and across Canada.",
      },
      { property: "og:title", content: "Saihaan Digital — Websites That Win Local Customers" },
      {
        property: "og:description",
        content:
          "Modern, conversion-focused website design and redesign for local service businesses. Free website review.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Saihaan Digital",
          description: "Website design for local service businesses.",
          email: EMAIL,
          areaServed: ["Greater Toronto Area", "Canada"],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Toronto",
            addressRegion: "Ontario",
            addressCountry: "CA",
          },
        }),
      },
    ],
  }),
});

const trustBadges = [
  "Mobile Friendly",
  "Fast Loading",
  "SEO Ready",
  "Professional Design",
  "Easy Contact",
  "Built for Conversions",
];

const services = [
  {
    icon: Layout,
    title: "Website Design",
    body: "A brand-new site built around the one thing that matters: getting the phone to ring.",
  },
  {
    icon: Sparkles,
    title: "Website Redesign",
    body: "Turn a dated, slow site into something customers instantly trust.",
  },
  {
    icon: Target,
    title: "Landing Pages",
    body: "Focused pages for a single service or ad campaign, designed to convert.",
  },
  {
    icon: Search,
    title: "Business Website Audits",
    body: "A clear, plain-English report on what's costing you calls — and how to fix it.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimization",
    body: "Most local searches happen on a phone. Your site will feel effortless there.",
  },
  {
    icon: Gauge,
    title: "Basic SEO",
    body: "Clean structure, fast pages and proper titles so you show up for local searches.",
  },
  {
    icon: MapPin,
    title: "Google Maps & Contact",
    body: "Click-to-call, maps, hours and forms wired up so contacting you takes one tap.",
  },
];

const industries = [
  "Plumbers",
  "Electricians",
  "HVAC",
  "Roofers",
  "Landscapers",
  "Painters",
  "Contractors",
  "Cleaning Companies",
  "Auto Detailers",
  "Tutors",
  "Medical Clinics",
  "Restaurants",
];

const reasons = [
  { icon: Layout, title: "Professional design", body: "Layouts that look like an established, credible company." },
  { icon: Phone, title: "Easy customer contact", body: "Call buttons and forms where people actually look for them." },
  { icon: Clock, title: "Fast turnaround", body: "Most projects go live in one to three weeks." },
  { icon: Monitor, title: "Modern layouts", body: "Clean structure, real hierarchy, no clutter." },
  { icon: Smartphone, title: "Mobile-first design", body: "Built for phones first, then scaled up." },
  { icon: MessageSquare, title: "Clear communication", body: "Plain English updates. No jargon, no ghosting." },
  { icon: Wallet, title: "Affordable pricing", body: "Agency quality without the agency overhead." },
  { icon: Wrench, title: "Personal attention", body: "You work with me directly, start to finish." },
];

const upcoming = ["Electrician", "HVAC", "Landscaping", "Roofing", "Cleaning Company"];

const process = [
  { step: "01", title: "Free Consultation", body: "A short call to understand your business, your customers and your goals." },
  { step: "02", title: "Website Design", body: "I design and build the site around your services and service area." },
  { step: "03", title: "Review & Revisions", body: "You review it live and we refine the details until it feels right." },
  { step: "04", title: "Launch", body: "We go live, connect your domain and make sure everything works." },
];

const faqs = [
  {
    q: "How long does a website take?",
    a: "Most local business websites take one to three weeks from our first call to launch. Larger sites with many service pages can take a little longer, and you'll always know the timeline up front.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. You own the website, the domain and the content. Everything is handed over to you, and you're never locked into me.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely — redesigns are a large part of my work. I keep what's working, rewrite and restructure what isn't, and rebuild it on a fast, modern foundation.",
  },
  {
    q: "Can you help with domains?",
    a: "Yes. I can help you register a new domain or connect one you already own, including email forwarding and DNS setup.",
  },
  {
    q: "Can I request future changes?",
    a: "Of course. You can request updates whenever you need them — new services, seasonal offers, photos or pricing changes.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground font-display text-sm font-bold">
              SD
            </span>
            <span className="truncate font-display text-base font-semibold">Saihaan Digital</span>
          </a>
          <Button asChild className="h-11 rounded-xl px-4 font-semibold">
            <a href="#contact">Free Review</a>
          </Button>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-ink text-ink-foreground">
          <img
            src={heroImage}
            alt="Local tradesperson standing in a workshop"
            width={1600}
            height={1200}
            className="absolute inset-0 size-full object-cover object-right opacity-30 md:opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/50" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:py-36">
            <div className="reveal max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 bg-ink-foreground/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
                Toronto · Serving all of Canada
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
                Helping Local Businesses Turn More Visitors Into Customers
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-foreground/80">
                I build fast, modern, mobile-friendly websites for local businesses that make it
                easier for customers to find you, trust you, and contact you.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-14 rounded-xl px-7 text-base font-semibold">
                  <a href="#contact">
                    Get a Free Website Review
                    <ArrowRight className="ml-1 size-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-xl border-ink-foreground/30 bg-transparent px-7 text-base font-semibold text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"
                >
                  <a href="#work">View My Work</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="border-b border-border bg-brand-soft/60">
          <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
              {trustBadges.map((badge) => (
                <li key={badge} className="flex items-start gap-2.5 text-sm font-semibold text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{badge}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading
            eyebrow="Services"
            title="Everything your business needs to look credible online"
            intro="No packages full of things you'll never use. Just the work that makes customers pick up the phone."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="group rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Industries */}
        <section id="industries" className="bg-secondary/60 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Industries"
              title="Built for the businesses people search for locally"
              intro="If your customers find you on Google and judge you in five seconds, we're a good fit."
            />
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {industries.map((industry) => (
                <li
                  key={industry}
                  className="rounded-2xl border border-border bg-card px-5 py-4 text-[15px] font-semibold shadow-soft transition-colors hover:border-primary/40"
                >
                  {industry}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base text-muted-foreground">
              Not on the list? All local businesses are welcome — the approach is the same.
            </p>
          </div>
        </section>

        {/* Why work with me */}
        <section id="why" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading
            eyebrow="Why work with me"
            title="You get a partner, not a support ticket"
          />
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section id="work" className="bg-secondary/60 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading eyebrow="Portfolio" title="Recent and upcoming projects" />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift lg:col-span-2">
                <img
                  src={plumbingImage}
                  alt="Emergency plumbing website shown on a phone and laptop"
                  width={1200}
                  height={912}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
                />
                <div className="p-7 sm:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    Completed demo
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">Emergency Plumbing Website</h3>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                    A 24/7 emergency plumbing site built around one action: calling. Sticky
                    click-to-call, service-area coverage, fast mobile load and clear pricing
                    expectations.
                  </p>
                </div>
              </article>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {upcoming.map((name) => (
                  <div
                    key={name}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-border bg-card/60 px-6 py-5"
                  >
                    <span className="min-w-0 truncate font-semibold">{name}</span>
                    <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      In progress
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading eyebrow="Process" title="Four simple steps, no surprises" />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(({ step, title, body }) => (
              <li key={step} className="rounded-2xl border border-border bg-card p-7 shadow-soft">
                <span className="font-display text-sm font-bold text-primary">{step}</span>
                <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-secondary/60 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <SectionHeading eyebrow="FAQ" title="Questions worth asking before you hire anyone" />
            <Accordion type="single" collapsible className="mt-10">
              {faqs.map(({ q, a }) => (
                <AccordionItem key={q} value={q} className="border-border">
                  <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Contact"
                title="Get a free website review"
                intro="Tell me about your business and I'll send back an honest review of your current site — what's working, what's losing you calls, and what I'd change first."
              />
              <dl className="mt-10 space-y-6 text-[15px]">
                <div>
                  <dt className="font-semibold">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {EMAIL}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Location</dt>
                  <dd className="mt-1 text-muted-foreground">Toronto, Ontario</dd>
                </div>
                <div>
                  <dt className="font-semibold">Serving</dt>
                  <dd className="mt-1 text-muted-foreground">
                    Greater Toronto Area · Remote across Canada
                  </dd>
                </div>
              </dl>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-9">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid gap-8 sm:grid-cols-[1.2fr_auto] sm:items-start">
            <div className="min-w-0">
              <p className="font-display text-lg font-semibold">Saihaan Digital</p>
              <p className="mt-2 text-sm text-ink-foreground/70">
                Website Design for Local Businesses
              </p>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${EMAIL}`} className="text-ink-foreground/80 hover:text-ink-foreground">
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-ink-foreground/80 hover:text-ink-foreground">
                  LinkedIn (coming soon)
                </a>
              </li>
            </ul>
          </div>
          <p className="mt-10 border-t border-ink-foreground/15 pt-6 text-xs text-ink-foreground/60">
            © {new Date().getFullYear()} Saihaan Digital. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
