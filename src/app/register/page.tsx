import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 flex flex-col items-center">
      <Link href="/" className="mb-10 block transition-transform hover:scale-105">
        <div className="relative h-16 w-48 flex items-center justify-center">
          <Image src="/logo.png" alt="Inetz Logo" fill className="object-contain" />
        </div>
      </Link>

      <div className="mx-auto w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-10 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Join Inetz</h1>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
           Take the first step towards your dream tech career today.
        </p>

        <form className="mt-10 space-y-6">
          <label className="block">
            <div className="text-sm font-medium">Full name</div>
            <input
              type="text"
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-orange-400 dark:border-zinc-800 dark:bg-zinc-950"
              placeholder="Your name"
            />
          </label>
          <label className="block">
            <div className="text-sm font-medium">Email</div>
            <input
              type="email"
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-orange-400 dark:border-zinc-800 dark:bg-zinc-950"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <div className="text-sm font-medium">Password</div>
            <input
              type="password"
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none transition focus:border-orange-400 dark:border-zinc-800 dark:bg-zinc-950"
              placeholder="••••••••"
            />
          </label>

          <button
            type="button"
            className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}

