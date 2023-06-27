import React from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import Expenses from "./components/Expenses";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container mt-4">
      <Header />

      <div className="mt-3">
        <Balance />
        <Expenses />
        <AddTransaction />
        <TransactionList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
