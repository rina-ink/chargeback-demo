
import type { DisputeReason } from "../types/dispute";

export type DisputeRequest = {
    transactionId: string;
    reason: DisputeReason;
    description: string;
};

export type DisputeResponse = {
    id: string;
    status: "submitted";
    submittedAt: string;
};

export async function submitDispute(
    data: DisputeRequest
): Promise<DisputeResponse> {
    // Simulate network latency
    await new Promise<void>((resolve) =>
        setTimeout(resolve, 1200)
    );

    // Simulate occasional server errors
    if (Math.random() < 0.2) {
        throw new Error(
            "Unable to submit your dispute. Please try again."
        );
    }

    console.log("Mock API request:", data);

    return {
        id: crypto.randomUUID(),
        status: "submitted",
        submittedAt: new Date().toISOString(),
    };
}

// mock API
