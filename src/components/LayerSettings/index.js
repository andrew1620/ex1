import React from "react";
import "./style.css";
import { connect } from "react-redux";

const LayerSettings = ({ newLayer, onUpdateNewLayer }) => {
  const handleCheckbox = event => {
    if (event.target.checked) {
      newLayerBuf.services[1].service = "realtime";
      newLayerBuf.services[1].options = { dalay: 500 };
    } else {
      newLayerBuf.services[1].service = "static";
      newLayerBuf.services[1].options = {};
    }
    onUpdateNewLayer(newLayerBuf);
  };
  return (
    <div className="layerSettingsContainer">
      <label>
        {" "}
        Динамическая загрузка данных{" "}
        <input type="checkbox" onChange={handleCheckbox} />
      </label>
    </div>
  );
};

export default connect(
  state => ({
    newLayer: state.newLayer
  }),
  dispatch => ({
    onUpdateNewLayer(newLayer) {
      dispatch({ type: "UPDATE-NEWLAYER", payload: newLayer });
    }
  })
)(LayerSettings);

const newLayerBuf = {
  id: "unmanned_aerial_vehicle",
  childLayers: [],
  services: [
    // Или статическая загрузка данных
    {
      service: "static",
      options: {}
    },
    // Или динамическая загрузка данных
    {
      service: "realtime",
      options: { delay: 500 }
    },
    // Сервис редактирования объектов слоя
    {
      service: "editable",
      options: {
        draw: {
          polyline: {
            shapeOptions: {
              color: "blue"
            },
            showLength: true
          },
          polygon: {
            shapeOptions: {
              color: "blue"
            }
          },
          rectangle: false,
          circle: false,
          marker: false,
          circlemarker: false
        },
        edit: {
          edit: false
        }
      }
    }
  ],
  objects: {
    endpoint: "real_data:detect_info_2-line",
    types: [
      {
        id: "unmanned_aerial_vehicle:flight_mission",
        format: {
          color: "blue"
        }
      },
      {
        id: "unmanned_aerial_vehicle:position",
        format: {}
      },
      {
        id: "unmanned_aerial_vehicle:traveled_distance",
        format: {
          color: "blue",
          dashArray: "10, 10",
          dashOffset: "0",
          opacity: 0.5
        }
      }
    ]
  }
};
