import React, { useContext } from "react";
import { GlobalContext } from "../App";
import numberWithCommas from "../utils/format";

const Transactions = ({ transaction }) => {
  const { removeTransaction } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? "-" : "+";
  return (
    <>
      <li className="list-group-item d-flex justify-content-between">
        <span>{transaction.item}</span>
        <span>
          {sign}N{numberWithCommas(Math.abs(transaction.amount))}
        </span>
        <button
          className="btn btn-sm btn-danger float-right py-0"
          style={{ fontSize: "0.8em" }}
          onClick={() => removeTransaction(transaction._id)}
        >
          X
        </button>
      </li>
    </>
  );
};

export default Transactions;
