
import { useState } from "react";
import TransactionCard from "./components/TransactionCard";
import TransactionDetails from "./components/TransactionDetails";
import DisputeForm from "./components/DisputeForm";
import DisputeReview from "./components/DisputeReview";
import type { Transaction } from "./types/transaction";
import type { DisputeData } from "./types/dispute";
import "./App.css";

type Screen = "list" | "details" | "form" | "review";

const initialDisputeData: DisputeData = {
  reason: "",
  description: "",
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
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [screen, setScreen] = useState<Screen>("list");

  const [disputeData, setDisputeData] =
    useState<DisputeData>(initialDisputeData);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDisputeData(initialDisputeData);
    setScreen("details");
  };

  const handleBackToList = () => {
    setSelectedTransaction(null);
    setDisputeData(initialDisputeData);
    setScreen("list");
  };

  const handleDispute = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setScreen("form");
  };

  const handleConfirm = () => {
    // API integration comes in the next step.
    console.log("Confirmed dispute:", {
      transactionId: selectedTransaction?.id,
      ...disputeData,
    });

    window.alert("Dispute reviewed successfully! API comes next.");
  };

  const renderContent = () => {
    if (screen === "list" || !selectedTransaction) {
      return (
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
      );
    }

    if (screen === "details") {
      return (
        <TransactionDetails
          transaction={selectedTransaction}
          onBack={handleBackToList}
          onDispute={handleDispute}
        />
      );
    }

    if (screen === "form") {
      return (
        <DisputeForm
          transaction={selectedTransaction}
          data={disputeData}
          onChange={setDisputeData}
          onBack={() => setScreen("details")}
          onContinue={() => setScreen("review")}
        />
      );
    }

    return (
      <DisputeReview
        transaction={selectedTransaction}
        data={disputeData}
        onBack={() => setScreen("form")}
        onConfirm={handleConfirm}
      />
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
            onClick={handleBackToList}
          >
            Transactions
          </a>
          <a href="#disputes">Disputes</a>
        </nav>
      </aside>

      <main className="main-content" id="transactions">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
