import { motion } from "framer-motion";
import { Award, Layers, Sparkles } from "lucide-react";
import crewImage from "@/Images21/Phacs/photo1.webp";

const milestones = [
  {
    title: "Built for shows and screens",
    detail: "Production, film, and digital teams in one pipeline so every output feels consistent.",
  },
  {
    title: "On the ground, anywhere",
    detail: "Touring crews, scenic partners, and broadcast control built to travel.",
  },
  {
    title: "Outcome obsessed",
    detail: "We map success on audience impact—not just delivery checklists.",
  },
];

const proof = [
  { icon: Award, value: "3+", label: "Years of experience" },
  { icon: Sparkles, value: "98%", label: "Projects on-time" },
  { icon: Layers, value: "Multi-crew", label: "Stage / film / web" },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-24 md:py-32 relative overflow-hidden scroll-mt-28 md:scroll-mt-32"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/6 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-electric/6 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] max-w-xl mx-auto rounded-[32px] overflow-hidden border border-[hsl(var(--gold)_/_0.25)] shadow-2xl shadow-black/40">
              <img
                src={crewImage}
                alt="Production crew at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
              <div className="absolute top-5 left-5 glass px-4 py-2 rounded-full text-xs uppercase tracking-[0.25em] text-muted-foreground">On-site ops</div>

            </div>
          </motion.div>

          {/* Right - Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">About Magna</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              We engineer experiences that travel beyond the venue.
            </h2>
            <p className="text-muted-foreground text-lg">
              Magna is an event and media company built on broadcast discipline. We combine creative direction, stagecraft, and post-production under one roof to keep momentum from idea to opening night and the content that follows.
            </p>

            <div className="space-y-4">
              {milestones.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--gold)_/_0.12)] border border-[hsl(var(--gold)_/_0.3)] flex items-center justify-center text-sm font-semibold">0{idx + 1}</div>
                  <div>
                    <h3 className="text-lg font-display font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {proof.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="glass rounded-2xl p-4 flex items-center gap-4 border border-[hsl(var(--gold)_/_0.2)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[hsl(var(--gold)_/_0.12)] border border-[hsl(var(--gold)_/_0.3)] flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="text-xl font-display font-bold">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
