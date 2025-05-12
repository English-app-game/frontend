import React from "react";

const InputField = ({ id, type, placeholder, text, title, onChange, value, className, name, error }) => {
  return (
    <div className="flex justify-start">
      <div className={`${className ? className : 'w-96'} rounded-xl text-sky-900 flex flex-col`}>
        <label className="text-lg mt-1 text-white" htmlFor={id}>{text}</label>
        <input
          name={name}
          className={`${className ? className : 'w-70'} bg-white px-3 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-white border-white`}
          id={id}
          type={type}
          placeholder={placeholder}
          title={title}
          onChange={onChange}
          value={value}
        />
        {error && (
          <p className="text-black text-sm mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};

export default InputField;
