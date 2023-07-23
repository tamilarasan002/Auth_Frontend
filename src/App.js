import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const backendURL = "http://127.0.0.1:4000";

  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // Fetch the token from localStorage
      const token = localStorage.getItem('token');

      const response = await axios.get(`${backendURL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include "Bearer" prefix
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const generateToken = async () => {
    try {
      // Replace 'base64PublicKey' with the actual Base64 public key received from the backend
      const base64PublicKey = 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0tCk1JSUV2QUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktZd2dnU2lBZ0VBQW9JQkFRQ1RreDVvN2NFQll5U2UKbkdLOHA4TG0yTDZocWJBMkxDbVdRcDFId1ZjbS80eHpGSXVvdlJtTm1WV0JVaGMyQkp2QVhIVmFFWmpXSjJlaApBd3VteEpPb3lPdk5tVmk3cTRJZHpZME0xV25idUd2Qk10b0NkRG5SSktFS002T2FmdVIwcDlucDhRTDBnQWUzCnlIc0V4dHprdGp3QUk5R1NuV0NmK0lITDBGaTNHWEV4VkZwRFNEN0dSSmozTmlVY244OERPYnJTd0FPVWFMY0UKR202STlXblMwcHlyTFBFemlrbkVKV3c0M21TTVBBZjRmaEJlODBvUlhDd3JZQjMweWoySmhFTm1odExHcFhOVwpxRjAyVkZmdDZ6UjdVdmx5SWF3eGNKT2hyNVZOSi9WMHRkR0UzR0IrWlNJaWVTMk40dGpjZ0ZhNC9QdFRmdlJ1Cnp5cjVJN0NmQWdNQkFBRUNnZ0VBQ1V0cHplZ0k1a0ozOWFRWjMrZEhza0c5SXB6TkRyY1NBM2NSOERRRmZqSk4KaHBpcEFkUUVmbE9hL0EzUE44VnJNelFLUEJzQm41My9FVGdLT0NoY3VITzNJNkxnaTM2NDJqeFpBWkdXSE9oQwpUbnB2eFZuTCtSZmFnTFJSNkpMTXZCV0U5dzZ6Nkp4T1lDS09CUFlBSEVqblZ6R1ZBSUZOcXZyOE5IbXgxMk9pCnFPTTF2RUNGMU9ROTZkendHK0lWTUdubEZ0MHdrc3QzWFVqTjkyRFgwTjNEeDA5Tm5McVEwVHA4WHNYSk1PTDQKY0xxd0ptQ25NR0xodkREY3VUYlJvdHVvQndqb3VBeDhwSnRQdTdGMjV5ZGV3d2tmaHIyYXZjZ01OSVN5VUhoZApTUTR6Y3BJL1RiUVpHbkVjRFdmQTR1eDlSa3F4SW1iY3VlMVJTS3BDS1FLQmdRQzZRLzJ4OHhsZTBDK0FQWkp4CjdCZjZLMjl6d0dTZmN2NzV5TlZZY2xHcFBkYlF0YjlxY1pZMVZQc1NubUF0d3pXVWN6YzhVS3F6ZGlZN3lDODAKRHE2Tzl5emcvTTFnU1g1QWxnQjVwUFNrSlRTY1NKMElIc3Jna0xMbktMSmVtV0h4Y01lVWI5L2ZpYVNFSTExdQpxSnlIQmYwQkdkN3E4OFJob1VzTDY1V205UUtCZ1FESzB1MEV3ZFI4TDVkdk4zSnFnenUvbWVOeWl0aDFtY0JFCnd3VzAyWC9QUnpjVzlTSWlqUm5XVFcyYTZtMkRGejVrNXdOV081ZG00N0FIZWFyZk9nSklrV1NVeXZTeExHNVYKajVtMDNickF0VDRZQ2QzejBKZDVQWi9pVUFwL0Z5dkQ0WHFrZS9yZzE4T1FsbGV3V2RMQjR6N0tIQkgyMWhzQgo1UVRuZG9XZE13S0JnRm5SL1oxNUgrdlRzb1JCck1QWTJMc2ZoUEFwZjV4UVJOcEkyWEI4T0JySG9qWWszbmhDCjYrOHQycURnMUhwYzN4S0YrTVhTRkc3VDg1M3lhNmpMeDZ0VFVFWHlRa3REUldsNXJDTDh3NmYvOVAzRUdrMVgKSS9ma2J4RC9VL3hBTkxYTDc4SUpyTWhMeEpTZnhTZGVrWlNlODZFN1MzNjdMQ0QwT1k4Mi9JUnRBb0dBTTJCMApxNlRSeDFkaTI4aEcwbFpGMTBZTENHUEZheHkwU0hiQ1JrcG1Cc0o2WVBWZFhUVXkyMGNud1hzcW5HOVIzY3RxCjIvZ2laT3krRlZhcmd2bzF3OTRZaFZ4WDJWMXc0WG1MclBZUnJXajd2cWtaTVA2Z3NCUjlJSjIzMnZPcW9XYkgKWTAwSWd0WUU4dVl5ZGpoNm02U05yaktvRmtlcjliSG1xUjhydjJNQ2dZQklKVm5RN3BjMG5KNzNETjVnYXBiUQpYR2s2bVM0dTNJcTYyeE8rek50eFVJZTlqWWk5amtxVFJCREczbnlycXV6ZUFjUXZXaEhOMWl3ZWNuWUpTaHRGCmFBYmVIOFFoSm5JM2ZKZkEvZmpmLzFycXY2NjlRdE9jcjU1RjVmaFpJUzF0TWloT0hUQ0M5TGE1QzJacFJ5YUQKekZ6Y2pWWXBSSG1iN1J1REtjVS9WZz09Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0tCg==';
      
      // Send the public key to the authentication service to generate a token
      const response = await axios.post(`${backendURL}/generate-token`, { publicKey: base64PublicKey });
      const token = response.data.token;
      
      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Fetch tasks after generating the token
      fetchTasks();
    } catch (error) {
      console.error('Error generating token:', error);
    }
  };

  const addTask = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.post(
        `${backendURL}/api/tasks`,
        { task },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
        <button onClick={generateToken}>Generate Token</button> {/* Add this button to generate a new token */}
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
