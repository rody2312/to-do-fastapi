import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <Box bg="gray.100" minH="100vh" p={6}>
      <Box maxW="md" mx="auto" bg="white" p={6} boxShadow="md">
        <h1 className="text-3xl font-semibold mb-6">Administrador de tareas</h1>
        <TaskForm tasks={tasks} setTasks={setTasks} />
      </Box>
      <Box maxW="md" mx="auto" mt={5} bg="white" p={6} boxShadow="md">
        <TaskList tasks={tasks} setTasks={setTasks} />
      </Box>
    </Box>
  );
};

export default App;
