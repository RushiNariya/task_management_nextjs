"use client";

import React from "react";

function Button({
  children,
  className = "",
  disabled = false,
  type = "button",
  onClick = () => {},
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}) {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        onClick={onClick}
        className={
          (className =
            "rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none disabled:opacity-60 " +
            " " +
            className)
        }
      >
        {children}
      </button>
    </>
  );
}

export default Button;
