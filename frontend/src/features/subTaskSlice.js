import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SubTaskService from "../services/SubTaskService";

// Obtener y exportar la busqueda de una tarea especifica por ID
export const selectSubTaskById = (state, taskId) => state.tasks.value.find(task => task.id === taskId);


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

//Actualizar subtarea de forma asincrona
export const updateSubTask = createAsyncThunk(
  "subTasks/updateSubTask",
  async (subTaskData, { dispatch }) => {
    const updatedSubTask = await SubTaskService.updateSubTask(subTaskData.id, subTaskData);
    dispatch(edit(updatedSubTask));
  }
);


const initialState = {
  value: [],
  status: "idle",
  message : null,
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
      const updatedSubTask = action.payload;
      const index = state.value.findIndex(subTask => subTask.id === updatedSubTask.id);
    
      if (index !== -1) {
        state.value[index] = updatedSubTask;
      }
    },
    clearMessage: (state) => {
      state.message = '';
    },
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchSubTasks.fulfilled, (state, action) => {
      state.value = action.payload;
    })
    .addCase(createSubTask.fulfilled, (state, action) => {
      state.message = 'Sub Tarea creada exitosamente!';
    });
    
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, edit, clearMessage } = subTaskSlice.actions;

export default subTaskSlice.reducer;
