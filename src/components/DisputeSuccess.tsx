
import type { DisputeResponse } from "../services/disputeApi";

type DisputeSuccessProps = {
    dispute: DisputeResponse;
    onDone: () => void;
};

export default function DisputeSuccess({
    dispute,
    onDone,
}: DisputeSuccessProps) {
    return (
        <section className="dispute-page">
            <div className="review-card success-card">
                <div className="success-icon" aria-hidden="true">
                    ✓
                </div>

                <h1>Dispute submitted</h1>

                <p className="subtitle">
                    Your dispute has been submitted successfully
                    in this demo.
                </p>

                <dl className="review-list">
                    <div>
                        <dt>Reference</dt>
                        <dd>{dispute.id}</dd>
                    </div>

                    <div>
                        <dt>Status</dt>
                        <dd>{dispute.status}</dd>
                    </div>

                    <div>
                        <dt>Submitted</dt>
                        <dd>
                            {new Date(
                                dispute.submittedAt
                            ).toLocaleString()}
                        </dd>
                    </div>
                </dl>

                <button
                    type="button"
                    className="primary-button"
                    onClick={onDone}
                >
                    Back to transactions
                </button>
            </div>
        </section>
    );
}
