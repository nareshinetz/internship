export function normalizeStudentPhone(value: unknown): string | null {
  if (typeof value !== "string" || !/^\+?[0-9 ()-]+$/.test(value.trim())) return null;
  const input = value.trim();
  const digits = input.replace(/\D/g, "");
  if (input.startsWith("+") && !digits.startsWith("91")) return null;
  const mobile = digits.startsWith("91") && digits.length === 12 ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(mobile) ? mobile : null;
}

export function studentPhoneVariants(phone: string): string[] {
  return [phone, `91${phone}`, `+91${phone}`];
}

export function normalizeStudentEmail(value: unknown): string | null {
  const email = String(value ?? "").trim().toLowerCase();
  return !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

export function isValidStudentText(value: unknown): boolean {
  return typeof value === "string" && /\p{L}/u.test(value.trim());
}

export function isValidAdminInitialPayment(paid: number, total: number): boolean {
  return Number.isFinite(paid) && Number.isFinite(total) && paid > 0 && total > 0 && paid <= total;
}
