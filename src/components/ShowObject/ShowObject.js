import React from "react";

export default function ShowObject({ p }) {
  const divStyle = {
    border: "3px solid #eee",
    borderRadius: "15px",
    // borderRadius: "0px 15px 15px 0px",
    margin: "0 0px",
    padding: "10px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    width: "350px"
  };
  return <div style={divStyle}> {p} </div>;
}
