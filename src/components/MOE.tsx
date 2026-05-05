"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Network, ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const SLIDER_SLIDES = [
  {
    url: "ex1.jpeg",
    title: "Infrastructure of Excellence",
    desc: "We invest directly into college ecosystems, building the physical and digital labs necessary for elite engineering.",
    tag: "Labs & Facilities",
  },
  {
    url: "ex2.jpeg",
    title: "Collaborative Learning Hubs",
    desc: "Dedicated workspace designed for peer interaction and hands-on project development.",
    tag: "Campus Design",
  },
  {
    url: "office.jpg",
    title: "Corporate Simulation Centers",
    desc: "Bringing the corporate environment to campus, familiarizing students with real industry workflows.",
    tag: "Industry Integration",
  },
] as const;

const PARTNERS = [
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
  "SSN College of Engineering",
];

const PARTNER_LIST = [...PARTNERS, ...PARTNERS, ...PARTNERS];

// UPDATED THEME: White Cards with Dark Text
const SECTION_STYLE: React.CSSProperties = { background: "#130746" }; // Section stays Navy
const EMERALD_ACCENT: React.CSSProperties = { color: "#10b981" };
const CARD_BG = "#ffffff"; // Card background changed to White
const TEXT_DARK = "#1e293b"; // Dark slate for primary text
const TEXT_MUTED_DARK = "#64748b"; // Lighter slate for muted text

const PARTNER_SCRIM_TOP: React.CSSProperties = {
  top: "46px", height: "24px",
  background: `linear-gradient(to bottom, ${CARD_BG}, transparent)`,
};
const PARTNER_SCRIM_BOT: React.CSSProperties = {
  height: "52px",
  background: `linear-gradient(to top, ${CARD_BG}, transparent)`,
};
// Increased overlay darkness slightly to ensure white text is readable over white cards/images
const SLIDE_SCRIM: React.CSSProperties = {
  background: "linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.4) 60%, transparent 100%)",
};

// ─── Shared primitives ──────────────────────────────────────────────────────────

function PulseDot() {
  return <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />;
}

function EmBadge({ icon: Icon, label }: { icon?: React.ElementType; label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-emerald-400 text-[11px] font-bold uppercase tracking-widest"
      style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {label}
    </div>
  );
}

function CardShell({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("rounded-2xl overflow-hidden shadow-2xl", className)}
      style={{ background: CARD_BG, border: "1px solid rgba(0,0,0,0.05)", ...style }}
    >
      {children}
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────────

export function MOESection() {
  const [slide, setSlide] = useState(0);
  const total = SLIDER_SLIDES.length;
  const prev = useCallback(() => setSlide((s) => (s - 1 + total) % total), [total]);
  const next = useCallback(() => setSlide((s) => (s + 1) % total), [total]);

  return (
    <Section className="relative py-20 overflow-hidden" style={SECTION_STYLE} maxWidth="xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 w-full">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <EmBadge icon={Network} label="Institutional Network" />

          <h2 className="mt-4 mb-3 text-[28px] sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Strategic MOE &{" "}
            <span style={EMERALD_ACCENT}>Academic Partners</span>
          </h2>

          <p style={{ color: "#94a3b8" }} className="max-w-[480px] mx-auto text-sm leading-relaxed font-medium">
            Our Memorandum of Engagement embeds industry-standard curriculum
            directly on campus — transforming theoretical foundations into
            industrial mastery.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* LEFT: Image Slider */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.48 }}
            >
              <CardShell className="group relative h-[300px] sm:h-[340px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.42 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={SLIDER_SLIDES[slide].url}
                      alt={SLIDER_SLIDES[slide].title}
                      className="w-full h-full object-cover"
                    />
                    {/* Darker scrim is used here specifically to ensure White Text is readable over images */}
                    <div className="absolute inset-0 pointer-events-none" style={SLIDE_SCRIM} />
                  </motion.div>
                </AnimatePresence>

                <div
                  className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                  style={{
                    background: "rgba(15,23,42,0.85)",
                    border: "1px solid rgba(16,185,129,0.4)",
                    color: "#ffffff",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {SLIDER_SLIDES[slide].tag}
                </div>

                <div className="absolute top-4 right-4 z-20 flex gap-1.5">
                  {SLIDER_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      className={cn(
                        "h-[3px] rounded-full transition-all duration-300",
                        i === slide ? "w-6 bg-emerald-400" : "w-[6px] bg-white/40"
                      )}
                    />
                  ))}
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <motion.h3
                    key={slide + "h"}
                    className="text-lg font-bold text-white mb-1.5 tracking-tight"
                  >
                    {SLIDER_SLIDES[slide].title}
                  </motion.h3>
                  <motion.p
                    key={slide + "p"}
                    className="text-sm leading-relaxed max-w-sm font-medium"
                    style={{ color: "#e2e8f0" }}
                  >
                    {SLIDER_SLIDES[slide].desc}
                  </motion.p>
                </div>

                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-30 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  {[prev, next].map((fn, i) => (
                    <button
                      key={i}
                      onClick={fn}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-slate-900 text-xl font-bold bg-white/90 backdrop-blur-md shadow-lg transition-transform active:scale-90"
                    >
                      {i === 0 ? "‹" : "›"}
                    </button>
                  ))}
                </div>
              </CardShell>
            </motion.div>
          </div>

          {/* RIGHT: List Scroller */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.48 }}
            >
              <CardShell className="relative" style={{ height: "340px" }}>
                <div
                  className="flex items-center justify-between px-6 py-4 relative z-20"
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: CARD_BG }}
                >
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: TEXT_DARK }}>
                    Active MOU Partners
                  </span>
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-600"
                    style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
                  >
                    <PulseDot /> 50+ Links
                  </div>
                </div>

                {/* Fade masks now use White to match the Card background */}
                <div className="absolute z-10 left-0 right-0 pointer-events-none" style={PARTNER_SCRIM_TOP} />
                <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none" style={PARTNER_SCRIM_BOT} />

                <div className="absolute inset-x-0 bottom-0 overflow-hidden group/scroller" style={{ top: "54px" }}>
                  <div className="pt-2 pb-20 animate-[scrollV_34s_linear_infinite] group-hover/scroller:[animation-play-state:paused]">
                    {PARTNER_LIST.map((name, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 px-6 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors"
                      >
                        <Building2 className="w-4 h-4 shrink-0 text-[#10b981]" />
                        <span className="text-sm font-semibold" style={{ color: TEXT_DARK }}>
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardShell>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollV {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-33.33%); }
        }
      `}</style>
    </Section>
  );
}