import assert from "node:assert/strict";
import { admissionChange, fillMonthlySeries, paymentDate, reportingWindow, summarizePayments } from "../src/lib/ceo-dashboard.ts";

const window = reportingWindow(new Date("2026-01-01T00:00:00Z"));
assert.equal(window.currentMonth, "2026-01");
assert.equal(window.months[0].key, "2025-02");
assert.equal(window.todayStart.toISOString(), "2025-12-31T18:30:00.000Z");
assert.equal(window.tomorrowStart.toISOString(), "2026-01-01T18:30:00.000Z");
assert.equal(window.previousMonthStart.toISOString(), "2025-11-30T18:30:00.000Z");
assert.equal(window.previousPeriodEnd.toISOString(), "2025-12-01T18:30:00.000Z");

const series = fillMonthlySeries(window.months, [{ _id: "2025-12", count: 2 }], [{ _id: "2025-12", collected: 500 }]);
assert.equal(series.find((month) => month.key === "2025-12")?.admissions, 2);
assert.equal(series.find((month) => month.key === "2025-12")?.collected, 500);
assert.equal(series.find((month) => month.key === "2026-01")?.admissions, 0);
assert.equal(paymentDate({ paidAmount: 100, date: "16 Sept 2026" })?.toISOString(), "2026-09-15T18:30:00.000Z");
assert.equal(paymentDate({ paidAmount: 100, date: "31 Feb 2026" }), null);
const collections = summarizePayments([
  { paidAmount: 500, date: "20 Dec 2025" },
  { paidAmount: 200, createdAt: "2026-01-01T08:00:00Z", date: "20 Dec 2025" },
], window.from, window.todayStart, window.tomorrowStart);
assert.deepEqual(collections.monthly, [{ _id: "2025-12", collected: 500 }, { _id: "2026-01", collected: 200 }]);
assert.equal(collections.today, 200);
assert.deepEqual(admissionChange(12, 10), { direction: "up", label: "20%" });
assert.deepEqual(admissionChange(8, 10), { direction: "down", label: "20%" });
console.log("CEO dashboard month buckets passed.");
