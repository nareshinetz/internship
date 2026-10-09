export type DeleteMode = "partial" | "full";

export function deletionBlockReason(
  mode: DeleteMode,
  record: { installmentCount: number; totalCollection: number; certificateStatus: string },
  hasRazorpayOrder: boolean,
) {
  if (hasRazorpayOrder)
    return "This enrollment has a Razorpay order and must be cancelled, not deleted.";
  if (mode === "partial" && (record.installmentCount > 0 || record.totalCollection > 0 || record.certificateStatus === "Issued"))
    return "This enrollment has fee or certificate history. Choose Full Delete to remove this enrollment and its embedded fee entries.";
  return null;
}
