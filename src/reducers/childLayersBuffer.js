export default function(state = [], action) {
  switch (action.type) {
    case "UPDATE_BUFFER":
      return action.payload;
    case "ADD_ELEM":
      return [...state, action.payload];
    default:
      return state;
  }
}
