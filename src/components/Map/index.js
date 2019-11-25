import React from "react";
import { connect } from "react-redux";
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  Circle,
  CircleMarker,
  Polygon,
  Polyline,
  Rectangle
} from "react-leaflet";
import "./style.css";

const position = [51.505, -0.09];
const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12]
];

const multiPolyline = [
  [
    [51.5, -0.1],
    [51.5, -0.12],
    [51.52, -0.12]
  ],
  [
    [51.5, -0.05],
    [51.5, -0.06],
    [51.52, -0.06]
  ]
];
const polygon = [
  [51.515, -0.09],
  [51.52, -0.1],
  [51.52, -0.12]
];
const multiPolygon = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13]
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07]
  ]
];

const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06]
];

const myMap = ({ layer }) => {
  const vectorLayer = getShape(layer);
  console.log(vectorLayer);
  return (
    <Map center={position} zoom={13} className="map">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw" />
      {vectorLayer}
      {/* <CircleMarker center={[51.51, -0.12]} color="red" radius={20}>
        <Popup>Popup in CercleMarker</Popup>
      </CircleMarker> */}
      {/* <Polyline color="lime" positions={polyline} /> */}
      {/* <Polyline color="lime" positions={multiPolyline} /> */}
      {/* <Polygon color="purple" positions={polygon} /> */}
      {/* <Polygon color="purple" positions={multiPolygon} /> */}
      {/* <Rectangle bounds={rectangle} color="black" /> */}
    </Map>
  );
};
export default connect(state => ({
  layer: state.layer
}))(myMap);

const getShape = layer => {
  switch (layer.objects.shape) {
    case "circle":
      return (
        <Circle
          center={position}
          color={layer.objects.color}
          // weight={layer.objects.weight}
          opacity={layer.objects.opacity}
          // fill={layer.object.fill}
          fillColor={layer.objects.fillColor}
          fillOpacity={layer.objects.fillOpacity}
          fillRule={layer.objects.fillRule}
          // lineCap={layer.object.lineCap}
          // lineJoin={layer.object.lineJoin}
          // dashArray={layer.object.dashArray}
          // dashOffset={layer.object.dashOffset}
          radius={200}
        />
      );
    case "rectangle":
      return (
        <Rectangle
          bounds={rectangle}
          color={layer.objects.color}
          opacity={layer.objects.opacity}
          fillColor={layer.objects.fillColor}
          fillOpacity={layer.objects.fillOpacity}
          fillRule={layer.objects.fillRule}
        />
      );
    case "polyline":
      return <Polyline color={layer.objects.color} positions={polyline} />;
    case "polygon":
      return <Polygon color={layer.objects.color} positions={polygon} />;
    default:
      return alert("no such shape from switch in getShape()");
  }
};
