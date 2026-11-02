
import { useState } from "react";
import TransactionCard from "./components/TransactionCard";
import TransactionDetails from "./components/TransactionDetails";
import DisputeForm from "./components/DisputeForm";
import DisputeReview from "./components/DisputeReview";
import type { Transaction } from "./types/transaction";
import type { DisputeData } from "./types/dispute";
import {
  submitDispute,
  type DisputeResponse,
} from "./services/disputeApi";
import DisputeSuccess from "./components/DisputeSuccess";
import "./App.css";

type Screen =
  | "list"
  | "details"
  | "form"
  | "review"
  | "success";

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
    if (isSubmitting) return;

    setSelectedTransaction(null);
    setDisputeData(initialDisputeData);
    setSubmittedDispute(null);
    setSubmitError(null);
    setScreen("list");
  };

  const handleDispute = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setScreen("form");
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(
    null
  );

  const [submittedDispute, setSubmittedDispute] =
    useState<DisputeResponse | null>(null);

  const handleConfirm = async () => {
    if (
      !selectedTransaction ||
      !disputeData.reason ||
      disputeData.description.trim().length < 10 ||
      isSubmitting
    ) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await submitDispute({
        transactionId: selectedTransaction.id,
        reason: disputeData.reason,
        description: disputeData.description.trim(),
      });

      setSubmittedDispute(response);
      setScreen("success");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
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

    if (screen === "success" && submittedDispute) {
      return (
        <DisputeSuccess
          dispute={submittedDispute}
          onDone={handleBackToList}
        />
      );
    }

    return (
      <DisputeReview
        transaction={selectedTransaction}
        data={disputeData}
        onBack={() => setScreen("form")}
        onConfirm={handleConfirm}
        isSubmitting={isSubmitting}
        error={submitError}
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
