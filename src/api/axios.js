import axios from "axios";

const API_URL = () => {
  if (process.env.REACT_APP_NODE_ENV === "development") {
    return process.env.REACT_APP_LOCAL_API_URL;
  }
  return process.env.REACT_APP_API_URL;
};

const axiosInstance = axios.create({
  baseURL: API_URL(),
  headers: {
    "Content-Type": "application/json",
  },
});

export const deleteTransaction = async (id) => {
  const res = await axiosInstance.delete(`/transactions/${id}`);
  return res.data.data;
};

export const addTransaction = async (transaction) => {
  const res = await axiosInstance.post("/transactions", transaction);
  return res.data.data;
};

export default axiosInstance;
