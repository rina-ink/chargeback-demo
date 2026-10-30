import type { Transaction } from "../types/transaction";

type TransactionCardProps = {
    transaction: Transaction;
    onSelect: (transaction: Transaction) => void;
};

export default function TransactionCard({
    transaction,
    onSelect,
}: TransactionCardProps) {
    return (
        <article className="transaction-card">
            <button
                type="button"
                className="transaction-link"
                onClick={() => onSelect(transaction)}
                aria-label={`View transaction from ${transaction.merchant}`}
            >
                <div>
                    <h3>{transaction.merchant}</h3>
                    <p>{transaction.date}</p>
                </div>

                <div className="transaction-right">
                    <strong>
                        −€{transaction.amount.toFixed(2)}
                    </strong>

                    <span
                        className="transaction-chevron"
                        aria-hidden="true"
                    >
                        ›
                    </span>
                </div>
            </button>
        </article>
    );
}