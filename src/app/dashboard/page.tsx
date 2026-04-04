"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Phone, GraduationCap, CreditCard, 
  CheckCircle2, Clock, ChevronRight, LayoutGrid,
  Calendar, MapPin, ArrowRight, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedAppId, setSelectedAppId] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user") || "{}");
        const userEmail = user?.user?.email || user?.email; // Flex for different storage structures
        
        if (!userEmail) return;

        const response = await fetch(`/api/student/data?email=${userEmail}`);
        console.log(response)
        const result = await response.json();

        if (result.success) {
          const apps = Array.isArray(result.data.profile) ? result.data.profile : [result.data.profile];
          setApplications(apps);
          setAllTransactions(result.data.ledger || []);
          
          // AUTO-SELECT the first application so the screen isn't empty
          if (apps.length > 0) {
            setSelectedAppId(apps[0]._id);
          }
        }
      } catch (error) {
        console.error("Data fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Filter transactions for the active selection
  const activeTransactions = allTransactions.filter(
    (tx) => tx.applicationId === selectedAppId
  );

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-4" />
      <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Syncing Profile...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-emerald-100">
      
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-md border-b border-zinc-100 py-5 px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <LayoutGrid className="w-4 h-4" />
            </div>
            <h1 className="text-lg font-black italic tracking-tighter">Inetz <span className="text-emerald-600">Portal</span></h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right">
              <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Active Resident</p>
              <p className="text-xs font-bold text-zinc-900">{applications[0]?.fullName || "Student"}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
              <User className="w-5 h-5 text-zinc-400" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: APPLICATIONS LIST */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black italic tracking-tight">Your Enrollments</h2>
                <p className="text-xs text-zinc-400 font-medium">Manage your active learning tracks and certifications.</p>
              </div>
              <div className="px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">{applications.length} Active</span>
              </div>
            </div>

            <div className="space-y-4">
              {applications.map((app) => (
                <motion.div
                  key={app._id}
                  onClick={() => setSelectedAppId(app._id)}
                  whileHover={{ x: 4 }}
                  className={cn(
                    "group cursor-pointer p-8 rounded-[2.5rem] border transition-all duration-300 relative overflow-hidden",
                    selectedAppId === app._id 
                      ? "bg-white border-emerald-500 shadow-2xl shadow-emerald-500/10" 
                      : "bg-white border-zinc-100 hover:border-zinc-200 shadow-sm"
                  )}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div className="space-y-3">
                      <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                        app.status === 'pending' ? "bg-orange-50 text-orange-600" : "bg-emerald-50 text-emerald-600"
                      )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full", app.status === 'pending' ? "bg-orange-500" : "bg-emerald-500 animate-pulse")} />
                        {app.status}
                      </div>
                      
                      <h3 className="text-2xl font-black italic tracking-tight group-hover:text-emerald-600 transition-colors">
                        {app.domain}
                      </h3>

                      <div className="flex gap-6">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          <Calendar className="w-3.5 h-3.5" /> {app.duration}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          <MapPin className="w-3.5 h-3.5" /> {app.mode}
                        </div>
                      </div>
                    </div>
                    
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                      selectedAppId === app._id ? "bg-emerald-600 text-white rotate-90" : "bg-zinc-50 text-zinc-300"
                    )}>
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </div>
                  
                  {selectedAppId === app._id && (
                    <motion.div layoutId="glow" className="absolute -right-20 -top-20 w-40 h-40 bg-emerald-500/5 blur-3xl rounded-full" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: DRILL-DOWN TRANSACTIONS */}
          <aside className="lg:col-span-5">
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                {selectedAppId ? (
                  <motion.div
                    key={selectedAppId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-zinc-900 rounded-[3rem] shadow-2xl overflow-hidden border border-zinc-800"
                  >
                    {/* Dark Card Header */}
                    <div className="p-10 pb-6">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                          <CreditCard className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Application Hash</p>
                          <p className="text-xs font-mono text-emerald-500/80">#{selectedAppId.slice(-8).toUpperCase()}</p>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white italic">Financial Ledger</h3>
                    </div>

                    {/* Transaction List */}
                    <div className="px-6 pb-10 space-y-3 max-h-[450px] overflow-y-auto custom-scrollbar">
                      {activeTransactions.length > 0 ? (
                        activeTransactions.map((tx) => (
                          <div key={tx._id} className="group flex justify-between items-center p-5 bg-white/5 hover:bg-white/10 rounded-[1.5rem] border border-white/5 transition-all">
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center",
                                tx.status === 'success' ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400"
                              )}>
                                {tx.status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-zinc-200">{tx.note}</p>
                                <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">{new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-black italic text-emerald-400">₹{tx.amount}</p>
                              <p className="text-[8px] font-black text-zinc-600 uppercase tracking-tighter">Verified</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-24 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-6 h-6 text-zinc-700" />
                          </div>
                          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">No transactions logged</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-[500px] flex flex-col items-center justify-center p-12 border-2 border-dashed border-zinc-200 rounded-[3rem] text-zinc-300">
                     <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                       <ArrowRight className="w-8 h-8 animate-bounce rotate-[-45deg]" />
                     </div>
                     <p className="text-xs font-black uppercase tracking-[0.3em] text-center leading-relaxed">
                       Select a track <br/> to unlock details
                     </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </aside>
        </div>
      </main>

      {/* Global CSS for scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Dashboard;