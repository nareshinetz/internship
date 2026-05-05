"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

import { Counter } from "@/components/ui/Counter";

export default function HiringPartners() {
  const partners = [
    { name: "eNoah", color: "text-[#ED7F10]" },
    { name: "Enormous", color: "text-[#2B2D42] dark:text-zinc-300" },
    { name: "FedEx", color: "text-[#4D148C] dark:text-violet-400" },
    { name: "G10X", color: "text-zinc-900 dark:text-zinc-100" },
    { name: "G2 TechSoft", color: "text-zinc-800 dark:text-zinc-200" },
    { name: "Gainwell", color: "text-[#0082CA]" },
    { name: "GlobalLogic", color: "text-[#F47321]" },
    { name: "T2 Travel Tech", color: "text-zinc-900 dark:text-zinc-100" },
    { name: "JK Tech", color: "text-zinc-900 dark:text-zinc-100" },
    { name: "Kumaran Systems", color: "text-[#2B822E]" },
    { name: "LexisNexis", color: "text-[#EE3124]" },
    { name: "Manuh Technologies", color: "text-[#0047AB]" },
    { name: "Moder", color: "text-zinc-900 dark:text-zinc-100" },
    { name: "MyTech", color: "text-[#00AEEF]" },
    { name: "Nev", color: "text-zinc-900 dark:text-zinc-100" }
  ];

  const firstRow = partners.slice(0, 8);
  const secondRow = partners.slice(8);

  return (
    <Section className="bg-[#FFF9F2] dark:bg-[#18110B] overflow-hidden py-24 relative border-y border-[#F0D5BA] dark:border-[#38281A]">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full hidden dark:block" />
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
          Placement Network
        </div>
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100 mb-4">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">Hiring Partners</span>
        </h2>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-center mb-16">
        We place candidates with trusted companies across diverse industries.
        Our network of 200+ partner organizations ensures relevant job opportunities.
      </p>

      {/* Scroller Container */}
      <div className="relative mt-20 flex flex-col gap-10">
        {/* Faded edges - updated to match the unique highlight background color */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#FFF9F2] dark:from-[#18110B] to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#FFF9F2] dark:from-[#18110B] to-transparent z-20" />

        {/* Row 1 */}
        <div className="flex gap-24 animate-logo-scroll whitespace-nowrap py-4 cursor-pointer hover-pause">
          {[...firstRow, ...firstRow, ...firstRow].map((partner, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center justify-center font-black text-2xl sm:text-4xl transition-all duration-300 tracking-tighter hover:scale-110",
                partner.color
              )}
            >
              {partner.name}
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex gap-24 animate-logo-scroll-reverse whitespace-nowrap py-4 cursor-pointer hover-pause">
          {[...secondRow, ...secondRow, ...secondRow].map((partner, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center justify-center font-black text-2xl sm:text-4xl transition-all duration-300 tracking-tighter hover:scale-110",
                partner.color
              )}
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes logo-scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-logo-scroll {
          animation: logo-scroll 15s linear infinite;
        }
        .animate-logo-scroll-reverse {
          animation: logo-scroll-reverse 15s linear infinite;
        }
        .hover-pause:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </Section>
  );
}