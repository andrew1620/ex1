import React from "react";

function GetChildLayersList({
  childLayersBuffer,
  isShowedChildLayersSelectContainer
}) {
  // console.log("childLayers: ", childLayers);
  const childLayersList = childLayersBuffer.map((item, index) => {
    return (
      <option key={item.id} data-index={index} value={index}>
        {item.name}
      </option>
    );
  });
  return (
    <div
      className="childLayersSelectContainer"
      hidden={isShowedChildLayersSelectContainer}
    >
      {/* <label htmlFor="childLayersSelect" className="col-form-label">
        Child layers
      </label> */}
      <select
        data-name="childLayerSelect"
        id="childLayersSelect"
        className="custom-select mr-sm-2"
      >
        {childLayersList}
      </select>
    </div>
  );
}
export default GetChildLayersList;
