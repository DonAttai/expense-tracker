import React, { useContext, useEffect } from "react";
import Transactions from "./Transactions";
import { TransactionContext } from "../context/TransactionContext";

const TransactionList = () => {
  const { transactions, getTransactions } = useContext(TransactionContext);
  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="row">
      <div className="col col-md-4 mx-auto mt-4 mb-5">
        <h5>Transaction(s)</h5>
        <hr className="mt-0" />
        <ul className="list-group">
          {transactions.map((transaction) => (
            <Transactions key={transaction._id} transaction={transaction} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
