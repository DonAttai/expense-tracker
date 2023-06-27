import React, { useState } from "react";
import numberWithCommas from "../utils/format";
import Modal from "./Modal";

const Transactions = ({ transaction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sign = transaction.amount < 0 ? "-" : "+";
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span>{transaction.item}</span>
      <span>
        {sign}N{numberWithCommas(Math.abs(transaction.amount))}
      </span>
      <button
        className="btn btn-sm btn-danger float-right py-0"
        style={{ fontSize: "0.8em" }}
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        X
      </button>
      {isModalOpen && (
        <Modal
          {...transaction}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
    </li>
  );
};

export default Transactions;
