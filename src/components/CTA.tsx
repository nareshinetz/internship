"use client";

export default function CTASection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 py-20 sm:py-28">
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        
        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight">
          Ready to Start Your Journey?
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-emerald-100 leading-relaxed">
          Subscribe to get exclusive career tips, training updates, and job opportunities delivered to your inbox.
        </p>

        {/* 🔥 BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Register Button */}
          <a
            href="/register"
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
          >
            Register Now
          </a>

          {/* Contact Button */}
          <a
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            Contact Now
          </a>
        </div>

      </div>
    </section>
  );
}