const newLayer = {
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

export default function(state = newLayer, action) {
  switch (action.type) {
    case "GET_NEWLAYER":
      return action.payload;
    case "UPDATE_NEWLAYER":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
