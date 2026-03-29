export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-3 max-w-prose text-zinc-600 dark:text-zinc-300">
        Add your contact form or details here.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-sm font-semibold">Email</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            hello@inetz.example
          </div>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-sm font-semibold">Phone</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            +1 (000) 000-0000
          </div>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-sm font-semibold">Address</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Your city, your country
          </div>
        </div>
      </div>
    </div>
  );
}

