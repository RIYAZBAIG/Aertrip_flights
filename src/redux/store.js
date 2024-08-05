import { createStore, combineReducers } from "redux";
// import flightReducer from "./reducers/flightReducer";
import flightReducer from "../reducers/flightReducer"

const rootReducer = combineReducers({
  flight: flightReducer,
});

const store = createStore(rootReducer);

export default store;
