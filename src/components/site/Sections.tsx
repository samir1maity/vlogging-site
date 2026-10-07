import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { Play, ArrowRight, ArrowUpRight, ArrowUp, Youtube, Instagram, Facebook, Mail } from "lucide-react";
import featured from "@/assets/featured.jpg";
import portrait from "@/assets/portrait.jpg";
import kit from "@/assets/bts-kit.jpg";
import edit from "@/assets/bts-edit.jpg";
import hills from "@/assets/vlog-hills.jpg";
import coast from "@/assets/vlog-coast.jpg";
import { vlogs, categories, socials } from "./data";
import { RevealText, Counter, Magnetic, ease } from "./fx";

function Label({ n, children }: { n: string; children: string }) {
  return (
    <p className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
      <span className="text-primary">{n}</span>
      <span className="h-px w-10 bg-border" />
      {children}
    </p>
  );
}

/* ---------------- Latest vlogs ---------------- */
export function Vlogs() {
  return (
    <section id="vlogs" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mb-14 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <Label n="01">Latest vlogs</Label>
          <h2 className="font-display text-6xl uppercase leading-[0.85] md:text-[9vw]">
            <RevealText text="Fresh off" />
            <br />
            <span className="font-serif normal-case italic text-primary"><RevealText text="the timeline" delay={0.1} /></span>
          </h2>
        </div>
        <p className="self-end text-sm text-muted-foreground md:col-span-3 md:col-start-10">
          New episode every Sunday. Filmed on the road, cut at night, uploaded with too much chai.
        </p>
      </div>

      <div className="grid gap-x-6 gap-y-14 md:grid-cols-12">
        {vlogs.map((v, i) => {
          const layout = ["md:col-span-7", "md:col-span-5 md:mt-40", "md:col-span-5", "md:col-span-6 md:col-start-7 md:-mt-32"][i];
          return (
            <motion.a
              key={v.title}
              href="#"
              data-cursor="PLAY"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease }}
              className={`group block ${layout}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-card">
                <motion.img
                  src={v.img}
                  alt={v.title}
                  loading="lazy"
                  width={896}
                  height={1152}
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.3, ease }}
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="scrim absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-90" />
                <div className="absolute inset-x-4 top-4 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                  <span className="bg-primary px-2 py-1 text-primary-foreground">{v.cat}</span>
                  <span className="flex items-center gap-1.5"><Youtube className="h-3.5 w-3.5" /> {v.dur}</span>
                </div>
                <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 scale-50 items-center justify-center rounded-full bg-bone text-ink opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <Play className="h-6 w-6 fill-current" />
                </div>
                <div className="absolute inset-x-4 bottom-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">No. 0{i + 1} — Issue {v.date}</p>
                  <h3 className="mt-2 font-display text-4xl uppercase leading-[0.9] transition-transform duration-700 group-hover:-translate-y-2 md:text-5xl">
                    {v.title}
                  </h3>
                </div>
              </div>
              <div className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
                <span>{v.place}</span>
                <span>{v.date}</span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Featured story ---------------- */
export function Featured() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.35, 1]);
  const clip = useTransform(scrollYProgress, [0, 0.4], ["inset(12% 8% 12% 8%)", "inset(0% 0% 0% 0%)"]);
  const tx = useTransform(scrollYProgress, [0, 1], ["10%", "-15%"]);
  return (
    <section id="stories" ref={ref} className="relative h-[110vh] min-h-[700px]">
      <motion.div style={{ clipPath: clip }} className="absolute inset-0 overflow-hidden" data-cursor="WATCH">
        <motion.img src={featured} alt="Winding road through a Himalayan valley" loading="lazy" width={1920} height={1088} style={{ scale }} className="h-full w-full object-cover" />
        <div className="scrim absolute inset-0" />
      </motion.div>
      <div className="relative flex h-full flex-col justify-between overflow-hidden px-5 py-16 md:px-10 md:py-24">
        <Label n="02">Featured story</Label>
        <div>
          <motion.h2 style={{ x: tx }} className="whitespace-nowrap font-display text-[17vw] uppercase leading-[0.85] md:text-[12vw]">
            The road to the Himalayas
          </motion.h2>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-sm uppercase tracking-[0.3em]">7 Days <span className="text-primary">•</span> 1,200 KM <span className="text-primary">•</span> 14 Stories</p>
            <Magnetic>
              <a href="#" data-cursor="" className="group flex items-center gap-4 font-serif text-3xl italic">
                Watch story
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-bone/40 transition-all duration-500 group-hover:w-24 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Categories (horizontal) ---------------- */
export function Categories() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="px-5 md:px-10"><Label n="03">Worlds I film in</Label></div>
        <motion.div style={{ x }} className="flex items-baseline gap-10 pl-5 md:gap-16 md:pl-10">
          {categories.map((c, i) => (
            <a key={c} href="#vlogs" data-cursor="VIEW" className="group flex shrink-0 items-start gap-3">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <span className="text-outline whitespace-nowrap font-display text-[22vw] uppercase leading-none transition-all duration-500 group-hover:text-primary group-hover:[-webkit-text-stroke:0px] md:text-[14vw]">
                {c}
              </span>
            </a>
          ))}
        </motion.div>
        <div className="mt-10 overflow-hidden border-y border-border py-3">
          <div className="animate-marquee flex w-max gap-10 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            {Array.from({ length: 2 }).flatMap((_, k) =>
              categories.map((c) => <span key={c + k}>{c} ✦</span>),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
const timeline = [
  ["2019", "First video, shot on a borrowed phone in Shillong."],
  ["2021", "Quit the desk job. Bought a one-way ticket to Leh."],
  ["2023", "100K subscribers. Started the Midnight Food series."],
  ["2026", "1M+ community across three platforms."],
];
const stats = [
  { n: 50, s: "+", l: "Vlogs" },
  { n: 12, s: "", l: "Cities" },
  { n: 2, s: "M+", l: "Views" },
  { n: 100, s: "K+", l: "Community" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  return (
    <section id="about" ref={ref} className="px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="relative md:col-span-5">
          <motion.div style={{ y }} className="relative aspect-[4/5] overflow-hidden" data-cursor="VIEW">
            <motion.img
              src={portrait}
              alt="Portrait of Arjun Sen with his camera"
              loading="lazy"
              width={896}
              height={1152}
              initial={{ scale: 1.3, clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ scale: 1, clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease }}
              className="h-full w-full object-cover grayscale-[30%]"
            />
          </motion.div>
          <p className="absolute -bottom-6 -right-2 rotate-[-4deg] bg-primary px-4 py-2 font-serif text-2xl italic text-primary-foreground md:-right-10">
            Hi, I'm Arjun.
          </p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Label n="04">About</Label>
          <h2 className="font-serif text-4xl leading-[1.1] md:text-6xl">
            <RevealText text="Chasing places. Meeting people." />
            <span className="text-muted-foreground"><RevealText text="Telling stories." delay={0.3} /></span>
          </h2>
          <p className="mt-8 max-w-md text-muted-foreground">
            I'm a filmmaker from Kolkata who'd rather sleep on a night bus than miss a sunrise. Every vlog is a short
            documentary about the strangers who become friends along the way.
          </p>
          <ol className="mt-12 border-t border-border">
            {timeline.map(([y, t], i) => (
              <motion.li
                key={y}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease }}
                className="group grid grid-cols-[80px_1fr] gap-4 border-b border-border py-4 transition-colors hover:bg-card"
              >
                <span className="font-mono text-sm text-primary">{y}</span>
                <span className="text-sm">{t}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
      <div className="mt-24 grid grid-cols-2 border-t border-border md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="border-b border-r border-border p-6 last:border-r-0 md:border-b-0 md:p-10">
            <p className="font-display text-6xl md:text-8xl"><Counter to={s.n} suffix={s.s} /></p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Social orbit ---------------- */
const icons = { YouTube: Youtube, Instagram, Facebook } as const;

export function Social() {
  return (
    <section id="social" className="overflow-hidden border-y border-border bg-card px-5 py-24 md:px-10 md:py-32">
      <div className="grid items-center gap-16 md:grid-cols-2">
        <div>
          <Label n="05">Find me everywhere</Label>
          <h2 className="font-display text-6xl uppercase leading-[0.85] md:text-8xl">
            One story,<br /><span className="font-serif normal-case italic text-primary">three screens.</span>
          </h2>
          <ul className="mt-12">
            {socials.map((s) => {
              const Icon = icons[s.name as keyof typeof icons];
              return (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noreferrer" data-cursor="FOLLOW" className="group flex items-center justify-between border-b border-border py-5">
                    <span className="flex items-center gap-4">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-display text-3xl uppercase transition-transform duration-500 group-hover:translate-x-3">{s.name}</span>
                    </span>
                    <span className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
                      <span className="hidden sm:inline">{s.handle}</span>
                      <span className="text-foreground">{s.count}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <div className="absolute inset-0 rounded-full border border-border" />
          <div className="absolute inset-[18%] rounded-full border border-dashed border-border" />
          <div className="absolute inset-[30%] overflow-hidden rounded-full">
            <img src={portrait} alt="Arjun Sen" loading="lazy" width={896} height={1152} className="h-full w-full object-cover" />
          </div>
          <div className="animate-orbit absolute inset-0">
            {socials.map((s, i) => {
              const Icon = icons[s.name as keyof typeof icons];
              const a = (i / socials.length) * Math.PI * 2;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  data-cursor=""
                  style={{ left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <span className="animate-orbit-rev flex h-14 w-14 items-center justify-center rounded-full bg-background ring-1 ring-border transition-colors hover:bg-primary hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Behind the scenes ---------------- */
const bts = [
  { img: kit, cap: "The kit — 6 kg, every day", cls: "left-[2%] top-[4%] w-[55%] md:w-[38%] rotate-[-3deg]", d: 30 },
  { img: hills, cap: "Shooting in Darjeeling fog", cls: "right-[2%] top-[18%] w-[42%] md:w-[24%] rotate-[4deg]", d: -45 },
  { img: edit, cap: "3 a.m. edit sessions", cls: "left-[20%] top-[50%] w-[60%] md:w-[34%] md:left-[30%] rotate-[2deg]", d: 20 },
  { img: coast, cap: "Somewhere on NH66", cls: "right-[6%] bottom-[2%] w-[38%] md:w-[20%] rotate-[-5deg]", d: -30 },
];

function BtsImage({ b, mx, my }: { b: (typeof bts)[number]; mx: ReturnType<typeof useSpring>; my: ReturnType<typeof useSpring> }) {
  const x = useTransform(mx, (v) => v * b.d);
  const y = useTransform(my, (v) => v * b.d);
  return (
    <motion.figure
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease }}
      whileHover={{ scale: 1.04, zIndex: 10, rotate: 0 }}
      data-cursor="VIEW"
      className={`absolute bg-bone p-2 pb-8 shadow-2xl ${b.cls}`}
    >
      <img src={b.img} alt={b.cap} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      <figcaption className="absolute bottom-2 left-3 font-serif text-sm italic text-ink">{b.cap}</figcaption>
    </motion.figure>
  );
}

export function BehindTheScenes() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  return (
    <section
      className="px-5 py-24 md:px-10 md:py-36"
      onMouseMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Label n="06">Behind the scenes</Label>
          <h2 className="font-display text-6xl uppercase leading-[0.85] md:text-[8vw]">The messy part</h2>
        </div>
        <p className="max-w-xs text-sm text-muted-foreground">What 20 minutes of footage really costs: dead batteries, wet socks, and a lot of retakes.</p>
      </div>
      <div className="relative mt-12 h-[110vw] md:h-[80vh]">
        {bts.map((b) => <BtsImage key={b.cap} b={b} mx={sx} my={sy} />)}
      </div>
    </section>
  );
}

/* ---------------- Collaborate + footer ---------------- */
const services = [
  { t: "Brand collaborations", d: "Your product woven into a real journey — a story people finish, not an ad they skip." },
  { t: "Sponsorships", d: "Series and episode sponsorships across YouTube, Instagram and Facebook." },
  { t: "Travel collaborations", d: "Tourism boards, stays and airlines: destination films shot on location." },
  { t: "Video production", d: "Direction, shooting and edit for your own channels, from brief to final cut." },
];
const process = [
  ["Brief", "A 30-minute call about the story you want told."],
  ["Scout", "Route, people and shot list, shared before we roll."],
  ["Shoot", "On location with a small crew and a light footprint."],
  ["Deliver", "Final cut, vertical edits and raw selects."],
];
const reach = [
  { n: 2, s: "M+", l: "Views" },
  { n: 3, s: "", l: "Platforms" },
  { n: 12, s: "", l: "Cities filmed" },
];
const ticker = ["Now booking", "Brand films", "Destination stories", "Sponsored series", "Reels & shorts"];

export function Collaborate() {
  return (
    <section id="collaborate" className="relative overflow-hidden bg-primary px-5 py-24 text-primary-foreground md:px-10 md:py-36">
      <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em]">07 — Collaborate</p>
      <h2 className="font-display text-[14vw] uppercase leading-[0.85] md:text-[10vw]">
        <RevealText text="Let's create" /><br />
        <RevealText text="something worth" delay={0.1} /><br />
        <span className="font-serif normal-case italic"><RevealText text="watching." delay={0.2} /></span>
      </h2>

      <div className="-mx-5 mt-14 overflow-hidden border-y border-primary-foreground/30 py-3 md:-mx-10">
        <div className="animate-marquee flex w-max gap-10 font-mono text-[11px] uppercase tracking-[0.3em]">
          {Array.from({ length: 4 }).flatMap((_, k) => ticker.map((t) => <span key={t + k}>{t} ✦</span>))}
        </div>
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="max-w-xl font-serif text-3xl leading-[1.15] md:text-4xl">
            I work with a handful of brands a year — the ones with a place, a product or a person worth a story.
          </p>
          <ol className="mt-10 border-t border-primary-foreground/30">
            {services.map((s, i) => (
              <motion.li
                key={s.t}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease }}
                className="group grid grid-cols-[40px_1fr] gap-x-4 gap-y-2 border-b border-primary-foreground/30 py-5 transition-colors duration-500 hover:bg-ink hover:text-bone md:grid-cols-[56px_1fr_1.2fr_auto] md:items-baseline md:px-4"
              >
                <span className="font-mono text-xs">0{i + 1}</span>
                <span className="font-display text-3xl uppercase leading-none md:text-4xl">{s.t}</span>
                <span className="col-start-2 text-sm opacity-80 md:col-start-3">{s.d}</span>
                <ArrowUpRight className="hidden h-5 w-5 self-center transition-transform duration-500 group-hover:rotate-45 md:block" />
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col items-start gap-6 md:col-span-4 md:col-start-9 md:items-end">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-ink" /> Booking Winter 2026
          </p>
          <Magnetic strength={0.3}>
            <a
              href="mailto:hello@arjunsen.studio"
              data-cursor=""
              className="group relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-full bg-ink text-bone md:h-56 md:w-56"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-bone transition-transform duration-700 ease-out group-hover:translate-y-0" />
              <span className="relative text-center font-display text-2xl uppercase leading-tight transition-colors duration-500 group-hover:text-ink md:text-3xl">
                Start a<br />project →
              </span>
            </a>
          </Magnetic>
          <a href="mailto:hello@arjunsen.studio" className="flex items-center gap-2 font-mono text-sm underline-offset-4 hover:underline">
            <Mail className="h-4 w-4" /> hello@arjunsen.studio
          </a>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-70 md:text-right">Replies within 48 hours</p>
        </div>
      </div>

      <div className="mt-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em]">How it works</p>
          <ol className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {process.map(([t, d], i) => (
              <li key={t} className="border-t border-primary-foreground/30 pt-3">
                <span className="font-mono text-xs">0{i + 1}</span>
                <p className="mt-3 font-serif text-2xl italic">{t}</p>
                <p className="mt-2 text-sm opacity-80">{d}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="grid grid-cols-3 self-end border-t border-primary-foreground/30 md:col-span-4 md:col-start-9">
          {reach.map((r) => (
            <div key={r.l} className="border-r border-primary-foreground/30 py-5 pr-3 last:border-r-0 [&:not(:first-child)]:pl-4">
              <p className="font-display text-5xl md:text-6xl"><Counter to={r.n} suffix={r.s} /></p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em]">{r.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-5 pb-8 pt-16 md:px-10">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <p className="font-display text-[22vw] uppercase leading-[0.8] md:text-[12vw]">Arjun<span className="text-primary">.</span></p>
        <div className="flex flex-col gap-4 md:items-end">
          <div className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.2em]">
            {socials.slice(0, 3).map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" data-cursor="" className="hover:text-primary">{s.name}</a>
            ))}
            <a href="mailto:hello@arjunsen.studio" data-cursor="" className="hover:text-primary">Email</a>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-cursor=""
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
          >
            Back to top
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border">
              <ArrowUp className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-8" />
            </span>
          </button>
        </div>
      </div>
      <p className="mt-8 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        © 2026 Arjun Sen Studio — Filmed with love, from Kolkata to everywhere.
      </p>
    </footer>
  );
}
