import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "./reducers/tasksSlice";

// Configure the Redux store with the tasksSlice reducer
const store = configureStore({
  reducer: {
    tasks: taskListReducer, // Assign the tasksSlice reducer to the 'tasks' slice of the store
  },
});

export default store;
