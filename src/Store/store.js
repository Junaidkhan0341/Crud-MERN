import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../Features/itemReducer";

export const store = configureStore({
  reducer: { 
    app: itemReducer,
  },
});