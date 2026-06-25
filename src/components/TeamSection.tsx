import { motion } from "framer-motion";
import ceoImage from "@/MAGNA TEAMS PHOTO/CEO.webp";
import ctoImage from "@/MAGNA TEAMS PHOTO/CHIF OPERATING  OFFICER.webp";
const leaders = [
  {
    name: "Yemane Yitbarek (owner)",
    title: "CEO/CTO",
    focus: "Growth, partnerships, and market positioning across the region.",
    image: ceoImage,
  },
  {
    name: "DANIEL ABAYNEH (owner)",
    title: "COO (CHIEF OPERATING OFFICER)",
    focus: "Systems, broadcast pipelines, and on-site control innovation.",
    image: ctoImage,
  },
];

const TeamSection = () => {
  return (
    <section
      id="team"
      className="relative py-24 md:py-32 overflow-hidden scroll-mt-28 md:scroll-mt-32"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/8 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-electric/8 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Leadership</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">People behind the run-of-show</h2>
          <p className="text-lg text-muted-foreground">
            Meet the core team guiding strategy, technology, production, and post. Swap in your final portraits later—these are temporary placeholders.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="group rounded-3xl overflow-hidden border border-[hsl(var(--gold)_/_0.25)] bg-[hsl(var(--glass))] shadow-[0_20px_60px_-35px_rgba(0,0,0,0.45)]"
            >
              <div className="relative h-72 overflow-hidden bg-background/60 flex items-center justify-center">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute top-4 right-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground bg-background/80 px-3 py-1 rounded-full border border-[hsl(var(--gold)_/_0.25)]">
                  {index < 3 ? "Exec" : "Lead"}
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-gold">{leader.title}</p>
                  <h3 className="text-xl font-display font-semibold">{leader.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{leader.focus}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
