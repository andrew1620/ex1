import React from "react";
import { connect } from "react-redux";
import "./style.css";

function ShowObject({ layer, childLayer, childLayersArr, newLayer }) {
  // console.log("showObject --- ", childLayersArr);
  let strObjects = "";
  for (let key in layer) {
    strObjects += ` ${key}: ${layer[key]}, `;
  }

  const pList = childLayersArr.map(item => {
    let strChildObjects = "";
    for (let key in item.objects) {
      strChildObjects += ` ${key}: ${item.objects[key]}, `;
    }
    return (
      <p key={Date().now}>
        <b>name:</b> {"name"}
        <br /> <b>id:</b> {newLayer.objects.types[2].id}
        <br /> <b>objects:</b> {strChildObjects}
      </p>
    );
  });

  //Сбор объекта для childLayer
  let childLayerObjects = "";
  if (Object.keys(childLayer).length !== 0) {
    // console.log(childLayer);
    for (let object in childLayer.objects) {
      childLayerObjects += ` ${object}: ${childLayer.objects[object]}, `;
    }
  }

  return (
    <div className="showObjectContainer">
      {" "}
      <p style={{ fontFamily: "Arial" }}>
        <div style={{ textAlign: "center", margin: 0 }}>Intial layer</div>
        <hr style={{ margin: 0 }} />
        <b>name:</b> {layer.name}
        <br />
        <b>id:</b> {newLayer.objects.types[2].id || "no Id"}
        <br />
        <b>objects:</b> {strObjects}
        {layer.childLayers.length !== 0 && (
          <div style={{ textAlign: "center", margin: "15px 0 0 0" }}>
            Child layers
            <hr style={{ margin: 0 }} />
          </div>
        )}
        {pList}
        {/* Добавление в вывод childLayer */}
        {Object.keys(childLayer).length !== 0 && (
          <div className="childLayerContainer">
            <div style={{ textAlign: "center", margin: "15px 0 0 0" }}>
              Child layer
              <hr style={{ margin: 0 }} />
            </div>
            <b>name:</b> {childLayer.name}
            <br />
            <b>id:</b> {childLayer.id || "no Id"}
            <br />
            <b>objects:</b> {childLayerObjects}
          </div>
        )}
      </p>{" "}
    </div>
  );
}

export default connect(state => ({
  layer: state.layer,
  childLayer: state.childLayer,
  childLayersArr: state.childLayersArr,
  newLayer: state.newLayer
}))(ShowObject);
