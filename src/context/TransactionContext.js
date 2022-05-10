import React, { createContext, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";
const initialState = {
  transactions: [],
  modalContent: "",
  error: null,
};

export const TransactionContext = createContext(initialState);

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ACTIONS
  const getTransactions = async () => {
    try {
      const res = await axios.get(
        "https://attai-expense-tracker.herokuapp.com/api/transactions"
      );
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
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        modalContent: state.modalContent,
        error: state.error,
        getTransactions,
        removeTransaction,
        addTransaction,
        noTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
