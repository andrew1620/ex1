import React from "react";
import IdList from "../idList/idList";

export default function SetForm({ idList, saveChanges, show }) {
  const formStyle = {
    border: "3px solid #eee",
    padding: "5px 10px",
    boxSizing: "border-box",
    borderRadius: "15px",
    width: "45%",
    margin: "0"
  };
  return (
    <form className="container" style={formStyle} onBlur={saveChanges}>
      <IdList idList={idList} />

      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="color" className="col-form-label">
            color
          </label>
          <input id="color" type="text" className="form-control" />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="weight" className="col-form-label">
            weight
          </label>
          <input id="weight" type="text" className="form-control" />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="opacity" className="col-form-label">
            opacity
          </label>
          <select
            id="opacity"
            name="opacitySel"
            className="custom-select mr-sm-2"
          >
            {" "}
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
      </div>

      <div className="form-row">
        <div className="col-md-4 mb-3">
          <input
            type="checkbox"
            id="bubblingMouseEvents"
            className="form-check-input"
            style={{ marginLeft: "5px" }}
          />
          <label
            htmlFor="bubblingMouseEvents"
            className="form-check-label"
            style={{ marginLeft: "25px" }}
          >
            bubblingMouseEvents
          </label>
        </div>

        <div className="col-md-4 mb-3">
          <input id="stroke" type="checkbox" className="form-check-input" />
          <label htmlFor="stroke" className="form-check-label">
            stroke
          </label>
        </div>

        <div className="form-row">
          <label htmlFor="fill" className="form-check-label">
            fill
          </label>
          <input id="fill" type="checkbox" className="form-check-input" />
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="fillColor">fillColor</label>
          <input id="fillColor" type="text" className="form-control" />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="fillOpacity">fillOpacity</label>
          <select
            id="fillOpacity"
            name="fillOpacitySel"
            className="custom-select mr-sm-2"
          >
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
        <div className="col-md-4 mb-3">
          <label htmlFor="fillRule">fillRule</label>
          <select
            id="fillRule"
            name="fillRuleSel"
            className="custom-select mr-sm-2"
          >
            <option value="evenodd">evenodd</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="lineCap" className="col-form-label">
            lineCap
          </label>
          <select
            id="lineCap"
            name="lineCapSel"
            className="custom-select mr-sm-2"
          >
            <option value="round">round</option>
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="lineJoin" className="col-form-label">
            lineJoin
          </label>
          <select
            id="lineJoin"
            name="lineJoinSel"
            className="custom-select mr-sm-2"
          >
            <option value="round">round</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="dashArray" className="col-form-label">
            dashArray
          </label>
          <select
            id="dashArray"
            name="dashArrSel"
            className="custom-select mr-sm-2"
          >
            <option value="null">null</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="dashOffset" className="col-form-label">
            dashOffset
          </label>
          <select
            id="dashOffset"
            name="dashOffSel"
            className="custom-select mr-sm-2"
          >
            <option value="null">null</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="renderer" className="col-form-label">
            renderer
          </label>
          <input type="text" id="renderer" className="form-control" />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="className" className="col-form-label">
            className
          </label>
          <input type="text" id="className" className="form-control" />
        </div>
      </div>

      <button className="btn btn-primary" data-name="btnSend" onClick={show}>
        Отправить
      </button>
    </form>
  );
}
