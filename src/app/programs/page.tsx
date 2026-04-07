"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  BarChart3,
  BrainCircuit,
  Cpu,
  Code2,
  LayoutGrid,
  ArrowRight,
  BookOpen,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Video,
  Mic2,
  ArrowUpRight,
  Sparkles,
  Quote,
  Star,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { programData, type Duration, type TechStack } from "@/lib/program-data";
import { useRouter } from "next/navigation";

// --- Sub-Component: TechLogo ---
const TechLogo = ({ name }: { name: string }) => {
  const key = name.toLowerCase();
  const brandColors: Record<string, string> = {
    html5: "#E34F26",
    css3: "#1572B6",
    javascript: "#F7DF1E",
    typescript: "#3178C6",
    react: "#61DAFB",
    node: "#339933",
    mongodb: "#47A248",
    postgresql: "#4169E1",
    github: "#181717",
    excel: "#217346",
    powerbi: "#F2C811",
    python: "#3776AB",
    tensorflow: "#FF6F00",
    pytorch: "#EE4C2C",
    arduino: "#00979D",
    stm32: "#03234B",
    esp32: "#E7352C",
    c: "#A8B9CC",
    java: "#ED8B00",
  };
  const iconColor = brandColors[key] || "#64748b";

  if (key === "excel" || key === "pandas") return <Table color={iconColor} size={18} />;
  if (key === "powerbi") return <BarChart3 color={iconColor} size={18} />;
  if (key === "tensorflow" || key === "pytorch") return <BrainCircuit color={iconColor} size={18} />;
  if (key === "arduino" || key === "stm32") return <Cpu color={iconColor} size={18} />;

  const deviconMapping: Record<string, string> = {
    html5: "devicon-html5-plain",
    css3: "devicon-css3-plain",
    javascript: "devicon-javascript-plain",
    typescript: "devicon-typescript-plain",
    react: "devicon-react-original",
    node: "devicon-nodejs-plain",
    python: "devicon-python-plain",
    java: "devicon-java-plain",
    github: "devicon-github-original",
  };

  return (
    <i
      className={`${deviconMapping[key] || "devicon-github-original"} text-3xl`}
      style={{ color: iconColor }}
    />
  );
};

