"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, Loader2, Mail, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message || "If that email has a password-based account, a reset link has been sent.");
    } catch {
      setMessage("If that email has a password-based account, a reset link has been sent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-8">
        <Link href="/login" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft size={15} /> Back to login
        </Link>
        <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <ShieldCheck size={24} />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">Reset your password</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Enter the email address registered with your password-based account.</p>

        {message && <p role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-slate-700" htmlFor="reset-email">Registered email</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-3 text-slate-400" size={17} />
            <input id="reset-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
          </div>
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60">
            {loading && <Loader2 size={16} className="animate-spin" />} Send reset link
          </button>
        </form>

        <div className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <p className="font-semibold">No access to your registered email?</p>
          <p className="mt-1">Contact iNetz support after identity verification. We can update your registered email address.</p>
          <p className="mt-2 font-semibold"><a href="tel:+919840234475" className="hover:underline">+91 98402 34475</a> · <a href="mailto:info@inetztech.com" className="hover:underline">info@inetztech.com</a></p>
        </div>
      </div>
    </main>
  );
}
