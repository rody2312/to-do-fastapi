import React, { useState, useEffect } from 'react';
import TaskService from '../services/TaskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await TaskService.getTasks();
      setTasks(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Lista de tareas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
