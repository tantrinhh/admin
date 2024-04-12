import { combineReducers } from "@reduxjs/toolkit";
import product from "./slice/product";

const rootReducer = combineReducers({
  product,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
