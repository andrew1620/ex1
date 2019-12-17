import React from "react";
import GetChildLayersList from "../getChildLayersList/GetChildLayersList";
import "./style.css";
import { connect } from "react-redux";

const ChildLayerProps = ({
  layer = {},
  setIsCreatingChildLayer,
  showFillProperty,
  btnSaveChildLayer,
  shouldAddChildLayer,
  setShouldAddChildLayer,
  addChildLayerInputValue,
  setAddChildLayerInputValue,
  addChildLayerInputStyle,
  handleChildLayerSelect,
  handleChildLayerInput
}) => {
  const getAddChildLayerInput = event => {
    setAddChildLayerInputValue(event.target.value);
  };
  const childLayerBtn = event => {
    event.preventDefault();
    setShouldAddChildLayer(!shouldAddChildLayer);
  };

  return (
    <div className="childLayerProperties">
      <div className="addChildLayerContainer form-row">
        <div className="col-md-10">
          <input
            type="text"
            id="addChildLayerInput"
            className="form-control addChildLayerInput"
            data-name="addChildLayerInput"
            placeholder="Введите название child layer"
            onClick={setIsCreatingChildLayer}
            hidden={!shouldAddChildLayer}
            onChange={handleChildLayerInput}
            style={addChildLayerInputStyle}
          />
          <GetChildLayersList
            shouldAddChildLayer={shouldAddChildLayer}
            handleChildLayerSelect={handleChildLayerSelect}
          />
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-primary btnAddChildLayer"
            data-name="btnAddChildLayer"
            onClick={childLayerBtn}
          >
            {shouldAddChildLayer ? "Отменить" : "Добавить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    layer: state.layer
  }),
  dispatch => ({})
)(ChildLayerProps);