const InternshipPrograms = () => {
  const router = useRouter();
  const [activeStack, setActiveStack] = useState<TechStack>("Python");
  const [activeDuration, setActiveDuration] = useState<Duration>("1 Week");
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        setIsLoggedIn(res.ok);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleApply = () => {
    if (isLoggedIn) {
      router.push(`/apply?track=${activeStack}&duration=${activeDuration}`);
    } else {
      // Redirect to login and save the current path as a callback
      router.push(`/login?callback=/programs/details?track=${activeStack}`);
    }
  };

  const stacks: TechStack[] = ["MERN", "Java", "Python", "DataAnalytics", "DataScienceAI", "Embedded"];
  const durations: Duration[] = ["1 Week", "2 Weeks", "1 Month", "3 Months"];
  const current = programData[activeStack]?.[activeDuration];

  if (!current) return <div className="p-20 text-center italic text-zinc-400 animate-pulse">Syncing track...</div>;

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-emerald-100">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full py-20 overflow-hidden border-b border-zinc-100 bg-zinc-50/50">
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Stack Selection - Zoom Optimized */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {stacks.map((s) => {
              const isActive = activeStack === s;
              return (
                <motion.button
                  key={s}
                  onClick={() => setActiveStack(s)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "relative px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 border",
                    isActive 
                      ? "text-white border-zinc-900 shadow-xl" 
                      : "bg-white text-zinc-400 border-zinc-200 hover:border-zinc-400"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-stack-pill"
                      className="absolute inset-0 bg-zinc-900 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{s}</span>
                </motion.button>
              );
            })}
          </div>

          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-zinc-900 mb-6 font-serif">
            {current.title} <span className="text-emerald-600">Track</span>
          </h1>

          <div className="inline-flex gap-1 p-1.5 bg-white rounded-2xl border border-zinc-200 shadow-2xl mx-auto">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDuration(d)}
                className={cn(
                  "relative px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all z-10",
                  activeDuration === d ? "text-white" : "text-zinc-400 hover:text-zinc-600"
                )}
              >
                {activeDuration === d && (
                  <motion.div layoutId="durTab" className="absolute inset-0 bg-[#fb8500] rounded-xl -z-10" />
                )}
                {d}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-16">
          
          {/* SYLLABUS SECTION */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <LayoutGrid className="w-6 h-6 text-emerald-500" /> Technical Roadmap
              </h2>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">
                {current.syllabus.length} Modules
              </span>
            </div>

            <div className="border border-zinc-200 rounded-[2.5rem] overflow-hidden bg-white shadow-xl shadow-zinc-200/20">
              <button 
                onClick={() => setIsSyllabusOpen(!isSyllabusOpen)} 
                className="w-full p-8 flex justify-between items-center hover:bg-zinc-50/80 transition-colors group"
              >
                <div className="flex items-center gap-5">
                  <motion.div 
                    animate={{ rotate: isSyllabusOpen ? 360 : 0 }}
                    className={cn(
                      "p-4 rounded-2xl transition-all duration-500", 
                      isSyllabusOpen ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "bg-zinc-100 text-zinc-400"
                    )}
                  >
                    <BookOpen className="w-6 h-6" />
                  </motion.div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-zinc-900">Detailed {activeDuration} Syllabus</h3>
                    <p className="text-sm text-zinc-500">Click to expand curriculum details</p>
                  </div>
                </div>
                <div className={cn("p-2 rounded-full border border-zinc-100 transition-colors", isSyllabusOpen && "bg-emerald-50 border-emerald-200")}>
                  <ChevronDown className={cn("w-5 h-5 transition-transform duration-500", isSyllabusOpen && "rotate-180 text-emerald-600")} />
                </div>
              </button>

              <AnimatePresence>
                {isSyllabusOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-zinc-50 bg-gradient-to-b from-white to-zinc-50/30"
                  >
                    <div className="p-8 md:p-12 space-y-0 relative">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: 'calc(100% - 100px)' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="absolute left-[40px] md:left-[70px] top-[60px] w-[2px] bg-gradient-to-b from-emerald-500 via-emerald-200 to-transparent z-0" 
                      />

                      {current.syllabus.map((item, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="relative flex gap-8 group pb-12 last:pb-0">
                          <motion.div whileHover={{ scale: 1.2 }} className="w-12 h-12 rounded-2xl border-2 border-white shadow-md flex items-center justify-center text-xs font-black text-zinc-400 group-hover:border-emerald-500 group-hover:text-emerald-600 transition-all z-10 bg-white">
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </motion.div>
                          <div className="flex-1 pt-1">
                            <h4 className="text-lg font-bold text-zinc-800 group-hover:text-emerald-700 transition-colors">{item.title}</h4>
                            <div className="flex gap-3 mt-3 mb-4">{item.tools.map(t => <TechLogo key={t} name={t} />)}</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white/50 p-6 rounded-3xl border border-zinc-100 group-hover:border-emerald-100 transition-all">
                              {item.topics.map((topic, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-zinc-600">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {topic}
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* CAREER TRAINING */}
          <section className="space-y-8 pt-8 border-t border-zinc-100">
            <h2 className="text-2xl font-bold flex items-center gap-3"><Cpu className="w-6 h-6 text-zinc-900" /> Career Training</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group rounded-3xl bg-white border border-zinc-200 p-2 shadow-sm hover:shadow-xl transition-all">
                <div className="h-44 relative rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Technical Sync" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase flex items-center gap-2"><Video className="w-3 h-3 text-emerald-600" /> Industry Sync</div>
                </div>
                <div className="p-6">
                  <h4 className="text-base font-bold text-zinc-900">Industry Expert Sync</h4>
                  <p className="text-xs text-zinc-400 italic mt-1">Direct reviews with Senior FAANG SDEs.</p>
                </div>
              </div>
              <div className="group rounded-3xl bg-zinc-900 p-8 text-white relative overflow-hidden flex flex-col justify-between h-64 border border-zinc-800 shadow-2xl">
                <div>
                  <Mic2 className="w-10 h-10 text-emerald-400 mb-6" />
                  <h4 className="text-lg font-bold italic uppercase">Communication Lab</h4>
                  <p className="text-xs text-zinc-400 mt-2">Mastering technical storytelling & PR etiquette.</p>
                </div>
                <button className="w-full py-3.5 rounded-xl bg-white text-zinc-950 font-black text-[9px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-lg">
                  Review Modules <ArrowUpRight className="w-3 h-3 inline ml-1" />
                </button>
              </div>
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section className="space-y-8 pt-8 border-t border-zinc-100">
            <h2 className="text-2xl font-bold flex items-center gap-3"><Code2 className="w-6 h-6 text-zinc-900" /> Student Builds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {current.projects.map((proj) => (
                <div key={proj.title} className="group bg-white rounded-[2rem] border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  <div className="h-48 overflow-hidden relative">
                    <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-zinc-900">{proj.title}</h4>
                      <div className="flex gap-2 mt-2">
                        {proj.tech.map((t) => (
                          <span key={t} className="text-[8px] font-black uppercase tracking-widest text-zinc-400 border border-zinc-100 px-2 py-0.5 rounded-md">{t}</span>
                        ))}
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-zinc-300 group-hover:text-emerald-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* REVIEWS SECTION */}
          <section className="space-y-8 pt-8 border-t border-zinc-100">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" /> Student Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {current.reviews.map((rev, i) => (
                <div key={i} className="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 relative group hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <Quote className="absolute top-6 right-8 w-8 h-8 text-zinc-200 group-hover:text-emerald-100 transition-colors" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-600 mb-6 italic">"{rev.text}"</p>
                  <div>
                    <h5 className="font-bold text-zinc-900">{rev.name}</h5>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{rev.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 3. SIDEBAR */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-10 border border-blue-100 shadow-2xl shadow-blue-500/10 relative overflow-hidden text-center group">
              <Sparkles className="w-10 h-10 text-blue-600 mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold mb-2 tracking-tight">The future is <span className="text-blue-600">code</span></h3>
              <p className="text-sm text-zinc-400 mb-8 italic">"Build something that outlasts you."</p>
              
              <button
                onClick={handleApply}
                disabled={isLoggedIn === null}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoggedIn === null ? "Checking Status..." : <>Apply for {activeStack} <ArrowRight className="w-4 h-4" /></>}
              </button>

              <div className="mt-8 py-3 px-4 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-center gap-2">
                <Users className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Only 8/20 seats left</span>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl group-hover:scale-150 transition-transform" />
            </div>
            
            <div className="p-8 rounded-[2rem] bg-zinc-900 text-white flex items-center gap-5 shadow-2xl border border-zinc-800">
              <div className="p-3 bg-white/10 rounded-2xl"><ShieldCheck className="w-6 h-6 text-emerald-400" /></div>
              <div>
                <h5 className="text-sm font-bold tracking-tight">Verified Training</h5>
                <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest mt-1">LinkedIn Credential</p>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="py-16 border-t border-zinc-100 text-center bg-zinc-50/30">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 italic">Inetz Academy • Technical Residency Portal • 2026</p>
      </footer>
    </div>
  );
};

export default InternshipPrograms;