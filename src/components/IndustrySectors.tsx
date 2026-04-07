"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, X, Building2, Briefcase, Zap } from "lucide-react";

type Sector = {
  title: string;
  label: string;
  image: string;
  desc: string;
  highlight: string;
  badge: string;
  modalContent: {
    about: string;
    companies: string[];
    surviving: string;
  };
};

const domainMap: Record<string, string> = {
  Google: "google.com", Microsoft: "microsoft.com", Amazon: "amazon.com",
  Atlassian: "atlassian.com", Uber: "uber.com", Meta: "meta.com",
  TCS: "tcs.com", Infosys: "infosys.com", Wipro: "wipro.com",
  Accenture: "accenture.com", Cognizant: "cognizant.com", Capgemini: "capgemini.com",
  OpenAI: "openai.com", Anthropic: "anthropic.com", Palantir: "palantir.com",
  "Mu Sigma": "mu-sigma.com", "Fractal Analytics": "fractal.ai", "Google DeepMind": "deepmind.google",
  Stripe: "stripe.com", Razorpay: "razorpay.com", Cred: "cred.club",
  Zerodha: "zerodha.com", Groww: "groww.in", Postman: "postman.com",
  Intel: "intel.com", Qualcomm: "qualcomm.com", "Texas Instruments": "ti.com",
  Bosch: "bosch.com", NVIDIA: "nvidia.com", Siemens: "siemens.com",
  Ogilvy: "ogilvy.com", GroupM: "groupm.com", Dentsu: "dentsu.com",
  "Publicis Sapient": "publicissapient.com", Performics: "performics.com",
};

const sectors: Sector[] = [
  {
    title: "Product Companies",
    label: "Top-Tier Products",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
    desc: "Work at cutting-edge product-based companies as a Software Developer, building real-world applications at scale.",
    highlight: "500+ alumni placed",
    badge: "Most Placed",
    modalContent: {
      about: "Product companies focus on building software solutions, platforms, and applications that scale to millions of users. The work involves deep problem-solving, system design, and continuous iteration based on user feedback.",
      companies: ["Google", "Microsoft", "Amazon", "Atlassian", "Uber", "Meta"],
      surviving: "Focus heavily on Data Structures & Algorithms, System Design, and writing highly optimized code. You must understand the product lifecycle and user-centric development."
    }
  },
  {
    title: "IT Services & Consulting",
    label: "Enterprise IT",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
    desc: "Join top IT service companies delivering technology solutions across banking, retail, and enterprise clients globally.",
    highlight: "Leading MNC placements",
    badge: "High Demand",
    modalContent: {
      about: "IT Services and Consulting firms provide technology solutions to other businesses. They handle diverse, large-scale projects across domains including banking, healthcare, automotive, and retail.",
      companies: ["TCS", "Infosys", "Wipro", "Accenture", "Cognizant", "Capgemini"],
      surviving: "Adaptability is key. You must be willing to learn new tech stacks quickly as client projects demand. Strong communication skills and client-facing acumen will massively accelerate your growth."
    }
  },
  {
    title: "AI & Data Science",
    label: "Future of Tech",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1000",
    desc: "Step into the fast-growing AI, ML and Data Analytics space. Work on real datasets and intelligent systems.",
    highlight: "Highest salary bracket",
    badge: "Trending",
    modalContent: {
      about: "This rapidly growing industry leverages vast amounts of data to predict trends, build generative ML models, and automate complex decision-making processes.",
      companies: ["OpenAI", "Anthropic", "Palantir", "Mu Sigma", "Fractal Analytics", "Google DeepMind"],
      surviving: "A strong mathematical foundation in statistics and linear algebra is crucial along with Python mastery. Keep up with rapidly evolving research papers and master frameworks like PyTorch and TensorFlow."
    }
  },
  {
    title: "Startups & FinTech",
    label: "Fast Growth",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1000",
    desc: "Accelerate your career at innovative startups and fintech companies where you own features end-to-end from day one.",
    highlight: "Equity & growth roles",
    badge: "Hot Sector",
    modalContent: {
      about: "Startups and FinTechs operate at blistering speeds. You will wear multiple hats, push code to production daily, and work directly with founders to disrupt traditional markets.",
      companies: ["Stripe", "Razorpay", "Cred", "Zerodha", "Groww", "Postman"],
      surviving: "Extreme ownership is required. You cannot be just a 'frontend' or 'backend' dev; you must be a product engineer. Move fast, break things, and fix them faster."
    }
  },
  {
    title: "Embedded & IoT",
    label: "Hardware Meets Code",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    desc: "Build the future of smart devices. Work on microcontrollers, real-time systems, and industrial IoT applications.",
    highlight: "Niche, high-demand roles",
    badge: "Specialized",
    modalContent: {
      about: "This sector involves programming hardware directly. From consumer smart appliances to industrial robotics, you will work at the intersection of electronics and software.",
      companies: ["Intel", "Qualcomm", "Texas Instruments", "Bosch", "NVIDIA", "Siemens"],
      surviving: "Master C, C++, and Rust. Understand memory management intrinsically. Embedded systems have strict resource constraints, so optimized, bug-free code is non-negotiable."
    }
  },
  {
    title: "Digital Marketing",
    label: "Brand & Growth",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    desc: "Drive digital strategy, SEO, paid media, and analytics for leading brands across industries.",
    highlight: "Creative + technical roles",
    badge: "Cross-Industry",
    modalContent: {
      about: "Digital Marketing companies scale user acquisition and brand presence using data-driven advertising, content strategies, and growth hacking.",
      companies: ["Ogilvy", "GroupM", "Dentsu", "Publicis Sapient", "Performics"],
      surviving: "Understand the metrics: CAC, LTV, ROAS. Combine creative copywriting with hardcore data analytics. Master tools like Google Analytics, Meta Ads, and SEO platforms."
    }
  },
];

