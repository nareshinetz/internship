// "use client";

// import React, { useState } from "react";
// import Script from "next/script";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   User, Phone, GraduationCap, 
//   ChevronDown, CheckCircle2, 
//   Loader2, ShieldCheck, CreditCard,
//   ArrowLeft, Building2, Briefcase,
//   AlertCircle
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// const ApplyAndPayPage = () => {
//   const router = useRouter();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     college: "",
//     department: "",
//     year: "1st Year",
//     domain: "MERN Stack",
//     duration: "1 Month",
//     mode: "Online",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     if (errorMessage) setErrorMessage(null); // Clear error when user types
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // --- FORM VALIDATION LOGIC ---
//   const validateForm = () => {
//     const { fullName, email, phone, college, department } = formData;
    
//     if (!fullName.trim() || !email.trim() || !phone.trim() || !college.trim() || !department.trim()) {
//       setErrorMessage("Please fill in all required fields.");
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setErrorMessage("Please enter a valid email address.");
//       return false;
//     }

//     if (phone.length < 10) {
//       setErrorMessage("Please enter a valid 10-digit phone number.");
//       return false;
//     }

//     return true;
//   };

//   const handleApplyAndPay = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // 1. Run Validation
//     if (!validateForm()) return;

//     setIsProcessing(true);

//     try {
//       // 2. Create Order & Save Application in Backend
//       const res = await fetch("/api/apply", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (!data.success) throw new Error(data.error);

//       // 3. Open Razorpay Checkout Modal
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
//         amount: data.amount,
//         currency: "INR",
//         name: "INetZ Academy",
//         description: "Internship Registration Fee",
//         order_id: data.orderId, 
//         handler: function (response: any) {
//           setPaymentSuccess(true);
//           setIsProcessing(false);
//           setTimeout(() => router.push("/dashboard"), 3000);
//         },
//         prefill: {
//           name: formData.fullName,
//           email: formData.email,
//           contact: formData.phone,
//         },
//         theme: { color: "#10b981" },
//         modal: { ondismiss: () => setIsProcessing(false) }
//       };

//       const rzp = (window as any).Razorpay ? new (window as any).Razorpay(options) : null;
//       if (rzp) {
//         rzp.open();
//       } else {
//         throw new Error("Razorpay SDK failed to load. Please refresh.");
//       }

//     } catch (error: any) {
//       setErrorMessage(error.message || "Something went wrong. Try again.");
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-emerald-50">
//       <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
//       {/* SUCCESS OVERLAY */}
//       <AnimatePresence>
//         {paymentSuccess && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-sm text-center p-6">
//             <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="space-y-4 max-w-xs">
//               <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
//                 <CheckCircle2 className="w-6 h-6 text-emerald-600" />
//               </div>
//               <h2 className="text-xl font-bold">Payment Successful</h2>
//               <p className="text-zinc-500 text-xs leading-relaxed">Welcome to the cohort, {formData.fullName}. Check your email for onboarding details.</p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="max-w-5xl mx-auto px-6 py-12">
//         <header className="flex items-center justify-between mb-16">
//            <button onClick={() => router.back()} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-all">
//               <ArrowLeft className="w-3.5 h-3.5" /> Back
//            </button>
//            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Registration Portal 2026</p>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
//           <div className="lg:col-span-7">
//             <div className="mb-10">
//               <h1 className="text-3xl font-bold tracking-tight mb-2">Complete Application</h1>
//               <p className="text-zinc-400 text-sm font-medium">Verify your details for the internship certificate.</p>
//             </div>

//             {/* ERROR NOTIFICATION */}
//             <AnimatePresence>
//               {errorMessage && (
//                 <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-xs font-semibold">
//                   <AlertCircle className="w-4 h-4" />
//                   {errorMessage}
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <form onSubmit={handleApplyAndPay} className="space-y-12">
//               <section className="space-y-6">
//                 <div className="flex items-center gap-2 border-b border-zinc-50 pb-2">
//                     <User className="w-3.5 h-3.5 text-zinc-400" />
//                     <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Personal Identity</span>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
//                   <InputField label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" />
//                   <div className="md:col-span-2">
//                     <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile number" icon={<Phone className="w-3.5 h-3.5" />} />
//                   </div>
//                 </div>
//               </section>

