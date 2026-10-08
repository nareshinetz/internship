import type { IEnrollment } from "@/models/Enrollment";

type Status = "active" | "completed" | "cancelled";

export function setEnrollmentStatus(
  enrollment: Pick<IEnrollment, "status" | "completedAt" | "cancelledAt">,
  status: Status,
  now = new Date(),
) {
  if (enrollment.status === status) return;
  enrollment.status = status;
  enrollment.completedAt = status === "completed" ? now : undefined;
  enrollment.cancelledAt = status === "cancelled" ? now : undefined;
}
