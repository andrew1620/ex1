import React from "react";
import { connect } from "react-redux";

/*shouldAddChildLayer,*/
function GetChildLayersList({
  shouldAddChildLayer,
  handleChildLayerSelect,
  childLayersArr
}) {
  const childLayersList =
    childLayersArr.length > 0 &&
    childLayersArr.map((childLayer, index) => {
      return (
        <option key={childLayer.id} value={index}>
          {childLayer.name}
        </option>
      );
    });

  const show = event => {
    event.preventDefault();
    console.log(childLayersArr);
  };

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
      <button onClick={show}>show getChildLayersList</button>
    </div>
  );
}

export default connect(state => ({
  childLayersArr: state.childLayersArr
}))(GetChildLayersList);
