import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";
import recommendationPdf from "@/client logos/recomendation/RECCOMENDATION LETTER.pdf";

const RecommendationSection = () => {
  return (
    <section
      id="recommendation"
      className="relative py-20 md:py-28 overflow-hidden scroll-mt-28 md:scroll-mt-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal/35 to-background" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(120deg, transparent 0, transparent 45%, hsl(var(--gold) / 0.2) 50%, transparent 55%, transparent 100%)",
          backgroundSize: "260px 260px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl p-8 md:p-12 border border-[hsl(var(--gold)_/_0.2)]"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)_/_0.3)] bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Sparkles className="h-4 w-4 text-gold" />
                Client Commendation
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                What clients say about working with us.
              </h2>
              <p className="text-muted-foreground text-lg">
                Read the official recommendation letter and see how our team delivered impact, precision, and polish.
              </p>
            </div>

            <a
              href={recommendationPdf}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground bg-gold shadow-[0_18px_40px_hsl(43_74%_49%/0.35)] hover:brightness-110 transition"
            >
              <FileText className="h-5 w-5" />
              View recommendation letter
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecommendationSection;
