import React from "react";
import Map from "../Map/index";
import "./style.css";

const ShowFormObject = () => {
  // console.log("from showformobject--- ", layer);

  return (
    <div className="mainDiv">
      <div id="mapid">
        <Map />
      </div>
    </div>
  );
};
export default ShowFormObject;
