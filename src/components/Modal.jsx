import React, { useContext, useEffect, useRef, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Modal = ({ _id, item, setIsModalOpen, isModalOpen }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dialogRef = useRef(null);
  const { removeTransactionMutation } = useContext(TransactionContext);

  useEffect(() => {
    if (isModalOpen) {
      return dialogRef.current?.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setIsModalOpen((prev) => !prev);
        }
      });
    }
  }, [isModalOpen, setIsModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      return dialogRef.current?.showModal();
    } else {
      return dialogRef.current?.close();
    }
  }, [isModalOpen]);

  const deleteTransaction = () => {
    setIsModalOpen((prev) => !prev);
    setIsLoading((prev) => !prev);
    removeTransactionMutation(_id, item);
    setIsLoading((prev) => !prev);
  };

  return (
    <dialog ref={dialogRef} className="mx-auto my-auto">
      <div className="card ">
        <div className="card-body">
          <h4 className="text-center">Remove Transaction</h4>
          <hr />
          <p className="text-center font-weight-bold">Are you sure?</p>
          <hr />
          <span className="d-flex justify-content-center ">
            <button
              className="btn btn-sm btn-secondary mx-2"
              onClick={() => setIsModalOpen((prev) => !prev)}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm btn-danger mx-2 px-3 text-center"
              onClick={() => deleteTransaction(_id)}
              disabled={isLoading}
            >
              {isLoading ? "Wait..." : "Yes"}
            </button>
          </span>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
