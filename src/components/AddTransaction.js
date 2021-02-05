import React, { useState, useContext } from "react";
import { GlobalContext } from "../App";

const AddTransaction = () => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");

  const { addTransaction, noTransaction } = useContext(GlobalContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item && amount) {
      const newTransaction = {
        id: new Date().getTime().toString(),
        item,
        amount: +amount,
      };
      addTransaction(newTransaction);
      setItem("");
      setAmount("");
    } else {
      noTransaction();
    }
  };
  return (
    <div className="col col-md-4 mx-auto mt-3">
      <h5 className="mt-3">Add Transaction</h5>
      <hr className="mt-0 mb-1" />
      <form>
        <div className="form-group font-weight-bold">
          <label htmlFor="text">Item</label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="form-control"
            placeholder="Enter Item..."
          />
        </div>
        <div className="form-group font-weight-bold">
          <label htmlFor="amount">
            Amount <br />
            (expense is negative, income is positive)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control"
            placeholder="Enter Amount..."
          />
          <button
            className="btn btn-sm btn-success btn-block mt-2"
            onClick={handleSubmit}
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
