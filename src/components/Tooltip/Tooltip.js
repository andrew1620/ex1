import React, { useState, useEffect } from "react";

export default function({ tooltipProps }) {
  const [spanStyle] = useState({
    border: "1px solid black",
    boxSizing: "border-box",
    padding: "5px 5px",
    fontFamily: "Arial",
    fontStyle: "italic",
    borderRadius: "5px",
    fontSize: "13px",
    position: "fixed",
    background: "white",
    // display: "none",
    zIndex: "1"
  });
  let spanText = tooltipProps.tooltipText;
  // let styleBuf = {};
  useEffect(() => {
    spanText = tooltipProps.tooltipText;
    // styleBuf.display = "inline"; //Спросить как правильно работать с юзСтейт и почему возникает ошибка
    // setSpanStyle(Object.assign(spanStyle, spanStyle, styleBuf));
  });

  // console.log(tooltipProps);
  return <span style={spanStyle}>{spanText}</span>;
}
