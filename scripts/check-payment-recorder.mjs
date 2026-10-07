import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/lib/record-razorpay-payment.ts", import.meta.url), "utf8");
const claim = source.indexOf("const claim = await RazorpayOrder.updateOne(");
const save = source.indexOf("await enrollment.save({ session });");
const end = source.indexOf("await session.endSession();");
assert.match(source, /session\.withTransaction\(\s*async \(\) =>/);
assert.match(source, /paymentId:\s*\{\s*\$exists:\s*false\s*\},\s*status:\s*\{\s*\$ne:\s*"processed"\s*\}/);
assert.match(source, /if \(currentOrder\.status === "processed"\)/);
assert.ok(claim > 0 && claim < save && save < end);
assert.ok(source.indexOf("await sendPaymentReceipt(") > end);
console.log("Payment recorder transaction checks passed.");
