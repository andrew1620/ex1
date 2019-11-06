import React from "react";
/*shouldAddChildLayer,*/
function GetChildLayersList({ childLayersBuffer, shouldAddChildLayer }) {
  const childLayersList = childLayersBuffer.map((item, index) => {
    return (
      <option key={item.id} data-index={index} value={index} data-id={item.id}>
        {item.name}
      </option>
    );
  });
  return (
    <div className="childLayersSelectContainer">
      <select
        data-name="childLayerSelect"
        id="childLayersSelect"
        className="custom-select mr-sm-2"
        hidden={shouldAddChildLayer}
      >
        {childLayersList}
      </select>
    </div>
  );
}
export default GetChildLayersList;
