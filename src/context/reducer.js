const reducer = (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
      };
    case "REMOVE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      const newTransaction = {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
      return newTransaction;
    case "NO_TRANSACTION":
      return {
        ...state,
        modalContent: "Please, Add Transaction",
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
