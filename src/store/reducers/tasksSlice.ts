import { createSlice } from "@reduxjs/toolkit";

// Initial state for the task slices
const initialState = {
  taskStarted: [],
  taskInProgress: [],
  taskDone: [],
};

// Redux Toolkit createSlice for managing task-related state
export const taskSlices = createSlice({
  name: "tasklist",
  initialState,
  reducers: {
    // Reducer to set data for tasks that are to be started
    setTobeStartData: (state, action) => {
      state.taskStarted = action.payload;
    },
    // Reducer to set data for tasks that are in progress
    setInProgressData: (state, action) => {
      state.taskInProgress = action.payload;
    },
    // Reducer to set data for tasks that are done
    setTaskDoneData: (state, action) => {
      state.taskDone = action.payload;
    },
  },
});

// Extracting action creators from the slice
export const { setTobeStartData, setInProgressData, setTaskDoneData } = taskSlices.actions;

// Exporting the reducer
export default taskSlices.reducer;
