
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DisputeForm from "./DisputeForm";
import type { DisputeData } from "../types/dispute";

const mockTransaction = {
    id: "tx-001",
    merchant: "Online Store",
    date: "12 October 2026",
    amount: 120,
};

describe("DisputeForm", () => {
    // TEST 1: Continue is disabled when the form is empty
    it("disables Continue when the form is empty", () => {
        render(
            <DisputeForm
                transaction={mockTransaction}
                data={{ reason: "", description: "" }}
                onChange={vi.fn()}
                onBack={vi.fn()}
                onContinue={vi.fn()}
            />
        );

        expect(
            screen.getByRole("button", { name: /continue/i })
        ).toBeDisabled();
    });

    // TEST 2: Continue is enabled when the form is valid
    it("enables Continue when the form is valid", async () => {
        const user = userEvent.setup();
        const onContinue = vi.fn();

        function TestWrapper() {
            const [data, setData] = useState<DisputeData>({
                reason: "",
                description: "",
            });

            return (
                <DisputeForm
                    transaction={mockTransaction}
                    data={data}
                    onChange={setData}
                    onBack={vi.fn()}
                    onContinue={onContinue}
                />
            );
        }

        render(<TestWrapper />);

        const continueButton = screen.getByRole("button", {
            name: /continue/i,
        });

        // Initially, the button should be disabled
        expect(continueButton).toBeDisabled();

        // Select a dispute reason
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
            "The product I ordered never arrived."
        );

        // The button should now be enabled
        expect(continueButton).toBeEnabled();

        // Submit the form
        await user.click(continueButton);

        // Verify that onContinue was called exactly once
        expect(onContinue).toHaveBeenCalledOnce();
    });
});
