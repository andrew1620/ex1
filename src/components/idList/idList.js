import React from "react";
import { connect } from "react-redux";

function IdList({
  layersArr = [],
  showSetForm,
  isHiddenSelectLayer,
  handleLayerSelect
}) {
  // console.log("from Idlist ", layersArr);
  const list = layersArr.map((item, index) => {
    return (
      <option
        key={item.id ? item.id : index * Math.random() * 10}
        value={index}
        data-id={item.id}
      >
        {" "}
        {/*надо допилить, в индекс как ключ не пойдет*/}
        {item.name}
      </option>
    );
  });
  return (
    <select
      className="custom-select mr-sm-2"
      data-name="layerSel"
      id="layerSel"
      onClick={showSetForm}
      onChange={handleLayerSelect}
      hidden={isHiddenSelectLayer}
    >
      {list}
    </select>
  );
}
export default connect(
  state => ({
    layersArr: state.layers
  }),
  dispath => ({})
)(IdList);
