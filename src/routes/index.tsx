import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Coffee, Croissant, UtensilsCrossed, Soup, MapPin, Phone, Mail, Clock } from "lucide-react";
import hero from "@/assets/hero.jpg";
import tapas from "@/assets/tapas.jpg";
import { business, hours, menu } from "@/content/site";
import { t, type Lang } from "@/content/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Montserratina — Cafeteria i tapes a Manresa" },
      {
        name: "description",
        content:
          "Cafeteria i restaurant informal a Manresa: esmorzars, cafè, tapes i menjar casual. Carrer Muralla del Carme, 11.",
      },
      { property: "og:title", content: "Montserratina — Cafeteria a Manresa" },
      {
        property: "og:description",
        content: "Esmorzars, cafè, tapes i menjar informal al Carrer Muralla del Carme, 11, Manresa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const icons = [Croissant, Coffee, UtensilsCrossed, Soup];

function Index() {
  const [lang, setLang] = useState<Lang>("ca");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "es" || saved === "ca") setLang(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);
  const c = t[lang];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {c.skip}
      </a>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#top" className="font-display text-xl font-semibold text-foreground">
            Montserratina
          </a>
          <div className="flex items-center gap-4 text-sm">
            <a href="#oferim" className="hidden hover:text-primary sm:inline">{c.navOffer}</a>
            <a href="#visita" className="hidden hover:text-primary sm:inline">{c.navVisit}</a>
            <div role="group" aria-label={c.langLabel} className="flex rounded-full border border-border p-0.5">
              {(["ca", "es"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  lang={l}
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase transition-colors ${
                    lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l === "ca" ? "CA" : "ES"}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main id="main">
        <section id="top" className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:py-20">
          <div className="animate-rise">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">{c.heroKicker}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground md:text-6xl">{c.heroTitle}</h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">{c.heroText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={business.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90">
                <Phone className="h-4 w-4" aria-hidden /> {c.call}
              </a>
              <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 font-medium text-foreground transition hover:bg-secondary">
                <MapPin className="h-4 w-4" aria-hidden /> {c.directions}
              </a>
            </div>
          </div>
          <img
            src={hero}
            alt=""
            width={1600}
            height={1008}
            fetchPriority="high"
            className="animate-rise aspect-[4/3] w-full rounded-[2rem] object-cover shadow-xl [animation-delay:150ms]"
          />
        </section>

        <section className="bg-secondary py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">{c.introTitle}</h2>
            <p className="mt-5 text-lg text-muted-foreground">{c.introText}</p>
          </div>
        </section>

        <section id="oferim" className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
          <img src={tapas} alt="" width={1200} height={912} loading="lazy" className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">{c.offerTitle}</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {c.offer.map((o, i) => {
                const Icon = icons[i];
                return (
                  <li key={o.title} className="rounded-2xl border border-border bg-card p-5">
                    <Icon className="h-6 w-6 text-primary" aria-hidden />
                    <h3 className="mt-3 text-xl font-semibold">{o.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{o.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {menu.length > 0 && (
          <section className="mx-auto max-w-3xl px-5 pb-16">
            <h2 className="text-3xl font-semibold">{c.menuTitle}</h2>
            <ul className="mt-6 divide-y divide-border">
              {menu.map((m) => (
                <li key={m.ca} className="flex justify-between gap-4 py-3">
                  <span>{m[lang]}</span>
                  {m.price && <span className="font-medium">{m.price}</span>}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">{c.menuNote}</p>
          </section>
        )}

        <section id="visita" className="bg-foreground py-16 text-background md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-3xl font-semibold md:text-4xl">{c.visitTitle}</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Info icon={MapPin} label={c.address}>
                <address className="not-italic">{business.street}<br />{business.postal}</address>
                <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline underline-offset-4 hover:opacity-80">{c.openMap}</a>
              </Info>
              <Info icon={Phone} label={c.phone}>
                <a href={business.phoneHref} className="underline underline-offset-4 hover:opacity-80">{business.phoneDisplay}</a>
              </Info>
              <Info icon={Mail} label={c.email}>
                <a href={`mailto:${business.email}`} className="break-all underline underline-offset-4 hover:opacity-80">{business.email}</a>
              </Info>
              <Info icon={Clock} label={c.hoursTitle}>
                {hours.length > 0 ? (
                  <ul>{hours.map((h) => <li key={h.ca}>{h[lang]}: {h.time}</li>)}</ul>
                ) : (
                  <p>{c.hoursUnknown}</p>
                )}
              </Info>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p><span className="font-display font-semibold text-foreground">Montserratina</span> — {c.footer}</p>
          <p>{business.street}, {business.postal} · <a href={business.phoneHref} className="hover:text-primary">{business.phoneDisplay}</a></p>
        </div>
      </footer>
    </>
  );
}

function Info({ icon: Icon, label, children }: { icon: typeof Phone; label: string; children: React.ReactNode }) {
  return (
    <div>
      <Icon className="h-6 w-6 text-accent" aria-hidden />
      <h3 className="mt-3 text-sm font-semibold uppercase tracking-widest opacity-80">{label}</h3>
      <div className="mt-2 text-lg">{children}</div>
    </div>
  );
}
