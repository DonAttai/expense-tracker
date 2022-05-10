import React from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import Expenses from "./components/Expenses";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";
import { TransactionProvider } from "./context/TransactionContext";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <TransactionProvider>
      <div className="container mt-4">
        <Header />

        <div className="mt-3">
          <Balance />
          <Expenses />
          <TransactionList />
          <AddTransaction />
        </div>
      </div>
    </TransactionProvider>
  );
}

export default App;
