import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000", // FastAPI base URL
});

export const fetchTasks = () => API.get("/tasks");
export const fetchTask = (id) => API.get(`/tasks/${id}`);
export const createTask = (data) => API.post("/tasks", data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

