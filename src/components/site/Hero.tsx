import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Play, Youtube, Instagram, Facebook } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { ease, Magnetic } from "./fx";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);
  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.img
        src={hero}
        alt="Arjun Sen on a misty Himalayan road at dawn"
        width={1920}
        height={1088}
        style={{ y: imgY, scale: imgScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="scrim absolute inset-0" />

      <div className="absolute left-5 top-24 font-mono text-[11px] uppercase tracking-[0.25em] text-bone md:left-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="border border-bone/30 bg-background/60 px-3 py-2 backdrop-blur-sm"
        >
          REC <span className="ml-1 inline-block h-2 w-2 animate-pulse rounded-full bg-primary" /> &nbsp;EP.112 — 27.0°N 88.2°E
        </motion.p>
      </div>

      <motion.div style={{ opacity: fade }} className="absolute inset-x-0 bottom-0 px-5 pb-8 md:px-10 md:pb-10">
        <div className="mb-6 flex flex-col gap-6 md:mb-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1, ease }}
            className="max-w-xs font-serif text-3xl italic leading-tight md:order-2 md:text-right md:text-4xl"
          >
            Stories. Places. People.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
            <Magnetic>
              <a
                href="#vlogs"
                data-cursor="PLAY"
                className="group flex items-center gap-4 border border-bone/30 bg-background/30 py-2 pl-2 pr-6 backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <span className="flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground transition-colors group-hover:bg-ink group-hover:text-bone">
                  <Play className="h-4 w-4 fill-current" />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em]">Watch latest vlog</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>
        <h1 className="font-display uppercase leading-[0.8] tracking-tight">
          <motion.span style={{ x: leftX }} className="block overflow-hidden text-[24vw] md:text-[19vw]">
            <motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease, delay: 0.3 }}>
              Arjun
            </motion.span>
          </motion.span>
          <motion.span style={{ x: rightX }} className="block overflow-hidden text-right text-[24vw] md:-mt-[2vw] md:text-[19vw]">
            <motion.span className="text-outline block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease, delay: 0.45 }}>
              Sen
            </motion.span>
          </motion.span>
        </h1>
      </motion.div>

      {/* floating socials */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1, ease }}
        className="absolute right-5 top-1/3 hidden flex-col gap-3 md:right-10 md:flex"
      >
        {[Youtube, Instagram, Facebook].map((Icon, i) => (
          <Magnetic key={i} strength={0.5}>
            <a href="#social" data-cursor="" className="flex h-11 w-11 items-center justify-center border border-bone/25 bg-background/30 backdrop-blur-sm transition-colors hover:border-primary hover:text-primary" aria-label="Social link">
              <Icon className="h-4 w-4" />
            </a>
          </Magnetic>
        ))}
      </motion.div>

      <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
        <div className="relative h-14 w-px overflow-hidden bg-bone/20">
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-primary"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
