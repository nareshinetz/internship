"use client";

import React from "react";
import { Eye, Pencil, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Installment {
  receiptNo: string;
  date: string;
  paidAmount: number;
  paymentMethod: string;
  transactionId?: string;
  billingBy: string;
}

export interface StudentRecord {
  _id: string;
  offeringId?: string;
  type?: "internship" | "course" | "certificate";
  sNo: number;
  studentId?: string;
  doj: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  domain: string;
  duration: string;
  status: "payment_pending" | "active" | "completed" | "cancelled";
  totalBilling: number;
  totalCollection: number;
  pendingAmount: number;
  feesStatus: "Pending" | "Fully Paid" | "Clear" | string;
  certificateStatus: "Pending" | "Issued" | string;
  notes?: string;
  installments: Installment[];
  createdAt?: string;
}

interface StudentTableProps {
  students: StudentRecord[];
  loading: boolean;
  onOpenEditModal: (student: StudentRecord) => void;
}

export default function StudentTable({ students, loading, onOpenEditModal }: StudentTableProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm h-64 flex flex-col items-center justify-center text-zinc-400">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-600 mb-2" />
        <p className="text-xs font-bold uppercase tracking-wider">Syncing Student Directory...</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm py-16 text-center space-y-2">
        <AlertCircle className="w-8 h-8 text-zinc-300 mx-auto" />
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">No Student Records Found</p>
      </div>
    );
  }

  return (
    <div className="student-table bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-semibold uppercase text-slate-500 tracking-[0.075em]">
              <th className="py-3.5 px-4">Student ID</th>
              <th className="py-3.5 px-4">Student Name</th>
              <th className="py-3.5 px-4">Domain</th>
              <th className="py-3.5 px-4">Duration</th>
              <th className="py-3.5 px-4">Total Fees</th>
              <th className="py-3.5 px-4">Fee Status</th>
              <th className="py-3.5 px-4">Enrollment Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {students.map((st) => (
              <tr key={st._id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-slate-50 border border-slate-200 text-slate-700">
                    {st.studentId || `#${st.sNo || "N/A"}`}
                  </span>
                </td>
                <td className="min-w-[150px] py-3 px-4">
                  <p className="font-semibold text-slate-900">{st.name}</p>
                  <p className="mt-0.5 whitespace-nowrap font-mono text-[11px] font-normal text-slate-500 tabular-nums">{st.phone}</p>
                </td>
                <td className="py-3 px-4">
                  <p className="font-medium text-slate-800 truncate max-w-[180px]">{st.domain}</p>
                </td>
                <td className="py-3 px-4">
                  <p className="font-medium text-slate-800 truncate max-w-[180px]">{st.duration}</p>
                </td>
                <td className="py-3 px-4">
                  <p className="font-semibold text-slate-900 tabular-nums truncate max-w-[180px]">{st.totalBilling}</p>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[9px] font-semibold uppercase border tracking-[0.06em]",
                      st.pendingAmount <= 0
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    )}
                  >
                    {st.pendingAmount <= 0 ? "Clear" : `₹${st.pendingAmount.toLocaleString("en-IN")}`}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={cn(
                    "inline-flex rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.06em]",
                    st.status === "active" && st.pendingAmount > 0 ? "border-amber-200 bg-amber-50 text-amber-700" :
                    st.status === "active" ? "border-emerald-200 bg-emerald-50 text-emerald-700" :
                    st.status === "completed" ? "border-blue-200 bg-blue-50 text-blue-700" :
                    "border-slate-200 bg-slate-100 text-slate-600",
                  )}>
                    {st.status === "active" && st.pendingAmount > 0 ? "Due" : st.status === "payment_pending" ? "Payment pending" : st.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onOpenEditModal(st)}
                    aria-label={`View or edit ${st.name}`}
                    title="View or edit student"
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg flex items-center gap-1.5 transition-colors ml-auto cursor-pointer"
                  >
                    <Eye size={15} aria-hidden="true" /><Pencil size={14} aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
