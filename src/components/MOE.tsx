"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Target,
  GraduationCap,
  Network,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";


const institutionalPartners = [
  "Indian Institute of Technology",
  "Anna University",
  "VIT University",
  "SRM Institute",
  "BMS College of Engineering",
  "JNTU Hyderabad",
  "College of Engineering Guindy",
  "PSG Tech",
  "Amrita Vishwa Vidyapeetham",
  "NIT Trichy",
  "SASTRA University",
  "SSN College of Engineering"
];

export function MOESection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = [
    {
      url: "clg-moe.png",
      title: "On-Campus Masterclasses",
      desc: "Conducting hands-on training sessions and expert-led classes within college premises."
    },
    {
      url: "clg-moe1.png",
      title: "Strategic MOU Signings",
      desc: "Formalizing partnerships with top colleges to bring industry-standard tech education directly to campus."
    },
    {
      url: "office.jpg",
      title: "Industry-Academia Bridge",
      desc: "Bridging the gap by integrating our advanced technology curriculum into college ecosystems."
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

  return (
    <Section className="relative bg-zinc-50/50 dark:bg-zinc-950/50 py-24" maxWidth="xl">
      {/* Refined Background Gradients to match Hero but subtly scaled down */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_circle_at_15%_0%,rgba(249,115,22,0.05),transparent_55%),radial-gradient(800px_circle_at_90%_20%,rgba(59,130,246,0.05),transparent_55%),linear-gradient(to_bottom,rgba(255,255,255,1),rgba(255,255,255,0.8))] dark:bg-[radial-gradient(1000px_circle_at_15%_0%,rgba(249,115,22,0.05),transparent_55%),radial-gradient(800px_circle_at_90%_20%,rgba(59,130,246,0.05),transparent_55%),linear-gradient(to_bottom,rgba(10,10,10,1),rgba(10,10,10,0.8))]"
      />

      <div className="relative z-10 w-full flex flex-col">

        {/* Standardized Section Header */}
        <div className="text-center mb-10 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Network className="w-4 h-4" />
            Institutional Network
          </div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100 mb-4">
            Strategic MOE & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500 font-bold">Academic Partners</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Transforming theoretical foundations into industrial mastery. Our Memorandum of Engagement embeds industry-standard curriculum directly onto campus premises.
          </p>
        </div>

        {/* Modern Bento-Box Architecture */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* Left Column (7 cols): Advantage Grid */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-6 lg:gap-8">

            {/* Featured Hero Card with Image Slider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 group h-[300px] sm:h-[400px] lg:h-[420px]"
            >
              <div className="relative h-full w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <img
                      src={sliderImages[currentSlide].url}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={sliderImages[currentSlide].title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                    <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 z-20">
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-2"
                      >
                        {sliderImages[currentSlide].title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xs sm:text-sm text-zinc-300 max-w-lg leading-relaxed"
                      >
                        {sliderImages[currentSlide].desc}
                      </motion.p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slider Navigation Controls */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between items-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={prevSlide}
                    className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                {/* Pagination Dots */}
                <div className="absolute top-6 right-6 flex gap-2 z-30">
                  {sliderImages.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 transition-all duration-300 rounded-full",
                        currentSlide === i ? "w-8 bg-orange-500" : "w-2 bg-white/30"
                      )}
                    />
                  ))}
                </div>
              </div>
            </motion.div>


          </div>

          {/* Right Column (5 cols): Sleek Vertical List & Gap Content */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 lg:gap-8">

            {/* Active MOU Partners Scroller */}
            <div className="relative h-[300px] lg:h-[420px] shrink-0 rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden block">
              {/* Component Header */}
              <div className="flex items-center justify-between p-6 pb-4 border-b border-zinc-100 dark:border-zinc-800 z-20 bg-white dark:bg-zinc-900 relative w-full h-[76px]">
                <h4 className="text-sm font-bold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">
                  Active MOU Partners
                </h4>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  50+ Global Links
                </div>
              </div>

              {/* Fade masks for elegant scrolling */}
              <div className="absolute top-[76px] left-0 right-0 h-10 bg-gradient-to-b from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none" />

              {/* Out of flow scrolling container ensuring 1:1 perfect height */}
              <div className="absolute top-[76px] bottom-0 left-0 right-0 overflow-hidden">
                <div className="w-full h-full overflow-hidden relative scroller-container pt-4 pb-20">
                  <div className="flex flex-col animate-scroll-vertical">
                    {/* Tripled list for infinite seamless scroll */}
                    {[...institutionalPartners, ...institutionalPartners, ...institutionalPartners].map((name, i) => (
                      <div key={i} className="flex items-center gap-4 px-6 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group/item cursor-pointer">
                        <Building2 className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover/item:text-zinc-900 dark:group-hover/item:text-white transition-colors">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.33%); }
        }
        .animate-scroll-vertical {
          animation: scroll-vertical 20s linear infinite;
        }
        .scroller-container:hover .animate-scroll-vertical {
          animation-play-state: paused;
        }
      `}</style>
    </Section>
  );
}
