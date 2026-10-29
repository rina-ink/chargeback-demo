
import "./App.css";

type Transaction = {
  id: string;
  merchant: string;
  date: string;
  amount: number;
};

const transactions: Transaction[] = [
  {
    id: "tx-001",
    merchant: "Online Store",
    date: "12 October 2026",
    amount: 120,
  },
  {
    id: "tx-002",
    merchant: "Coffee Shop",
    date: "11 October 2026",
    amount: 4.5,
  },
  {
    id: "tx-003",
    merchant: "Supermarket",
    date: "9 October 2026",
    amount: 38.2,
  },
];

function App() {
  const handleTransactionClick = (
    transaction: Transaction
  ) => {
    console.log("Selected transaction:", transaction);
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>Banking Demo</h2>

        <nav aria-label="Main navigation">
          <a href="#overview">Overview</a>

          <a
            href="#transactions"
            className="active"
            aria-current="page"
          >
            Transactions
          </a>

          <a href="#disputes">Disputes</a>
        </nav>
      </aside>

      <main
        className="main-content"
        id="transactions"
      >
        <header>
          <p className="eyebrow">YOUR ACCOUNT</p>

          <h1>Transactions</h1>

          <p className="subtitle">
            Review your recent card transactions.
          </p>
        </header>

        <section aria-label="Recent transactions">
          {transactions.map((transaction) => (
            <article
              key={transaction.id}
              className="transaction-card"
            >
              <button
                type="button"
                className="transaction-link"
                onClick={() =>
                  handleTransactionClick(transaction)
                }
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
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
