"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Amjith Khan",
    role: "Junior Software Engineer",
    company: "Zoho Premium Partners",
    // text: "The real-time project experience at Inetz helped me clear my technical rounds at Zoho effortlessly. Highly recommended!",
    image: "placement-students/amjith.png",
    border: "border-amber-500/40",
    roleColor: "text-amber-600",
  },
  {
    name: "Mohammed Anas",
    role: "React Developer",
    company: "Brightstack solutions",
    // text: "Excellent mentors who explain concepts with real-world scenarios. The placement support is genuine and active.",
    image: "placement-students/anas.png",
    border: "border-indigo-500/40",
    roleColor: "text-indigo-600",
  },
  {
    name: "Ariyangau",
    role: "Junior Software Developer",
    company: "Dofy infosys",
    // text: "Flexible timings allowed me to manage college while gaining professional skills. Truly the best in Chennai!",
    image: "placement-students/ariyangau.png",
    border: "border-emerald-500/40",
    roleColor: "text-emerald-600",
  },
  {
    name: "Sivaraman",
    role: "Frontend Developer",
    company: "IntechHub",
    // text: "The design immersive program at Inetz changed my perspective on user-centric design. Got placed with an amazing package!",
    image: "placement-students/sivaraman.png",
    border: "border-rose-500/40",
    roleColor: "text-rose-600",
  },
  {
    name: "Vimal",
    role: "Data Scientist",
    company: "Dofy infosys",
    // text: "Comprehensive curriculum and hands-on ML projects. The mock interviews were incredibly close to the actual process.",
    image: "placement-students/vimal.png",
    border: "border-sky-500/40",
    roleColor: "text-sky-600",
  },
  {
    name: "Anitha Krish",
    role: "DevOps Engineer",
    company: "Accenture",
    // text: "Mastered Docker, K8s and CI/CD pipelines here. The instructors are industry veterans who know exactly what's needed.",
    image: "placement-students/anas.png",
    border: "border-violet-500/40",
    roleColor: "text-violet-600",
  },
  {
    name: "Vignesh Kumar",
    role: "Cloud Architect",
    company: "Google Cloud",
    // text: "High-quality infrastructure and specialized labs. Passing my AWS certification was a breeze after the training.",
    image: "placement-students/anas.png",
    border: "border-blue-500/40",
    roleColor: "text-blue-600",
  },
  {
    name: "Deepa Mani",
    role: "MERN Developer",
    company: "Cognizant",
    // text: "Focused mentorship help me build a strong portfolio. I received multiple offers within a month of completion.",
    image: "placement-students/anas.png",
    border: "border-teal-500/40",
    roleColor: "text-teal-600",
  },
  {
    name: "Siddharth Nair",
    role: "Python Specialist",
    company: "HCL",
    // text: "The Python track is very well structured. Building a complete automation suite for my final project was the highlight.",
    image: "placement-students/anas.png",
    border: "border-orange-500/40",
    roleColor: "text-orange-600",
  },
];

export default function SuccessStories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 450;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Section className="bg-white py-24 overflow-hidden relative">
      {/* Subtle light mode glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />

      <div className="flex flex-col gap-8 mb-16 px-6 max-w-[1400px] mx-auto relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-4">
            Success Stories
          </div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 mb-4">
            Our Students <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">Success Stories</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-zinc-600 text-lg font-medium max-w-2xl">
            Join 5000+ professionals who transformed their careers with Inetz Technologies. Explore their journeys and envision your future.
          </p>
          <div className="flex gap-4 shrink-0">
            <button
              onClick={() => scroll("left")}
              className="h-12 w-12 rounded-xl border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 hover:border-emerald-500 transition-all text-zinc-600 hover:text-emerald-600 shadow-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="h-12 w-12 rounded-xl border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 hover:border-emerald-500 transition-all text-zinc-600 hover:text-emerald-600 shadow-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar pb-12 px-6 max-w-[1400px] mx-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="min-w-[85%] sm:min-w-[45%] lg:min-w-[calc(33.333%-1rem)] snap-start group h-full"
          >
            <Card className={cn(
              "p-0 border border-zinc-100 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col min-h-[460px]",
              item.border
            )}>
              {/* Image Area */}
              <div className="relative h-[280px] m-3 overflow-hidden rounded-xl bg-zinc-50 shrink-0">
                <img
                  src={item.image}
                  alt={`Success story of ${item.name}`}
                  className="w-full h-full object-cover object-top grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 border-[8px] border-white/10 group-hover:border-transparent transition-all duration-500" />
              </div>

              {/* Info Area */}
              <div className="px-6 pb-8 pt-2 text-center flex flex-col items-center justify-center flex-1">
                <h3 className={cn("text-lg font-extrabold mb-1 tracking-tight", item.roleColor)}>
                  {item.name}
                </h3>
                <div className="w-10 h-px bg-zinc-200 mb-4 mt-2" />
                <div className="min-h-[2.5rem] flex items-center justify-center">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.1em] leading-relaxed max-w-[200px]">
                    {item.role} @ <span className="text-emerald-500">{item.company}</span>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </Section>
  );
}