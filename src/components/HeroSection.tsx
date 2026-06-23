import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/images/IMG_0272 - Copy.jpg";

const capabilities = [
  { label: "Event solutions", href: "#services" },
  { label: "Audio / video", href: "#portfolio" },
  { label: "Digital launches", href: "#portfolio" },
  { label: "Experience strategy", href: "#about" },
];

const headlinePhrases = [
  "Launch bold moments.",
  "Stage. Stream. Drop.",
  "Make every cue land.",
];

const subtextPhrases = [
  "One crew for live, broadcast, and post—no hand-offs, no drift.",
  "Concept to cue calls to the final export. Fast, aligned, done.",
  "Stories that hit the room and the replay—on time, on brand.",
];

const ctaPhrases = ["Start a project", "Book a call", "Plan your launch"];

const headingVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};
const wordVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)", scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { type: "spring" as const, stiffness: 240, damping: 26 },
  },
};
const contentVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};
const pillContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.4 },
  },
};
const pillVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const HeroSection = () => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [subtextIndex, setSubtextIndex] = useState(0);
  const [ctaIndex, setCtaIndex] = useState(0);

  useEffect(() => {
    const headTimer = setInterval(() => {
      setHeadlineIndex((i) => (i + 1) % headlinePhrases.length);
    }, 3400);
    const subTimer = setInterval(() => {
      setSubtextIndex((i) => (i + 1) % subtextPhrases.length);
    }, 4200);
    const ctaTimer = setInterval(() => {
      setCtaIndex((i) => (i + 1) % ctaPhrases.length);
    }, 5200);
    return () => {
      clearInterval(headTimer);
      clearInterval(subTimer);
      clearInterval(ctaTimer);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Stage production backdrop"
          className="h-full w-full object-cover brightness-[0.82] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/88 via-background/72 to-background/96" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/82 via-background/42 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, hsl(var(--gold) / 0.25), transparent 34%)," +
              "radial-gradient(circle at 78% 12%, hsl(var(--electric-blue) / 0.18), transparent 30%)," +
              "radial-gradient(circle at 62% 78%, hsl(var(--gold) / 0.22), transparent 28%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--gold) / 0.26) 1px, transparent 1px)," +
              "linear-gradient(0deg, hsl(var(--gold) / 0.16) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 place-items-center">
          <div className="lg:col-start-3 lg:col-end-11 xl:col-start-4 xl:col-end-10 space-y-8 max-w-5xl w-full mx-auto text-center">
            <motion.h1
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-6xl xl:text-7xl font-display font-bold leading-[1.05]"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={headlinePhrases[headlineIndex]}
                  initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -22, filter: "blur(6px)" }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className="inline-block text-gradient-gold"
                >
                  {headlinePhrases[headlineIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.h1>

            <motion.p
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl min-h-[70px]"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={subtextPhrases[subtextIndex]}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="inline-block"
                >
                  {subtextPhrases[subtextIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                variant="gold"
                size="lg"
                asChild
                className="shadow-[0_25px_60px_hsl(43_74%_49%/0.3)]"
              >
                <a href="#contact" className="flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ctaPhrases[ctaIndex]}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                    >
                      {ctaPhrases[ctaIndex]}
                    </motion.span>
                  </AnimatePresence>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="glass" size="lg" asChild className="border border-[hsl(var(--gold)_/_0.3)]">
                <a href="#portfolio">
                  <Play className="h-5 w-5" />
                  View portfolio
                </a>
              </Button>
            </motion.div>

            <motion.div
              variants={pillContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3 justify-center"
            >
              {capabilities.map((item) => (
                <motion.a
                  key={item.label}
                  variants={pillVariants}
                  href={item.href}
                  className="glass rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
                  aria-label={`Jump to ${item.label.toLowerCase()}`}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-14 border border-muted-foreground/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 bg-gold rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;