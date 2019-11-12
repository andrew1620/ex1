import { combineReducers } from "redux";
import layers from "./layers.js";
import layer from "./layer.js";
import childLayersBuffer from "./childLayersBuffer.js";
export default combineReducers({
  layers,
  layer,
  childLayersBuffer
});
