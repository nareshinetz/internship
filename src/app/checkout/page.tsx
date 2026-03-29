"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CreditCard, ShieldCheck, CheckCircle2, Building2, Wallet } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const course = searchParams.get("course");
  const duration = searchParams.get("duration");

  const paymentMethods = [
    { id: "upi", label: "UPI / QR Code", icon: Wallet, desc: "Pay with GPay, PhonePe, or PayTM" },
    { id: "card", label: "Debit / Credit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
    { id: "netbanking", label: "Net Banking", icon: Building2, desc: "All major Indian banks" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Section className="py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Summary */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                      <GraduationCapIcon className="h-7 w-7" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 font-serif">Enrollment Summary</h2>
                        <p className="text-zinc-500 font-medium">Review your specialization details before payment.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 py-8 border-y border-zinc-100 dark:border-zinc-800">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Selected Domain</span>
                        <p className="text-xl font-bold mt-1 text-zinc-900 dark:text-zinc-100">{course || "Not Selected"}</p>
                    </div>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Internship Duration</span>
                        <p className="text-xl font-bold mt-1 text-zinc-900 dark:text-zinc-100 uppercase">{duration || "Not Selected"}</p>
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    {[
                        "Industry Professional Certification",
                        "Real-world Project Implementation",
                        "Live Mentor Support & Access",
                        "Placement Reference Portal Entry"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 font-medium">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            {item}
                        </div>
                    ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 px-4">Payment Methods</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                    {paymentMethods.map((method) => (
                        <Card key={method.id} className="p-6 border-2 border-transparent hover:border-emerald-500 cursor-pointer group transition-all bg-white dark:bg-zinc-900 shadow-sm">
                            <method.icon className="h-8 w-8 text-zinc-400 group-hover:text-emerald-500 transition-colors mb-4" />
                            <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{method.label}</h4>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase mt-2 tracking-tighter">{method.desc}</p>
                        </Card>
                    ))}
                </div>
              </div>
            </div>

            {/* Right: Pricing Sidebar */}
            <div className="space-y-6">
              <Card className="p-8 border-2 border-emerald-500 bg-white dark:bg-zinc-900 shadow-xl rounded-[2.5rem]">
                <h3 className="text-xl font-bold mb-6">Order Total</h3>
                
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400 font-medium">
                        <span>Enrollment Fee</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-bold">₹ --,---</span>
                    </div>
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400 font-medium">
                        <span>Tax (GST 18%)</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-bold">₹ -,---</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 mb-8">
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Total Amount</span>
                            <p className="text-3xl font-bold text-emerald-600">₹ Pending</p>
                        </div>
                        <ShieldCheck className="h-8 w-8 text-emerald-500/20" />
                    </div>
                </div>

                <Button className="w-full h-16 rounded-2xl text-lg font-bold shadow-lg shadow-emerald-500/20">
                    Complete Enrollment
                </Button>
                
                <p className="mt-6 text-[10px] text-center text-zinc-400 font-bold uppercase tracking-widest">
                    SSL SECURED PAYMENT PORTAL
                </p>
              </Card>

              <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/10">
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold leading-relaxed text-center italic">
                    "Join over 5000+ students who have jumpstarted their tech careers with Inetz Technologies."
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Checkout...</div>}>
        <CheckoutContent />
      </Suspense>
      <Footer />
    </div>
  );
}
