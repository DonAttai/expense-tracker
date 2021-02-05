import React, { useReducer } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import Expenses from "./components/Expenses";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";
import reducer from "./context/reducer";
import axios from "axios";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const defaultState = {
  transactions: [],
  modalContent: "",
  error: null,
  isLoading: true,
};

export const GlobalContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);

  // ACTIONS

  const getTransactions = async () => {
    try {
      const url =
        "https://attai-expense-tracker.herokuapp.com/api/transactions";

      const res = await axios.get(url);
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  };
  const removeTransaction = async (id) => {
    try {
      await axios.delete(
        `https://attai-expense-tracker.herokuapp.com/api/transactions/${id}`
      );
      dispatch({
        type: "REMOVE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const url =
        "https://attai-expense-tracker.herokuapp.com/api/transactions/";
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(url, transaction, config);
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  };
  const noTransaction = () => {
    dispatch({
      type: "NO_TRANSACTION",
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        getTransactions,
        removeTransaction,
        addTransaction,
        isLoading: state.isLoading,
        error: state.error,
        modalContent: state.modalContent,
        noTransaction,
      }}
    >
      <div className="container mt-4">
        <Header />

        <div className="mt-3">
          <Balance />
          <Expenses />
          <TransactionList />
          {/* {state.isModalOpen && <Modal />} */}
          <AddTransaction />
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
