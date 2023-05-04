import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TaskService from "../services/TaskService";

//Obtener todas las tareas de forma asincrona
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const tasks = await TaskService.getTasks();
  return tasks;
});

//Crear tarea de forma asincrona
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { dispatch }) => {
    const newTask = await TaskService.createTask(taskData);
    dispatch(add(newTask));
  }
);

const initialState = {
  value: [],
  status: "idle",
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add: (state, action) => {
      const task = action.payload;
      state.value.push(task);
    },
    remove: (state, action) => {
      const taskId = action.payload;
      TaskService.deleteTask(taskId);
      state.value = state.value.filter((task) => task.id !== taskId);
    },
    edit: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, edit } = taskSlice.actions;

export default taskSlice.reducer;
