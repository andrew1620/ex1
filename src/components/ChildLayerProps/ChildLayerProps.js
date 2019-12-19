import React from "react";
import GetChildLayersList from "../getChildLayersList/GetChildLayersList";
import "./style.css";

const ChildLayerProps = ({
  setIsCreatingChildLayer,
  shouldAddChildLayer,
  setShouldAddChildLayer,
  handleChildLayerSelect,
  handleChildLayerInput
}) => {
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
            className="form-control"
            data-name="addChildLayerInput"
            placeholder="Введите название child layer"
            onClick={setIsCreatingChildLayer}
            hidden={!shouldAddChildLayer}
            onChange={handleChildLayerInput}
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

export default ChildLayerProps;
