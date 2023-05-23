import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <>
      <Box  textAlign="center" m={6}>
            <Heading as="h1" size="xl" wordBreak="break-word">
              To-Do App
            </Heading>
      </Box>
      <Flex bg="gray.100" minH="100vh" p={6} alignItems="center" justifyContent="center">
        <Flex direction={["column", "column", "row"]} width="full" justifyContent="center" align="start">
          <Box borderRadius="lg" width={["full", "full", "400px"]} maxWidth={["full", "full", "400px"]} bg="white" p={6} boxShadow="md" mb={[6, 6, 0]} mr={[0, 0, 6]} overflow="auto">
            <Heading as="h1" size="xl" mb={6}>Agregar tareas</Heading>
            <TaskForm />
          </Box>
          <Box borderRadius="lg" width={["full", "full", "500px"]} maxWidth={["full", "full", "500px"]} bg="white" p={[2, 4, 6]} boxShadow="md" overflow="auto">
            <TaskList />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default App;
