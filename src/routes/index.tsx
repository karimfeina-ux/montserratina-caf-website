import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowUpRight, Phone } from "lucide-react";
import hero from "@/assets/hero.jpg";
import tapas from "@/assets/tapas.jpg";
import espresso from "@/assets/espresso.jpg";
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

const offerImages = [hero, espresso, tapas, tapas];

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
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const stampRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 540]);
  const dayWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(heroP, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const typeX = useTransform(heroP, [0, 1], ["0%", reduce ? "0%" : "-12%"]);

  return (
    <div className="overflow-x-clip bg-cream text-espresso">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        {c.skip}
      </a>

      {/* Header + day dial */}
      <header className="fixed inset-x-0 top-0 z-40 mix-blend-normal">
        <div className="bg-cream/85 backdrop-blur-md">
          <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 md:px-10">
            <a href="#top" className="font-display text-lg italic">Montserratina</a>
            <div className="flex items-center gap-5 text-sm">
              <a href="#oferim" className="hidden hover:text-primary md:inline">{c.navOffer}</a>
              <a href="#visita" className="hidden hover:text-primary md:inline">{c.navVisit}</a>
              <a href={business.phoneHref} className="hidden items-center gap-1.5 font-medium hover:text-primary sm:inline-flex">
                <Phone className="h-3.5 w-3.5" aria-hidden /> {business.phoneDisplay}
              </a>
              <div role="group" aria-label={c.langLabel} className="flex border border-espresso/30">
                {(["ca", "es"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    lang={l}
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={`px-2.5 py-1 text-xs font-semibold uppercase tracking-widest transition-colors ${lang === l ? "bg-espresso text-cream" : "hover:bg-espresso/10"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </nav>
          <div className="flex items-center gap-3 px-5 pb-2 text-[10px] font-semibold uppercase tracking-[0.25em] md:px-10" aria-hidden>
            <span>{c.morning}</span>
            <div className="relative h-px flex-1 bg-espresso/20">
              <motion.div style={{ width: dayWidth }} className="absolute inset-y-0 left-0 bg-primary" />
            </div>
            <span>{c.evening}</span>
          </div>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section id="top" ref={heroRef} className="grain relative min-h-[100svh] pt-28 md:pt-32">
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-4 px-5 md:px-10">
            <p className="animate-rise col-span-12 text-xs font-semibold uppercase tracking-[0.3em] text-olive md:col-span-4 md:mt-6">
              {c.heroKicker}
            </p>
            <h1 className="animate-rise col-span-12 font-display text-3xl leading-[1.05] md:col-span-6 md:col-start-6 md:text-5xl [animation-delay:100ms]">
              {c.heroTitle}
            </h1>
          </div>

          <div className="relative mx-auto mt-10 max-w-[1400px] px-5 md:mt-14 md:px-10">
            <div className="relative ml-auto aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] md:w-[78%]">
              <motion.img
                src={hero}
                alt=""
                width={1600}
                height={1008}
                fetchPriority="high"
                style={{ y: imgY, scale: 1.15 }}
                className="h-full w-full object-cover"
              />
            </div>
            <motion.p
              style={{ x: typeX }}
              aria-hidden
              className="text-mega pointer-events-none absolute -bottom-6 left-2 whitespace-nowrap font-display font-semibold text-primary md:-bottom-14 md:left-6"
            >
              Montserratina
            </motion.p>

            {/* Signature stamp */}
            <motion.a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={c.directions}
              style={{ rotate: stampRotate }}
              className="absolute -top-14 left-6 grid h-28 w-28 place-items-center rounded-full bg-espresso text-cream shadow-2xl transition-transform hover:scale-105 md:left-14 md:top-10 md:h-40 md:w-40"
            >
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                  <path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text className="fill-current text-[15px] font-semibold tracking-[0.2em]">
                  <textPath href="#circ">{c.stamp}{c.stamp.slice(0, 14)}</textPath>
                </text>
              </svg>
              <ArrowUpRight className="h-7 w-7 text-amber md:h-9 md:w-9" aria-hidden />
            </motion.a>
          </div>
          <div className="h-24 md:h-40" />
        </section>

        {/* INTRO */}
        <section className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-5 py-20 md:px-10 md:py-32">
          <Reveal className="col-span-12 md:col-span-3">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-olive">01</span>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-8">
            <h2 className="font-display text-4xl leading-tight md:text-7xl">
              <em className="text-primary">{c.introTitle}</em>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-espresso/75 md:ml-auto md:text-xl">{c.introText}</p>
            <div className="mt-10 flex flex-wrap gap-3 md:justify-end">
              <a href={business.phoneHref} className="inline-flex items-center gap-2 bg-primary px-6 py-3.5 font-medium text-primary-foreground transition hover:bg-espresso">
                <Phone className="h-4 w-4" aria-hidden /> {c.call}
              </a>
              <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-espresso px-6 py-3.5 font-medium transition hover:bg-espresso hover:text-cream">
                {c.directions} <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </section>

        {/* MARQUEE */}
        <div className="overflow-hidden border-y border-espresso/20 py-5" aria-hidden>
          <div className="flex w-max animate-marquee gap-10 font-display text-3xl italic md:text-5xl">
            {Array.from({ length: 4 }).flatMap((_, k) =>
              c.offer.map((o) => (
                <span key={`${k}-${o.title}`} className="flex items-center gap-10">
                  {o.title} <span className="text-primary">✦</span>
                </span>
              )),
            )}
          </div>
        </div>

        {/* OFFER — editorial index */}
        <section id="oferim" className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-5 py-20 md:px-10 md:py-32">
          <div className="col-span-12 md:col-span-5">
            <div className="md:sticky md:top-32">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-olive">02</span>
              <h2 className="mt-4 font-display text-5xl md:text-7xl">{c.offerTitle}</h2>
              <p className="mt-4 max-w-xs text-espresso/70">{c.dayLine}</p>
              <img src={espresso} alt="" width={1008} height={1312} loading="lazy" className="mt-10 hidden aspect-[4/5] w-3/4 object-cover md:block" />
            </div>
          </div>
          <ol className="col-span-12 md:col-span-7">
            {c.offer.map((o, i) => (
              <Reveal key={o.title} as="li" className="group border-t border-espresso/25 py-8 last:border-b md:py-12">
                <div className="flex items-baseline gap-6">
                  <span className="font-display text-sm text-primary">0{i + 1}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-4xl transition-transform duration-500 group-hover:translate-x-3 md:text-6xl">{o.title}</h3>
                    <p className="mt-2 text-espresso/70">{o.text}</p>
                  </div>
                  <img
                    src={offerImages[i] ?? hero}
                    alt=""
                    loading="lazy"
                    width={400}
                    height={300}
                    className="hidden h-24 w-32 object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 md:block"
                  />
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {menu.length > 0 && (
          <section className="mx-auto max-w-3xl px-5 pb-24">
            <h2 className="font-display text-5xl">{c.menuTitle}</h2>
            <ul className="mt-8">
              {menu.map((m) => (
                <li key={m.ca} className="flex items-baseline gap-3 border-b border-dotted border-espresso/30 py-3">
                  <span className="text-lg">{m[lang]}</span>
                  <span className="flex-1" />
                  {m.price && <span className="font-display">{m.price}</span>}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-espresso/70">{c.menuNote}</p>
          </section>
        )}

        {/* FULL-BLEED TAPAS */}
        <section className="relative h-[70svh] overflow-hidden md:h-[90svh]" aria-hidden>
          <ParallaxImg src={tapas} />
        </section>

        {/* VISIT — evening */}
        <section id="visita" className="bg-espresso text-cream">
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-5 py-20 md:px-10 md:py-32">
            <div className="col-span-12 md:col-span-6">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber">03</span>
              <h2 className="mt-4 font-display text-6xl md:text-8xl">{c.visitTitle}</h2>
              <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="group mt-10 block">
                <address className="font-display text-2xl not-italic leading-snug md:text-4xl">
                  {business.street}
                  <br />
                  <span className="text-cream/60">{business.postal}</span>
                </address>
                <span className="mt-4 inline-flex items-center gap-2 border-b border-amber pb-1 text-amber">
                  {c.openMap} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </a>
            </div>
            <dl className="col-span-12 grid gap-10 self-end md:col-span-5 md:col-start-8">
              <Row label={c.phone}>
                <a href={business.phoneHref} className="font-display text-3xl hover:text-amber md:text-4xl">{business.phoneDisplay}</a>
              </Row>
              <Row label={c.email}>
                <a href={`mailto:${business.email}`} className="break-all text-xl hover:text-amber">{business.email}</a>
              </Row>
              <Row label={c.hoursTitle}>
                {hours.length > 0 ? (
                  <ul className="space-y-1 text-lg">{hours.map((h) => <li key={h.ca}>{h[lang]} — {h.time}</li>)}</ul>
                ) : (
                  <p className="text-lg text-cream/80">{c.hoursUnknown}</p>
                )}
              </Row>
            </dl>
          </div>
          <footer className="border-t border-cream/15">
            <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-8 text-sm text-cream/70 sm:flex-row sm:justify-between md:px-10">
              <p><span className="font-display italic text-cream">Montserratina</span> — {c.footer}</p>
              <p>© {new Date().getFullYear()} Montserratina</p>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-cream/20 pt-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-amber">{label}</dt>
      <dd className="mt-2">{children}</dd>
    </div>
  );
}

function Reveal({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const reduce = useReducedMotion();
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Comp>
  );
}

function ParallaxImg({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);
  return (
    <div ref={ref} className="absolute inset-0">
      <motion.img src={src} alt="" loading="lazy" width={1200} height={912} style={{ y, scale: 1.25 }} className="h-full w-full object-cover" />
    </div>
  );
}