export default function IndustrySectors() {
  const [active, setActive] = useState<number | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<Sector | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -380 : 380,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 py-24 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col gap-6 mb-14">
          {/* Centered Badge + Heading */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
              Where Our Alumni Work
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100 mb-4">
              Industry Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">Global Sectors</span>
            </h2>
          </div>

          {/* Description + Nav Buttons row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-zinc-600 dark:text-zinc-400 text-lg font-medium max-w-2xl">
              Select any sector card to explore career opportunities our graduates have seized across the tech ecosystem.
            </p>
            <div className="flex gap-4 shrink-0">
              <button
                onClick={() => scroll("left")}
                className="h-12 w-12 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-emerald-500 transition-all text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="h-12 w-12 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-emerald-500 transition-all text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 shadow-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Cards */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar"
        >
          {sectors.map((sector, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={i}
                layout
                onClick={() => setActive(isActive ? null : i)}
                animate={{ width: isActive ? 520 : 300, minWidth: isActive ? 520 : 300 }}
                transition={{ type: "spring", stiffness: 280, damping: 30 }}
                className="relative rounded-[2rem] overflow-hidden cursor-pointer snap-start shrink-0 select-none group"
                style={{ height: 450 }}
              >
                {/* Background Image */}
                <img
                  src={sector.image}
                  alt={sector.title}
                  draggable={false}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isActive ? "scale-110" : "group-hover:scale-105"}`}
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                {/* Badge top-left */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest">
                    {sector.badge}
                  </span>
                </div>

                {/* Collapsed state — label at bottom */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-0 left-0 right-0 p-7 pointer-events-none"
                    >
                      <p className="text-white/55 text-[10px] font-bold uppercase tracking-widest mb-2">
                        {sector.label}
                      </p>
                      <h3 className="text-white font-bold text-2xl leading-snug">
                        {sector.title}
                      </h3>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded state — rich content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-4"
                    >
                      <span className="text-white/55 text-[10px] font-bold uppercase tracking-widest">
                        {sector.label}
                      </span>
                      <h3 className="text-white font-black text-3xl leading-tight">
                        {sector.title}
                      </h3>
                      <p className="text-white/75 text-sm leading-relaxed max-w-sm">
                        {sector.desc}
                      </p>
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-emerald-400 text-xs font-bold">
                          ✦ {sector.highlight}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndustry(sector);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 backdrop-blur text-white text-xs font-bold hover:bg-emerald-500 transition-colors"
                        >
                          Explore <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Explore Strategy Modal */}
      <AnimatePresence>
        {selectedIndustry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedIndustry(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-8 md:p-12 hide-scrollbar"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedIndustry(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition-colors shadow-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest mb-6">
                {selectedIndustry.label}
              </div>
              <h3 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight">
                {selectedIndustry.title}
              </h3>

              <div className="space-y-8 mt-10">
                {/* About Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white">About the Industry</h4>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                    {selectedIndustry.modalContent.about}
                  </p>
                </div>

                {/* Companies */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white">Top Companies</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedIndustry.modalContent.companies.map((company, i) => {
                      const domain = domainMap[company];
                      return (
                        <span key={i} className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 rounded-xl font-semibold text-sm shadow-sm transition-transform hover:scale-105 cursor-default">
                          {domain ? (
                            <img src={`https://logo.clearbit.com/${domain}?size=60`} alt={company} className="w-5 h-5 rounded object-contain bg-white" onError={(e) => (e.currentTarget.style.display = 'none')} />
                          ) : (
                            <span className="w-5 h-5 rounded bg-emerald-500/10 flex items-center justify-center text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{company[0]}</span>
                          )}
                          {company}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Surviving / Succeeding */}
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-emerald-600/20 dark:fill-emerald-400/20" />
                    <h4 className="text-xl font-bold text-emerald-800 dark:text-emerald-400">How to Survive & Succeed</h4>
                  </div>
                  <p className="text-emerald-950/80 dark:text-zinc-300 leading-relaxed">
                    {selectedIndustry.modalContent.surviving}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
