"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Trash2, Loader2, Award } from "lucide-react";
import { StudentRecord } from "./StudentTable";
import axios from "axios";
import GenerateCertificateModal from "../GenerateCertificateModal";

interface EditStudentModalProps {
  isOpen: boolean;
  student: StudentRecord | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditStudentModal({
  isOpen,
  student,
  onClose,
  onSuccess,
}: EditStudentModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);
  const [programs, setPrograms] = useState<{ _id: string; title: string; duration: string }[]>([]);
  const [programId, setProgramId] = useState("");

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    domain: "",
    duration: "",
    status: "active" as "active" | "completed" | "cancelled",
    totalBilling: 0,
    certificateStatus: "Pending",
    notes: "",
    clearFees: false,
  });

  useEffect(() => {
    if (student) {
      setProgramId(student.offeringId || "");
      setShowDeleteOptions(false);
      setEditForm({
        name: student.name || "",
        email: student.email || "",
        phone: student.phone || "",
        college: student.college || "",
        domain: student.domain || "",
        duration: student.duration || "",
        status: student.status === "completed" || student.status === "cancelled" ? student.status : "active",
        totalBilling: student.totalBilling || 0,
        certificateStatus: student.certificateStatus || "Pending",
        notes: student.notes || "",
        clearFees: false,
      });
    }
  }, [student]);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    fetch("/api/tracks")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Program catalog unavailable")))
      .then((items: { _id?: string; title?: string; duration?: string }[]) => {
        if (active) setPrograms(items.filter((item): item is { _id: string; title: string; duration: string } =>
          Boolean(item._id && item.title && item.duration)));
      })
      .catch(() => { if (active) setPrograms([]); });
    return () => { active = false; };
  }, [isOpen]);

  if (!isOpen || !student) return null;

  const currentFeeStatus =
    student.pendingAmount <= 0 || student.feesStatus === "Clear" || student.feesStatus === "Fully Paid"
      ? "Clear"
      : "Pending";
  const joinedDate = student.doj && !Number.isNaN(Date.parse(student.doj))
    ? new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(student.doj))
    : null;

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await axios.put("/api/students", {
        id: student._id,
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        phone: editForm.phone.trim(),
        college: editForm.college.trim(),
        ...(programId && programId !== student.offeringId ? { programId } : {}),
        status: editForm.status,
        totalBilling: Number(editForm.totalBilling),
        certificateStatus: editForm.certificateStatus,
        notes: editForm.notes.trim(),
        clearFees: editForm.clearFees,
      });

      if (res.data.success) {
        alert("Student record updated successfully!");
        onClose();
        onSuccess();
      }
    } catch (err: any) {
      console.error("Error updating student:", err);
      alert(err.response?.data?.error || "Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (mode: "partial" | "full") => {
    const detail = mode === "full"
      ? `This also erases ₹${student.totalCollection.toLocaleString("en-IN")} of embedded fee history and any certificate status for this enrollment.`
      : "This works only if there are no fees or issued certificate.";
    if (!confirm(`Permanently delete only the ${student.domain} internship enrollment for ${student.name}? ${detail} The User account and other enrollments stay. This cannot be undone.`)) return;
    setIsDeleting(true);
    try {
      await axios.delete(`/api/students?id=${student._id}&mode=${mode}`);
      onClose();
      onSuccess();
    } catch (err: unknown) {
      alert(axios.isAxiosError(err) ? err.response?.data?.error || "Failed to delete enrollment." : "Failed to delete enrollment.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* ────────────────── POPUP CERTIFICATE ACTION MODAL ────────────────── */}
      <GenerateCertificateModal
        isOpen={isCertModalOpen}
        student={{
          _id: student._id,
          name: editForm.name || student.name,
          email: editForm.email || student.email,
          domain: editForm.domain || student.domain,
          duration: editForm.duration || student.duration,
        }}
        onClose={() => setIsCertModalOpen(false)}
        onRefresh={onSuccess}
      />

      <div className="fixed inset-0 z-[999] flex justify-end bg-slate-950/35 backdrop-blur-[2px]">
        <aside role="dialog" aria-modal="true" aria-label="Student details" className="flex h-dvh w-full max-w-3xl flex-col overflow-hidden border-l border-slate-200 bg-slate-50 shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-sm font-black text-emerald-700">
                {student.name?.trim().charAt(0).toUpperCase() || "S"}
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Student details</p>
                <h3 className="truncate text-base font-bold text-slate-900">{student.name}</h3>
                <p className="mt-0.5 text-xs font-medium text-slate-500">
                  {student.studentId && <>Student ID {student.studentId} · </>}Joined {joinedDate || "date unavailable"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close student details"
              className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <form
            onSubmit={handleSaveChanges}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 space-y-5 overflow-y-auto p-5 md:p-6">
            {/* 1. Personal & Program Details */}
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="border-b border-slate-100 pb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                1. Personal & Program Details
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    placeholder="e.g. student@gmail.com"
                    className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">
                    College / Institution
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.college}
                    onChange={(e) =>
                      setEditForm({ ...editForm, college: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">
                    Specialization Domain
                  </label>
                  <select
                    value={programId}
                    onChange={(e) => {
                      const selected = programs.find((program) => program._id === e.target.value);
                      setProgramId(e.target.value);
                      if (selected) setEditForm({ ...editForm, domain: selected.title, duration: selected.duration });
                    }}
                    disabled={student.type !== "internship"}
                    className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800"
                  >
                    {!programs.some((program) => program._id === programId) && <option value={programId}>{editForm.domain} — {editForm.duration} (current)</option>}
                    {programs.map((program) => <option key={program._id} value={program._id}>{program.title} — {program.duration}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">
                    Duration
                  </label>
                  <input readOnly value={editForm.duration} className="w-full mt-1 px-3 py-2 bg-zinc-100 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">Enrollment Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as "active" | "completed" | "cancelled" })}
                    className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Financial Status & Adjustments */}
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="border-b border-slate-100 pb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                2. Financial Status & Adjustments
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">
                    Total Fee (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={editForm.totalBilling}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        totalBilling: Number(e.target.value),
                      })
                    }
                    className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 outline-none focus:bg-white focus:border-emerald-500"
                  />
                </div>

                <div className="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100">
                  <p className="text-[9px] font-black uppercase text-emerald-600">
                    Total Collected
                  </p>
                  <p className="text-base font-black text-emerald-700 mt-0.5">
                    ₹{(student.totalCollection || 0).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-100">
                  <p className="text-[9px] font-black uppercase text-amber-600">
                    Calculated Balance
                  </p>
                  <p className="text-base font-black text-amber-700 mt-0.5">
                    ₹
                    {Math.max(
                      0,
                      editForm.totalBilling - (student.totalCollection || 0),
                    ).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className={currentFeeStatus === "Clear" ? "bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100" : "bg-amber-50/50 p-3 rounded-2xl border border-amber-100"}>
                  <p className={currentFeeStatus === "Clear" ? "text-[9px] font-black uppercase text-emerald-600" : "text-[9px] font-black uppercase text-amber-600"}>
                    Fee Status
                  </p>
                  <p className={currentFeeStatus === "Clear" ? "text-base font-black text-emerald-700 mt-0.5" : "text-base font-black text-amber-700 mt-0.5"}>
                    {currentFeeStatus}
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1">
                    Admin Note {editForm.clearFees && <span className="text-red-500">(required)</span>}
                  </label>
                  <textarea
                    value={editForm.notes}
                    onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                    maxLength={1000}
                    rows={2}
                    placeholder="Example: Student withdrew; remaining fee waived by admin."
                    className="w-full mt-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-800 outline-none focus:bg-white focus:border-emerald-500 resize-y"
                  />
                </div>

                {student.pendingAmount > 0 && (
                  <label className="flex items-start gap-2 p-3 bg-amber-50/60 border border-amber-200 rounded-2xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.clearFees}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          clearFees: e.target.checked,
                        })
                      }
                      className="mt-0.5 accent-emerald-600"
                    />
                    <span>
                      <span className="block text-[10px] font-black uppercase text-amber-700">Mark fees clear</span>
                      <span className="block text-[10px] text-amber-700 mt-0.5">Applied only when you save. It will set total fee to ₹{(student.totalCollection || 0).toLocaleString("en-IN")}.</span>
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* 3. Installments Ledger */}
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  3. Payment Installments Ledger (
                  {student.installments?.length || 0})
                </h4>
              </div>

              {student.installments && student.installments.length > 0 ? (
                <div className="border border-zinc-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-[9px] font-black uppercase text-zinc-400">
                      <tr>
                        <th className="p-3">Receipt No</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Paid Amount</th>
                        <th className="p-3">Method</th>
                        <th className="p-3">Billing Staff</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-medium text-zinc-700">
                      {student.installments.map((inst, idx) => (
                        <tr
                          key={inst.receiptNo || idx}
                          className="hover:bg-zinc-50/50"
                        >
                          <td className="p-3 font-mono text-[11px] font-bold text-zinc-900">
                            {inst.receiptNo}
                          </td>
                          <td className="p-3">{inst.date}</td>
                          <td className="p-3 font-bold text-emerald-600">
                            ₹{inst.paidAmount?.toLocaleString("en-IN")}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-zinc-100 border border-zinc-200 rounded text-[9px] font-bold">
                              {inst.paymentMethod}
                            </span>
                          </td>
                          <td className="p-3 text-zinc-500">
                            {inst.billingBy}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    No Installments Audited Yet
                  </p>
                </div>
              )}
            </div>

            </div>
            {/* 4. Bottom Action Toolbar */}
            <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-5 py-4 md:px-6">
              <div className="relative">
                <button type="button" disabled={isDeleting || isSaving} onClick={() => setShowDeleteOptions(!showDeleteOptions)} aria-expanded={showDeleteOptions} className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2 disabled:opacity-50">
                  {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />} Delete Student
                </button>
                {showDeleteOptions && (
                  <div className="absolute bottom-full left-0 z-10 mb-3 w-[min(28rem,calc(100vw-3rem))] rounded-2xl border border-red-100 bg-white p-3 shadow-xl" role="group" aria-label="Delete enrollment options">
                    <p className="mb-2 text-[11px] text-zinc-600">Only this internship enrollment is removed; the User account stays.</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <button type="button" disabled={isDeleting || isSaving} onClick={() => handleDelete("partial")} className="px-3 py-2.5 rounded-xl border border-red-200 text-red-700 text-xs font-bold disabled:opacity-50">Partial: unpaid only</button>
                      <button type="button" disabled={isDeleting || isSaving} onClick={() => handleDelete("full")} className="px-3 py-2.5 rounded-xl bg-red-700 text-white text-xs font-bold disabled:opacity-50">Full: delete fees too</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCertModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <Award size={15} /> Generate Certificate
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 border border-zinc-200 text-zinc-600 rounded-xl text-xs font-bold hover:bg-zinc-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isSaving ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}{" "}
                  Save Updates
                </button>
              </div>
            </div>
          </form>
        </aside>
      </div>
    </>
  );
}
