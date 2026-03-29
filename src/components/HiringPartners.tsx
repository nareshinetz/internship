"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

import { FaWhatsapp } from "react-icons/fa";

export default function HiringPartners() {
  const partners = [
    { name: "eNoah", color: "text-[#ED7F10]" },
    { name: "Enormous", color: "text-[#2B2D42]" },
    { name: "FedEx", color: "text-[#4D148C]" },
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
    <Section className="bg-white dark:bg-zinc-950 overflow-hidden py-24 relative">
      <div className="relative text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-[#0B4234] dark:text-emerald-400 mb-6 tracking-tight">
          Our Hiring Partners
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          We place candidates with trusted companies across diverse industries. 
          Our network of 100+ partner organizations ensures relevant job opportunities.
        </p>
      </div>

      {/* Scroller Container */}
      <div className="relative mt-20 flex flex-col gap-10">
        {/* Faded edges - reduced width to avoid covering names */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-20" />
        
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

      {/* Stats Section - Matching the image's clean white look */}
      <div className="mt-24 grid gap-6 sm:grid-cols-3 max-w-6xl mx-auto px-4">
        {[
          { label: "Partner Companies", val: "200+", color: "text-[#0B4234]" },
          { label: "Placement Rate", val: "90%", color: "text-[#0B4234]" },
          { label: "Professionals Placed", val: "1500+", color: "text-[#0B4234]" },
        ].map((stat, i) => (
          <div key={i} className="bg-emerald-50/10 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-10 text-center shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <h3 className={cn("text-4xl sm:text-5xl font-bold mb-4", stat.color)}>
              {stat.val}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919840234475"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[200] group"
      >
        <div className="animate-bounce absolute -inset-4 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/40 transition-all" />
        <div className="relative h-16 w-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110 active:scale-95">
          <FaWhatsapp className="h-9 w-9" />
        </div>
      </a>

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