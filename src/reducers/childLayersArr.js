export default function(state = [], action) {
  switch (action.type) {
    case "GET_ARR":
      return action.payload;
    case "UPDATE_ARR":
      return [...state, action.payload].slice();
    case "CLEAR_ARR":
      return [];
    default:
      return state;
  }
}
