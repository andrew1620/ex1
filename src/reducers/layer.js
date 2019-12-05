export default function(state = {}, action) {
  switch (action.type) {
    case "GET_LAYER":
      return action.payload;
    case "UPDATE_LAYER":
      // console.log("state--- ", state, "payload--- ", action.payload);
      // return Object.assign({}, state, action.payload);
      return Object.assign({}, state, action.payload);
    // return { ...state, ...action.payload };
    default:
      return state;
  }
}
