export default function(state = { childLayers: [] }, action) {
  switch (action.type) {
    case "GET_LAYER":
      return action.payload;
    case "UPDATE_LAYER":
      return Object.assign({}, state, action.payload);
    // case 'UPDATE_OBJECTS:':
    //   return Object.assign(state, )
    default:
      return state;
  }
}
