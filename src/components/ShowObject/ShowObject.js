import React from "react";

export default function ShowObject({ p }) {
  const divStyle = {
    border: "3px solid #eee",
    margin: "0 0px",
    padding: "10px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    maxWidth: "350px",
    minWidth: "150px",
    height: "50%",
    overflow: "auto"
  };
  return <div style={divStyle}> {p} </div>;
}
