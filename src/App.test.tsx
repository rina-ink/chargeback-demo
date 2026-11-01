
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { submitDispute } from "./services/disputeApi";
import type { DisputeResponse } from "./services/disputeApi";

// Replace the API function with a Vitest mock
vi.mock("./services/disputeApi", () => ({
    submitDispute: vi.fn(),
}));

const mockedSubmitDispute = vi.mocked(submitDispute);

// Helper: complete the dispute form and navigate to review
async function completeDisputeForm(
    user: ReturnType<typeof userEvent.setup>
) {
    // Select a transaction
    await user.click(
        screen.getByRole("button", {
            name: /view transaction from online store/i,
        })
    );

    // Open the dispute form
    await user.click(
        screen.getByRole("button", {
            name: /dispute transaction/i,
        })
    );

    // Select a reason
    await user.click(
        screen.getByRole("radio", {
            name: /product or service not received/i,
        })
    );

    // Enter a valid description
    await user.type(
        screen.getByRole("textbox", {
            name: /tell us what happened/i,
        }),
        "The product never arrived."
    );

    // Navigate to the review screen
    await user.click(
        screen.getByRole("button", {
            name: /continue/i,
        })
    );
}

describe("Dispute submission", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    // TEST 1: Successful submission
    it("shows a confirmation after successful submission", async () => {
        const user = userEvent.setup();

        mockedSubmitDispute.mockResolvedValue({
            id: "dispute-123",
            status: "submitted",
            submittedAt: "2026-11-01T10:00:00.000Z",
        });

        render(<App />);

        await completeDisputeForm(user);

        await user.click(
            screen.getByRole("button", {
                name: /confirm dispute/i,
            })
        );

        expect(
            await screen.findByRole("heading", {
                name: /dispute submitted/i,
            })
        ).toBeInTheDocument();

        expect(mockedSubmitDispute).toHaveBeenCalledWith({
            transactionId: "tx-001",
            reason: "not_received",
            description: "The product never arrived.",
        });

        expect(
            screen.getByText("dispute-123")
        ).toBeInTheDocument();
    });

    // TEST 2: Failed submission
    it("shows an error when submission fails", async () => {
        const user = userEvent.setup();

        mockedSubmitDispute.mockRejectedValue(
            new Error(
                "Unable to submit your dispute. Please try again."
            )
        );

        render(<App />);

        await completeDisputeForm(user);

        await user.click(
            screen.getByRole("button", {
                name: /confirm dispute/i,
            })
        );

        // Verify that the error message appears
        expect(
            await screen.findByRole("alert")
        ).toHaveTextContent(
            "Unable to submit your dispute. Please try again."
        );

        // The button should be enabled for another attempt
        expect(
            screen.getByRole("button", {
                name: /confirm dispute/i,
            })
        ).toBeEnabled();

        // The API should have been called exactly once
        expect(mockedSubmitDispute).toHaveBeenCalledOnce();
    });

    // TEST 3: Retry after failure
    it("allows retrying after a failed submission", async () => {
        const user = userEvent.setup();

        // First request fails, second request succeeds
        mockedSubmitDispute
            .mockRejectedValueOnce(new Error("Network error"))
            .mockResolvedValueOnce({
                id: "dispute-456",
                status: "submitted",
                submittedAt: "2026-11-01T10:00:00.000Z",
            });

        render(<App />);

        await completeDisputeForm(user);

        const confirmButton = screen.getByRole("button", {
            name: /confirm dispute/i,
        });

        // First attempt
        await user.click(confirmButton);

        expect(
            await screen.findByRole("alert")
        ).toHaveTextContent("Network error");

        expect(confirmButton).toBeEnabled();

        // Retry
        await user.click(confirmButton);

        // Verify successful submission
        expect(
            await screen.findByRole("heading", {
            name: /dispute submitted/i,
            })
        ).toBeInTheDocument();

        // Verify that two requests were made
        expect(mockedSubmitDispute).toHaveBeenCalledTimes(2);

        expect(
            screen.getByText("dispute-456")
        ).toBeInTheDocument();
    });

    // TEST 4: Disable submission while the API request is pending
    
    it("disables Confirm dispute while submission is pending", async () => {
        const user = userEvent.setup();

        // Create an API response that stays pending
        let resolveRequest!: (value: DisputeResponse) => void;

        mockedSubmitDispute.mockImplementation(
            () =>
                new Promise<DisputeResponse>((resolve) => {
                    resolveRequest = resolve;
                })
        );

        render(<App />);

        await completeDisputeForm(user);

        // Start the API request
        await user.click(
            screen.getByRole("button", {
                name: /confirm dispute/i,
            })
        );

        // The button should now be disabled
        const submittingButton = screen.getByRole("button", {
            name: /submitting/i,
        });

        expect(submittingButton).toBeDisabled();

        expect(mockedSubmitDispute).toHaveBeenCalledOnce();

        // Simulate the API finally responding
        resolveRequest({
            id: "dispute-789",
            status: "submitted",
            submittedAt: "2026-11-01T10:00:00.000Z",
        });

        // Verify the success screen appears
        expect(
            await screen.findByRole("heading", {
                name: /dispute submitted/i,
            })
        ).toBeInTheDocument();
    });

});
