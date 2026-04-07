"use client";

import { useRef, useState } from "react";

export function HeroInternship() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <section className="relative overflow-hidden min-h-[100dvh] lg:h-screen flex items-center py-20 lg:py-0">
      {/* Background gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_circle_at_15%_0%,rgba(249,115,22,0.28),transparent_55%),radial-gradient(800px_circle_at_90%_20%,rgba(59,130,246,0.22),transparent_55%),linear-gradient(to_bottom,rgba(255,255,255,0.9),rgba(255,255,255,0.7))] dark:bg-[radial-gradient(1200px_circle_at_15%_0%,rgba(249,115,22,0.18),transparent_55%),radial-gradient(800px_circle_at_90%_20%,rgba(59,130,246,0.16),transparent_55%),linear-gradient(to_bottom,rgba(10,10,10,0.82),rgba(10,10,10,0.65))]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-16">
        {/* Grid — stretch both columns to the same height */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 min-h-[66vh]">

          {/* ── Left ── */}
          <div className="flex flex-col justify-center space-y-5 h-full lg:h-full lg:min-h-[66vh]">
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
              Stop Learning Only in Theory. Start Building 
              <span className="block bg-gradient-to-r from-orange-500 via-orange-400 to-sky-500 bg-clip-text text-transparent">
                Real Projects
              </span>
            </h1>

            <p className="max-w-prose text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Join a project-driven internship program where students code daily, complete real tasks, work on practical applications, and gain the confidence to attend interviews.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/programs"
                className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-bold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-lg hover:scale-105 active:scale-95"
              >
                View all courses
              </a>
              <a
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-8 text-sm font-bold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-100 dark:hover:bg-zinc-900/30 shadow-md hover:scale-105 active:scale-95"
              >
                Request a call
              </a>
            </div>
          </div>

          {/* ── Right — Video ── */}
          <div className="relative h-[300px] sm:h-[450px] lg:h-full lg:min-h-[66vh] group/right">
            {/* Outer glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[3rem] bg-gradient-to-r from-orange-500/25 via-sky-500/20 to-fuchsia-500/20 blur-xl opacity-70 group-hover/right:opacity-100 transition-opacity duration-500"
            />
            {/* Pulse ring */}
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-[2.4rem] border-2 border-orange-400/30 animate-pulse"
            />

            {/* Card wrapper — same height as left column */}
            <div className="relative h-full rounded-[2rem] border border-zinc-200 bg-white/70 p-3 shadow-xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/45 flex flex-col transition-all duration-500">

              {/* Video — fills remaining card height */}
              <div className="relative flex-1 overflow-hidden rounded-[1.4rem] bg-black min-h-0 group">
                <video
                  ref={videoRef}
                  src="/intro-vdo.mp4"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover rounded-[1.4rem] transition-transform duration-1000 group-hover:scale-110"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                />

                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-[1.4rem]" />

                {/* Top-left badge */}
                <div className="absolute left-3 top-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                    Inetz Intro
                  </span>
                </div>

                {/* Play / Pause button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "Pause video" : "Play video"}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg backdrop-blur transition-all duration-200 group-hover:scale-110 group-hover:bg-white dark:bg-white/15 dark:text-white ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                      }`}
                  >
                    {playing ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 translate-x-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
