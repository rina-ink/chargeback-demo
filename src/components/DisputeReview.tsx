
import type { Transaction } from "../types/transaction";
import type { DisputeData, DisputeReason } from "../types/dispute";
import { reasonLabels } from "../types/dispute";

type DisputeReviewProps = {
    transaction: Transaction;
    data: DisputeData;
    onBack: () => void;
    onConfirm: () => void;
};

export default function DisputeReview({
    transaction,
    data,
    onBack,
    onConfirm,
}: DisputeReviewProps) {
    if (!data.reason) return null;

    const reason = data.reason as DisputeReason;

    return (
        <section className="dispute-page">
            <button
                type="button"
                className="back-button"
                onClick={onBack}
            >
                ← Back to edit
            </button>

            <h1>Review your dispute</h1>

            <p className="subtitle">
                Please check the information before submitting.
            </p>

            <div className="review-card">
                <dl className="review-list">
                    <div>
                        <dt>Merchant</dt>
                        <dd>{transaction.merchant}</dd>
                    </div>

                    <div>
                        <dt>Amount</dt>
                        <dd>−€{transaction.amount.toFixed(2)}</dd>
                    </div>

                    <div>
                        <dt>Date</dt>
                        <dd>{transaction.date}</dd>
                    </div>

                    <div>
                        <dt>Reason</dt>
                        <dd>{reasonLabels[reason]}</dd>
                    </div>

                    <div>
                        <dt>Description</dt>
                        <dd>{data.description.trim()}</dd>
                    </div>
                </dl>

                <button
                    type="button"
                    className="primary-button"
                    onClick={onConfirm}
                >
                    Confirm dispute
                </button>
            </div>
        </section>
    );
}
