"use client";

import React, { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu, Code2, LayoutGrid, ArrowRight, CheckCircle2, Video, 
  Mic2, ArrowUpRight, Sparkles, Quote, Star, Users, ArrowLeft, X, Download, Lock,
  UserCheck,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { programData, type Duration, type TechStack } from "@/lib/program-data";
import { useRouter } from "next/navigation";
import ProgramCard from "./ProgramCard";
import { BRAND_DATA, getIconClass } from "../../lib/Tech-utils";

/**
 * OPTIMIZED: Memoized TechLogo
 */
const TechLogo = memo(({ name }: { name: string }) => {
  const key = name.toLowerCase();
  const brand = BRAND_DATA[key];
  return (
    <i 
      className={cn(getIconClass(key), "text-2xl transition-transform hover:scale-110")} 
      style={{ color: brand?.color || "#64748b" }} 
    />
  );
});
TechLogo.displayName = "TechLogo";

/**
 * OPTIMIZED: Memoized ReviewCard
 */
const ReviewCard = memo(({ rev }: { rev: any }) => (
  <div className="w-[320px] shrink-0 p-6 rounded-[2rem] bg-zinc-50 border border-zinc-100 relative group hover:bg-white hover:shadow-xl hover:border-emerald-100 transition-all duration-500 will-change-transform">
    <Quote className="absolute top-6 right-8 w-6 h-6 text-zinc-200 group-hover:text-emerald-100 transition-colors" />
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={cn("w-2.5 h-2.5", i < rev.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-200")} />
      ))}
    </div>
    <p className="text-[12px] leading-relaxed text-zinc-600 mb-6 italic line-clamp-3">"{rev.text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-sm">
        {rev.name.charAt(0)}
      </div>
      <div>
        <h5 className="text-[12px] font-bold text-zinc-900 leading-tight">{rev.name}</h5>
        <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{rev.role}</p>
      </div>
    </div>
  </div>
));
ReviewCard.displayName = "ReviewCard";

