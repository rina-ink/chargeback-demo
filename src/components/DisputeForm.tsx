
import { useState } from "react";
import type { FormEvent } from "react";
import type { Transaction } from "../types/transaction";

type DisputeReason =
    | "not_received"
    | "incorrect_amount"
    | "not_recognized"
    | "other";

type DisputeFormProps = {
    transaction: Transaction;
    onBack: () => void;
};

export default function DisputeForm({
    transaction,
    onBack,
}: DisputeFormProps) {
    const [reason, setReason] = useState<DisputeReason | "">("");
    const [description, setDescription] = useState("");

    const isValid =
        reason !== "" && description.trim().length >= 10;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isValid) return;

        console.log("Dispute data:", {
            transactionId: transaction.id,
            reason,
            description: description.trim(),
        });

        window.alert("Dispute form validated successfully!");
    };

    return (
        <section className="dispute-page">
            <button
                type="button"
                className="back-button"
                onClick={onBack}
            >
                ← Back to transaction
            </button>

            <h1>Dispute transaction</h1>

            <form className="dispute-form" onSubmit={handleSubmit}>
                <div className="dispute-transaction">
                    <p className="eyebrow">SELECTED TRANSACTION</p>

                    <div className="dispute-transaction-row">
                        <strong>{transaction.merchant}</strong>
                        <strong>−€{transaction.amount.toFixed(2)}</strong>
                    </div>

                    <p>{transaction.date}</p>
                </div>

                <fieldset className="dispute-fieldset">
                    <legend>
                        Why are you disputing this transaction?
                    </legend>

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="not_received"
                            checked={reason === "not_received"}
                            onChange={() => setReason("not_received")}
                        />
                        Product or service not received
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="incorrect_amount"
                            checked={reason === "incorrect_amount"}
                            onChange={() => setReason("incorrect_amount")}
                        />
                        Incorrect amount charged
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="not_recognized"
                            checked={reason === "not_recognized"}
                            onChange={() => setReason("not_recognized")}
                        />
                        I don't recognize this transaction
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="reason"
                            value="other"
                            checked={reason === "other"}
                            onChange={() => setReason("other")}
                        />
                        Other reason
                    </label>
                </fieldset>

                <div className="dispute-description">
                    <label htmlFor="dispute-description">
                        Tell us what happened
                    </label>

                    <textarea
                        id="dispute-description"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        placeholder="Describe the issue with your transaction..."
                        rows={4}
                        minLength={10}
                        maxLength={1000}
                        required
                    />

                    <p className="character-count">
                        {description.length} / 1000 characters
                        (minimum 10)
                    </p>
                </div>

                <button
                    type="submit"
                    className="primary-button"
                    disabled={!isValid}
                >
                    Continue
                </button>
            </form>
        </section>
    );
}
