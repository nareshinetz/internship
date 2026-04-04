"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Award, 
  BookOpen, 
  Rocket, 
  CheckCircle2, 
  Code2, 
  Laptop, 
  Sparkles,
  Star,
  Quote,
  ArrowRight,
  MonitorPlay
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Counter } from "@/components/ui/Counter";

export default function AboutPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Curriculum",
      desc: "Stay ahead with our up-to-date and industry-relevant courses designed by tech veterans.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      timelineConfig: {
        dotBorder: "border-emerald-400",
        dotShadow: "shadow-[0_0_20px_rgba(52,211,153,0.6)]",
        lineBorder: "border-emerald-500/40",
        hoverBorder: "hover:border-emerald-500/50",
        groupHoverBorder: "group-hover:border-emerald-500/30",
        groupHoverShadow: "group-hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]",
        textColor: "text-emerald-600 dark:text-emerald-400",
        groupHoverText: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
        hoverGlow: "from-emerald-500/5",
      }
    },
    {
      icon: Users,
      title: "Experienced Instructors",
      desc: "Learn from seasoned professionals who bring real-world experience and professional advice.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      timelineConfig: {
        dotBorder: "border-blue-400",
        dotShadow: "shadow-[0_0_20px_rgba(59,130,246,0.6)]",
        lineBorder: "border-blue-500/40",
        hoverBorder: "hover:border-blue-500/50",
        groupHoverBorder: "group-hover:border-blue-500/30",
        groupHoverShadow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
        textColor: "text-blue-600 dark:text-blue-400",
        groupHoverText: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
        hoverGlow: "from-blue-500/5",
      }
    },
    {
      icon: Laptop,
      title: "Flexible Learning",
      desc: "Convenience of both online and offline classes tailored to fit your professional schedule.",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      timelineConfig: {
        dotBorder: "border-purple-400",
        dotShadow: "shadow-[0_0_20px_rgba(168,85,247,0.6)]",
        lineBorder: "border-purple-500/40",
        hoverBorder: "hover:border-purple-500/50",
        groupHoverBorder: "group-hover:border-purple-500/30",
        groupHoverShadow: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
        textColor: "text-purple-600 dark:text-purple-400",
        groupHoverText: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
        hoverGlow: "from-purple-500/5",
      }
    },
    {
      icon: Code2,
      title: "Real World Projects",
      desc: "Gain hands-on experience with 5 mini applications and 2 major industrial applications.",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      timelineConfig: {
        dotBorder: "border-orange-400",
        dotShadow: "shadow-[0_0_20px_rgba(249,115,22,0.6)]",
        lineBorder: "border-orange-500/40",
        hoverBorder: "hover:border-orange-500/50",
        groupHoverBorder: "group-hover:border-orange-500/30",
        groupHoverShadow: "group-hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]",
        textColor: "text-orange-600 dark:text-orange-400",
        groupHoverText: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
        hoverGlow: "from-orange-500/5",
      }
    },
    {
      icon: Rocket,
      title: "Career Support",
      desc: "Dedicated services including professional resume building and intensive job placement assistance.",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      timelineConfig: {
        dotBorder: "border-rose-400",
        dotShadow: "shadow-[0_0_20px_rgba(244,63,94,0.6)]",
        lineBorder: "border-rose-500/40",
        hoverBorder: "hover:border-rose-500/50",
        groupHoverBorder: "group-hover:border-rose-500/30",
        groupHoverShadow: "group-hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]",
        textColor: "text-rose-600 dark:text-rose-400",
        groupHoverText: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
        hoverGlow: "from-rose-500/5",
      }
    },
    {
      icon: Sparkles,
      title: "Placement Assistance",
      desc: "Personalized guidance ensuring you find the perfect job fit in top tier IT companies.",
      color: "text-teal-500",
      bg: "bg-teal-500/10",
      timelineConfig: {
        dotBorder: "border-teal-400",
        dotShadow: "shadow-[0_0_20px_rgba(20,184,166,0.6)]",
        lineBorder: "border-teal-500/40",
        hoverBorder: "hover:border-teal-500/50",
        groupHoverBorder: "group-hover:border-teal-500/30",
        groupHoverShadow: "group-hover:shadow-[0_0_20px_rgba(20,184,166,0.15)]",
        textColor: "text-teal-600 dark:text-teal-400",
        groupHoverText: "group-hover:text-teal-600 dark:group-hover:text-teal-400",
        hoverGlow: "from-teal-500/5",
      }
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-950">
      {/* Hero Section with Fixed Parallax Background */}
      <section 
        className="relative pt-32 pb-40 md:pt-20 md:pb-56 flex items-center justify-center overflow-hidden bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000')" }}
      >
        {/* Adaptive overlay: Lighter wash to let the bright image shine through and look much brighter */}
        {/* <div className="absolute inset-0 bg-white/10 dark:bg-zinc-950/70" /> */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 via-transparent to-transparent" /> */}
        
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-sm dark:shadow-lg"
          >
            Our Mission
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-white mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] dark:drop-shadow-xl"
          >
            The Gold Standard in <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">Software Training</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            Empower your career with Chennai's premier software training edtech company. 
            Join 5000+ professionals who transformed their future with Inetz Technologies.
          </motion.p>
        </div>
      </section>

      {/* Premium Overlapping Stats Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-20 -mt-24 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 md:p-10 rounded-[2.5rem] bg-white/75 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/50 dark:border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none" />
          {[
            { label: "Students Placed", val: 500, suffix: "+" },
            { label: "Successful Alumni", val: 5000, suffix: "+" },
            { label: "Project Focus", val: 100, suffix: "%" },
            { label: "Trust Score", val: 4.9, suffix: "/5" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 relative z-10 hover:scale-105 transition-transform">
              <div className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-orange-500 mb-2 drop-shadow-sm">
                {typeof stat.val === 'number' && i < 3 ? (
                  <Counter to={stat.val} />
                ) : (
                  stat.val
                )}
                {stat.suffix}
              </div>
              <div className="text-sm font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Problem vs Solution Comparison Section */}
      <Section className="py-24 bg-white dark:bg-[#09090b] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            
            {/* The Problem (Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-[2.5rem] bg-rose-50/50 dark:bg-zinc-950/80 border border-rose-100 dark:border-rose-900/20 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rose-500/5 to-transparent pointer-events-none" />
              
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-widest mb-8 relative z-10">
                Why Most Students Struggle
              </div>
              
              <h3 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl text-zinc-900 dark:text-zinc-100 mb-10 relative z-10 flex flex-col gap-2">
                Courses alone are <span className="text-rose-600 dark:text-rose-400 font-bold">not enough.</span>
              </h3>
              
              <div className="space-y-4 relative z-10">
                {[
                  "They keep learning theory without building anything.",
                  "They finish classes but still cannot explain a project confidently.",
                  "They attend interviews without practical exposure.",
                  "They know concepts, but they lack execution and confidence."
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/60 dark:bg-zinc-900/40 border border-rose-100/50 dark:border-zinc-800/50 hover:border-rose-300 dark:hover:border-rose-900/50 transition-colors backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0 shadow-[0_0_10px_rgba(244,63,94,0.6)]" />
                    <p className="text-zinc-700 dark:text-zinc-300 font-medium text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* The Solution (Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-[2.5rem] bg-zinc-900 dark:bg-zinc-950/80 border border-zinc-800 dark:border-emerald-900/20 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-emerald-500/10 to-transparent pointer-events-none" />
              
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8 relative z-10 backdrop-blur-sm">
                How iNetz Solves It
              </div>
              
              <h3 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl text-white mb-10 relative z-10 flex flex-col gap-2">
                A real internship <span className="text-emerald-400 font-bold">training system.</span>
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                {[
                  "Task-based learning from Day 1",
                  "Real-time hands-on practice",
                  "Mini to major project development",
                  "Code review and mentor feedback",
                  "Communication and mock interview support",
                  "Internship certificate on completion"
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-zinc-800/40 dark:bg-zinc-900/40 border border-zinc-700/50 dark:border-zinc-800/50 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:bg-zinc-800 dark:hover:bg-zinc-900 transition-all flex flex-col justify-center gap-3 group/card cursor-default backdrop-blur-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 group-hover/card:text-emerald-400 transition-colors" />
                    <p className="text-zinc-300 font-medium text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </Section>

      {/* Premium Main Philosophy */}
      <Section className="bg-zinc-50 dark:bg-[#09090b] py-32 transition-colors relative overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-white/[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />
        
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center max-w-7xl mx-auto relative z-10 px-4 md:px-8">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 w-fit">
              The Inetz Advantage
            </div>
            
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100 mb-8">
              Why Inetz Technologies <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">Stands Apart</span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-12 leading-relaxed max-w-lg font-medium">
              Our well-regarded edtech program aims to prepare you for the workforce. 
              Give yourself the advantage of industry-relevant training and professional 
              advice to become a professional who is ready for a job.
            </p>
            
            <div className="space-y-6">
              {[
                "Real-time experts as trainers",
                "Practice on real-time projects",
                "Affordable fees & EMI options",
                "Dedicated career services team"
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <div className="h-12 w-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all shadow-sm group-hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-bold text-zinc-700 dark:text-zinc-300 text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right Side Cards */}
          <div className="grid sm:grid-cols-2 gap-6 relative mt-12 lg:mt-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/10 blur-[100px] pointer-events-none -z-10" />
            {features.slice(0, 4).map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={i % 2 === 1 ? "sm:translate-y-12" : ""}
              >
                <div className="group h-full p-8 rounded-3xl bg-white dark:bg-zinc-950/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-2xl hover:-translate-y-2 hover:border-emerald-500/50 hover:shadow-[0_20px_40px_rgba(52,211,153,0.15)] transition-all duration-300">
                  <div className={`h-16 w-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 border border-transparent group-hover:border-emerald-500/30 transition-all group-hover:scale-110`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h4 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-orange-500 transition-colors">{feature.title}</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Visual Break / Parallax Interstitial Banner */}
      <section 
        className="w-full h-[400px] md:h-[500px] bg-fixed bg-center bg-cover relative"
        style={{ backgroundImage: "url('/ex2.jpeg')" }}
      >
        {/* Subtle shadow fades around the vertical edges so it blends beautifully without obscuring the image */}
        {/* <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-zinc-50 dark:from-zinc-900/50 to-transparent opacity-80" /> */}
        {/* <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent opacity-80" /> */}
      </section>

      {/* Values Timeline Layout */}
      <Section className="py-24 relative bg-zinc-50 dark:bg-zinc-950 overflow-hidden isolate">
        {/* Deep Background Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="text-center mb-24 relative z-10">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100 mb-6">Master Every Skill</h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm leading-6">The gold standard in tech education and aspiring developer growth. Follow our proven blueprint.</p>
        </div>
        
        <div className="relative max-w-5xl mx-auto z-10 flex flex-col gap-16 md:gap-8">
          {/* Central Vertical Glowing Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent md:-translate-x-1/2 pointer-events-none" />

          {features.map((feature, i) => {
            const isEven = i % 2 === 0;
            const t = feature.timelineConfig;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isEven ? -40 : 40, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="relative flex flex-col md:flex-row md:items-center w-full min-h-[140px]"
              >
                {/* Glowing Dot on the timeline */}
                <div className={`absolute left-6 md:left-1/2 top-8 md:top-1/2 w-4 h-4 rounded-full bg-zinc-950 border-[2px] ${t.dotBorder} transform -translate-x-[7px] md:-translate-x-1/2 md:-translate-y-1/2 z-20 ${t.dotShadow}`} />
                
                {isEven ? (
                  <>
                    {/* Left side Card (Desktop) / Full width Mobile */}
                    <div className="w-full md:w-[45%] pl-16 md:pl-0 z-10 box-border md:pr-6">
                      <div className={`group relative p-6 md:p-8 rounded-[1.5rem] bg-white dark:bg-zinc-950/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-xl ${t.hoverBorder} transition-all duration-300`}>
                        {/* Hover glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${t.hoverGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem] pointer-events-none`} />
                        
                        <div className="flex items-start gap-5 relative z-10">
                          {/* Number box mimicking image */}
                          <div className={`shrink-0 w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center ${t.groupHoverBorder} ${t.groupHoverShadow} transition-all`}>
                            <span className={`text-xl font-semibold tracking-tight ${t.textColor}`}>
                              {(i + 1).toString().padStart(2, '0')}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 pt-1 text-left">
                            <h4 className={`text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 ${t.groupHoverText} transition-colors`}>
                              {feature.title}
                            </h4>
                            <p className="text-sm text-zinc-600 dark:text-zinc-500 leading-relaxed font-medium">
                              {feature.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Dashed connector line */}
                    <div className={`hidden md:block w-[5%] h-[2px] border-b-[2px] border-dashed ${t.lineBorder} shrink-0 opacity-60`} />
                    {/* Empty Space */}
                    <div className="hidden md:block md:w-[50%]" />
                  </>
                ) : (
                  <>
                    {/* Empty Space */}
                    <div className="hidden md:block md:w-[50%]" />
                    {/* Dashed connector line */}
                    <div className={`hidden md:block w-[5%] h-[2px] border-b-[2px] border-dashed ${t.lineBorder} shrink-0 opacity-60 z-10`} />
                    {/* Right side Card (Desktop) / Full width Mobile */}
                    <div className="w-full md:w-[45%] pl-16 md:pl-6 z-10 box-border">
                      <div className={`group relative p-6 md:p-8 rounded-[1.5rem] bg-white dark:bg-zinc-950/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-xl ${t.hoverBorder} transition-all duration-300`}>
                        {/* Hover glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${t.hoverGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem] pointer-events-none`} />
                        
                        <div className="flex items-start gap-5 relative z-10">
                          {/* Icon box mimicking image */}
                          <div className={`shrink-0 w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center ${t.groupHoverBorder} ${t.groupHoverShadow} transition-all`}>
                            <feature.icon className={`w-6 h-6 ${t.textColor}`} />
                          </div>
                          <div className="flex flex-col gap-2 pt-1 text-left">
                            <h4 className={`text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 ${t.groupHoverText} transition-colors`}>
                              {feature.title}
                            </h4>
                            <p className="text-sm text-zinc-600 dark:text-zinc-500 leading-relaxed font-medium">
                              {feature.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </Section>
      {/* Leadership / Our Instructors Section */}
      <Section className="py-32 bg-white dark:bg-zinc-950 relative overflow-hidden">
        {/* Soft Background Accent */}
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="text-center md:text-left max-w-7xl mx-auto px-4 md:px-8 mb-20 flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100 mb-6">
              Learn From The <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">Best in the Industry</span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Our founding team consists of veteran software engineers and architects who have built massive scalable systems at top tech companies. They are here to mentor you directly—no unexperienced teaching assistants.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {[
            { name: "Aravind", role: "Founder & Lead Architect", exp: "10+ Years Exp", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" },
            { name: "Sarah Jenkins", role: "Head of Frontend Engineering", exp: "8+ Years Exp", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" },
            { name: "David Chen", role: "Principal Backend Developer", exp: "12+ Years Exp", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" }
          ].map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 aspect-[4/5] shadow-lg hover:shadow-[0_20px_40px_rgba(52,211,153,0.15)] transition-all duration-500"
            >
              <img src={member.img} alt={member.name} className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold tracking-tight uppercase tracking-widest w-fit mb-4 border border-orange-500/30 backdrop-blur-md">
                  {member.exp}
                </div>
                <h3 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl text-white mb-2 group-hover:text-orange-400 transition-colors">{member.name}</h3>
                <p className="text-zinc-300 font-medium text-lg">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Student Success Showcase */}
      <Section className="py-32 bg-zinc-50 dark:bg-[#09090b] relative overflow-hidden">
         {/* Subtle Background Elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="text-center max-w-3xl mx-auto px-4 mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Star className="w-4 h-4" /> Real Results
          </div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-100 mb-8 leading-tight">
            Loved by <br className="md:hidden"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">Thousands of Students</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            Don't just take our word for it. Read how Inetz Technologies completely transformed the lives and careers of aspiring developers like you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {[
            { name: "Priya M.", role: "Now SDE-1 at Amazon", text: "The real-world projects were the game changer. It wasn't just theory; I actually built an industrial application here that got me my Amazon interview." },
            { name: "Rahul S.", role: "Frontend Dev at Freshworks", text: "The mentors are unbelievable. They painstakingly reviewed my code line-by-line. I went from knowing zero React to landing a dream job in 6 months." },
            { name: "Karthik R.", role: "Fullstack Eng at Zoho", text: "The dedicated placement assistance is real. From resume building to mock interviews, they held my hand until I got exactly where I wanted to be." },
          ].map((testimonial, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] transition-all duration-300 relative group flex flex-col justify-between"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-zinc-100 dark:text-zinc-800/50 group-hover:text-blue-500/10 transition-colors -z-10" />
              <div>
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 text-amber-500 fill-amber-500" />)}
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 font-medium text-lg leading-relaxed mb-10 italic">"{testimonial.text}"</p>
              </div>
              <div className="flex items-center gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-6 mt-auto">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-md">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-sky-500 dark:text-sky-400 font-semibold">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Heavy CTA Section */}
      <section className="relative py-32 md:py-48 overflow-hidden bg-zinc-500 isolate">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-orange-950/80 via-zinc-950/90 to-zinc-950" /> */}
        
        <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-white mb-8 leading-tight"
          >
            Ready to Build Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500">Future With Us?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-zinc-300 font-medium max-w-3xl mx-auto mb-12"
          >
            Join the elite circle of developers who learned exactly what the industry demands. Don't waste time on mere theory.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="w-full sm:w-auto px-10 py-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(52,211,153,0.5)]">
              Enroll Now <ArrowRight className="w-6 h-6" />
            </button>
            <button className="w-full sm:w-auto px-10 py-5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white font-bold text-xl border border-zinc-700 flex items-center justify-center gap-3 transition-all backdrop-blur-md">
              <MonitorPlay className="w-6 h-6" /> Watch Free Demo
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
