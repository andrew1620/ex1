import React, { useState } from "react";
export default ({ layerStyle }) => {
  const divStyle = {
    height: "50%",
    border: "3px solid #eee",
    borderRadius: "15px",
    padding: "10px",
    display: "flex"
  };

  const [objectStyle, setObjectStyle] = useState({
    height: "60%",
    width: "60%",
    margin: "auto"
  });

  const parseLayerStyle = layerStyle => {
    let styles = {};
    for (let prop in layerStyle) {
      if (
        prop === "lineCap" ||
        prop === "lineJoin" ||
        prop === "dashArray" ||
        prop === "dashOffset"
      ) {
        continue;
      } else {
        styles[prop] = layerStyle[prop];
      }
    }
    // setObjectStyle(styles);
  };
  parseLayerStyle(objectStyle);

  // setObjectStyle(Object.assign(objectStyle, layerStyle));
  // console.log(layerStyle);
  return (
    <div style={divStyle}>
      <div style={objectStyle}></div>
    </div>
  );
};
