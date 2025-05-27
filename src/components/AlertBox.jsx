import React from "react";

const AlertBox = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded shadow-md text-center w-80">
        <h2 className="text-xl font-bold mb-2">Alert!</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default AlertBox;
