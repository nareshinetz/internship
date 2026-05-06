"use client";

import React, { useState, useEffect, Suspense } from "react";
import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Loader2, ArrowLeft, IndianRupee, Lock, User, Mail, Phone, Building2, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

/** 
 * Design preserved as requested. 
 * Logic maintained for Razorpay, input validation, and custom amounts.
 * Dependency on static program-data removed.
 */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      {children}
    </div>
  );
}

function Input({ label, onChange, ...props }: { label: string; onChange: (v: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  return (
    <Field label={label}>
      <input {...props} onChange={(e) => onChange(e.target.value)} required
        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-bold focus:bg-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300"
      />
    </Field>
  );
}

function Select({ label, options, onChange, ...props }: any) {
  return (
    <Field label={label}>
      <div className="relative">
        <select {...props} onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-bold focus:bg-white focus:border-indigo-500 outline-none appearance-none cursor-pointer"
        >
          {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-3 text-slate-400 pointer-events-none" />
      </div>
    </Field>
  );
}

function StaticField({ label, value }: { label: string; value: string }) {
  return (
    <Field label={label}>
      <div className="w-full bg-slate-100 border border-slate-200 rounded-lg py-2 px-3 text-xs font-bold text-slate-700">{value}</div>
    </Field>
  );
}

function StepCard({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-5 h-5 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-black">{step}</span>
        <h2 className="font-black text-[11px] text-slate-800 uppercase tracking-widest">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function ReviewAndPayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extracting data directly from URL params - No programData needed
  const urlTrack         = searchParams.get("track") || "Full Stack";
  const urlDuration      = searchParams.get("duration") || "1 Month";
  const urlPrice         = parseInt(searchParams.get("price") || "0");
  const urlOriginalPrice = parseInt(searchParams.get("originalPrice") || "0");
  const urlCourseTitle   = searchParams.get("courseTitle") || "";

  // Set defaults if params are missing (Fallback logic)
  const discountedFee = urlPrice || 500;
  const originalFee   = urlOriginalPrice || (discountedFee * 4);

  const [isProcessing, setIsProcessing] = useState(false);
  const [customAmount, setCustomAmount] = useState(discountedFee);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "",
    college: "", department: "", year: "1st Year",
    track: urlTrack, duration: urlDuration, mode: "Online",
  });

  const set = (key: string) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  useEffect(() => { setCustomAmount(discountedFee); }, [discountedFee]);

  // Logic: Validation flags
  const isOverAmount = customAmount > discountedFee;
  const isUnderAmount = customAmount < 500;
  const isAmountInvalid = isOverAmount || isUnderAmount;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUnderAmount) return alert("Min payment is ₹500");
    if (isOverAmount) return alert(`Max payment is ₹${discountedFee.toLocaleString()}`);
    if (!form.fullName || !form.email || !form.phone) return alert("Please fill in all contact details.");
    if (!form.college || !form.department) return alert("Please fill in your education details.");

    setIsProcessing(true);
    try {
      const res  = await fetch("/api/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, amountToPay: customAmount }) });
      const data = await res.json();

      if (!res.ok || !data.key || !data.orderId || !data.amount) {
        alert(data.error || "Failed to create order.");
        return setIsProcessing(false);
      }
      
      const rzp = new (window as any).Razorpay({
        key: data.key, amount: data.amount, currency: "INR",
        name: "INetZ Academy",
        description: `${urlTrack} Internship - ${urlDuration}`,
        order_id: data.orderId,
        prefill: { name: form.fullName, email: form.email, contact: form.phone },
        theme: { color: "#4F46E5" },
        modal: { ondismiss: () => setIsProcessing(false) },
        handler: async (response: any) => {
          const verify = await fetch("/api/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(response) });
          const result = await verify.json();
          result.success ? router.push("/dashboard?status=success") : (alert("Verification failed."), setIsProcessing(false));
        },
      });

      rzp.on("payment.failed", (r: any) => { alert(`Payment failed: ${r.error.description}`); setIsProcessing(false); });
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <main className="max-w-5xl mx-auto px-6 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* FORM SECTION */}
        <div className="lg:col-span-7 space-y-6">
          <button onClick={() => router.back()} className="text-[10px] font-black uppercase flex items-center gap-1.5 text-slate-400 hover:text-[#4F46E5] transition-all tracking-widest">
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Review & Apply</h1>

          <div className="space-y-5">
            <StepCard step={1} title="Contact Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input label="Full Name"    value={form.fullName}   onChange={set("fullName")}  placeholder="John Doe" />
                <Input label="Email"        value={form.email}      onChange={set("email")}      placeholder="john@example.com" />
                <div className="md:col-span-2">
                  <Input label="Phone Number" value={form.phone}    onChange={set("phone")}      placeholder="+91" />
                </div>
              </div>
            </StepCard>

            <StepCard step={2} title="Education Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <Input label="College"   value={form.college}    onChange={set("college")}    placeholder="Institution Name" />
                </div>
                <Input label="Department"  value={form.department} onChange={set("department")} placeholder="e.g. CSE" />
                <Select label="Year" value={form.year} options={["1st Year", "2nd Year", "3rd Year", "4th Year"]} onChange={set("year")} />
              </div>
            </StepCard>

            <StepCard step={3} title="Program Details">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <StaticField label="Track"    value={urlTrack.toUpperCase()} />
                <StaticField label="Duration" value={urlDuration} />
                <Select label="Mode" value={form.mode} options={["Online", "Offline"]} onChange={set("mode")} />
              </div>
            </StepCard>
          </div>
        </div>

        {/* SUMMARY SECTION */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm sticky top-20">
            <div className="p-3 border-b border-slate-100 flex items-center gap-2 font-black text-[9px] uppercase tracking-widest text-slate-400">
              <Lock className="w-3.5 h-3.5 text-indigo-600" /> Order Summary
            </div>
            <div className="p-4">
              <div className="rounded-lg overflow-hidden mb-3 h-32 bg-slate-100">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600" className="w-full h-full object-cover" alt="Program" />
              </div>

              <h3 className="font-black text-sm leading-tight text-slate-800 uppercase tracking-tighter">
                {urlCourseTitle ? `${urlCourseTitle} — ${urlDuration}` : `${urlDuration} ${urlTrack} Internship`}
              </h3>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                  <span>Standard Fee</span>
                  <span className="line-through">₹{originalFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] text-emerald-600 font-black uppercase">
                  <span>Scholarship</span>
                  <span>-₹{(originalFee - discountedFee).toLocaleString()}</span>
                </div>

                <div className={cn(
                  "border rounded-lg p-2.5 my-3 flex items-center justify-between gap-3 transition-colors",
                  isOverAmount  ? "bg-red-50 border-red-200"    :
                  isUnderAmount ? "bg-amber-50 border-amber-200" :
                  "bg-slate-50 border-slate-100"
                )}>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">Payable Now</p>
                    {isOverAmount ? (
                      <p className="text-[7px] font-black text-red-500 uppercase tracking-wide">Max ₹{discountedFee.toLocaleString()}</p>
                    ) : isUnderAmount ? (
                      <p className="text-[7px] font-black text-amber-500 uppercase tracking-wide">Min ₹500</p>
                    ) : (
                      <p className="text-[7px] font-bold text-slate-400 italic">(Min ₹500)</p>
                    )}
                  </div>
                  <div className="relative flex-1 max-w-[110px]">
                    <IndianRupee className={cn("absolute left-2.5 top-1/2 -translate-y-1/2 size-3", isOverAmount ? "text-red-400" : "text-slate-400")} />
                    <input
                      type="number" value={customAmount}
                      onChange={(e) => setCustomAmount(parseInt(e.target.value) || 0)}
                      className={cn(
                        "w-full pl-6 pr-2 py-1.5 bg-white border rounded text-sm font-black text-slate-800 outline-none text-right transition-colors",
                        isOverAmount  ? "border-red-400 focus:border-red-500 text-red-600"   :
                        isUnderAmount ? "border-amber-400 focus:border-amber-500"             :
                        "border-slate-200 focus:border-indigo-500"
                      )}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-dashed border-slate-200 flex justify-between items-baseline">
                  <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest">Grand Total</span>
                  <span className={cn("font-black text-xl tracking-tighter", isAmountInvalid ? "text-red-500" : "text-slate-900")}>
                    ₹{customAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <button onClick={handlePay} disabled={isProcessing || isAmountInvalid}
                className={cn(
                  "w-full mt-5 py-3.5 text-white rounded-lg font-black text-[10px] uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
                  isAmountInvalid ? "bg-red-500 shadow-red-100" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100"
                )}
              >
                {isProcessing ? <Loader2 className="animate-spin size-3" /> : <Lock className="size-3" />}
                {isOverAmount ? `Check Limit` : "Enroll Now"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ReviewAndPay() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-indigo-600" /></div>}>
      <ReviewAndPayContent />
    </Suspense>
  );
}