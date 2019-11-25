import React from "react";
import GetFormElem from "../GetInitialLayerForm/index";

// const divAddLayerStyle = {
//   display: "flex",
//   flexWrap: "wrap",
//   justifyContent: "space-between"
// };

const obj = {
  color: "red",
  shape: "polugon",
  weight: "normal",
  opacity: "0",
  lineCap: "round",
  lineJoin: "round",
  dashArray: "null",
  dashOffset: "null"
};

const InitialLayerProps = ({ showFillProperty, btnSendClick }) => {
  return (
    // <div className="initialLayerProperties">
    //   <div className="form-row">
    //     <div className="col-md-6">
    //       <label htmlFor="shape" className="col-form-label">
    //         Форма
    //       </label>
    //       <select
    //         // name="formSelect"
    //         id="shape"
    //         data-property="shape"
    //         className="custom-select mr-sm-2"
    //         data-tooltip="select"
    //       >
    //         <option value="circle">Circle</option>
    //         <option value="polyline">Polilyne</option>
    //         <option value="polygon">Polygon</option>
    //         <option value="rectangle">Rectangle</option>
    //       </select>
    //     </div>
    //     <div className="col-md-6">
    //       <label htmlFor="color" className="col-form-label">
    //         color
    //       </label>
    //       <input
    //         id="color"
    //         data-property="color"
    //         type="text"
    //         className="form-control"
    //       />
    //     </div>
    //   </div>
    //   <div className="form-row">
    //     <div className="col-md-6">
    //       <label htmlFor="weight" className="col-form-label">
    //         weight
    //       </label>
    //       <select
    //         name="wightSelect"
    //         id="weight"
    //         data-property="weight"
    //         className="custom-select mr-sm-2"
    //       >
    //         <option value="normal">normal</option>
    //         <option value="bold">bold</option>
    //         <option value="bolder">bolder</option>
    //         <option value="lighter">lighter</option>
    //         <option value="100">100</option>
    //         <option value="200">200</option>
    //         <option value="300">300</option>
    //         <option value="400">400</option>
    //         <option value="500">500</option>
    //         <option value="600">600</option>
    //         <option value="700">700</option>
    //         <option value="800">800</option>
    //         <option value="900">900</option>
    //       </select>
    //     </div>

    //     <div className="col-md-6">
    //       <label htmlFor="opacity" className="col-form-label">
    //         opacity
    //       </label>
    //       <select
    //         id="opacity"
    //         data-property="opacity"
    //         name="opacitySel"
    //         className="custom-select mr-sm-2"
    //       >
    //         {" "}
    //         <option value="0">0</option>
    //         <option value="0.1">0.1</option>
    //         <option value="0.2">0.2</option>
    //         <option value="0.3">0.3</option>
    //         <option value="0.4">0.4</option>
    //         <option value="0.5">0.5</option>
    //         <option value="0.6">0.6</option>
    //         <option value="0.7">0.7</option>
    //         <option value="0.8">0.8</option>
    //         <option value="0.9">0.9</option>
    //         <option value="1.0">1.0</option>
    //       </select>
    //     </div>
    //   </div>

    //   <div className="form-row">
    //     <div className="col-md-6">
    //       <label htmlFor="lineCap" className="col-form-label">
    //         lineCap
    //       </label>
    //       <select
    //         id="lineCap"
    //         data-property="lineCap"
    //         name="lineCapSel"
    //         className="custom-select mr-sm-2"
    //       >
    //         <option value="round">round</option>
    //       </select>
    //     </div>

    //     <div className="col-md-6">
    //       <label htmlFor="lineJoin" className="col-form-label">
    //         lineJoin
    //       </label>
    //       <select
    //         id="lineJoin"
    //         data-property="lineJoin"
    //         name="lineJoinSel"
    //         className="custom-select mr-sm-2"
    //       >
    //         <option value="round">round</option>
    //       </select>
    //     </div>
    //   </div>

    //   <div className="form-row">
    //     <div className="col-md-6">
    //       <label htmlFor="dashArray" className="col-form-label">
    //         dashArray
    //       </label>
    //       <select
    //         id="dashArray"
    //         data-property="dashArray"
    //         name="dashArrSel"
    //         className="custom-select mr-sm-2"
    //       >
    //         <option value="null">null</option>
    //       </select>
    //     </div>
    //     <div className="col-md-6">
    //       <label htmlFor="dashOffset" className="col-form-label">
    //         dashOffset
    //       </label>
    //       <select
    //         id="dashOffset"
    //         data-property="dashOffset"
    //         name="dashOffSel"
    //         className="custom-select mr-sm-2"
    //       >
    //         <option value="null">null</option>
    //       </select>
    //     </div>
    //   </div>
    //   <div className="form-row" data-name="qqq">
    //     <div className="col-md-6" onClick={showFillProperty}>
    //       <label
    //         htmlFor="fill"
    //         className="form-check-label"
    //         // onClick={showFillPropery}
    //       >
    //         fill
    //       </label>
    //       <input
    //         id="fill"
    //         data-property="fill"
    //         type="checkbox"
    //         className="form-check-input"
    //         style={{ marginLeft: "7px" }}
    //         // onClick={showFillPropery}
    //       />
    //     </div>
    //   </div>
    //   <div className="form-row" hidden>
    //     <div className="col-md-4 mb-3">
    //       <label htmlFor="fillColor">fillColor</label>
    //       <input
    //         id="fillColor"
    //         data-property="fillColor"
    //         type="text"
    //         className="form-control"
    //       />
    //     </div>

    //     <div className="col-md-4 mb-3">
    //       <label htmlFor="fillOpacity">fillOpacity</label>
    //       <select
    //         id="fillOpacity"
    //         data-property="fillOpacity"
    //         name="fillOpacitySel"
    //         className="custom-select mr-sm-2"
    //       >
    //         <option value="0">0</option>
    //         <option value="0.1">0.1</option>
    //         <option value="0.2">0.2</option>
    //         <option value="0.3">0.3</option>
    //         <option value="0.4">0.4</option>
    //         <option value="0.5">0.5</option>
    //         <option value="0.6">0.6</option>
    //         <option value="0.7">0.7</option>
    //         <option value="0.8">0.8</option>
    //         <option value="0.9">0.9</option>
    //         <option value="1.0">1.0</option>
    //       </select>
    //     </div>
    //     <div className="col-md-4 mb-3">
    //       <label htmlFor="fillRule">fillRule</label>
    //       <select
    //         id="fillRule"
    //         data-property="fillRule"
    //         name="fillRuleSel"
    //         className="custom-select mr-sm-2"
    //       >
    //         <option value="evenodd">evenodd</option>
    //       </select>
    //     </div>
    //   </div>

    //   <button
    //     className="btn btn-primary"
    //     data-name="btnSend"
    //     onClick={btnSendClick}
    //   >
    //     Отправить
    //   </button>
    // </div>
    <div>
      <GetFormElem objects={obj} />
    </div>
  );
};

export default InitialLayerProps;
