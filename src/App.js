// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const authServerURL = 'http://127.0.0.1:5001';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = await generateToken('USER_ID_HERE'); // Replace with the actual user ID
      const response = await axios.get('http://127.0.0.1:4000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const generateToken = async (userId) => {
    try {
      const response = await axios.post(`${authServerURL}/generate-token`, {
        userId,
      });
      return response.data.token;
    } catch (error) {
      console.error('Error generating token:', error);
      return null;
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
