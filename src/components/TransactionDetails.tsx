import type { Transaction } from "../types/transaction";

type TransactionDetailsProps = {
    transaction: Transaction;
    onBack: () => void;
    onDispute: (transaction: Transaction) => void;
};

export default function TransactionDetails({
    transaction,
    onBack,
    onDispute,
}: TransactionDetailsProps) {
    return (
        <section className="details-page">
            <button
                type="button"
                className="back-button"
                onClick={onBack}
            >
                ← Back to transactions
            </button>

            <h1>Transaction details</h1>

            <div className="details-card">
                <p className="eyebrow">CARD TRANSACTION</p>

                <h2>{transaction.merchant}</h2>

                <p className="details-amount">
                    −€{transaction.amount.toFixed(2)}
                </p>

                <dl className="details-list">
                    <div>
                        <dt>Date</dt>
                        <dd>{transaction.date}</dd>
                    </div>

                    <div>
                        <dt>Merchant</dt>
                        <dd>{transaction.merchant}</dd>
                    </div>

                    <div>
                        <dt>Reference</dt>
                        <dd>{transaction.id}</dd>
                    </div>
                </dl>

                <button
                    type="button"
                    className="primary-button"
                    onClick={() => onDispute(transaction)}
                >
                    Dispute transaction
                </button>
            </div>
        </section>
    );
}