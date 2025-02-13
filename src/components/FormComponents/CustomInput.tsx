"use client";

import React from "react";
import ErrorMessage from "./ErrorMessage";

function CustomInput({
  label = "",
  onChange = () => {},
  value = "",
  type = "text",
  className = "",
  name = "",
  error = false,
  helperText = "",
  placeHolder = "",
  disabled = false,
  required = false,
  onBlur,
}: {
  label?: string;
  onChange?: any;
  value?: string;
  type?: "email" | "password" | "text" | "number";
  className?: string;
  name?: string;
  error?: boolean;
  helperText?: string;
  placeHolder?: string;
  disabled?: boolean;
  required?: boolean;
  onBlur?: any;
}) {
  return (
    <>
      {label && (
        <label htmlFor={name} className="text-sm leading-7 text-gray-600">
          {label}
          {required && <span className="ms-1 text-red-400">*</span>}
        </label>
      )}
      <input
        name={name}
        id={name}
        autoComplete="off"
        onBlur={onBlur && onBlur}
        value={value}
        onChange={onChange}
        type={type}
        className={
          (className =
            "w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:bg-gray-100 " +
            className)
        }
        placeholder={placeHolder}
        disabled={disabled}
      />

      <div className="text-sm text-red-400">
        {error ? <ErrorMessage error={helperText} /> : null}
      </div>
    </>
  );
}

export default CustomInput;
