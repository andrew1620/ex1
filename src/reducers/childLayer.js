export default function(state = {}, action) {
  switch (action.type) {
    case "GET_CHILD_LAYER":
      return action.payload;
    case "UPDATE_CHILD_LAYER":
      return Object.assign({}, state, action.payload);
    case "CLEAR_CHILD_LAYER":
      return Object.assign({});
    default:
      return state;
  }
}
