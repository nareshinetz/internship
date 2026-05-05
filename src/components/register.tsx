"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Calendar, 
  Layers,
  UserCheck,
  PhoneCall,
  MessageCircle,
  Headphones
} from "lucide-react";
import { Section } from "@/components/ui/Section";

const enrollmentSteps = [
  {
    step: "1",
    title: "Select Program",
    icon: <Layers className="w-4 h-4 text-indigo-600" />,
    bg: "bg-indigo-100/50"
  },
  {
    step: "2",
    title: "Select Duration",
    icon: <Calendar className="w-4 h-4 text-purple-600" />,
    bg: "bg-purple-100/50"
  },
  {
    step: "3",
    title: "Make Payment",
    icon: <CreditCard className="w-4 h-4 text-emerald-600" />,
    bg: "bg-emerald-100/50"
  },
  {
    step: "4",
    title: "Book Your Seats",
    icon: <UserCheck className="w-4 h-4 text-blue-600" />,
    bg: "bg-blue-100/50"
  }
];

export function EnrollmentActionSection() {
  return (
    <Section className="relative bg-[#f8fafc] dark:bg-[#020617] py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
        
        {/* LEFT SIDE: STEPS */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Get Started in Minutes
            </h2>
          </div>
          
          <div className="space-y-2.5">
            {enrollmentSteps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg shadow-sm"
              >
                <div className={`p-2 rounded-md ${item.bg}`}>
                  {item.icon}
                </div>
                <span className="text-xl font-bold text-slate-200 dark:text-zinc-800 tabular-nums">
                  {item.step}
                </span>
                <h3 className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>

          <button className="w-full py-3 rounded-lg bg-[#0f172a] dark:bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-sm">
            <UserCheck size={16} />
            Start Enrollment Process
          </button>
        </div>

        {/* RIGHT SIDE: SUPPORT CARD */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Need Assistance?
          </h2>
          
          <div className="p-8 rounded-[2rem] bg-[#1e293b] text-white shadow-xl relative flex flex-col justify-between h-[380px]">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold leading-tight">
                Confused about which program to pick?
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-[280px]">
                Speak with our expert academic counselors to find the perfect fit for your career goals.
              </p>
              
              <div className="flex gap-4 items-center pt-2">
                 <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <Headphones size={12} className="text-indigo-400" /> Support Active
                 </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Dual Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl bg-white text-slate-900 hover:bg-slate-50 transition-all group">
                  <PhoneCall size={18} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-tight">Callback</span>
                </button>
                
                <button className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all group">
                  <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-tight">WhatsApp</span>
                </button>
              </div>
              
              <p className="text-center text-[9px] text-slate-500 uppercase tracking-widest font-black">
                Instant support available now
              </p>
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
}