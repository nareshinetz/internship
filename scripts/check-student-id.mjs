import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [allocator, admin, recorder, register] = await Promise.all([
  read("src/lib/student-id.ts"),
  read("src/app/api/students/route.ts"),
  read("src/lib/record-razorpay-payment.ts"),
  read("src/app/api/auth/register/route.ts"),
]);

assert.match(allocator, /studentId: \{ \$exists: false \}/);
assert.match(allocator, /error\.code === 11000/);
assert.match(admin, /ensureStudentId\(user\._id, program\.duration/);
assert.match(recorder, /ensureStudentId\(trackedOrder\.userId, enrollment\.duration\)/);
assert.doesNotMatch(register, /studentId\s*:/);
console.log("Student ID assignment checks passed.");
