import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { Sparkles, Maximize2, X } from "lucide-react";
import client1Image from "@/Images21/Client Commendation/client1_full.png";

// Add more recommendation letter images to this array
const recommendationLetters = [
  client1Image,
];

const RecommendationSection = () => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const loopRef = useRef<ReturnType<typeof animate> | null>(null);

  // To ensure the marquee fills the screen even with 1 image, we repeat the array
  const displayLetters = [
    ...recommendationLetters,
    ...recommendationLetters,
    ...recommendationLetters,
    ...recommendationLetters,
  ];

  const getLoopDistance = useCallback(() => {
    if (!trackRef.current) return 1200;
    // Since we duplicated the array 4 times, 1 logical set is scrollWidth / 4. 
    // We can loop over 1/2 of the track.
    return trackRef.current.scrollWidth / 2;
  }, []);

  const startLoop = useCallback(
    (fromX?: number) => {
      const distance = getLoopDistance();
      if (distance <= 0) return;

      const start = fromX ?? x.get();
      const speed = 60; // px per second (slower for documents)
      const duration = Math.max(distance / speed, 1.5);

      loopRef.current?.stop();

      loopRef.current = animate(x, start - distance, {
        duration,
        ease: "linear",
        onComplete: () => {
          x.set(0);
          startLoop(0);
        },
      });
    },
    [getLoopDistance, x]
  );

  useEffect(() => {
    startLoop(0);
    return () => {
      loopRef.current?.stop();
    };
  }, [startLoop]);

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

      {/* Fade edges for the marquee */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 z-20 pointer-events-none bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 z-20 pointer-events-none bg-gradient-to-l from-background via-background/80 to-transparent" />

      <div className="container mx-auto px-6 relative z-10 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)_/_0.3)] bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="h-4 w-4 text-gold" />
            Client Commendation
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            What clients say about working with us.
          </h2>
          <p className="text-muted-foreground text-lg">
            Read the official recommendation letters and see how our team delivered impact, precision, and polish.
          </p>
        </motion.div>

        {/* Marquee Viewport */}
        <div ref={viewportRef} className="relative overflow-hidden -mx-6 px-6">
          <motion.div
            ref={trackRef}
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -4000, right: 4000 }}
            dragElastic={0.12}
            dragMomentum={true}
            onDragStart={() => {
              loopRef.current?.stop();
            }}
            onDragEnd={() => {
              const distance = getLoopDistance();
              if (distance > 0) {
                const current = x.get();
                const normalized = ((current % distance) + distance) % distance;
                const resumeFrom = -normalized;
                x.set(resumeFrom);
                startLoop(resumeFrom);
              }
            }}
            className="flex gap-8 md:gap-12 py-8 cursor-grab active:cursor-grabbing w-max"
          >
            {displayLetters.map((imgSrc, index) => (
              <div
                key={index}
                className="relative group shrink-0 w-[280px] sm:w-[350px] md:w-[400px]"
                onClick={() => setSelectedLetter(imgSrc)}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-gold/20 to-gold/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
                <div className="relative rounded-xl border border-[hsl(var(--gold)_/_0.3)] overflow-hidden shadow-2xl bg-white/5 flex items-center justify-center p-3 h-[400px] sm:h-[480px] md:h-[550px] pointer-events-auto">
                  <img
                    src={imgSrc}
                    alt={`Client Commendation Letter ${index + 1}`}
                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300 rounded-md shadow-sm"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                    <div className="bg-gold/90 text-primary-foreground p-3 rounded-full flex items-center gap-2 shadow-lg">
                      <Maximize2 className="h-5 w-5" />
                      <span className="font-semibold px-1">View</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-6 md:p-12"
            onClick={() => setSelectedLetter(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors z-[110] border border-white/10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLetter(null);
              }}
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center overflow-hidden rounded-xl bg-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedLetter}
                alt="Client Commendation Letter Full View"
                className="max-w-full max-h-[90vh] object-contain block rounded-md"
                draggable="false"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RecommendationSection;
