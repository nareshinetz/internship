import assert from "node:assert/strict";
import { isValidStudentText, normalizeStudentEmail, normalizeStudentPhone } from "../src/lib/admin-student-input.ts";

assert.equal(normalizeStudentPhone("+91 98765-43210"), "919876543210");
assert.equal(normalizeStudentPhone("Loyola College 9876543210"), null);
assert.equal(normalizeStudentPhone("9876543210"), "9876543210");
assert.equal(normalizeStudentPhone("123"), null);
assert.equal(normalizeStudentEmail(" Student@Example.com "), "student@example.com");
assert.equal(normalizeStudentEmail(""), "");
assert.equal(normalizeStudentEmail("not an email"), null);
assert.equal(isValidStudentText("Loyola College 2"), true);
assert.equal(isValidStudentText("9876543210"), false);
assert.equal(isValidStudentText(""), false);
console.log("Admin student input validation passed.");
