import React from "react";
import { connect } from "react-redux";

/*shouldAddChildLayer,*/
function GetChildLayersList({
  layer = { childLayers: [] },
  shouldAddChildLayer,
  handleChildLayerSelect
}) {
  const childLayersList =
    layer.childLayers !== undefined && // В самом начале layer.childLayers == undefined, для этоого эта проверка
    layer.childLayers.map((item, index) => {
      return (
        <option
          key={item.id}
          data-index={index}
          value={index}
          data-id={item.id}
        >
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
        onChange={handleChildLayerSelect}
      >
        {childLayersList}
      </select>
    </div>
  );
}

export default connect(
  state => ({
    layer: state.layer
  }),
  dispatch => ({})
)(GetChildLayersList);
