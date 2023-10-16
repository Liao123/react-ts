// rootReducer.js
import { combineReducers } from "redux";
import { slice1Reducer } from "./counter/store1";
import { slice2Reducer } from "./counter/store2";

const rootReducer = combineReducers({
  slice1: slice1Reducer,
  slice2: slice2Reducer,
});

export default rootReducer;
