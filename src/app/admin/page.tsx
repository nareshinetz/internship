"use client";

import React, { useState, useEffect } from "react";
import { Plus, FileText, Loader2, Type, Trash2, Check, ArrowRight, AlertCircle, Copy, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const AdminPage = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [rawText, setRawText] = useState("");
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    duration: "1 Month",
    price: "",
    originalPrice: "",
    heroImg: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2072",
  });

  const [editableSyllabus, setEditableSyllabus] = useState<any[]>([]);
  const [editableProjects, setEditableProjects] = useState<any[]>([]);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/programs");
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAIProcess = async () => {
    if (!rawText || !formData.title) return;
    setUploading(true);

    try {
      const res = await fetch("/api/process-syllabus", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          textContent: rawText,
          manualData: {
            ...formData,
            // Ensure numbers are numbers
            price: Number(formData.price),
            originalPrice: Number(formData.originalPrice)
          } 
        }) 
      });
      
      const result = await res.json();
      if (result.success) {
        setEditableSyllabus(result.data.syllabus || []);
        setEditableProjects(result.data.projects || []);
        
        // Let AI refine the subtitle if it was blank
        setFormData(prev => ({
          ...prev,
          subtitle: prev.subtitle || result.data.subtitle,
          duration: result.data.duration || prev.duration
        }));
        setStep(2);
      } else {
        alert(result.error || "AI error");
      }
    } catch (err) {
      alert("AI Processing failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  const handleFinalSave = async () => {
    // CRITICAL: Generate the unique composite slug
    const courseBase = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const durationSuffix = formData.duration.toLowerCase().replace(/\s+/g, "-");
    const finalSlug = `${courseBase}-${durationSuffix}`;

    const finalCourse = { 
      ...formData, 
      slug: finalSlug,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      syllabus: editableSyllabus, 
      projects: editableProjects 
    };

    try {
      const res = await fetch("/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalCourse),
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchCourses(); // Refresh list without reload
        setStep(1);
        setRawText("");
      }
    } catch (err) {
      console.error("Save failed");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-zinc-500 text-sm mt-1">Manage Inetz Technologies internship tracks.</p>
          </div>
          <button 
            onClick={() => {
              setStep(1);
              setFormData({ ...formData, title: "", subtitle: "", price: "", originalPrice: "" });
              setRawText("");
              setIsModalOpen(true);
            }}
            className="bg-zinc-900 text-white px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
          >
            <Plus size={16} /> Add New Track
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-zinc-300" size={40} />
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <motion.div 
                layout
                key={course._id} 
                className="bg-white p-6 rounded-[2.5rem] border border-zinc-200 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-zinc-50 rounded-2xl group-hover:bg-emerald-50 transition-colors">
                    <FileText className="text-zinc-400 group-hover:text-emerald-600" />
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[8px] font-bold text-zinc-300 uppercase mt-2">ID: {course.slug}</span>
                    <button className="text-zinc-300 hover:text-red-500 p-2"><Trash2 size={18}/></button>
                  </div>
                </div>
                <h3 className="font-bold text-zinc-900 text-lg leading-tight">{course.title}</h3>
                <div className="flex items-center gap-2 mt-4">
                  <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                    {course.duration}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase">
                    {course.syllabus?.length || 0} Modules
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-zinc-100">
            <div className="bg-zinc-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-zinc-300" />
            </div>
            <p className="text-zinc-500 font-medium">No courses found. Start by adding one!</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => !uploading && setIsModalOpen(false)} 
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              className="relative bg-white rounded-[3rem] p-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={cn("px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest", step === 1 ? "bg-zinc-900 text-white" : "bg-emerald-100 text-emerald-700")}>
                    01. Details & Text
                  </div>
                  <div className="h-[1px] w-8 bg-zinc-200" />
                  <div className={cn("px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest", step === 2 ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-400")}>
                    02. Review AI Data
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full"><X size={20}/></button>
              </div>

              {step === 1 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-5">
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">General Information</h3>
                    <input type="text" placeholder="Course Title (e.g. MERN Fullstack)" className="w-full p-5 bg-zinc-50 rounded-2xl border-none outline-none focus:ring-2 ring-emerald-500/20 text-sm transition-all" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                    
                    <select 
                      className="w-full p-5 bg-zinc-50 rounded-2xl border-none outline-none text-sm appearance-none"
                      value={formData.duration}
                      onChange={e => setFormData({...formData, duration: e.target.value})}
                    >
                      <option value="1 Week">1 Week</option>
                      <option value="2 Weeks">2 Weeks</option>
                      <option value="1 Month">1 Month</option>
                      <option value="3 Months">3 Months</option>
                    </select>

                    <input type="text" placeholder="Subtitle (AI can help here)" className="w-full p-5 bg-zinc-50 rounded-2xl border-none outline-none text-sm" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase ml-2">Sale Price (₹)</label>
                        <input type="number" placeholder="1500" className="w-full p-5 bg-zinc-50 rounded-2xl border-none outline-none text-sm" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase ml-2">Original (₹)</label>
                        <input type="number" placeholder="2000" className="w-full p-5 bg-zinc-50 rounded-2xl border-none outline-none text-sm" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-5">Syllabus Source Text</h3>
                    <div className="flex-1 relative">
                      <textarea 
                        className="w-full h-full min-h-[250px] p-6 bg-zinc-50 rounded-[2.5rem] border-2 border-dashed border-zinc-100 outline-none text-xs leading-relaxed resize-none focus:border-emerald-200 transition-all"
                        placeholder="Paste syllabus text here..."
                        value={rawText}
                        onChange={(e) => setRawText(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <button 
                    disabled={!rawText || !formData.title || uploading}
                    onClick={handleAIProcess}
                    className="md:col-span-2 w-full py-6 bg-zinc-900 text-white rounded-3xl font-bold text-[10px] uppercase tracking-widest flex justify-center items-center gap-3 disabled:opacity-30 transition-all hover:bg-zinc-800 shadow-xl"
                  >
                    {uploading ? <Loader2 className="animate-spin" /> : <>Structure with Gemini 3 Flash <ArrowRight size={14}/></>}
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-widest">Review {formData.duration} Roadmap</h3>
                    <button onClick={() => setStep(1)} className="text-[10px] font-bold uppercase text-zinc-400 hover:text-zinc-900">Edit Details</button>
                  </div>

                  <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3">
                    {editableSyllabus.map((day, idx) => (
                      <div key={idx} className="group p-5 bg-zinc-50 rounded-3xl border border-transparent hover:border-zinc-200 transition-all flex items-center gap-4">
                        <input 
                          className="w-24 font-bold text-zinc-400 bg-transparent outline-none focus:text-emerald-600 transition-colors uppercase text-[10px]" 
                          value={day.label} 
                          onChange={(e) => {
                            const updated = [...editableSyllabus];
                            updated[idx].label = e.target.value;
                            setEditableSyllabus(updated);
                          }}
                        />
                        <div className="h-4 w-[1px] bg-zinc-200" />
                        <input 
                          className="flex-1 font-bold text-zinc-900 bg-transparent outline-none text-sm" 
                          value={day.title} 
                          onChange={(e) => {
                            const updated = [...editableSyllabus];
                            updated[idx].title = e.target.value;
                            setEditableSyllabus(updated);
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <button onClick={handleFinalSave} className="w-full py-6 bg-emerald-600 text-white rounded-3xl font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all">
                    Save {formData.title} ({formData.duration})
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;