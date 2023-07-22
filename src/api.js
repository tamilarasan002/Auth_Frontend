// src/api.js
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL; // Replace with your backend URL

const api = axios.create({
  baseURL: backendURL,
});

// Define your API methods here
export const fetchTasks = async () => {
  try {
    const response = await api.get('/api/tasks');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await api.post('/api/tasks', { task });
    return response.data;
  } catch (error) {
    throw error;
  }
};
