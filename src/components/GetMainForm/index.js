import React from "react";
import "./style.css";
import { connect } from "react-redux";

const GetMainForm = ({ objects, workingWithChildLayer, layer, childLayer }) => {
  const formElemsArr = [];
  for (let prop in objects) {
    formElemsArr.push(getElems(prop));
  }
  console.log(workingWithChildLayer);
  const mainFormStyle = workingWithChildLayer
    ? {
        border: "1px solid #eee",
        borderTop: "1px solid transparent"
      }
    : { border: "1px solid #eee", borderTop: "1px solid #eee" };

  return (
    <div className="mainForm" style={mainFormStyle}>
      {formElemsArr}
    </div>
  );
};

export default connect(state => ({
  layer: state.layer,
  childLayer: state.childLayer
}))(GetMainForm);

function getElems(key) {
  const options = {
    shape: ["circle", "polyline", "polygon", "rectangle"],
    weight: [
      "normal",
      "bold",
      "bolder",
      "lighter",
      100,
      200,
      300,
      400,
      500,
      600,
      700,
      800,
      900
    ],
    opacity: [
      "0",
      "0.1",
      "0.2",
      "0.3",
      "0.4",
      "0.5",
      "0.6",
      "0.7",
      "0.8",
      "0.9",
      "1.0"
    ],
    lineCap: ["round"],
    lineJoin: ["round"],
    dashArray: ["null"],
    dashOffset: ["null"],
    fillRule: ["round"],
    fillOpacity: [
      "0",
      "0.1",
      "0.2",
      "0.3",
      "0.4",
      "0.5",
      "0.6",
      "0.7",
      "0.8",
      "0.9",
      "1.0"
    ]
  };
  switch (key) {
    case "color":
      return (
        <div>
          <label htmlFor={key} className="col-form-label">
            {key}
          </label>
          <input
            type="text"
            id={key}
            data-property={key}
            className="form-control"
          />
        </div>
      );
    default:
      return (
        <div>
          <label htmlFor={key} className="col-form-label">
            {key}
          </label>
          <select id={key} data-property={key} className="custom-select">
            {options[key].map(value => {
              return <option value={value}>{value}</option>;
            })}
          </select>
        </div>
      );
  }
}
