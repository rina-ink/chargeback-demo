# Chargeback Demo

**A React and TypeScript application demonstrating a card transaction dispute workflow.**

Chargeback Demo is a frontend project built to explore how customers can review card transactions, report an issue, and submit a dispute through a clear, structured interface.

The project focuses on reusable React components, type-safe state management, form validation, asynchronous operations, accessibility, and automated testing.

## Features

### Transaction management
- View a list of sample card transactions
- Select a transaction to see its details
- Start a dispute for a selected transaction

### Dispute workflow
- Select a reason for disputing a transaction
- Describe the issue using a validated form
- Review the information before submission
- Navigate between steps while preserving form input
- Submit a dispute through a simulated asynchronous API
- View a confirmation with a reference ID, status, and timestamp

### Error handling
- Loading state during submission
- Disabled controls to prevent repeated submissions
- Error messages when submission fails
- Retry functionality after an unsuccessful request

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| TypeScript | Static typing and type-safe data handling |
| Vite | Development server and production build tooling |
| CSS | Responsive layout and component styling |
| Vitest | Automated test runner |
| React Testing Library | Component and integration testing |
| user-event | Simulated user interactions |
| jsdom | Browser-like DOM environment for tests |
| ESLint | Code quality and static analysis |

## Application Flow

```text
Transaction List
       |
       v
Transaction Details
       |
       v
Dispute Form
       |
       v
Review Dispute
       |
       v
Simulated API Submission
       |
       +---- Success ---> Confirmation
       |
       +---- Failure ---> Error Message
                              |
                              v
                            Retry
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd chargeback-demo
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal, typically:

`http://localhost:5173`

### Production Build

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Testing

The project uses Vitest and React Testing Library to verify user-visible behavior and the interaction between components.

Run tests in watch mode:

```bash
npm run test
```

Run tests once:

```bash
npm run test:run
```

### Implemented Tests

**Form validation**
- Continue is disabled when the form is empty
- Continue becomes enabled when the form is valid
- Continue remains disabled when the description is too short
- Continue remains disabled when only a dispute reason is selected

**Dispute submission**
- Successful submission displays a confirmation
- Failed submission displays an error
- A failed submission can be retried successfully
- Confirm dispute is disabled while the API request is pending

**Current test suite: 8 passing tests across 2 test files.**

API responses are mocked in integration tests to ensure predictable results without relying on random network failures.

## Project Structure

```text
src/
├── components/
│   ├── TransactionCard.tsx
│   ├── TransactionDetails.tsx
│   ├── DisputeForm.tsx
│   ├── DisputeForm.test.tsx
│   ├── DisputeReview.tsx
│   └── DisputeSuccess.tsx
├── services/
│   └── disputeApi.ts
├── test/
│   └── setup.ts
├── types/
│   ├── transaction.ts
│   └── dispute.ts
├── App.tsx
├── App.test.tsx
├── App.css
└── main.tsx
```

## Technical Decisions

### React state management

The application uses React's `useState` hook to manage the selected transaction, active screen, dispute form data, and submission status.

Form data is managed in the parent component and passed to child components through props. This allows users to navigate between the form and review screens without losing their input.

### TypeScript

Shared types define transaction and dispute data structures, helping maintain consistent interfaces between components and the API service.

### Asynchronous submission

The submission handler uses `async/await` with `try/catch/finally` to manage API responses, errors, and loading state.

The `finally` block resets the loading state after both successful and failed requests.

### Testing approach

Component tests verify form validation and interaction behavior.

Integration tests render the application and verify the complete dispute workflow while mocking the API service.

Tests focus on observable user behavior rather than internal component implementation details.

## Current Limitations

This project is a frontend demonstration, not a production banking application.

- Transactions use fictional sample data
- API submissions are simulated
- Disputes are not stored in a database
- Application state is not persisted across page reloads
- Authentication and real banking integrations are not implemented

## Potential Improvements

- Replace the simulated API with a backend service
- Persist disputes and display their status history
- Introduce React Router for URL-based navigation
- Add evidence attachment functionality
- Extend accessibility and automated test coverage
- Add end-to-end browser testing

## Disclaimer

This is an independent educational and portfolio project. No real banking transactions are processed.