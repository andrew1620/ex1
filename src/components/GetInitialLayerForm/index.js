import React from "react";
import "./style.css";

const GetFormElem = ({ objects }) => {
  const formElemsArr = [];
  for (let prop in objects) {
    formElemsArr.push(getElems(prop, objects[prop]));
  }
  function getElems(key, value) {
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
      case "shape":
        return (
          <div>
            <label htmlFor={key} className="col-form-label">
              {key}
            </label>
            <select id={key} data-property={key} className="custom-select">
              <option value="circle">Circle</option>
              <option value="polyline">Polilyne</option>
              <option value="polygon">Polygon</option>
              <option value="rectangle">Rectangle</option>
            </select>
          </div>
        );
      case "weight":
        return (
          <div>
            <label htmlFor={key} className="col-form-label">
              {key}
            </label>
            <select id={key} data-property={key} className="custom-select">
              <option value="normal">normal</option>
              <option value="bold">bold</option>
              <option value="bolder">bolder</option>
              <option value="lighter">lighter</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
              <option value="700">700</option>
              <option value="800">800</option>
              <option value="900">900</option>
            </select>
          </div>
        );
      case "opacity":
        return (
          <div>
            <label htmlFor={key} className="col-form-label">
              {key}
            </label>
            <select id={key} data-property={key} className="custom-select">
              <option value="0">0</option>
              <option value="0.1">0.1</option>
              <option value="0.2">0.2</option>
              <option value="0.3">0.3</option>
              <option value="0.4">0.4</option>
              <option value="0.5">0.5</option>
              <option value="0.6">0.6</option>
              <option value="0.7">0.7</option>
              <option value="0.8">0.8</option>
              <option value="0.9">0.9</option>
              <option value="1.0">1.0</option>
            </select>
          </div>
        );
      case "lineCap":
        return (
          <div>
            <label htmlFor={key} className="col-form-label">
              {key}
            </label>
            <select id={key} data-property={key} className="custom-select">
              <option value="round">round</option>
            </select>
          </div>
        );
      case "lineJoin":
        return (
          <div>
            <label htmlFor={key} className="col-form-label">
              {key}
            </label>
            <select id={key} data-property={key} className="custom-select">
              <option value="round">round</option>
            </select>
          </div>
        );
      case "dashArray":
        return (
          <div>
            <label htmlFor={key} className="col-form-label">
              {key}
            </label>
            <select id={key} data-property={key} className="custom-select">
              <option value="null">null</option>
            </select>
          </div>
        );
      case "dashOffset":
        return (
          <div>
            <label htmlFor={key} className="col-form-label">
              {key}
            </label>
            <select id={key} data-property={key} className="custom-select">
              <option value="null">null</option>
            </select>
          </div>
        );
      default:
        return <div></div>;
    }
  }
  return <div className="initialLayerProperties">{formElemsArr}</div>;
};

export default GetFormElem;
