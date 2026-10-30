
import { useState } from "react";
import TransactionCard from "./components/TransactionCard";
import TransactionDetails from "./components/TransactionDetails";
import type { Transaction } from "./types/transaction";
import "./App.css";

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
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleTransactionClick = (
    transaction: Transaction
  ) => {
    setSelectedTransaction(transaction);
  };

  const handleBack = () => {
    setSelectedTransaction(null);
  };

  const handleDispute = (transaction: Transaction) => {
    window.alert(
      `Dispute flow for ${transaction.merchant} is coming next!`
    );
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
            onClick={handleBack}
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
        {selectedTransaction ? (
          <TransactionDetails
            transaction={selectedTransaction}
            onBack={handleBack}
            onDispute={handleDispute}
          />
        ) : (
          <>
            <header>
              <p className="eyebrow">YOUR ACCOUNT</p>

              <h1>Transactions</h1>

              <p className="subtitle">
                Review your recent card transactions.
              </p>
            </header>

            <section aria-label="Recent transactions">
              {transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onSelect={handleTransactionClick}
                />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
