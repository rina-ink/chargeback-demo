
import type { FormEvent } from "react";
import type { Transaction } from "../types/transaction";
import type { DisputeData, DisputeReason } from "../types/dispute";
import { reasonLabels } from "../types/dispute";

type DisputeFormProps = {
    transaction: Transaction;
    data: DisputeData;
    onChange: (data: DisputeData) => void;
    onBack: () => void;
    onContinue: () => void;
};

export default function DisputeForm({
    transaction,
    data,
    onChange,
    onBack,
    onContinue,
}: DisputeFormProps) {
    const isValid =
        data.reason !== "" &&
        data.description.trim().length >= 10 &&
        data.description.length <= 1000;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isValid) return;

        onContinue();
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

                    {(Object.keys(reasonLabels) as DisputeReason[]).map(
                        (reason) => (
                            <label key={reason}>
                                <input
                                    type="radio"
                                    name="reason"
                                    value={reason}
                                    checked={data.reason === reason}
                                    onChange={() =>
                                        onChange({ ...data, reason })
                                    }
                                />
                                {reasonLabels[reason]}
                            </label>
                        )
                    )}
                </fieldset>

                <div className="dispute-description">
                    <label htmlFor="dispute-description">
                        Tell us what happened
                    </label>

                    <textarea
                        id="dispute-description"
                        value={data.description}
                        onChange={(event) =>
                            onChange({
                                ...data,
                                description: event.target.value,
                            })
                        }
                        placeholder="Describe the issue with your transaction..."
                        rows={4}
                        minLength={10}
                        maxLength={1000}
                        required
                    />

                    <p className="character-count">
                        {data.description.length} / 1000 characters
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
