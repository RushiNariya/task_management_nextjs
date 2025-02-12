import React from "react";

function ArrowLeftIcon({
  width = "34",
  height = "34",
  color = "#ABAAA7",
  onClick = () => {},
}: any) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M13.5574 25.5996L4.95825 17.0004L13.5574 8.40128"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.0417 17L5.19922 17"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowLeftIcon;
