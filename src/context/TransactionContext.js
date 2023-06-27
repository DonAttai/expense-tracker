import React, { createContext, useReducer } from "react";
import { mutate } from "swr";
import reducer from "./reducer";

import axiosInstance, { deleteTransaction, addTransaction } from "../api/axios";
import { toast } from "react-toastify";
const initialState = {
  transactions: [],
  isLoading: false,
};

export const TransactionContext = createContext(initialState);

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ACTIONS

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const fetcher = async (url) => {
    const res = await axiosInstance.get(url);
    return res.data.data;
  };

  const removeTransactionMutation = async (id, item) => {
    try {
      await deleteTransaction(id);
      mutate("/transactions", true);
      dispatch({
        type: "REMOVE_TRANSACTION",
        payload: id,
      });
      toast(`${item} transaction removed`, { type: "success" });
    } catch (error) {
      toast(error.response?.data.error.message, { type: "error" });
    }
  };

  const addTransactionMutation = async (transaction, item) => {
    try {
      const data = await addTransaction(transaction);
      mutate("/transactions", true);
      dispatch({
        type: "ADD_TRANSACTION",
        payload: data,
      });
      toast(`${item} transaction was added`, { type: "success" });
    } catch (error) {
      toast(error.response?.data.error.message, { type: "error" });
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        ...state,
        setLoading,
        dispatch,
        fetcher,
        removeTransactionMutation,
        addTransactionMutation,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
