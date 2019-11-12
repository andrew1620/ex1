import React, { useState } from "react";
export default ({ layerStyle }) => {
  const divStyle = {
    height: "50%",
    border: "3px solid #eee",
    // borderRadius: "15px",
    padding: "10px",
    display: "flex",
    boxSizing: "border-box"
  };

  return (
    <div style={divStyle}>
      <div></div>
    </div>
  );
};
