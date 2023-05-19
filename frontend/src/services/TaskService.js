import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000", // Cambia esto por la URL de tu API FastAPI
});

const TaskService = {
  getTasks: async () => {
    const response = await apiClient.get("/tasks/");
    console.log(response)
    return response.data;
  },

  createTask: async (task) => {
    const response = await apiClient.post("/tasks/", task);
    return response.data;
  },

  getTask: async (id) => {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  },

  updateTask: async (task) => {
    const response = await apiClient.patch(`/tasks/${task.id}`, task);
    return response.data;
  },  

  deleteTask: async (id) => {
    await apiClient.delete(`/tasks/${id}`);
  },
};


export default TaskService