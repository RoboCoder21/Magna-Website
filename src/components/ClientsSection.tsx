import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { Sparkles } from "lucide-react";
import embassyLogo from "@/client logos/EMBASSY_OF_THE_KUWAIT.png";
import ethioTelecomLogo from "@/client logos/Ethio telecom.png";
import pressAgencyLogo from "@/client logos/ETHIOPIAN PRESS AGENCY.png";
import icsLogo from "@/client logos/ICS ETHIOPIA.png";
import jubilationLogo from "@/client logos/JUBILATION AFRICA.png";
import agricultureLogo from "@/client logos/MINISTRY OF AGRICULTURE.png";
import safaricomLogo from "@/client logos/SAFARICOM ETHIOPIA.png";

const clients = [
  { name: "JUBILATION AFRICA", logo: jubilationLogo },
  { name: "ETHIO TELECOM", logo: ethioTelecomLogo },
  { name: "ETHIOPIAN PRESS AGENCY", logo: pressAgencyLogo },
  { name: "ICS ETHIOPIA", logo: icsLogo },
  { name: "SAFARICOM ETHIOPIA", logo: safaricomLogo },
  { name: "MINISTRY OF AGRICULTURE", logo: agricultureLogo },
  { name: "EMBASSY OF THE STATE OF KUWAIT", logo: embassyLogo },
];

const ClientsSection = () => {
  const [logoRatios, setLogoRatios] = useState<Record<string, number>>({});
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const loopRef = useRef<ReturnType<typeof animate> | null>(null);

  const getLoopDistance = useCallback(() => {
    if (!trackRef.current) return 1200;
    return trackRef.current.scrollWidth / 2;
  }, []);

  const startLoop = useCallback(
    (fromX?: number) => {
      const distance = getLoopDistance();
      if (distance <= 0) return;

      const start = fromX ?? x.get();
      const speed = 140; // px per second
      const duration = Math.max(distance / speed, 1.5);

      // Stop any existing loop
      loopRef.current?.stop();

      loopRef.current = animate(x, start - distance, {
        duration,
        ease: "linear",
        onComplete: () => {
          // wrap back to zero to avoid drifting off-screen
          x.set(0);
          startLoop(0);
        },
      });
    },
    [getLoopDistance, x]
  );

  const handleLogoLoad = (name: string) => (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;

    if (naturalWidth && naturalHeight && !logoRatios[name]) {
      setLogoRatios((prev) => ({ ...prev, [name]: naturalWidth / naturalHeight }));
    }
  };

  useEffect(() => {
    // Start marquee loop on mount
    startLoop(0);
    return () => {
      loopRef.current?.stop();
    };
  }, [startLoop]);

  return (
    <section
      id="clients"
      className="relative py-14 md:py-18 overflow-hidden bg-white text-foreground scroll-mt-28 md:scroll-mt-32"
    >
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none bg-gradient-to-r from-white via-white/70 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none bg-gradient-to-l from-white via-white/70 to-transparent" />

      <div className="container mx-auto px-6 relative z-10 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)_/_0.3)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground shadow-sm">
            <Sparkles className="h-4 w-4 text-gold" />
            Our Clients
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-[hsl(var(--gold)_/_0.4)] via-[hsl(var(--gold)_/_0.1)] to-transparent" />
        </motion.div>

        <div
          ref={viewportRef}
          className="relative overflow-hidden rounded-3xl border border-[hsl(var(--gold)_/_0.18)] bg-black/70 shadow-[0_25px_70px_-30px_rgba(0,0,0,0.25)]"
        >
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
                // Normalize current offset to stay within the visible window
                const current = x.get();
                const normalized = ((current % distance) + distance) % distance;
                const resumeFrom = -normalized;
                x.set(resumeFrom);
                startLoop(resumeFrom);
              }
            }}
            className="flex gap-12 py-8 px-8 cursor-grab active:cursor-grabbing"
          >
            {[...clients, ...clients].map((client, index) => {
              const ratio = logoRatios[client.name] ?? 1.6;
              const tileWidthRem = Math.min(Math.max(ratio * 8, 9), 16);
              const tileAspect = ratio >= 1 ? ratio : 1 / ratio;

              return (
                <div
                  key={`${client.name}-${index}`}
                  className="flex shrink-0 flex-col items-center gap-3 rounded-2xl bg-black/25 px-4 py-4 shadow-sm border border-[hsl(var(--gold)_/_0.18)]"
                  style={{ width: `${tileWidthRem}rem` }}
                >
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: tileAspect }}
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[hsl(var(--gold)_/_0.08)] via-white/10 to-transparent" />
                    <div className="relative grid h-full w-full place-items-center rounded-xl border border-[hsl(var(--gold)_/_0.18)] bg-black/40 backdrop-blur-sm">
                      <img
                        src={client.logo}
                        alt={`${client.name} logo`}
                        loading="lazy"
                        onLoad={handleLogoLoad(client.name)}
                        className="h-full w-full object-contain p-2 sm:p-3"
                      />
                    </div>
                  </div>
                  <span className="px-2 text-xs font-medium leading-tight text-center text-foreground/80">{client.name}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
