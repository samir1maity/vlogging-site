import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Mail } from "lucide-react";
import { socials } from "./data";
import { ease } from "./fx";

const items = ["Home", "Vlogs", "Stories", "About", "Collaborate"];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 80);
    setHidden(v > prev && v > 600);
  });

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onWide = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? -100 : 0 }}
        transition={{ duration: 0.5, ease }}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 md:px-10"
      >
        <a href="#home" data-cursor="" onClick={() => setOpen(false)} className="font-display text-xl tracking-wide">
          A<span className="text-primary">/</span>S
        </a>
        <motion.nav
          animate={{ paddingLeft: scrolled ? 18 : 0, paddingRight: scrolled ? 18 : 0 }}
          className={`hidden items-center gap-8 border py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors md:flex ${
            scrolled ? "border-border bg-background/80 backdrop-blur-md" : "border-transparent"
          }`}
        >
          {items.map((i, n) => (
            <a key={i} href={`#${i.toLowerCase()}`} data-cursor="" className="group relative">
              <span className="text-muted-foreground transition-colors group-hover:text-foreground">0{n + 1}</span>{" "}
              {i}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </motion.nav>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`flex items-center gap-3 border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors md:hidden ${
            scrolled && !open ? "border-border bg-background/80 backdrop-blur-md" : "border-bone/30"
          }`}
        >
          {open ? "Close" : "Menu"}
          <span className="relative h-2.5 w-5" aria-hidden>
            <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${open ? "top-1/2 -rotate-45" : "top-full"}`} />
          </span>
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-background px-5 pb-8 pt-24 md:hidden"
          >
            <nav className="border-t border-border">
              {items.map((i, n) => (
                <a
                  key={i}
                  href={`#${i.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 overflow-hidden border-b border-border py-4"
                >
                  <span className="font-mono text-xs text-primary">0{n + 1}</span>
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease, delay: 0.15 + n * 0.06 }}
                    className="font-display text-[13vw] uppercase leading-[0.95]"
                  >
                    {i}
                  </motion.span>
                </a>
              ))}
            </nav>
            <div className="mt-10 flex flex-col gap-4">
              <a href="mailto:hello@arjunsen.studio" className="flex items-center gap-2 font-mono text-sm">
                <Mail className="h-4 w-4 text-primary" /> hello@arjunsen.studio
              </a>
              <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {socials.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noreferrer">{s.name}</a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