const InternshipPrograms = ({ initialStack = "Python", onBack }: { initialStack?: TechStack; onBack?: () => void }) => {
  const router = useRouter();
  const [activeStack, setActiveStack] = useState<TechStack>(initialStack);
  const [activeDuration, setActiveDuration] = useState<Duration>("1 Week");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 1. Check Login Status
    fetch("/api/auth/me").then(res => setIsLoggedIn(res.ok)).catch(() => setIsLoggedIn(false));
    
    // 2. Check Local Storage for previous Lead Unlocks
    const localUnlock = localStorage.getItem(`unlocked_${activeStack}`);
    if (localUnlock === "true") setHasUnlocked(true);
  }, [activeStack]);

  const current = useMemo(() => programData[activeStack]?.[activeDuration], [activeStack, activeDuration]);
  const durations: Duration[] = useMemo(() => ["1 Week", "2 Weeks", "1 Month", "3 Months"], []);

  // Logical Gate: User has access if Logged In OR if they've submitted the lead form
  const isSyllabusLocked = useMemo(() => !isLoggedIn && !hasUnlocked, [isLoggedIn, hasUnlocked]);

  const handleApply = () => {
    const applyUrl = `/apply?track=${activeStack}&duration=${activeDuration}`;
    if (isLoggedIn) return router.push(applyUrl);
    router.push(`/login?callback=${encodeURIComponent(applyUrl)}`);
  };

  const handleLeadSubmit = async () => {
    if (!leadForm.name || !leadForm.phone) return alert("Please enter both Name and Phone");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send-lead", {
        method: "POST",
        body: JSON.stringify({ ...leadForm, stack: activeStack }),
      });
      if (res.ok) { 
        setShowDownloadModal(false); 
        setHasUnlocked(true);
        localStorage.setItem(`unlocked_${activeStack}`, "true");
        alert("Syllabus Unlocked!"); 
      }
    } catch { alert("Error sending details."); }
    finally { setIsSubmitting(false); }
  };

  if (!current) return <div className="p-20 text-center text-zinc-400">Syncing track...</div>;

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans relative antialiased">
      {/* 0. NAVIGATION */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <button onClick={onBack || (() => router.back())} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-emerald-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Catalogue
        </button>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative w-full py-16 overflow-hidden border-b border-zinc-100 bg-zinc-50/50">
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6">
            {current.title} <span className="text-emerald-600">Track</span>
          </h1>
          <div className="inline-flex gap-1 p-1 bg-white rounded-xl border border-zinc-200 shadow-xl mx-auto">
            {durations.map((d) => (
              <button key={d} onClick={() => setActiveDuration(d)} className={cn("relative px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all z-10", activeDuration === d ? "text-white" : "text-zinc-400 hover:text-zinc-600")}>
                {activeDuration === d && <motion.div layoutId="durTab" className="absolute inset-0 bg-zinc-900 rounded-lg -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                {d}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-12">
          {/* 2. TECHNICAL ROADMAP (WITH LOCK LOGIC) */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2"><LayoutGrid className="w-5 h-5 text-emerald-500" /> Technical Roadmap</h2>
              <div className="flex gap-2">
                 {isSyllabusLocked && <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 flex items-center gap-1 uppercase tracking-tighter"><Lock size={10} /> Limited Preview</span>}
                 <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full">{current.syllabus.length} Modules</span>
              </div>
            </div>

            <div className="relative border border-zinc-200 rounded-[2rem] bg-white shadow-lg shadow-zinc-200/20 overflow-hidden">
              <div className="p-6 md:p-10 space-y-0 relative">
                <div className="absolute left-[34px] md:left-[65px] top-[50px] w-[1.5px] bg-gradient-to-b from-emerald-500 via-emerald-200 to-transparent h-[calc(100%-100px)] z-0" />
                
                {current.syllabus.map((item, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative flex gap-6 pb-10 last:pb-0">
                    <div className="min-w-[50px] h-10 rounded-xl border-2 border-white shadow-sm flex items-center justify-center text-[9px] font-bold text-zinc-400 z-10 bg-white shrink-0">{item.label}</div>
                    <div className="flex-1 pt-0.5">
                      <h4 className="text-md font-bold text-zinc-800">{item.title}</h4>
                      <div className="flex gap-2.5 mt-2 mb-3">{item.tools.map(t => <TechLogo key={t} name={t} />)}</div>
                      
                      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-2 bg-white/50 p-5 rounded-2xl border border-zinc-100 overflow-hidden">
                        {/* THE GATE: Slice to 3 if locked, otherwise show all */}
                        {(isSyllabusLocked ? item.topics.slice(0, 3) : item.topics).map((topic, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-zinc-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> {topic}
                          </div>
                        ))}

                        {/* BLUR EFFECT & MESSAGE FOR LOCKED STATE */}
                        {isSyllabusLocked && item.topics.length > 3 && (
                          <div className="col-span-full mt-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100 border-dashed flex items-center justify-between">
                             <p className="text-[10px] text-zinc-400 font-medium italic">+ {item.topics.length - 3} advanced topics hidden</p>
                             <button onClick={() => setShowDownloadModal(true)} className="text-[9px] font-bold text-emerald-600 uppercase flex items-center gap-1 hover:underline underline-offset-4">
                               Unlock Full Module <ArrowRight size={10} />
                             </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ACTION FOOTER */}
              <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-2">
                  {isSyllabusLocked ? "Enter contact details to unlock full syllabus" : <><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Syllabus Access Granted</>}
                </p>
                <button 
                  onClick={() => isSyllabusLocked ? setShowDownloadModal(true) : alert("Download starting...")} 
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-all shadow-md",
                    isSyllabusLocked ? "bg-emerald-600 text-white animate-pulse" : "bg-zinc-900 text-white"
                  )}
                >
                  {isSyllabusLocked ? "Unlock Full Roadmap" : "Download PDF"} <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>

          {/* 3. CAREER MASTERY (FIXED COLORS & FULL OVERLAY) */}
<section className="relative py-24 bg-zinc-50/50 dark:bg-transparent px-6">
  <div className="max-w-5xl mx-auto mb-16 text-center md:text-left">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4">
      <Sparkles size={12} /> Career Acceleration
    </div>
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
      Everything to get you <span className="text-blue-600">Job Ready</span>
    </h2>
  </div>

  <div className="relative max-w-5xl mx-auto">
    {[
      {
        title: "Industry Expert Sessions",
        description: "Weekly deep-dives with Senior SDEs from FAANG. Get your code reviewed and architecture critiqued by the best in the industry.",
        icon: <Video className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1591115765373-520b7a217294?auto=format&fit=crop&q=80",
        color: "bg-blue-600",
        tag: "Mentorship"
      },
      {
        title: "Daily Agile Tasks",
        description: "Receive daily tickets on our private dashboard. Submit PRs, handle merge conflicts, and master the professional git workflow.",
        icon: <Briefcase className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
        color: "bg-orange-600",
        tag: "Daily Sprints"
      },
      {
        title: "Mock Interview Series",
        description: "Simulated 1-on-1 interviews with real-time feedback scores. We cover DSA, System Design, and behavioral preparation.",
        icon: <UserCheck className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80", 
        color: "bg-purple-600",
        tag: "Placement"
      },
      {
        title: "Communication Lab",
        description: "Technical storytelling. Learn to explain your logic clearly to recruiters and stakeholders—the bridge between code and career.",
        icon: <Mic2 className="w-5 h-5" />,
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80",
        color: "bg-emerald-600",
        tag: "Soft Skills"
      }
    ].map((feature, idx) => (
      <div 
        key={idx} 
        className="sticky top-28 w-full mb-8 last:mb-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-5% 0px -5% 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "relative w-full h-[320px] md:h-[280px] overflow-hidden rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300"
          )}
        >
          {/* Landscape Image - FULL COLOR */}
          <div className="w-full md:w-[40%] h-32 md:h-full relative overflow-hidden">
            <img 
              src={feature.image} 
              alt={feature.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 bg-white/95 dark:bg-zinc-800/95 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100 shadow-sm border border-white/10 backdrop-blur-sm">
              {feature.tag}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 md:p-10 flex flex-col justify-center relative">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg", feature.color)}>
              {feature.icon}
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
              {feature.title} <ArrowUpRight size={16} className="text-zinc-300" />
            </h3>
            
            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-medium max-w-md">
              {feature.description}
            </p>

            {/* Corner Module Tag */}
            <div className="absolute bottom-6 right-8 select-none">
               <span className="text-4xl md:text-5xl font-black text-zinc-100 dark:text-zinc-800/50 italic tracking-tighter">0{idx + 1}</span>
            </div>
          </div>
        </motion.div>
      </div>
    ))}
  </div>
</section>

          {/* 4. STUDENT BUILDS */}
          <section className="space-y-6 pt-6 border-t border-zinc-100">
            <h2 className="text-xl font-bold flex items-center gap-2"><Code2 className="w-5 h-5" /> Student Builds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {current.projects.map((proj) => (
                <ProgramCard key={proj.title} title={proj.title} description={`Built using ${proj.tech.join(", ")}.`} image={proj.img} badgeText="Live Project" badgeIcon={Code2} />
              ))}
            </div>
          </section>

          {/* 5. MARQUEE REVIEWS */}
          <section className="space-y-8 pt-10 border-t border-zinc-100 overflow-hidden">
            <h2 className="text-xl font-bold px-2 flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> Student Experience</h2>
            <div 
              className="relative flex flex-col gap-6"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
              }}
            >
              <div className="flex overflow-hidden">
                <motion.div animate={{ x: [0, -1035] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex gap-6 shrink-0 will-change-transform">
                  {[...current.reviews, ...current.reviews].map((rev, i) => <ReviewCard key={i} rev={rev} />)}
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        {/* 6. PRICING SIDEBAR */}
        <aside className="lg:col-span-4 sticky top-24 self-start">
          <div className="bg-white rounded-[2rem] p-8 border border-blue-100 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
            <div className="relative z-10 text-center">
              <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-bold mb-1">Start Learning <span className="text-blue-600">Today</span></h3>
              <div className="my-6">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-black">₹{current.price}</span>
                  <span className="text-sm text-zinc-300 line-through">₹{current.originalPrice}</span>
                </div>
                <p className="text-[10px] text-emerald-600 font-bold uppercase mt-1 tracking-widest">Save {Math.round(((current.originalPrice - current.price) / current.originalPrice) * 100)}% Today</p>
              </div>
              <button onClick={handleApply} disabled={isLoggedIn === null} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2">
                {isLoggedIn === null ? "Checking..." : <>Enroll in {activeStack} Track <ArrowRight className="w-3.5 h-3.5" /></>}
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* MODAL SECTION - GATEKEEPER FORM */}
      <AnimatePresence>
        {showDownloadModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDownloadModal(false)} className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-zinc-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
                <button onClick={() => setShowDownloadModal(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <Lock className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Unlock Roadmap</h3>
                  <p className="text-zinc-400 text-sm mb-8">Register your interest to view the complete curriculum and project list.</p>
                  
                  <div className="space-y-4">
                    <input type="text" placeholder="Full Name" value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:border-emerald-500 outline-none transition-colors" />
                    <input type="tel" placeholder="WhatsApp Number" value={leadForm.phone} onChange={e => setLeadForm({...leadForm, phone: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:border-emerald-500 outline-none transition-colors" />
                    <button onClick={handleLeadSubmit} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase mt-4 shadow-xl shadow-emerald-500/10 hover:bg-emerald-400 transition-colors">
                      {isSubmitting ? "Generating Access..." : "Unlock Full Syllabus"}
                    </button>
                  </div>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InternshipPrograms;