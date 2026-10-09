import assert from "node:assert/strict";
import { deletionBlockReason } from "../src/lib/student-deletion.ts";

const unpaid = { installmentCount: 0, totalCollection: 0, certificateStatus: "Pending" };
const paid = { installmentCount: 1, totalCollection: 500, certificateStatus: "Pending" };
assert.equal(deletionBlockReason("partial", unpaid, false), null);
assert.match(deletionBlockReason("partial", paid, false), /fee or certificate history/);
assert.equal(deletionBlockReason("full", paid, false), null);
assert.match(deletionBlockReason("full", unpaid, true), /Razorpay order/);
console.log("Student deletion safeguards passed.");
