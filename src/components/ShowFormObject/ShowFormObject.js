import React from "react";
export default () => {
  const divStyle = {
    height: "50%",
    border: "3px solid #eee",
    borderRadius: "15px",
    padding: "10px",
    display: "flex"
  };
  return (
    <div style={divStyle}>
      <div
        style={{ height: "50%", border: "1px solid red", margin: "auto" }}
      ></div>
    </div>
  );
};
