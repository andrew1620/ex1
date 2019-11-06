import React, { useState } from "react";
import IdList from "../idList/idList";
import InitialLayerProps from "../InitialLayerProps/InitialLayerProps";
import ChildLayerProps from "../ChildLayerProps/ChildLayerProps";
import "./style.css";

export default function SetForm({
  layersArr,
  saveChanges,
  btnSendClick,
  showFillProperty,
  isShowedProperties,
  setIsShowedProperties,
  setAreShowedOutputAreas,
  childLayersBuffer,
  isHiddenSelectLayer,
  isHiddenAddLayerContainer,
  setIsHiddenAddLayerContainer,
  setIsHiddenSelectLayer,
  creatingChildLayer,
  btnSaveChildLayer,
  addChildLayerInputValue,
  setAddChildLayerInputValue,
  addChildLayerInputStyle
}) {
  const formStyle = {
    border: "3px solid #eee",
    padding: "5px 10px",
    boxSizing: "border-box",
    borderRadius: "15px",
    width: "700px",
    margin: "0"
  };
  const divAddLayerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  };
  const whosePropsStyle = {
    display: "flex",
    justifyContent: "space-between"
  };
  const whosePropsBtnsStyle = {
    width: "100%",
    textAlign: "center",
    cursor: "pointer"
  };

  const showSetForm = () => {
    setIsShowedProperties(true);
  };

  const pressCreateLayer = () => {
    setIsHiddenAddLayerContainer(false);
    setIsHiddenSelectLayer(true);
  };
  const cancelAddLayer = () => {
    setIsHiddenAddLayerContainer(true);
    setIsHiddenSelectLayer(false);
    setAreShowedOutputAreas(false);
    setIsShowedProperties(false);
  };
  const [whosePropsChosen, setWhosePropsChosen] = useState(true);
  const chooseInitialLayer = event => {
    setWhosePropsChosen(true);
    creatingChildLayer(event);
    event.target.classList.add("active");
    event.target.parentElement
      .querySelector(".btnChildLayer")
      .classList.remove("active");
  };
  const chooseChildLayer = event => {
    setWhosePropsChosen(false);
    creatingChildLayer(event);
    event.target.classList.add("active");
    event.target.parentElement
      .querySelector(".btnInitialLayer")
      .classList.remove("active");
  };
  const [shouldAddChildLayer, setShouldAddChildLayer] = useState(false);

  return (
    <form className="container" style={formStyle} onBlur={saveChanges}>
      <label htmlFor="layerSel" className="col-form-label">
        Выберите слой или{" "}
        <a
          href="#"
          className="createLayerRef"
          onClick={pressCreateLayer}
          data-name="createLayerRef"
        >
          создайте новый
        </a>
      </label>
      <IdList
        layersArr={layersArr}
        showSetForm={showSetForm}
        isHiddenSelectLayer={isHiddenSelectLayer}
      />
      <div
        style={divAddLayerStyle}
        className="addLayerContainer"
        hidden={isHiddenAddLayerContainer}
      >
        <input
          type="text"
          id="addLayerInput"
          className="form-control"
          data-name="addLayerInput"
          placeholder="Введите название слоя"
          data-tooltip="qqqqq"
          style={{ maxWidth: "570px" }}
          onChange={saveChanges}
        />
        <button
          className="btn btn-primary cancelAddLayer"
          data-name="btnCancel"
          onClick={cancelAddLayer}
        >
          Отменить
        </button>
      </div>

      {isShowedProperties && (
        <div>
          <div className="whoseProps" style={whosePropsStyle}>
            <div
              className="btnInitialLayer active"
              style={whosePropsBtnsStyle}
              onClick={chooseInitialLayer}
            >
              initial layer
            </div>
            <span style={{ color: "#eee" }}>|</span>
            <div
              className="btnChildLayer"
              style={whosePropsBtnsStyle}
              onClick={chooseChildLayer}
            >
              child layers ({childLayersBuffer.length})
            </div>
          </div>

          {whosePropsChosen ? (
            <InitialLayerProps
              showFillProperty={showFillProperty}
              btnSendClick={btnSendClick}
            />
          ) : (
            <ChildLayerProps
              childLayersBuffer={childLayersBuffer}
              whosePropsChosen={whosePropsChosen}
              showFillProperty={showFillProperty}
              btnSaveChildLayer={btnSaveChildLayer}
              shouldAddChildLayer={shouldAddChildLayer}
              setShouldAddChildLayer={setShouldAddChildLayer}
              addChildLayerInputValue={addChildLayerInputValue}
              setAddChildLayerInputValue={setAddChildLayerInputValue}
              addChildLayerInputStyle={addChildLayerInputStyle}
            />
          )}
        </div>
      )}
    </form>
  );
}
