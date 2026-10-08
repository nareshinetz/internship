import assert from "node:assert/strict";
import { setEnrollmentStatus } from "../src/lib/enrollment-status.ts";

const enrollment = { status: "active", completedAt: undefined, cancelledAt: undefined };
const completedAt = new Date("2026-10-08T08:00:00.000Z");
setEnrollmentStatus(enrollment, "completed", completedAt);
assert.equal(enrollment.completedAt, completedAt);
assert.equal(enrollment.cancelledAt, undefined);
setEnrollmentStatus(enrollment, "completed", new Date("2026-10-09T08:00:00.000Z"));
assert.equal(enrollment.completedAt, completedAt);
setEnrollmentStatus(enrollment, "cancelled", new Date("2026-10-10T08:00:00.000Z"));
assert.equal(enrollment.completedAt, undefined);
assert.ok(enrollment.cancelledAt);
setEnrollmentStatus(enrollment, "active");
assert.equal(enrollment.status, "active");
assert.equal(enrollment.cancelledAt, undefined);
console.log("Enrollment status transitions passed.");
