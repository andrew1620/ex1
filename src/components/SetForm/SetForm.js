import React from "react";
import IdList from "../idList/idList";

export default function SetForm({
  idList,
  saveChanges,
  btnSendClick,
  addLayer,
  showToolTip,
  showFillProperty,
  showTooltip
}) {
  const formStyle = {
    border: "3px solid #eee",
    padding: "5px 10px",
    boxSizing: "border-box",
    borderRadius: "15px",
    // borderRadius: "15px 0 0 15px",
    width: "700px",
    margin: "0"
  };
  const divAddLayerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  };
  // const addLayerTooltipStyle = { // стили для подсказки
  //   border: "1px solid black",
  //   boxSizing: "border-box",
  //   padding: "5px 10px",
  //   fontFamily: "Arial",
  //   fontStyle: "italic",
  //   borderRadius: "5px",
  //   fontSize: "13px",
  //   position: "absolute",
  //   background: "white",
  //   display: "none",
  //   zIndex: "1"
  // };
  return (
    <form
      className="container"
      style={formStyle}
      onBlur={saveChanges}
      // onMouseOver={showTooltip}
    >
      <label htmlFor="layerSel" className="col-form-label">
        Выберите слой
      </label>
      <IdList idList={idList} />

      <div style={divAddLayerStyle}>
        {/* <p className="addLayerTooltip" style={addLayerTooltipStyle}> //подсказка
          Если необходимо добавить слой - введите название и нажмите добавить
        </p> */}
        <input
          type="text"
          id="addLayerInput"
          className="form-control"
          data-name="addLayerInput"
          placeholder="Введите название слоя"
          data-tooltip="qqqqq"
          style={{ maxWidth: "530px" }}
          onMouseOver={showToolTip}
        />
        <button
          className="btn btn-primary"
          onClick={addLayer}
          data-name="btnAddLayer"
        >
          Добавить слой
        </button>
      </div>

      <div className="form-row">
        <div className="col-md-6">
          <label htmlFor="form" className="col-form-label">
            Форма
          </label>
          <select
            name="formSelect"
            id="form"
            data-property="form"
            className="custom-select mr-sm-2"
            data-tooltip="select"
          >
            <option value="circle">Circle</option>
            <option value="polyline">Polilyne</option>
            <option value="polygon">Polygon</option>
            <option value="rectangle">Rectangle</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="color" className="col-form-label">
            color
          </label>
          <input
            id="color"
            data-property="color"
            type="text"
            className="form-control"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="col-md-6">
          <label htmlFor="weight" className="col-form-label">
            weight
          </label>
          {/* <input
            id="weight"
            data-property="weight"
            type="text"
            className="form-control"
          /> */}
          <select
            name="wightSelect"
            id="weight"
            data-property="weight"
            className="custom-select mr-sm-2"
          >
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

        <div className="col-md-6">
          <label htmlFor="opacity" className="col-form-label">
            opacity
          </label>
          <select
            id="opacity"
            data-property="opacity"
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
        <div className="col-md-6">
          <label htmlFor="lineCap" className="col-form-label">
            lineCap
          </label>
          <select
            id="lineCap"
            data-property="lineCap"
            name="lineCapSel"
            className="custom-select mr-sm-2"
          >
            <option value="round">round</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="lineJoin" className="col-form-label">
            lineJoin
          </label>
          <select
            id="lineJoin"
            data-property="lineJoin"
            name="lineJoinSel"
            className="custom-select mr-sm-2"
          >
            <option value="round">round</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-6">
          <label htmlFor="dashArray" className="col-form-label">
            dashArray
          </label>
          <select
            id="dashArray"
            data-property="dashArray"
            name="dashArrSel"
            className="custom-select mr-sm-2"
          >
            <option value="null">null</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="dashOffset" className="col-form-label">
            dashOffset
          </label>
          <select
            id="dashOffset"
            data-property="dashOffset"
            name="dashOffSel"
            className="custom-select mr-sm-2"
          >
            <option value="null">null</option>
          </select>
        </div>
      </div>
      <div className="form-row" data-name="qqq">
        <div className="col-md-6" onClick={showFillProperty}>
          <label
            htmlFor="fill"
            className="form-check-label"
            // onClick={showFillPropery}
          >
            fill
          </label>
          <input
            id="fill"
            data-property="fill"
            type="checkbox"
            className="form-check-input"
            style={{ marginLeft: "7px" }}
            // onClick={showFillPropery}
          />
        </div>
      </div>
      <div className="form-row" hidden>
        <div className="col-md-4 mb-3">
          <label htmlFor="fillColor">fillColor</label>
          <input
            id="fillColor"
            data-property="fillColor"
            type="text"
            className="form-control"
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="fillOpacity">fillOpacity</label>
          <select
            id="fillOpacity"
            data-property="fillOpacity"
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
            data-property="fillRule"
            name="fillRuleSel"
            className="custom-select mr-sm-2"
          >
            <option value="evenodd">evenodd</option>
          </select>
        </div>
      </div>

      <button
        className="btn btn-primary"
        data-name="btnSend"
        onClick={btnSendClick}
      >
        Отправить
      </button>
    </form>
  );
}
