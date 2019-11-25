import React, { useState, useEffect } from "react";
import IdList from "../idList/idList";
import InitialLayerProps from "../InitialLayerProps/InitialLayerProps";
import ChildLayerProps from "../ChildLayerProps/ChildLayerProps";
import LayerSettings from "../LayerSettings/index";
import "./style.css";
import { connect } from "react-redux";

function SetForm({
  layer = [],
  saveChanges,
  btnSendClick,
  showFillProperty,
  isShowedProperties,
  setIsShowedProperties,
  setAreShowedOutputAreas,
  isHiddenSelectLayer,
  isHiddenAddLayerContainer,
  setIsHiddenAddLayerContainer,
  setIsHiddenSelectLayer,
  creatingChildLayer,
  btnSaveChildLayer,
  addChildLayerInputValue,
  setAddChildLayerInputValue,
  addChildLayerInputStyle,
  shouldAddChildLayer,
  setShouldAddChildLayer,
  workingWithChildLayer,
  setWorkingWithChildLayer
}) {
  const showSetForm = () => {
    setIsShowedProperties(true);
    //эта херь для обновления кол-ва слоев на кнопке child layers (), пока не придумал как иначе обновить

    setIsShowedProperties(false);
    setIsShowedProperties(true);
  };

  const pressCreateLayer = () => {
    setIsHiddenAddLayerContainer(false);
    setIsHiddenSelectLayer(true);
    setAreShowedOutputAreas(false);
    setIsShowedProperties(false);
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
  // const [whosePropsPosition, setWhosePropsPosition] = useState({});
  // if (isShowedProperties) {
  //   setTimeout(() => {
  //     const propsCoords = document
  //       .querySelector(".props")
  //       .getBoundingClientRect();
  //     setWhosePropsPosition({
  //       top:
  //         propsCoords.top - document.querySelector(".whoseProps").offsetHeight,
  //       width: document.querySelector(".props").offsetWidth
  //     });
  //   }, 3000);
  // }

  return (
    <form className="container" onBlur={saveChanges}>
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
      />

      <div className="addLayerContainer" hidden={isHiddenAddLayerContainer}>
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
        <div className="underSelectLayer">
          <LayerSettings />
          <div
            className="whoseProps"
            onMouseDown={creatingChildLayer}
            // style={whosePropsPosition}
          >
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

          <div className="props">
            {!workingWithChildLayer ? (
              <InitialLayerProps
                showFillProperty={showFillProperty}
                btnSendClick={btnSendClick}
              />
            ) : (
              <ChildLayerProps
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
