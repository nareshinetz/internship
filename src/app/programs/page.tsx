"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Updated for latest motion
import { TechStack, catalogItems } from "@/lib/program-data";
import CourseCard from "@/components/programs/courseCard";
import InternshipPrograms from "@/components/programs/programDetails";
import { STACK_MAPPING, BRAND_DATA, getIconClass } from "@/lib/Tech-utils";
import { ArrowRight, Terminal, Shield, Sparkles } from "lucide-react"; 

const ProgramsMainPage = () => {
  const [selectedStack, setSelectedStack] = useState<TechStack | null>(null);
  const allSkills = Array.from(new Set(Object.values(STACK_MAPPING).flat()));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedStack]);

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-[#1a1a1a] antialiased">
      
      {/* BACKGROUND ACCENT SHAPES */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -left-[5%] w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-[100px]" />
      </div>

      <AnimatePresence mode="wait">
        {!selectedStack ? (
          <motion.div
            key="catalog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 max-w-6xl mx-auto px-6"
          >
            {/* 1. COLORFUL NAV TICKER */}
            <nav className="flex items-center justify-between py-5 border-b border-emerald-100 overflow-hidden">
              <div className="flex items-center gap-2 shrink-0 pr-10 bg-[#fcfdfd]/80 backdrop-blur-sm z-10">
                <div className="p-1.5 rounded-md bg-emerald-600">
                  <Terminal size={14} className="text-white" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900">Protocol.26</span>
              </div>
              
              <motion.div 
                animate={{ x: [0, -1200] }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="flex gap-10 whitespace-nowrap"
              >
                {[...allSkills, ...allSkills].map((skill, i) => (
                  <div key={i} className="flex items-center gap-2.5 group cursor-default">
                    <i 
                      className={`${getIconClass(skill)} text-sm transition-transform group-hover:scale-125`} 
                      style={{ color: BRAND_DATA[skill.toLowerCase()]?.color }} 
                    />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-emerald-600 transition-colors">{skill}</span>
                  </div>
                ))}
              </motion.div>
            </nav>

            {/* 2. COMPACT COLORFUL HERO */}
            <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 pb-14 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                    <Sparkles size={10} className="text-emerald-600" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700">Next-Gen Engineering</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase text-zinc-900">
                    Build <span className="text-emerald-600 italic">Production</span> <br />
                    Grade Systems.
                  </h1>
                </div>

                <p className="text-sm md:text-base text-zinc-600 max-w-md leading-relaxed">
                  Elite tracks designed to move you from syntax to <span className="text-emerald-700 font-bold">system architecture</span>. Deploy your future with industry mentors.
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <button className="h-11 px-8 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center gap-3 group">
                    View Catalog <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 border border-emerald-100 rounded-full bg-white/50 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-black uppercase text-emerald-800">Enrollment Active</span>
                  </div>
                </div>
              </div>

              {/* Visual Side: Framed Image */}
              <div className="lg:col-span-5">
                <div className="relative p-2 rounded-[2rem] bg-gradient-to-br from-emerald-100 to-blue-50 border border-white shadow-xl">
                  <div className="aspect-[16/11] rounded-[1.5rem] overflow-hidden bg-white relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                      alt="Tech Engineering" 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply" />
                    
                    <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white flex items-center gap-3 shadow-sm">
                      <div className="p-2 bg-emerald-600 rounded-lg">
                        <Shield size={14} className="text-white" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase text-zinc-900 leading-tight">ISO Certified</div>
                        <div className="text-[8px] font-bold text-zinc-500 uppercase">Training Standards</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* 3. TRACKS SECTION */}
            <div className="space-y-8 pb-20">
              <div className="flex items-center gap-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-800 shrink-0 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">Catalog.2026</h2>
                <div className="h-[1px] w-full bg-gradient-to-r from-emerald-100 to-transparent" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {catalogItems.map((item) => (
                  <CourseCard 
                    key={item.stack} 
                    {...item} 
                    onSelect={(stack) => setSelectedStack(stack)} 
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <InternshipPrograms
            initialStack={selectedStack}
            onBack={() => setSelectedStack(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgramsMainPage;