import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TaskService from "../services/TaskService";

// Obtener y exportar la busqueda de una tarea especifica por ID
export const selectTaskById = (state, taskId) => state.tasks.value.find(task => task.id === taskId);


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

//Actualizar tarea, especificamente el checkbox
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (taskData, { dispatch }) => {
    const updatedTask = await TaskService.updateTask(taskData);
    dispatch(edit({ id: updatedTask.id, data: updatedTask }));
  }
);


const initialState = {
  value: [],
  status: "idle",
  message : null,
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
      const { id, data } = action.payload;
      const taskIndex = state.value.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.value[taskIndex] = { ...state.value[taskIndex], ...data };
      }
    },    
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchTasks.fulfilled, (state, action) => {
      state.value = action.payload;
    })
    .addCase(createTask.fulfilled, (state, action) => {
      state.message = 'Tarea creada exitosamente!';
    });
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, edit } = taskSlice.actions;

export default taskSlice.reducer;
