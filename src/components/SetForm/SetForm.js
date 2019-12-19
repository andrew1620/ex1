import React from "react";
import IdList from "../idList/idList";
import ChildLayerProps from "../ChildLayerProps/ChildLayerProps";
import LayerSettings from "../LayerSettings/index";
import GetMainForm from "../GetMainForm";
import "./style.css";
import { connect } from "react-redux";

function SetForm({
  layer = [],
  btnSendClick,
  isShowedProperties,
  setIsShowedProperties,
  setAreShowedOutputAreas,
  isHiddenSelectLayer,
  isHiddenAddLayerContainer,
  setIsHiddenAddLayerContainer,
  setIsHiddenSelectLayer,
  creatingChildLayer,
  shouldAddChildLayer,
  setShouldAddChildLayer,
  workingWithChildLayer,
  setWorkingWithChildLayer,
  handleLayerSelect,
  handleAddLayerInput,
  handleChildLayerSelect,
  handleChildLayerInput,
  collectObjects
}) {
  const showSetForm = () => {
    setIsShowedProperties(true);
    //эта херь для обновления кол-ва слоев на кнопке child layers (), пока не придумал как иначе обновить
    // setIsShowedProperties(false);
    // setIsShowedProperties(true);
  };

  const pressCreateLayer = () => {
    setIsHiddenAddLayerContainer(false);
    setIsHiddenSelectLayer(true);
    setAreShowedOutputAreas(false);
    setIsShowedProperties(false);
  };
  const cancelAddLayer = () => {
    setIsHiddenAddLayerContainer(true);
    setIsHiddenSelectLayer(false);
    setAreShowedOutputAreas(false);
    setIsShowedProperties(false);
  };

  const chooseInitialLayer = event => {
    setWorkingWithChildLayer(false);
    event.target.classList.add("active");
    event.target.parentElement
      .querySelector(".btnChildLayer")
      .classList.remove("active");
  };
  const chooseChildLayer = event => {
    setWorkingWithChildLayer(true);
    event.target.classList.add("active");
    event.target.parentElement
      .querySelector(".btnInitialLayer")
      .classList.remove("active");
    setShouldAddChildLayer(layer.childLayers.length === 0 ? true : false);
  };

  const obj = {
    color: "red",
    shape: "polygon",
    weight: "normal",
    opacity: "0",
    lineCap: "round",
    lineJoin: "round",
    dashArray: "null",
    dashOffset: "null",
    fillRule: "circle",
    fillOpacity: "0"
  };

  return (
    <form className="container">
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
        showSetForm={showSetForm}
        isHiddenSelectLayer={isHiddenSelectLayer}
        handleLayerSelect={handleLayerSelect}
      />

      <div className="addLayerContainer" hidden={isHiddenAddLayerContainer}>
        <input
          type="text"
          id="addLayerInput"
          className="form-control"
          data-name="addLayerInput"
          placeholder="Введите название слоя"
          style={{ maxWidth: "80%" }}
          onChange={handleAddLayerInput}
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
        <div className="underSelectLayer">
          <LayerSettings />
          <div className="whoseProps" onMouseDown={creatingChildLayer}>
            <div
              className="btnInitialLayer active"
              onClick={chooseInitialLayer}
            >
              initial layer
            </div>
            <div className="btnChildLayer" onClick={chooseChildLayer}>
              child layers ({layer.childLayers ? layer.childLayers.length : 0})
            </div>
          </div>

          <div className="props" onChange={collectObjects}>
            {workingWithChildLayer && (
              <ChildLayerProps
                shouldAddChildLayer={shouldAddChildLayer}
                setShouldAddChildLayer={setShouldAddChildLayer}
                handleChildLayerSelect={handleChildLayerSelect}
                handleChildLayerInput={handleChildLayerInput}
              />
            )}
            <GetMainForm
              objects={obj}
              workingWithChildLayer={workingWithChildLayer}
            />
          </div>
          <button
            className="btn btn-primary"
            data-name="btnSend"
            onClick={btnSendClick}
          >
            Отправить
          </button>
        </div>
      )}
    </form>
  );
}

export default connect(
  state => ({
    layer: state.layer
  }),
  dispatch => ({})
)(SetForm);
