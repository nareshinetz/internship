export function normalizeStudentPhone(value: unknown): string | null {
  if (typeof value !== "string" || !/^\+?[0-9 ()-]+$/.test(value.trim())) return null;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15 ? digits : null;
}

export function normalizeStudentEmail(value: unknown): string | null {
  const email = String(value ?? "").trim().toLowerCase();
  return !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

export function isValidStudentText(value: unknown): boolean {
  return typeof value === "string" && /\p{L}/u.test(value.trim());
}
