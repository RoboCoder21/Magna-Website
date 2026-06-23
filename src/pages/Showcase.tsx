import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/images/IMG_0272.jpg";

const highlightMoments = [
  "Immersive stages + LED",
  "Live switching + streaming",
  "On-site production pods",
  "Post-event content drops",
];

const Showcase = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Show control room" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-background via-charcoal/80 to-background" />

        <div className="relative container mx-auto px-6 py-20 lg:py-28 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Live direction</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold">Show control room</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Content lab and touring crew, synced in one stack. From stage to stream to post, every move stays in sync.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl overflow-hidden border border-[hsl(var(--glass-border))] shadow-2xl shadow-black/40"
          >
            <div className="relative h-[440px] bg-gradient-to-br from-charcoal via-charcoal-light to-background">
              <img
                src={heroImage}
                alt="Stage production in action"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--gold)_/_0.25),transparent_45%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,hsl(var(--electric-blue)_/_0.25),transparent_40%)]" />
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, transparent 0, transparent 45%, hsl(var(--gold) / 0.35) 50%, transparent 55%, transparent 100%)",
                  backgroundSize: "260px 260px",
                }}
              />

              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Live direction</p>
                    <h3 className="text-2xl font-display font-semibold">Show control room</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[hsl(var(--gold)_/_0.15)] border border-[hsl(var(--gold)_/_0.35)] flex items-center justify-center">
                    <Play className="h-5 w-5 text-gold" />
                  </div>
                </div>

                <div className="space-y-3">
                  {highlightMoments.map((item, idx) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[hsl(var(--gold)_/_0.1)] border border-[hsl(var(--gold)_/_0.2)] text-[10px] flex items-center justify-center uppercase tracking-wide text-gold">
                        0{idx + 1}
                      </span>
                      <p className="text-sm text-foreground/90">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="uppercase tracking-[0.2em]">On set / On tour</span>
                  <span className="flex items-center gap-2 text-foreground">
                    Play reel
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
