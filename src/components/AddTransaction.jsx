import React, { useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { toast } from "react-toastify";

const AddTransaction = () => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { addTransactionMutation } = useContext(TransactionContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(item && amount)) {
      toast("Enter Amount and Item", { type: "info" });
      return;
    }
    const newTransaction = {
      item,
      amount: +amount,
    };
    setIsLoading((prev) => !prev);
    await addTransactionMutation(newTransaction, item);
    setIsLoading((prev) => !prev);
    setItem("");
    setAmount("");
  };
  return (
    <div className="col col-md-6 mx-auto mt-3">
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
            disabled={isLoading}
          >
            {isLoading ? "Wait..." : "Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
