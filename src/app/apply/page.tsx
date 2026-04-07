"use client";

import React, { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, GraduationCap, 
  Sparkles, ChevronDown, CheckCircle2, 
  Send, Loader2, ShieldCheck, CreditCard,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

const ApplyAndPayPage = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    year: "1st Year",
    domain: "MERN Stack",
    duration: "1 Month",
    mode: "Online",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyAndPay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 1. Create Order & Save Application in Backend
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      // 2. Open Razorpay Checkout Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: data.amount,
        currency: "INR",
        name: "INetZ Academy",
        description: "Internship Registration Fee",
        order_id: data.orderId, 
        handler: function (response: any) {
          // Success Path
          setPaymentSuccess(true);
          setIsProcessing(false);
          setTimeout(() => router.push("/dashboard"), 3000);
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#059669" },
        modal: { ondismiss: () => setIsProcessing(false) }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error: any) {
      alert("Error: " + error.message);
      setIsProcessing(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {paymentSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-xl dark:bg-zinc-950/90 text-center p-6">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="space-y-6 max-w-sm">
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
              </div>
              <h2 className="text-4xl font-black italic tracking-tighter">Seat Secured!</h2>
              <p className="text-zinc-500 font-medium leading-relaxed">Welcome to the cohort, {formData.fullName}. Check your email for the onboarding kit.</p>
              <button onClick={() => router.push('/dashboard')} className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest">Go to Dashboard</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* HEADER */}
        <header className="mb-12 flex items-center justify-between">
           <button onClick={() => router.back()} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
           </button>
           <div className="text-right">
              <h1 className="text-2xl font-black uppercase tracking-tighter">Inetz <span className="text-emerald-600">Student</span></h1>
              <p className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Registration Portal 2026</p>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: THE FORM */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Complete your <span className="text-emerald-600">profile</span></h2>
              <p className="text-zinc-500 font-medium">This information will be used for your official internship certificate.</p>
            </div>

            <form onSubmit={handleApplyAndPay} className="space-y-12">
              
              {/* CONTACT SECTION */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <User className="w-4 h-4" />
                   </div>
                   <h3 className="font-bold text-lg">Personal Identity</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Sonu" />
                  <InputField label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="sonu@example.com" />
                  <div className="md:col-span-2">
                    <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 00000 00000" icon={<Phone className="w-4 h-4" />} />
                  </div>
                </div>
              </section>

              {/* EDUCATION SECTION */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <GraduationCap className="w-4 h-4" />
                   </div>
                   <h3 className="font-bold text-lg">Academic Credentials</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <InputField label="College / University" name="college" value={formData.college} onChange={handleChange} placeholder="Enter your college name" />
                  </div>
                  <InputField label="Department" name="department" value={formData.department} onChange={handleChange} placeholder="CSE / IT / ECE" />
                  <SelectField label="Current Year" name="year" value={formData.year} onChange={handleChange} options={["1st Year", "2nd Year", "3rd Year", "4th Year", "Passed out"]} />
                </div>
              </section>

              {/* PREFERENCES SECTION */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Sparkles className="w-4 h-4" />
                   </div>
                   <h3 className="font-bold text-lg">Program Specialization</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SelectField label="Domain" name="domain" value={formData.domain} onChange={handleChange} options={["MERN Stack", "Python / AI", "Java Spring Boot"]} />
                  <SelectField label="Duration" name="duration" value={formData.duration} onChange={handleChange} options={["1 Month", "3 Months"]} />
                  <SelectField label="Learning Mode" name="mode" value={formData.mode} onChange={handleChange} options={["Online", "Offline"]} />
                </div>
              </section>

              {/* MOBILE ONLY BUTTON */}
              <div className="lg:hidden">
                <SubmitButton isProcessing={isProcessing} />
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: STICKY ORDER SUMMARY */}
          <aside className="lg:col-span-4 sticky top-12">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-xl shadow-zinc-200/50 dark:shadow-none">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <SummaryRow label="Program" value={formData.domain} />
                <SummaryRow label="Duration" value={formData.duration} />
                <SummaryRow label="Access Mode" value={formData.mode} />
                <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-4" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-zinc-900 dark:text-white">Registration Fee</span>
                  <span className="text-2xl font-black text-emerald-600">₹500</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Secure SSL Encrypted
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  <CreditCard className="w-4 h-4 text-emerald-500" />
                  UPI / Cards / NetBanking
                </div>
              </div>

              <div className="hidden lg:block">
                <SubmitButton isProcessing={isProcessing} onClick={handleApplyAndPay} />
              </div>

              <p className="mt-6 text-center text-[10px] text-zinc-400 font-medium leading-relaxed">
                By clicking "Secure Payment", you agree to our Terms of Residency and Internship Policies.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

// Helper Components
const InputField = ({ label, name, value, onChange, placeholder, type = "text", icon }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-5 top-1/2 -translate-y-1/2">{icon}</div>}
      <input 
        name={name} type={type} value={value} onChange={onChange} required 
        className={cn(
          "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all",
          icon && "pl-12"
        )} 
        placeholder={placeholder} 
      />
    </div>
  </div>
);

const SelectField = ({ label, name, value, onChange, options }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">{label}</label>
    <select name={name} value={value} onChange={onChange} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none">
      {options.map((opt: string) => <option key={opt}>{opt}</option>)}
    </select>
  </div>
);

const SummaryRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-zinc-400 font-medium">{label}</span>
    <span className="font-bold text-zinc-800 dark:text-zinc-200">{value}</span>
  </div>
);

const SubmitButton = ({ isProcessing, onClick }: any) => (
  <button 
    type="submit" 
    onClick={onClick}
    disabled={isProcessing}
    className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-70 active:scale-[0.98]"
  >
    {isProcessing ? <Loader2 className="animate-spin w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
    {isProcessing ? "Processing..." : "Secure Payment • ₹500"}
  </button>
);

export default ApplyAndPayPage;