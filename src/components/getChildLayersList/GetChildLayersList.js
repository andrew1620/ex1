import React from "react";

function GetChildLayersList({
  childLayersBuffer,
  isShowedChildLayersSelectContainer
}) {
  // console.log("childLayers: ", childLayers);
  const childLayersList = childLayersBuffer.map((item, index) => {
    return (
      <option key={item.id} data-index={index} value={index} data-id={item.id}>
        {item.name}
      </option>
    );
  });
  return (
    <div
      className="childLayersSelectContainer"
      // style={{ maxWidth: "520px" }}
      // hidden={isShowedChildLayersSelectContainer}
    >
      <select
        data-name="childLayerSelect"
        id="childLayersSelect"
        className="custom-select mr-sm-2"
        // style={{ width: "100%" }}
      >
        {childLayersList}
      </select>
    </div>
  );
}
export default GetChildLayersList;
