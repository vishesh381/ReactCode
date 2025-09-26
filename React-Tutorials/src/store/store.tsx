// import { createStore, applyMiddleware, compose } from "redux";
// import { todoReducer } from "../reducers/todoReducer";
// import { timestampMiddleware } from "../Components/timestampMiddleware";
// import { timingEnhancer } from "../Components/timingEnhancer";

// const composedEnhancer = compose(
//   applyMiddleware(timestampMiddleware),
//   timingEnhancer
// );

// export const store = createStore(todoReducer, composedEnhancer);

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slice/todoSlice";

const store = configureStore({
  reducer: todoReducer,
});

export default store;