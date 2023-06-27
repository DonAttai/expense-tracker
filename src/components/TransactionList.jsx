import React, { useContext } from "react";
import Transactions from "./Transactions";
import { TransactionContext } from "../context/TransactionContext";
import useSWR from "swr";
import { toast } from "react-toastify";
import Loader from "./Loader";
const TransactionList = () => {
  const { fetcher, dispatch } = useContext(TransactionContext);
  const {
    data: transactions,
    isLoading,
    error,
  } = useSWR("/transactions", fetcher, {
    onSuccess: (data) => {
      dispatch({ type: "GET_TRANSACTIONS", payload: data });
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    toast(error.response?.data.error.message, { type: "error" });
  }
  return (
    <div className="row">
      <div className="col col-md-6 mx-auto mt-4 mb-5">
        <h5>Transaction(s)</h5>
        <hr className="mt-0" />
        {transactions.length ? (
          <ul className="list-group">
            {transactions.map((transaction) => (
              <Transactions key={transaction._id} transaction={transaction} />
            ))}
          </ul>
        ) : (
          <h3>No Transaction(s)</h3>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
