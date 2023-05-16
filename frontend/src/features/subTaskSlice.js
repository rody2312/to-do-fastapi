import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SubTaskService from "../services/SubTaskService";

//Obtener todas las subtareas de forma asincrona
export const fetchSubTasks = createAsyncThunk("subTasks/fetchSubTasks", async (taskId) => {
  const subTasks = await SubTaskService.getSubTasks(taskId);
  return subTasks;
});

//Crear subtarea de forma asincrona
export const createSubTask = createAsyncThunk(
  "subTasks/createSubTask",
  async (subTaskData, { dispatch }) => {
    const newSubTask = await SubTaskService.createSubTask(subTaskData);
    dispatch(add(newSubTask));
  }
);

const initialState = {
  value: [],
  status: "idle",
};

export const subTaskSlice = createSlice({
  name: "subTasks",
  initialState,
  reducers: {
    add: (state, action) => {
      const subTask = action.payload;
      state.value.push(subTask);
    },
    remove: (state, action) => {
      const subTaskId = action.payload;
      SubTaskService.deleteSubTask(subTaskId);
      state.value = state.value.filter((subTask) => subTask.id !== subTaskId);
    },
    edit: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubTasks.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, edit } = subTaskSlice.actions;

export default subTaskSlice.reducer;
