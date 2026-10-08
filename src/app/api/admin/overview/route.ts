import { NextResponse } from "next/server";
import { requireRole } from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import { admissionChange, fillMonthlySeries, PaymentEntry, reportingWindow, summarizePayments } from "@/lib/ceo-dashboard";
import Enrollment from "@/models/Enrollment";

const visibleEnrollments = {
  status: { $ne: "cancelled" },
  $nor: [{ status: "payment_pending", "installments.0": { $exists: false } }],
};

export async function GET() {
  const auth = await requireRole("admin");
  if (auth.error) return auth.error;

  try {
    await connectToDatabase();
    const { from, todayStart, tomorrowStart, monthStart, previousMonthStart, previousPeriodEnd, months } = reportingWindow();
    const [enrollments, paymentRows, statusRows] = await Promise.all([
      Enrollment.aggregate([
        { $match: visibleEnrollments },
        {
          $facet: {
            totals: [{ $group: {
              _id: null,
              students: { $sum: 1 },
              billing: { $sum: "$totalBilling" },
              collected: { $sum: "$totalCollection" },
              pending: { $sum: "$pendingAmount" },
            } }],
            admissions: [
              { $match: { joinedAt: { $gte: from } } },
              { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$joinedAt", timezone: "Asia/Kolkata" } }, count: { $sum: 1 } } },
            ],
            today: [
              { $match: { joinedAt: { $gte: todayStart, $lt: tomorrowStart } } },
              { $count: "count" },
            ],
            currentAdmissions: [
              { $match: { joinedAt: { $gte: monthStart, $lt: tomorrowStart } } },
              { $count: "count" },
            ],
            previousAdmissions: [
              { $match: { joinedAt: { $gte: previousMonthStart, $lt: previousPeriodEnd } } },
              { $count: "count" },
            ],
            durations: [{ $group: {
              _id: "$duration",
              count: { $sum: 1 },
              billing: { $sum: "$totalBilling" },
              collected: { $sum: "$totalCollection" },
              pending: { $sum: "$pendingAmount" },
            } }],
          },
        },
      ]),
      Enrollment.aggregate<PaymentEntry>([
        { $match: visibleEnrollments },
        { $unwind: "$installments" },
        { $replaceRoot: { newRoot: "$installments" } },
      ]),
      Enrollment.aggregate<{ active: number; inactive: number }>([
        { $match: { status: { $in: ["active", "completed", "cancelled"] } } },
        { $group: { _id: "$userId", active: { $max: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] } } } },
        { $group: { _id: null, active: { $sum: "$active" }, inactive: { $sum: { $subtract: [1, "$active"] } } } },
      ]),
    ]);

    const enrollmentData = enrollments[0];
    // ponytail: legacy installments lack createdAt; parse their display dates until payment timestamps are backfilled.
    const collections = summarizePayments(paymentRows, from, todayStart, tomorrowStart);
    const series = fillMonthlySeries(months, enrollmentData.admissions, collections.monthly);
    const monthAdmissions = enrollmentData.currentAdmissions[0]?.count || 0;
    const previousAdmissions = enrollmentData.previousAdmissions[0]?.count || 0;
    const durations = { sixMonths: { count: 0, billing: 0, collected: 0, pending: 0 }, threeMonths: { count: 0, billing: 0, collected: 0, pending: 0 }, other: { count: 0, billing: 0, collected: 0, pending: 0 } };
    for (const item of enrollmentData.durations) {
      const duration = String(item._id || "").trim();
      const key = /^6\s*months?$/i.test(duration) ? "sixMonths" : /^3\s*months?$/i.test(duration) ? "threeMonths" : "other";
      durations[key].count += item.count;
      durations[key].billing += item.billing;
      durations[key].collected += item.collected;
      durations[key].pending += item.pending;
    }

    return NextResponse.json({
      success: true,
      totals: enrollmentData.totals[0] || { students: 0, billing: 0, collected: 0, pending: 0 },
      today: { admissions: enrollmentData.today[0]?.count || 0, collected: collections.today },
      monthAdmissions,
      admissionTrend: { ...admissionChange(monthAdmissions, previousAdmissions), previous: previousAdmissions },
      studentsByStatus: { active: statusRows[0]?.active || 0, inactive: statusRows[0]?.inactive || 0 },
      durations,
      series,
    });
  } catch (error) {
    console.error("Admin overview error:", error);
    return NextResponse.json({ success: false, error: "Could not load overview." }, { status: 500 });
  }
}
