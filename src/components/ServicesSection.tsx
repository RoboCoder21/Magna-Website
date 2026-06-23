import { motion } from "framer-motion";
import {
  CalendarRange,
  Clapperboard,
  Layers,
  Lightbulb,
  Radio,
  Sparkle,
  Workflow,
  Zap,
} from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "Creative & strategy",
    description: "Concept, story, and visual language that anchor every experience.",
    meta: "Branding / art direction / scripting",
  },
  {
    icon: CalendarRange,
    title: "Event solutions",
    description: "End-to-end shows, summits, launches, and award nights—planned and run by one crew.",
    meta: "Run of show / talent / stagecraft",
  },
  {
    icon: Clapperboard,
    title: "Audio + video",
    description: "Cinematic capture, live switching, multicam streaming, and fast post drops.",
    meta: "TVC / docu / livestream / highlight films",
  },
  {
    icon: Radio,
    title: "Broadcast & streaming",
    description: "Control rooms that sync with your platforms—studio or on-site anywhere.",
    meta: "Hybrid events / broadcast engineering",
  },
  {
    icon: Layers,
    title: "Scenic & lighting",
    description: "Stage design, LED, lighting design, and show cues that move with the music.",
    meta: "Fabrication / rigging / pixels / cues",
  },
  {
    icon: Zap,
    title: "Experience ops",
    description: "Touring crews, technical riders, logistics, and vendor orchestration.",
    meta: "Production management / touring",
  },
  {
    icon: Sparkle,
    title: "Digital rollouts",
    description: "Launch pages, motion systems, and campaign assets that extend the moment online.",
    meta: "Web / motion / social kits",
  },
  {
    icon: Workflow,
    title: "Content lab",
    description: "Editors, animators, and color working in lockstep with the show floor.",
    meta: "Edit bays / VFX / color",
  },
    {
    icon: Workflow,
    title: "360 Degree Agency",
    description: "full-service marketing and communications firm that handles all aspects of a brand's strategy under one roof.",
 
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden scroll-mt-28 md:scroll-mt-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal/60 to-background" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 0, transparent 48%, hsl(var(--gold) / 0.25) 50%, transparent 52%, transparent 100%)",
          backgroundSize: "240px 240px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-6"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Services</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              Full-stack production with a <span className="text-gradient-gold">single point of control.</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              One team aligned on story, staging, cameras, light, and delivery. We keep creative, technical, and logistics under the same roof so your show never loses its signal.
            </p>
     
          </motion.div>

          <div className="lg:col-span-8 grid md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group glass rounded-2xl p-6 border border-transparent hover:border-[hsl(var(--gold)_/_0.35)] transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--gold)_/_0.12)] border border-[hsl(var(--gold)_/_0.3)] flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-gold" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {service.description}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/70">{service.meta}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
