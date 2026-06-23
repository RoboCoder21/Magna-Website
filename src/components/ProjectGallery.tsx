import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import projectImg1 from "@/images/IMG_0560.jpg";
import projectImg2 from "@/images/IMG_0897.jpg";
import projectImg3 from "@/images/IMG_2279.jpg";
import projectImg4 from "@/images/d258d29c-55b5-4554-8ed9-3387151edeee.jpg";
import projectImg5 from "@/images/f55db937-43b3-4cfb-8bfd-82dfcbb23013.jpg";
import projectImg6 from "@/images/8e749a6b-d2be-4917-b692-3ac3112bff12.jpg";

const categories = ["All", "Corporate", "Wedding", "Concert", "Festival"];

const projects = [
  {
    id: 1,
    title: "Tech Summit 2024",
    client: "Innovation Corp",
    category: "Corporate",
    image: projectImg1,
  },
  {
    id: 2,
    title: "Garden Ceremony",
    client: "Sarah & Michael",
    category: "Wedding",
    image: projectImg2,
  },
  {
    id: 3,
    title: "Electric Nights Tour",
    client: "Universal Music",
    category: "Concert",
    image: projectImg3,
  },
  {
    id: 4,
    title: "Annual Gala Dinner",
    client: "Luxury Hotels Group",
    category: "Corporate",
    image: projectImg4,
  },
  {
    id: 5,
    title: "Summer Music Festival",
    client: "City Events",
    category: "Festival",
    image: projectImg5,
  },
  {
    id: 6,
    title: "Elegant Reception",
    client: "Emma & James",
    category: "Wedding",
    image: projectImg6,
  },
];

const ProjectGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="relative py-24 md:py-32 scroll-mt-28 md:scroll-mt-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal/50 to-background" />
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(90deg, hsl(var(--gold) / 0.2) 1px, transparent 1px)",
          backgroundSize: "220px 220px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-muted-foreground uppercase tracking-[0.2em] mb-4">
              <Sparkles className="h-4 w-4 text-gold" />
              Selected projects
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              Outcomes that travel from stage to screen.
            </h2>
            <p className="text-muted-foreground text-lg mt-3 max-w-2xl">
              Each show is built with broadcast discipline—so every attendee, viewer, and stakeholder catches the same energy.
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Hybrid / Event / Film / Digital</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-gold text-primary-foreground border-transparent shadow-[0_12px_30px_hsl(43_74%_49%/0.35)]"
                  : "glass text-muted-foreground border-transparent hover:text-foreground hover:border-[hsl(var(--gold)_/_0.35)]"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-transparent hover:border-[hsl(var(--gold)_/_0.35)] transition-all duration-500"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    <span>{project.category}</span>
                    <span className="glass px-3 py-1 rounded-full">Live / Media</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-display font-semibold">{project.title}</h3>
                    <p className="text-muted-foreground text-sm">{project.client}</p>
                  </div>
                </div>

                <div className="absolute top-4 right-4 w-11 h-11 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-0 rotate-45 border border-[hsl(var(--gold)_/_0.35)]">
                  <ArrowUpRight className="w-5 h-5 text-gold" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectGallery;
