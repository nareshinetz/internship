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

const moeAdvantages = [
  {
    title: "Applied Skill Labs",
    desc: "We co-establish high-tech centers of excellence directly within campus premises.",
    icon: "/moe_lab.png"
  },
  {
    title: "The Skill Delta",
    desc: "Curriculum structurally redesigned to bridge the gap between academia and industry.",
    icon: "/moe_target.png"
  },
  {
    title: "Placement Bridge",
    desc: "Direct recruitment pipelines integrating with our 500+ global hiring partners.",
    icon: "/moe_cap.png"
  }
];

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
      url: "ex1.jpeg",
      title: "Infrastructure of Excellence",
      desc: "We invest directly into college ecosystems, building the physical and digital labs necessary for elite engineering."
    },
    {
      url: "ex2.jpeg",
      title: "Collaborative Learning Hubs",
      desc: "Dedicated workspace designed for peer interaction and hands-on project development."
    },
    {
      url: "office.jpg",
      title: "Corporate Simulation Centers",
      desc: "Bringing the corporate environment to campus to familiarize students with industry workflows."
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

            {/* 3 Advantage Cards Grid */}
            <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
              {moeAdvantages.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  key={i}
                  className="group relative flex flex-col p-6 rounded-3xl border border-zinc-200/60 bg-white/50 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-xl hover:shadow-zinc-200/20 dark:hover:shadow-black/20 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 mb-6 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm border border-zinc-100 dark:border-zinc-700/50 group-hover:scale-110 transition-transform duration-500 p-2">
                    <img src={item.icon} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                      {item.title}
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
                <div className="w-full h-full overflow-hidden relative group/scroller pt-4 pb-20">
                  <div className="flex flex-col animate-scroll-vertical group-hover/scroller:[animation-play-state:paused]">
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

            {/* Gap Filler Content: Professional Impact Metric Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative flex-1 rounded-3xl border border-zinc-200/60 bg-white/50 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/80 p-8 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 flex flex-col justify-between overflow-hidden min-h-[180px]"
            >
              {/* Cinematic Background Mesh */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Global Reach
                  </div>
                  <div className="text-6xl font-black tracking-tighter text-zinc-900 dark:text-white mb-2 selection:bg-orange-500 selection:text-white">
                    10k<span className="text-orange-500 font-light">+</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest leading-relaxed max-w-[200px] opacity-80">
                  Engineers integrated into global workflows.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.33%); }
        }
        .animate-scroll-vertical {
          animation: scroll-vertical 40s linear infinite;
        }
      `}</style>
    </Section>
  );
}
