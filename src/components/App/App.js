import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SetForm from "../SetForm/SetForm";
import ShowObject from "../ShowObject/ShowObject";

function App() {
  const [idList] = useState([
    { id: 1, text: "layer 1" },
    { id: 2, text: "layer 2" },
    { id: 3, text: "layer 3" },
    { id: 4, text: "layer 4" }
  ]);

  const [resObj, setResObj] = useState({});
  const obj = {
    [idList[0].text]: {
      id: idList[0].id,
      style: {
        color: "#3388ff",
        stroke: "true",
        weight: "3",
        opacity: "1.0",
        lineCap: "round",
        lineJoin: "round",
        dashArray: "null",
        DashOffset: "null",
        fill: "true",
        fillColor: "#3388ff",
        fillOpacity: "0.2",
        fillRule: "evenodd",
        bubblingMluseEvents: "true",
        renderer: "renderer",
        className: "null"
      }
    }
  };
  let layerName = "";
  const saveChanges = event => {
    if (event.target.dataset.name === "btnSend") return;
    if (event.target.dataset.name === "layerSel") {
      layerName = idList[event.target.value].text;

      obj[layerName] = {
        id: idList[event.target.value].id,
        style: {}
      };
      return;
    }
    if (layerName === "") layerName = idList[0].text;

    obj[layerName].style[event.target.id] = event.target.value;
    setResObj(Object.assign(resObj, obj));
    console.log("%%%", resObj);
  };

  const show = event => {
    event.preventDefault();
  };
  return (
    <div
      style={{
        margin: "10px auto",
        display: "flex",
        justifyContent: "center",
        width: "70%"
      }}
    >
      <SetForm idList={idList} saveChanges={saveChanges} show={show} />
      <ShowObject resObj={resObj} />
    </div>
  );
}

export default App;
