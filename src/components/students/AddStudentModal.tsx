"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  UserPlus, 
  Loader2, 
  BookOpen, 
  Clock, 
  Building, 
  Mail, 
  Phone, 
  User,
  Calendar,
  AlertCircle
} from "lucide-react";

export interface ProgramTrackItem {
  _id?: string;
  title: string;
  slug?: string;
  duration?: string;
  price?: number | string;
  originalPrice?: number | string;
}

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddStudentModal({
  isOpen,
  onClose,
  onSuccess,
}: AddStudentModalProps) {
  const [programs, setPrograms] = useState<ProgramTrackItem[]>([]);
  const [loadingTracks, setLoadingTracks] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [selectedProgramId, setSelectedProgramId] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    duration: "",
    doj: new Date().toISOString().split("T")[0],
    totalBilling: 0,
    initialPayment: 0,
    paymentMethod: "Cash",
  });

  // 1. Fetch available programs
  useEffect(() => {
    if (!isOpen) return;

    async function fetchTracksData() {
      setLoadingTracks(true);
      setErrorMsg(null);
      setPrograms([]);
      setSelectedProgramId("");
      try {
        let res = await fetch("/api/tracks");
        if (!res.ok) {
          res = await fetch("/api/programs");
        }

        if (res.ok) {
          const rawData = await res.json();
          const list: ProgramTrackItem[] = Array.isArray(rawData)
            ? rawData
            : rawData.programs || rawData.data || [];

          const available = list.filter((program) => program._id && program.title && program.duration);
          setPrograms(available);

          if (available.length > 0) {
            const firstTrack = available[0];
            setSelectedProgramId(firstTrack._id!);

            setForm((prev) => ({
              ...prev,
              duration: firstTrack.duration || "",
              totalBilling: Number(firstTrack.price) || 0,
              initialPayment: 0,
            }));
          } else {
            setSelectedProgramId("");
            setErrorMsg("No enrollment programs are available. Add a program before enrolling a student.");
          }
        } else {
          setErrorMsg("Could not load the program catalog. Please try again.");
        }
      } catch (err) {
        console.error("Failed to load tracks for student form:", err);
        setErrorMsg("Could not load the program catalog. Please try again.");
      } finally {
        setLoadingTracks(false);
      }
    }

    fetchTracksData();
  }, [isOpen]);

  const handleProgramChange = (programId: string) => {
    const matched = programs.find((program) => program._id === programId);
    if (!matched) return;
    setSelectedProgramId(programId);
    setForm((prev) => ({
      ...prev,
      duration: matched.duration || "",
      totalBilling: Number(matched.price) || 0,
      initialPayment: 0,
    }));
  };

  // 3. Submit Student Registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const payload = {
      programId: selectedProgramId,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      college: form.college.trim(),
      doj: form.doj,
      totalBilling: Number(form.totalBilling) || 0,
      initialPayment: Number(form.initialPayment) || 0,
      paymentMethod: form.paymentMethod,
    };

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        onSuccess();
        onClose();
      } else {
        setErrorMsg(data.error || "Failed to register student.");
      }
    } catch {
      setErrorMsg("Network error occurred while saving student record.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const balanceAmount = Math.max(0, Number(form.totalBilling) - Number(form.initialPayment));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-zinc-200 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex justify-between items-start border-b border-zinc-100 pb-4">
          <div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">
              Admission Management
            </span>
            <h3 className="text-xl font-black text-zinc-900">Enrol New Student</h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-lg text-sm font-bold cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-rose-50 text-rose-800 border border-rose-200 rounded-2xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle size={16} className="text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Personal Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
                <input
                  type="text"
                  required
                  placeholder="e.g. Arun Kumar"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
                <input
                  type="email"
                  placeholder="student@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700">College / Institution *</label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
                <input
                  type="text"
                  required
                  placeholder="e.g. Loyola College"
                  value={form.college}
                  onChange={(e) => setForm({ ...form, college: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Course Track, Duration & Date of Joining */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-zinc-100">
            
            {/* Select one real program record, including its duration. */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <BookOpen size={13} className="text-emerald-600" /> Program Track *
                </span>
              </label>

                <select
                  required
                  value={selectedProgramId}
                  onChange={(e) => handleProgramChange(e.target.value)}
                  disabled={loadingTracks || programs.length === 0}
                  className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer disabled:opacity-60"
                >
                  {!selectedProgramId && <option value="">{loadingTracks ? "Loading programs..." : "No programs available"}</option>}
                  {programs.map((program) => (
                    <option key={program._id} value={program._id}>
                      {program.title} — {program.duration}
                    </option>
                  ))}
                </select>
            </div>

            {/* Duration comes from the selected program. */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                <Clock size={13} className="text-emerald-600" /> Duration *
              </label>
              <input readOnly value={form.duration} className="w-full px-3 py-2.5 bg-zinc-100 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700" />
            </div>

            {/* Date of Joining (DOJ) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                <Calendar size={13} className="text-emerald-600" /> Date of Joining *
              </label>
              <input
                type="date"
                required
                value={form.doj}
                onChange={(e) => setForm({ ...form, doj: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Fee & Payment Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-zinc-100">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700">Total Course Fee (₹) *</label>
              <input
                type="number"
                required
                min={0}
                value={form.totalBilling}
                onChange={(e) => setForm({ ...form, totalBilling: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700">Initial Payment (₹)</label>
              <input
                type="number"
                required
                min={0}
                max={form.totalBilling}
                value={form.initialPayment}
                onChange={(e) => setForm({ ...form, initialPayment: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-emerald-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700">Payment Mode</label>
              <select
                value={form.paymentMethod}
                onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="Cash">Cash</option>
                <option value="GPay">GPay</option>
                <option value="UPI">UPI</option>
                <option value="Netbanking">Net Banking</option>
                <option value="Card">Card</option>
                <option value="Wallet">Wallet</option>
                <option value="EMI">EMI</option>
              </select>
            </div>
          </div>

          {/* Remaining Balance Summary Pill */}
          <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-500">Remaining Balance:</span>
            <span className={`font-black text-sm ${balanceAmount === 0 ? "text-emerald-600" : "text-amber-600"}`}>
              ₹{balanceAmount.toLocaleString("en-IN")} {balanceAmount === 0 ? "(Fully Paid)" : "(Due)"}
            </span>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-zinc-100 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || loadingTracks || !selectedProgramId}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />} Enrol Student
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
