"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Initial Setup
  useEffect(() => {
    const msg = searchParams.get("message");
    if (msg) setSuccessMsg(msg);
  }, [searchParams]);

  // 3. Login Submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("user", JSON.stringify(data));
        
        // Handle Callback Redirect
        const callbackUrl = searchParams.get("callback") || "/";
        router.push(callbackUrl);
        router.refresh();
      } else {
        setError(data.error || "Invalid email or password credentials");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Back to Home Link */}
      <div className="absolute top-8 left-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to website
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="relative h-12 w-40">
            <Image
              src="/logo.png"
              alt="Inetz Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>
        <h2 className="text-center text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
          Resident Portal
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          Secure access to your technical residency resources.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[440px]">
        <div className="bg-white dark:bg-zinc-900/50 py-10 px-6 shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800 sm:rounded-[2.5rem] sm:px-12 backdrop-blur-xl">
          
          {/* Status Messages */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 flex items-center gap-3 text-red-600 dark:text-red-400 text-xs font-bold"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </motion.div>
            )}
            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-xs font-bold"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                {successMsg}
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest text-zinc-400 mb-2 ml-1">
                Institutional Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-orange-500 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="block w-full pl-11 pr-4 py-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm outline-none transition-all focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500 focus:bg-white dark:focus:bg-zinc-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 ml-1">
                <label className="block text-[11px] font-black uppercase tracking-widest text-zinc-400">
                  Password
                </label>
                <Link href="#" className="text-[10px] font-bold text-zinc-400 hover:text-zinc-900 transition-colors">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-orange-500 transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-4 py-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm outline-none transition-all focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500 focus:bg-white dark:focus:bg-zinc-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-xl text-sm font-black uppercase tracking-widest text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 disabled:opacity-70 transition-all active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Authenticate"
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
            <p className="text-center text-xs text-zinc-500">
              New to the residency?{" "}
              <Link
                href="/register"
                className="font-black text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
        
        <p className="mt-10 text-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest italic">
          Inetz Technologies • Technical Academy Systems
        </p>
      </div>
    </div>
  );
}

// Main page component wrapped in Suspense for searchParams
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}