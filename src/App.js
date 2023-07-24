import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Use environment variable for the backend URL
  const backendURL = 'http://127.0.0.1:4000';
  const authServiceURL = 'http://127.0.0.1:5001';

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include "Bearer" prefix
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    try {
      await axios.post(
        `${backendURL}/api/tasks`,
        { task },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include "Bearer" prefix
          },
        }
      );
      setTask('');
      fetchTasks(); // Fetch updated tasks after adding a new one
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const generateAndSendToken = async () => {
    try {
      const sub = '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmAZTFq5AJVHCiw5cMJUdp/4EwrmJ20NlsqdHs1gM2eV2tUOWTtIadKyATIeq1aoLs/WoeveZXvwyxtbsHNq5hlk+Bcnzh8IQwbkP2Fl9v6RxdKy0Lh4iqu/8Mx4t/j+Afi9klpd/Pz6G1bFzwARmzxeESWwKqJGhiYbeeCUAk4bB/bI89hVVvYitbbRRXSJc3OlXumi45C8sycKfP/Oym1n6slkcWdv3FhpwtAyZ3c+LA5vVU8omoQf3WJyYCRl2m8OAKtEI+fU6pdRgPikqi4k9BOQsbwy+99Bq/JlueeeJuLAxE4XPg/tNBhfIWzn4uyDlanF61Gy9RpKUEjQVBQIDAQAB\n-----END PUBLIC KEY-----';
 // Replace 'your-subject' with the actual subject
      const response = await axios.post(`${authServiceURL}/generate-and-send-token`, { sub });
      console.log(response.data);
    } catch (error) {
      console.error('Error generating and sending token:', error);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.task}</li>
        ))}
      </ul>
      <button onClick={generateAndSendToken}>Generate and Send Token</button>
    </div>
  );
}

export default App;
