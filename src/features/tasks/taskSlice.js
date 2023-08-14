import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      const taskFound = state.find((task) => task.id === action.payload.id);
      if (taskFound) {
        state.splice(state.indexOf(taskFound), 1);
      }
    },

    editTask: (state, action) => {
      const taskFound = state.find((task) => task.id === action.payload.id);
      const indexTaskFound = state.indexOf(taskFound);

      if (indexTaskFound >= 0) {
        state[indexTaskFound] = action.payload;
      }
    },

    resetTasks: (state, action) => {
      state.splice(0,state.length);
      console.log("clean");
    },
  },
});

export const { addTask, deleteTask, editTask, resetTasks } = taskSlice.actions;

export default taskSlice.reducer;
