export interface MonthlyValue {
  _id: string;
  count?: number;
  collected?: number;
}

export interface PaymentEntry {
  paidAmount: number;
  createdAt?: Date | string;
  date?: string;
}

const monthsByName = new Map(["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].map((name, index) => [name, index]));

export function paymentDate(payment: PaymentEntry): Date | null {
  if (payment.createdAt) {
    const timestamp = new Date(payment.createdAt);
    if (!Number.isNaN(timestamp.getTime())) return timestamp;
  }
  const match = /^(\d{1,2})\s+([A-Za-z]{3,4})\s+(\d{4})$/.exec(payment.date?.trim() || "");
  if (!match) return null;
  const day = Number(match[1]);
  const month = monthsByName.get(match[2].slice(0, 3).toLowerCase());
  const year = Number(match[3]);
  if (month === undefined) return null;
  const date = new Date(Date.UTC(year, month, day) - 330 * 60_000);
  const indiaDate = new Date(date.getTime() + 330 * 60_000);
  return indiaDate.getUTCFullYear() === year && indiaDate.getUTCMonth() === month && indiaDate.getUTCDate() === day ? date : null;
}

export function reportingWindow(now = new Date()) {
  const indiaNow = new Date(now.getTime() + 330 * 60_000);
  const year = indiaNow.getUTCFullYear();
  const month = indiaNow.getUTCMonth();
  const day = indiaNow.getUTCDate();
  const todayStart = new Date(Date.UTC(year, month, day) - 330 * 60_000);
  const tomorrowStart = new Date(todayStart.getTime() + 86_400_000);
  const monthStart = new Date(Date.UTC(year, month, 1) - 330 * 60_000);
  const previousMonthStart = new Date(Date.UTC(year, month - 1, 1) - 330 * 60_000);
  const previousMonthLastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const previousPeriodEnd = new Date(Date.UTC(year, month - 1, Math.min(day, previousMonthLastDay) + 1) - 330 * 60_000);
  const from = new Date(Date.UTC(year, month - 11, 1) - 330 * 60_000);
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(Date.UTC(year, month - 11 + index, 1));
    return {
      key: `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`,
      label: date.toLocaleString("en-IN", { month: "short", timeZone: "UTC" }),
    };
  });
  return { from, todayStart, tomorrowStart, monthStart, previousMonthStart, previousPeriodEnd, currentMonth: months[11].key, months };
}

export function summarizePayments(payments: PaymentEntry[], from: Date, todayStart: Date, tomorrowStart: Date) {
  const monthly = new Map<string, number>();
  let today = 0;
  for (const payment of payments) {
    const paidAt = paymentDate(payment);
    if (!paidAt || paidAt < from || paidAt >= tomorrowStart) continue;
    const indiaDate = new Date(paidAt.getTime() + 330 * 60_000);
    const key = `${indiaDate.getUTCFullYear()}-${String(indiaDate.getUTCMonth() + 1).padStart(2, "0")}`;
    monthly.set(key, (monthly.get(key) || 0) + payment.paidAmount);
    if (paidAt >= todayStart) today += payment.paidAmount;
  }
  return { monthly: [...monthly].map(([_id, collected]) => ({ _id, collected })), today };
}

export function admissionChange(current: number, previous: number) {
  if (previous === 0) return { direction: current > 0 ? "up" : "flat", label: current > 0 ? "New" : "0%" };
  const change = Math.round((current - previous) / previous * 100);
  return { direction: change > 0 ? "up" : change < 0 ? "down" : "flat", label: `${Math.abs(change)}%` };
}

export function fillMonthlySeries(
  months: { key: string; label: string }[],
  admissions: MonthlyValue[],
  payments: MonthlyValue[],
) {
  const admissionsByMonth = new Map(admissions.map((item) => [item._id, item.count || 0]));
  const paymentsByMonth = new Map(payments.map((item) => [item._id, item.collected || 0]));
  return months.map(({ key, label }) => ({
    key,
    label,
    admissions: admissionsByMonth.get(key) || 0,
    collected: paymentsByMonth.get(key) || 0,
  }));
}
