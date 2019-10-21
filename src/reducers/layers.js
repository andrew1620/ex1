export default function layers(state = [], action) {
  switch (action.type) {
    case "GET_LAYERS":
      return action.payload;
    case "ADD_LAYER":
      return [...state, action.payload];
    default:
      return state;
  }
}
