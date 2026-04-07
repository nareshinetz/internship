"use client";

export default function CTASection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 py-12 sm:py-20">
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        
        {/* Heading */}
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl text-white mb-6">
          Ready to Start Your Journey?
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-lg text-emerald-100/80 leading-relaxed font-medium">
          Subscribe to get exclusive career tips, training updates, and job opportunities delivered to your inbox.
        </p>

        {/* 🔥 BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Register Button */}
          <a
            href="/register"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-emerald-950 transition hover:bg-zinc-100 hover:scale-105 active:scale-95 shadow-lg"
          >
            Register Now
          </a>

          {/* Contact Button */}
          <a
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            Contact Now
          </a>
        </div>

      </div>
    </section>
  );
}