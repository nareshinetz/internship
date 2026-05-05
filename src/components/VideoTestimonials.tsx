"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowRight, User } from "lucide-react";
import { Section } from "@/components/ui/Section";
import Script from "next/script";

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
    // Instagram Reel Link
    videoUrl: "https://www.instagram.com/reel/DOLsgFfCZbC/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==", 
    previewText: "The mentorship at Inetz is industry-grade. I learned how to build production-scale apps from scratch.",
    year: "Batch of 2022"
  },
  {
    id: "v2",
    name: "Sneha Reddy",
    role: "Senior UI Designer",
    company: "Freshworks",
    thumbnail: "/thumbImg.jpeg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    year: "Batch of 2023",
    previewText: "The internship process is unique. We work on real-world case studies that companies actually use.",
  },
  {
    id: "v3",
    name: "David Miller",
    role: "Data Scientist",
    company: "Cognizant",
    thumbnail: "/thumbImg.jpeg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    year: "Batch of 2024",
    previewText: "Transitioning into Data Science was hard until I joined the specialized track here. The curriculum is tight.",
  }
];

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);

  // Trigger Instagram script to process the new embed when the modal opens
  useEffect(() => {
    if (activeVideo && activeVideo.videoUrl.includes("instagram.com")) {
      // Small timeout ensures the DOM element is present before processing
      const timer = setTimeout(() => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeVideo]);

  return (
    <>
      {/* Load Instagram Embed Script */}
      <Script src="https://www.instagram.com/embed.js" strategy="afterInteractive" />

      <Section className="bg-white dark:bg-[#080808] transition-colors py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
            >
              Voices of Impact
            </motion.span>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
              Hear it from <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-sky-500">Our Students</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-xl mx-auto font-medium">
              Real career transformations narrated by the students who lived them.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTestimonials.map((testimonial, idx) => (
              <motion.div
                key={`${testimonial.id}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div
                  onClick={() => setActiveVideo(testimonial)}
                  className="relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 hover:border-emerald-500/40 shadow-sm hover:shadow-xl"
                >
                  <img
                    src={testimonial.thumbnail}
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    alt={testimonial.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <div className="flex items-end justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-white text-xs font-medium italic mb-2 line-clamp-2 opacity-90">
                          "{testimonial.previewText}"
                        </p>
                        <div className="flex flex-col">
                          <span className="text-white text-sm font-bold">{testimonial.name}</span>
                          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                            {testimonial.role} @ {testimonial.company}
                          </span>
                        </div>
                      </div>
                      <div className="w-9 h-9 shrink-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300">
                        <Play className="w-3.5 h-3.5 fill-current text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-md border border-white/10 text-[8px] font-black text-white uppercase tracking-tighter">
                      {testimonial.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-12 flex justify-center">
            <button className="group flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-[11px] uppercase tracking-widest hover:text-emerald-500 transition-colors">
              View all stories
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-zinc-950/98 backdrop-blur-md"
              onClick={() => setActiveVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                // Adjusted max-width for Instagram's vertical format
                className={`relative w-full overflow-hidden bg-black shadow-2xl border border-white/5 rounded-2xl ${
                  activeVideo.videoUrl.includes("instagram.com") ? "max-w-md h-[80vh]" : "max-w-4xl aspect-video"
                }`}
              >
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-emerald-500 transition-all z-20 shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="w-full h-full overflow-y-auto bg-black flex items-center justify-center">
                  {activeVideo.videoUrl.includes("instagram.com") ? (
                    // Instagram Embed Logic
                    <blockquote
                      className="instagram-media"
                      data-instgrm-permalink={activeVideo.videoUrl}
                      data-instgrm-version="14"
                      style={{ width: '100%', margin: 0 }}
                    ></blockquote>
                  ) : (
                    // Default Video Player
                    <video
                      src={activeVideo.videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* Info Bar - Hidden for Instagram as it has its own UI */}
                {!activeVideo.videoUrl.includes("instagram.com") && (
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-zinc-900/60 backdrop-blur-lg border border-white/5 hidden sm:flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-bold">{activeVideo.name}</h4>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        {activeVideo.role} @ {activeVideo.company}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </>
  );
}

// Global TypeScript Interface for Instagram
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}