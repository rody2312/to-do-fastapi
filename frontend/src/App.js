import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <>
      <Box width="full" textAlign="center" m={6}>
        <Heading>Administración de tareas</Heading>
      </Box>
      <Flex bg="gray.100" minH="100vh" p={6} alignItems="center" justifyContent="center">
        <Flex direction={["column", "row"]} width="full" justifyContent="center" align="start">
          <Box borderRadius='lg' width="400px" maxWidth="400px" bg="white" p={6} boxShadow="md" mb={[6, 0]} mr={[0, 6]} overflow="auto">
            <h1 className="text-3xl font-semibold mb-6">Agregar tareas</h1>
            <TaskForm />
          </Box>
          <Box borderRadius='lg' width="500px" maxWidth="500px" bg="white" p={6} boxShadow="md" overflow="auto">
            <TaskList />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default App;
