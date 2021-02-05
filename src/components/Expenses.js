import React, { useContext } from "react";
import { GlobalContext } from "../App";
import numberWithCommas from "../utils/format";

const Expenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  // INCOME
  const positiveAmount = amounts.filter((amount) => amount > 0);
  const income = positiveAmount
    .reduce((total, amount) => (total += amount), 0)
    .toFixed(2);

  // EXPENSES
  const negativeAmount = amounts.filter((amount) => amount < 0);
  const expenses = (
    negativeAmount.reduce((total, amount) => (total += amount), 0) * -1
  ).toFixed(2);

  return (
    <div className="col col-md-4 mx-auto">
      <div className="card card-body">
        {/* <div className="container"> */}
        <div className="row">
          <div className="col text-center">
            <h5>INCOME</h5>
            <p className="text-success font-weight-bold ">
              N{numberWithCommas(income)}
            </p>
          </div>
          <div className="text-muted ">|</div>
          <div className="col text-center">
            <h5>EXPENSES</h5>
            <p className="text-danger font-weight-bold ">
              N{numberWithCommas(expenses)}
            </p>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Expenses;
