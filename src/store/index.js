import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./counter/counterSlice";
import rootReducer from "./rootReducer";
export default configureStore({
  reducer: rootReducer,
});
