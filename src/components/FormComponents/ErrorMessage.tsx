import React from "react";

function ErrorMessage({ error = "" }) {
  return <div className="text-red-400 text-[0.65rem] absolute">{error}</div>;
}

export default ErrorMessage;
