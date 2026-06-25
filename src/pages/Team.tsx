import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import altImage from "@/Images21/Africa Union/IMG_8050.webp";
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

const Team = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-24">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={altImage} alt="Team background" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/92 to-background" />
          <div className="container mx-auto px-6 py-20 relative z-10 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl space-y-4"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Leadership</p>
              <h1 className="text-4xl md:text-5xl font-display font-bold">People behind the run-of-show</h1>
              <p className="text-lg text-muted-foreground">
                Meet the core team guiding strategy, technology, production, and post. Swap in your final portraits later—these are temporary placeholders.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-16 md:py-20">
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
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
