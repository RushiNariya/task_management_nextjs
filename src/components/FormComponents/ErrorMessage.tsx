import React from "react";

function ErrorMessage({ error = "" }) {
  return <div className="absolute text-[0.65rem] text-red-400">{error}</div>;
}

export default ErrorMessage;
