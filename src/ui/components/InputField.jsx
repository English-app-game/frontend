import React from "react";

const InputField = ({ type, placeholder, text }) => {
  return (
    <div className="flex justify-start">
      <div className=" p-1 rounded-xl  w-96 'text-sky-900'">
        <h3 className="text-l font-bold mb-1 text-white">{text}</h3>
        <input
          className="bg-white w-70 px-3 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-white border-white"
          type={type}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputField;
