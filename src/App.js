import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Use environment variable for the backend URL
  const backendURL = 'http://127.0.0.1:4000';

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
    </div>
  );
}

export default App;
