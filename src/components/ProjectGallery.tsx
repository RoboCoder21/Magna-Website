import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";

import au1 from "@/Images21/Africa Union/IMG_8046.webp";
import au2 from "@/Images21/Africa Union/IMG_8050.webp";

import phacs1 from "@/Images21/Phacs/photo1.webp";
import phacs2 from "@/Images21/Phacs/photo2.webp";
import phacs3 from "@/Images21/Phacs/photo3.webp";
import phacs4 from "@/Images21/Phacs/photo4.webp";

import sheger1 from "@/Images21/Sheger city/IMG_2853.webp";
import sheger2 from "@/Images21/Sheger city/IMG_2878.webp";
import sheger3 from "@/Images21/Sheger city/IMG_2886.webp";
import sheger4 from "@/Images21/Sheger city/IMG_2887.webp";
import sheger5 from "@/Images21/Sheger city/IMG_2897.webp";
import sheger6 from "@/Images21/Sheger city/IMG_2898.webp";

import dashin1 from "@/Images21/dashin beer/IMG_7089.webp";
import dashin3 from "@/Images21/dashin beer/IMG_7103.webp";
import dashin4 from "@/Images21/dashin beer/IMG_7128.webp";

const projects = [
  {
    id: 1,
    title: "Africa Union",
    client: "Africa Union",
    category: "Event",
    image: au1,
    gallery: [au1, au2],
  },
  {
    id: 2,
    title: "Phacs",
    client: "Phacs",
    category: "Corporate",
    image: phacs1,
    gallery: [phacs1, phacs2, phacs3, phacs4],
  },
  {
    id: 3,
    title: "Sheger City",
    client: "Sheger City",
    category: "Public Event",
    image: sheger1,
    gallery: [sheger1, sheger2, sheger3, sheger4, sheger5, sheger6],
  },
  {
    id: 4,
    title: "Dashin Beer",
    client: "Dashin Beer",
    category: "Corporate",
    image: dashin1,
    gallery: [dashin1, dashin3, dashin4],
  },
];

const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.gallery.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
    }
  };

  return (
    <>
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

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => openGallery(project)}
                  className="group relative aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer border border-transparent hover:border-[hsl(var(--gold)_/_0.35)] transition-all duration-500"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      <span>{project.category}</span>
                      <span className="glass px-3 py-1 rounded-full text-[10px] md:text-xs text-white">View Project ({project.gallery.length} Photos)</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl md:text-4xl font-display font-semibold">{project.title}</h3>
                      <p className="text-muted-foreground text-sm md:text-base">{project.client}</p>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-0 rotate-45 border border-[hsl(var(--gold)_/_0.35)]">
                    <ArrowUpRight className="w-5 h-5 text-gold" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4 md:p-8"
            onClick={closeGallery}
          >
            <button
              onClick={closeGallery}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full glass flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors z-50"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div 
              className="relative w-full max-w-6xl max-h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full flex items-center justify-center aspect-[16/9] md:aspect-auto md:h-[70vh]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedProject.gallery[currentImageIndex]}
                    alt={`${selectedProject.title} image ${currentImageIndex + 1}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  />
                </AnimatePresence>

                {selectedProject.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 w-12 h-12 rounded-full glass flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors z-10"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 w-12 h-12 rounded-full glass flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors z-10"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}
              </div>

              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="text-center space-y-1">
                  <h3 className="text-2xl font-display font-semibold text-white">{selectedProject.title}</h3>
                  <p className="text-muted-foreground">{currentImageIndex + 1} / {selectedProject.gallery.length}</p>
                </div>
                
                {/* Thumbnails */}
                {selectedProject.gallery.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto max-w-full pb-2 px-2 hide-scrollbar">
                    {selectedProject.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-20 h-16 rounded-md overflow-hidden flex-shrink-0 transition-all ${
                          idx === currentImageIndex ? "ring-2 ring-gold scale-105" : "opacity-50 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectGallery;