//               <section className="space-y-6">
//                 <div className="flex items-center gap-2 border-b border-zinc-50 pb-2">
//                     <Building2 className="w-3.5 h-3.5 text-zinc-400" />
//                     <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Academic Background</span>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   <div className="md:col-span-2">
//                     <InputField label="College / University" name="college" value={formData.college} onChange={handleChange} placeholder="Full Institution Name" />
//                   </div>
//                   <InputField label="Department" name="department" value={formData.department} onChange={handleChange} placeholder="e.g. CSE / IT" />
//                   <SelectField label="Year of Study" name="year" value={formData.year} onChange={handleChange} options={["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"]} />
//                 </div>
//               </section>

//               <section className="space-y-6">
//                 <div className="flex items-center gap-2 border-b border-zinc-50 pb-2">
//                     <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
//                     <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Program Preference</span>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <SelectField label="Domain" name="domain" value={formData.domain} onChange={handleChange} options={["MERN Stack", "Python / AI", "Java Spring Boot"]} />
//                   <SelectField label="Duration" name="duration" value={formData.duration} onChange={handleChange} options={["1 Month", "3 Months"]} />
//                   <SelectField label="Mode" name="mode" value={formData.mode} onChange={handleChange} options={["Online", "Offline"]} />
//                 </div>
//               </section>
//             </form>
//           </div>

//           <aside className="lg:col-span-5">
//             <div className="sticky top-12 bg-zinc-50 border border-zinc-100 rounded-2xl p-8">
//               <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">Order Summary</h3>
//               <div className="space-y-4 mb-8">
//                 <SummaryItem label="Program" value={formData.domain} />
//                 <SummaryItem label="Duration" value={formData.duration} />
//                 <SummaryItem label="Mode" value={formData.mode} />
//                 <div className="h-px bg-zinc-200/50 my-4" />
//                 <div className="flex justify-between items-end">
//                   <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Total Fee</span>
//                   <span className="text-3xl font-bold tracking-tighter text-emerald-600">₹500</span>
//                 </div>
//               </div>

//               <button 
//                 type="button"
//                 onClick={handleApplyAndPay}
//                 disabled={isProcessing}
//                 className="w-full py-4 bg-zinc-900 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all active:scale-[0.99] disabled:opacity-50"
//               >
//                 {isProcessing ? <Loader2 className="animate-spin w-3.5 h-3.5" /> : <CreditCard className="w-3.5 h-3.5" />}
//                 {isProcessing ? "Initialising..." : "Secure Payment • ₹500"}
//               </button>

//               <div className="mt-6 flex flex-col items-center gap-3">
//                 <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
//                   <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> SSL Encrypted Gateway
//                 </div>
//               </div>
//             </div>
//           </aside>

//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper Components
// const InputField = ({ label, name, value, onChange, placeholder, type = "text", icon }: any) => (
//   <div className="space-y-1.5">
//     <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest ml-1">{label}</label>
//     <div className="relative">
//       {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300">{icon}</div>}
//       <input 
//         name={name} type={type} value={value} onChange={onChange} required 
//         className={cn(
//           "w-full bg-white border border-zinc-200 rounded-lg py-3 px-4 text-xs outline-none focus:border-zinc-900 transition-all font-medium",
//           icon && "pl-11"
//         )} 
//         placeholder={placeholder} 
//       />
//     </div>
//   </div>
// );

// const SelectField = ({ label, name, value, onChange, options }: any) => (
//   <div className="space-y-1.5">
//     <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest ml-1">{label}</label>
//     <div className="relative">
//       <select name={name} value={value} onChange={onChange} className="w-full bg-white border border-zinc-200 rounded-lg py-3 px-4 text-xs outline-none focus:border-zinc-900 transition-all appearance-none font-medium cursor-pointer">
//         {options.map((opt: string) => <option key={opt}>{opt}</option>)}
//       </select>
//       <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-300 pointer-events-none" />
//     </div>
//   </div>
// );

// const SummaryItem = ({ label, value }: { label: string, value: string }) => (
//   <div className="flex justify-between text-xs">
//     <span className="text-zinc-500 font-medium">{label}</span>
//     <span className="font-bold text-zinc-900">{value}</span>
//   </div>
// );

