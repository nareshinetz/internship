"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Quote, ArrowRight, User, Briefcase } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type VideoTestimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  thumbnail: string;
  videoUrl: string;
  previewText: string;
  year: string;
};

const videoTestimonials: VideoTestimonial[] = [

  {
    id: "v1",
    name: "Aravind Kumar",
    role: "Full Stack Developer",
    company: "TCS",
    thumbnail: "/thumbImg.jpeg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder
    previewText: "The mentorship at Inetz is industry-grade. I learned how to build production-scale apps from scratch.",
    year: "Batch of 2022"
  },
  {
    id: "v1",
    name: "Aravind Kumar",
    role: "Full Stack Developer",
    company: "TCS",
    thumbnail: "/thumbImg.jpeg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder
    previewText: "The mentorship at Inetz is industry-grade. I learned how to build production-scale apps from scratch.",
    year: "Batch of 2022"
  },
  {
    id: "v1",
    name: "Aravind Kumar",
    role: "Full Stack Developer",
    company: "TCS",
    thumbnail: "/thumbImg.jpeg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder
    previewText: "The mentorship at Inetz is industry-grade. I learned how to build production-scale apps from scratch.",
    year: "Batch of 2022"
  },
  {
    id: "v1",
    name: "Aravind Kumar",
    role: "Full Stack Developer",
    company: "TCS",
    thumbnail: "/thumbImg.jpeg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder
    previewText: "The mentorship at Inetz is industry-grade. I learned how to build production-scale apps from scratch.",
    year: "Batch of 2026"
  },
  {
    id: "v2",
    name: "Sneha Reddy",
    role: "Senior UI Designer",
    company: "Freshworks",
    thumbnail: "/thumbImg.jpeg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder
    previewText: "The internship process is unique. We work on real-world case studies that companies actually use.",
    year: "Batch of 2023"
  },
  {
    id: "v3",
    name: "David Miller",
    role: "Data Scientist",
    company: "Cognizant",
    thumbnail: "/thumbImg.jpeg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder
    previewText: "Transitioning into Data Science was hard until I joined the specialized track here. The curriculum is tight.",
    year: "Batch of 2024"
  }
];

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);

  return (
    <Section className="bg-zinc-50 dark:bg-zinc-950 transition-colors py-24 sm:py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            Voices of Impact
          </motion.div>

          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100 mb-4">
            Hear it from <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">Our Students</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg font-medium max-w-2xl mx-auto">
            Real-world career transformations narrated by the students who lived them.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoTestimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div
                onClick={() => setActiveVideo(testimonial)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-2xl hover:border-emerald-500/50"
              >
                {/* Fixed Cinematic Thumbnail */}
                <img
                  src={testimonial.thumbnail}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={testimonial.name}
                />

                {/* Constant Narrative Overlay (No Hover Toggle) */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-white text-sm sm:text-base font-medium italic leading-relaxed line-clamp-2">
                        "{testimonial.previewText}"
                      </h4>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{testimonial.role}</span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">@ {testimonial.company}</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 shrink-0 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-white text-white" />
                    </div>
                  </div>
                </div>

                {/* Year Badge */}
                <div className="absolute top-4 right-4">
                  <div className="px-2 py-1 rounded bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-bold text-zinc-300 uppercase tracking-widest">
                    {testimonial.year}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 flex justify-center"
        >
          <button className="group relative px-8 py-4 rounded-xl bg-emerald-600 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-4 active:scale-95">
            Unlock all success stories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-xl"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />

              <div className="absolute bottom-6 left-6 p-6 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/10 max-w-sm hidden md:block">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <User className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white leading-none mb-1">{activeVideo.name}</h4>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest line-clamp-1">
                      {activeVideo.role} @ {activeVideo.company}
                    </p>
                  </div>
                </div>
                <p className="text-zinc-300 text-xs font-medium leading-relaxed italic opacity-80">
                  "{activeVideo.previewText}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
