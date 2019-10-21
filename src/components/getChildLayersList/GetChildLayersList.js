import React from "react";

function GetChildLayersList({ childLayers }) {
  // console.log("childLayers: ", childLayers);
  const childLayersList = childLayers.map((item, index) => {
    return (
      <option key={item.id} data-index={index}>
        {item.name}
      </option>
    );
  });
  return (
    <div>
      <label htmlFor="childLayersSelect" className="col-form-label">
        Child layers
      </label>
      <select
        name="childLayersSelect"
        id="childLayersSelect"
        className="custom-select mr-sm-2"
      >
        {childLayersList}
      </select>
    </div>
  );
}
export default GetChildLayersList;
