const initialState = {
  flights: [],
};

const flightReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FLIGHTS":
      return {
        ...state,
        flights: action.payload,
      };
    default:
      return state;
  }
};

export default flightReducer;
