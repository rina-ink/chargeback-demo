
export type DisputeReason =
    | "not_received"
    | "incorrect_amount"
    | "not_recognized"
    | "other";

export type DisputeData = {
    reason: DisputeReason | "";
    description: string;
};

export const reasonLabels: Record<DisputeReason, string> = {
    not_received: "Product or service not received",
    incorrect_amount: "Incorrect amount charged",
    not_recognized: "I don't recognize this transaction",
    other: "Other reason",
};