// export default ApplyAndPayPage;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Phone, ChevronDown, CheckCircle2, 
  Loader2, ShieldCheck, UserCheck,
  ArrowLeft, Building2, Briefcase,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const ApplyPage = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
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
    if (errorMessage) setErrorMessage(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { fullName, email, phone, college, department } = formData;
    
    if (!fullName.trim() || !email.trim() || !phone.trim() || !college.trim() || !department.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    if (phone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return false;
    }

    return true;
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Submission failed");

      // Direct success flow
      setSuccess(true);
      setIsProcessing(false);
      setTimeout(() => router.push("/dashboard"), 3000);

    } catch (error: any) {
      setErrorMessage(error.message || "Something went wrong. Try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-emerald-50">
      
      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-sm text-center p-6">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="space-y-4 max-w-xs">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold">Application Sent</h2>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Thank you, {formData.fullName}. Your application has been received. Redirecting to dashboard...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="flex items-center justify-between mb-16">
           <button onClick={() => router.back()} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-all">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
           </button>
           <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Registration Portal 2026</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-7">
            <div className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Complete Application</h1>
              <p className="text-zinc-400 text-sm font-medium">Verify your details for the internship certificate.</p>
            </div>

            {/* ERROR NOTIFICATION */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleApply} className="space-y-12">
              <section className="space-y-6">
                <div className="flex items-center gap-2 border-b border-zinc-50 pb-2">
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Personal Identity</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
                  <InputField label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" />
                  <div className="md:col-span-2">
                    <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile number" icon={<Phone className="w-3.5 h-3.5" />} />
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-2 border-b border-zinc-50 pb-2">
                    <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Academic Background</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <InputField label="College / University" name="college" value={formData.college} onChange={handleChange} placeholder="Full Institution Name" />
                  </div>
                  <InputField label="Department" name="department" value={formData.department} onChange={handleChange} placeholder="e.g. CSE / IT" />
                  <SelectField label="Year of Study" name="year" value={formData.year} onChange={handleChange} options={["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"]} />
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-2 border-b border-zinc-50 pb-2">
                    <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Program Preference</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SelectField label="Domain" name="domain" value={formData.domain} onChange={handleChange} options={["MERN Stack", "Python / AI", "Java Spring Boot"]} />
                  <SelectField label="Duration" name="duration" value={formData.duration} onChange={handleChange} options={["1 Month", "3 Months"]} />
                  <SelectField label="Mode" name="mode" value={formData.mode} onChange={handleChange} options={["Online", "Offline"]} />
                </div>
              </section>
            </form>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-12 bg-zinc-50 border border-zinc-100 rounded-2xl p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">Application Summary</h3>
              <div className="space-y-4 mb-8">
                <SummaryItem label="Program" value={formData.domain} />
                <SummaryItem label="Duration" value={formData.duration} />
                <SummaryItem label="Mode" value={formData.mode} />
                <div className="h-px bg-zinc-200/50 my-4" />
                <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">
                  By clicking submit, you agree to the internship terms and code of conduct.
                </p>
              </div>

              <button 
                type="button"
                onClick={handleApply}
                disabled={isProcessing}
                className="w-full py-4 bg-zinc-900 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all active:scale-[0.99] disabled:opacity-50"
              >
                {isProcessing ? <Loader2 className="animate-spin w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                {isProcessing ? "Submitting..." : "Submit Application"}
              </button>

              <div className="mt-6 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secure Data Encryption
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InputField = ({ label, name, value, onChange, placeholder, type = "text", icon }: any) => (
  <div className="space-y-1.5">
    <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300">{icon}</div>}
      <input 
        name={name} type={type} value={value} onChange={onChange} required 
        className={cn(
          "w-full bg-white border border-zinc-200 rounded-lg py-3 px-4 text-xs outline-none focus:border-zinc-900 transition-all font-medium",
          icon && "pl-11"
        )} 
        placeholder={placeholder} 
      />
    </div>
  </div>
);

const SelectField = ({ label, name, value, onChange, options }: any) => (
  <div className="space-y-1.5">
    <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <select name={name} value={value} onChange={onChange} className="w-full bg-white border border-zinc-200 rounded-lg py-3 px-4 text-xs outline-none focus:border-zinc-900 transition-all appearance-none font-medium cursor-pointer">
        {options.map((opt: string) => <option key={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-300 pointer-events-none" />
    </div>
  </div>
);

const SummaryItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between text-xs">
    <span className="text-zinc-500 font-medium">{label}</span>
    <span className="font-bold text-zinc-900">{value}</span>
  </div>
);

export default ApplyPage;