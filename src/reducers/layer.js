export default function(state = { childLayers: [] }, action) {
  switch (action.type) {
    case "GET_LAYER":
      return action.payload;
    case "UPDATE_LAYER":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
