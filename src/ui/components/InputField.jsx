import React from "react";

const InputField = ({ id, type, placeholder, text, title, onChange, value }) => {
  return (
    <div className="flex justify-start">
      <div className=" p-1 rounded-xl w-96 text-sky-900 flex flex-col">
        <label className="text-lg font-bold mb-2 text-white" htmlFor={id}>{text}</label>
        <input
          className="bg-white w-70 px-3 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-white border-white"
          id={id}
          type={type}
          placeholder={placeholder}
          title={title}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default InputField;
