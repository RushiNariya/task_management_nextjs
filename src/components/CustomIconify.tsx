"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

function CustomIconify({
  width,
  height,
  rotate,
  icon = "iconamoon:shield-yes-bold",
  color = "",
  style = {},
  className = "",
  fontSize = "",
  onClick = () => {},
}: any) {
  return (
    <>
      <Icon
        style={style}
        className={className}
        fontSize={fontSize && fontSize}
        icon={icon}
        color={color && color}
        width={width && width}
        height={height && height}
        rotate={rotate && rotate}
        onClick={onClick}
      />
    </>
  );
}

export default CustomIconify;
