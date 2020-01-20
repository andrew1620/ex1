import { combineReducers } from "redux";
import layers from "./layers.js";
import layer from "./layer.js";
import childLayersBuffer from "./childLayersBuffer.js";
import childLayer from "./childLayer.js";
import childLayersArr from "./childLayersArr.js";
import newLayer from "./newLayer";

export default combineReducers({
  layers,
  layer,
  childLayersBuffer,
  childLayer,
  childLayersArr,
  newLayer
});
