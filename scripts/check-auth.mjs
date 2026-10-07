import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [auth, register, me, students, apply, paymentRecorder, notifications, notificationStream, notificationModel, userModel, enrollmentModel] = await Promise.all([
  read("src/lib/authOptions.ts"),
  read("src/app/api/auth/register/route.ts"),
  read("src/app/api/auth/me/route.ts"),
  read("src/app/api/students/route.ts"),
  read("src/app/api/apply/route.ts"),
  read("src/lib/record-razorpay-payment.ts"),
  read("src/app/api/admin/notifications/route.ts"),
  read("src/app/api/admin/notifications/stream/route.ts"),
  read("src/models/Notification.ts"),
  read("src/models/user.ts"),
  read("src/models/Enrollment.ts"),
]);

assert.doesNotMatch(auth, /token\.role\s*=\s*session\.role/);
assert.doesNotMatch(register, /bcrypt\.hash/);
assert.match(me, /installments\.0/);
assert.match(students, /requireRole\("admin"\)/);
assert.doesNotMatch(apply, /This enrollment already exists\. Sign in to make another payment\./);
assert.match(apply, /paymentId: \{ \$exists: false \}/);
assert.match(paymentRecorder, /trackedOrder\.enrollmentId/);
assert.match(paymentRecorder, /installment\.transactionId === paymentId/);
assert.match(paymentRecorder, /status: "processed"/);
assert.match(notifications, /requireRole\("admin"\)/);
assert.match(notificationStream, /requireRole\("admin"\)/);
assert.match(notificationModel, /expires:\s*60 \* 60 \* 24 \* 90/);
assert.match(userModel, /default: "public"/);
assert.match(userModel, /partialFilterExpression: \{ phone: \{ \$type: "string" \} \}/);
assert.match(enrollmentModel, /pre\("validate"/);
assert.match(enrollmentModel, /default: "payment_pending"/);

console.log("Authentication security checks passed.");
