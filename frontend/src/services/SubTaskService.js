import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000", // Cambia esto por la URL de tu API FastAPI
});

const SubTaskService = {
  getSubTasks: async (task_id) => {
    const response = await apiClient.get(`/subtasks/${task_id}`);
    return response.data;
  },

  createSubTask: async (subTask) => {
    const response = await apiClient.post(`/subtasks/${subTask.task_id}`, subTask);
    return response.data;
  },

  getSubTask: async (id) => {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  },

  updateSubTask: async (id, task) => {
    const response = await apiClient.put(`/tasks/${id}`, task);
    return response.data;
  },

  deleteSubTask: async (id) => {
    await apiClient.delete(`/tasks/${id}`);
  },
};


export default SubTaskService