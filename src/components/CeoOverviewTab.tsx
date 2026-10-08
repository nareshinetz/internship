"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertCircle, ArrowDownRight, ArrowUpRight, BookOpen, CalendarDays, Minus, RefreshCw, Users, Wallet } from "lucide-react";

interface MoneyStats {
  count: number;
  billing: number;
  collected: number;
  pending: number;
}

interface OverviewData {
  totals: { students: number; billing: number; collected: number; pending: number };
  today: { admissions: number; collected: number };
  monthAdmissions: number;
  admissionTrend: { direction: "up" | "down" | "flat"; label: string; previous: number };
  studentsByStatus: { active: number; inactive: number };
  durations: { sixMonths: MoneyStats; threeMonths: MoneyStats; other: MoneyStats };
  series: { key: string; label: string; admissions: number; collected: number }[];
}

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function MonthlyChart({ title, subtitle, series, field, currency }: {
  title: string;
  subtitle: string;
  series: OverviewData["series"];
  field: "admissions" | "collected";
  currency?: boolean;
}) {
  const peak = Math.max(1, ...series.map((item) => item[field]));
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      <div className="mt-7 flex h-56 items-end gap-1 sm:gap-2 border-b border-slate-200" role="img" aria-label={`${title}: ${series.map((item) => `${item.label} ${currency ? money(item[field]) : item[field]}`).join(", ")}`}>
        {series.map((item) => (
          <div key={item.key} className="flex h-full min-w-0 flex-1 flex-col justify-end group">
            <div className="mb-2 text-center text-[10px] font-semibold text-slate-600 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 tabular-nums">
              {currency ? money(item[field]) : item[field]}
            </div>
            <div
              className={`mx-auto w-full max-w-9 rounded-t-md ${field === "collected" ? "bg-blue-600" : "bg-emerald-600"}`}
              style={{ height: `${Math.max(item[field] ? 5 : 0, item[field] / peak * 88)}%` }}
              title={`${item.key}: ${currency ? money(item[field]) : item[field]}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-1 sm:gap-2">
        {series.map((item) => <span key={item.key} className="min-w-0 flex-1 text-center text-[10px] text-slate-500">{item.label}</span>)}
      </div>
    </section>
  );
}

export default function CeoOverviewTab() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/overview", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Could not load overview.");
      setData(result);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load overview.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  if (loading && !data) return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500">Loading executive overview…</div>;
  if (!data) return <div className="rounded-2xl border border-rose-200 bg-white p-8 text-sm text-rose-700"><AlertCircle className="mb-3" size={22} />{error}<button onClick={refresh} className="ml-3 font-semibold underline">Try again</button></div>;

  const cards = [
    { label: "Total enrollments", value: data.totals.students.toLocaleString("en-IN"), icon: Users, tone: "text-blue-700 bg-blue-50" },
    { label: "Total billing", value: money(data.totals.billing), icon: BookOpen, tone: "text-violet-700 bg-violet-50" },
    { label: "Fees collected", value: money(data.totals.collected), icon: Wallet, tone: "text-emerald-700 bg-emerald-50" },
    { label: "Outstanding balance", value: money(data.totals.pending), icon: AlertCircle, tone: "text-amber-700 bg-amber-50" },
    { label: "Admissions this month", value: data.monthAdmissions.toLocaleString("en-IN"), icon: CalendarDays, tone: "text-sky-700 bg-sky-50" },
  ];
  const durationCards = [
    { label: "6 months", stats: data.durations.sixMonths, tone: "text-violet-700 bg-violet-50" },
    { label: "3 months", stats: data.durations.threeMonths, tone: "text-blue-700 bg-blue-50" },
    { label: "Other durations & certificates", stats: data.durations.other, tone: "text-emerald-700 bg-emerald-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Executive dashboard</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">CEO Overview</h2>
          <p className="mt-2 text-sm text-slate-500">Admissions and collections across the enrollment portfolio.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 border-r border-slate-200 pr-4"><CalendarDays size={21} className="text-blue-700" /><span className="text-sm font-bold text-slate-900">Today’s summary</span></div>
          <div className="px-2"><p className="text-xs text-slate-500">Admissions</p><p className="text-lg font-bold text-slate-950 tabular-nums">{data.today.admissions}</p></div>
          <div className="px-2"><p className="text-xs text-slate-500">Fees collected</p><p className="text-lg font-bold text-slate-950 tabular-nums">{money(data.today.collected)}</p></div>
          <button onClick={refresh} disabled={loading} aria-label="Refresh overview" title="Refresh overview" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-50"><RefreshCw size={16} className={loading ? "animate-spin" : ""} /></button>
        </div>
      </div>

      {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">Showing last loaded figures. {error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(({ label, value, icon: Icon, tone }) => (
          <section key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className={`inline-flex rounded-xl p-2.5 ${tone}`}><Icon size={20} /></span>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950 tabular-nums">{value}</p>
            {label === "Admissions this month" && (
              <p className={`mt-3 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold ${data.admissionTrend.direction === "up" ? "bg-emerald-50 text-emerald-700" : data.admissionTrend.direction === "down" ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-600"}`}>
                {data.admissionTrend.direction === "up" ? <ArrowUpRight size={15} /> : data.admissionTrend.direction === "down" ? <ArrowDownRight size={15} /> : <Minus size={15} />}
                {data.admissionTrend.label} <span className="font-medium">vs same dates last month</span>
              </p>
            )}
          </section>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Active students</p>
          <p className="mt-2 text-3xl font-bold text-slate-950 tabular-nums">{data.studentsByStatus.active.toLocaleString("en-IN")}</p>
          <p className="mt-1 text-xs text-slate-500">People with at least one active program</p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Not active students</p>
          <p className="mt-2 text-3xl font-bold text-slate-950 tabular-nums">{data.studentsByStatus.inactive.toLocaleString("en-IN")}</p>
          <p className="mt-1 text-xs text-slate-500">People with completed or cancelled programs and none active</p>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {durationCards.map(({ label, stats, tone }) => (
          <section key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3"><span className={`rounded-xl px-3 py-2 text-sm font-bold ${tone}`}>{label}</span><span className="text-xl font-bold text-slate-950 tabular-nums">{stats.count} <small className="text-xs font-medium text-slate-500">enrollments</small></span></div>
            <div className="mt-5 border-t border-slate-100 pt-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total billing</p><p className="mt-1 text-xl font-bold text-slate-950 tabular-nums">{money(stats.billing)}</p></div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm"><div className="rounded-xl bg-emerald-50 p-3"><p className="text-slate-600">Collected</p><p className="mt-1 font-bold text-emerald-700 tabular-nums">{money(stats.collected)}</p></div><div className="rounded-xl bg-amber-50 p-3"><p className="text-slate-600">Outstanding</p><p className="mt-1 font-bold text-amber-700 tabular-nums">{money(stats.pending)}</p></div></div>
          </section>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <MonthlyChart title="Monthly fee collection" subtitle="Payments by recorded date · last 12 months" series={data.series} field="collected" currency />
        <MonthlyChart title="Monthly admissions" subtitle="Enrollments by joining month · last 12 months" series={data.series} field="admissions" />
      </div>
      <p className="text-xs text-slate-500">Lifetime totals include all recorded installments. For migrated payments without a timestamp, the chart uses the recorded payment date.</p>
    </div>
  );
}
