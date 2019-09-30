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

  let [resObj, setResObj] = useState({});
  const obj = {};
  // const resObj = { fff: "fafa" };
  let layerName = "";
  const saveChanges = event => {
    if (event.target.dataset.name === "btnSend") return;
    if (event.target.dataset.name === "layerSel") {
      // obj.name = idList[event.target.value].text;
      layerName = idList[event.target.value].text;
      obj[layerName] = {
        id: idList[event.target.value].id,
        style: {}
      };
      return;
    }
    // obj[event.target.id] = event.target.value;
    obj[layerName].style[event.target.id] = event.target.value;
    setResObj(Object.assign(resObj, obj));
    console.log("%%%", resObj);
  };

  const show = event => {
    event.preventDefault();
  };
  return (
    <div
      style={{ border: "1px solid red", margin: "10px 10px", display: "flex" }}
    >
      <SetForm idList={idList} saveChanges={saveChanges} show={show} />
      <ShowObject resObj={resObj} />
    </div>
  );
}

export default App;
