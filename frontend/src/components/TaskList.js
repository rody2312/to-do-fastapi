import React, { useEffect } from "react";
import { VStack, ListItem, HStack, IconButton, Text, List } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import TaskService from "../services/TaskService";
import { useDispatch, useSelector } from "react-redux";
import { edit, fetchTasks, remove } from "../features/taskSlice";

const TaskList = () => {

  const tasks = useSelector((state) => state.tasks.value)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  console.log(tasks)
  
  /* const handleEdit = (task) => {
    // Implementa la lógica para editar la tarea
  };

  const handleDelete = async (taskId) => {
    await TaskService.deleteTask(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  }; */

  return (
    <VStack align="stretch" spacing={4}>
      <Text className="text-xl font-semibold mb-4">Lista de tareas</Text>
      <List>
        {tasks &&
          tasks.map((task) => (
            <ListItem key={task.id} bg="gray.200" p={4} borderRadius="md" margin={2}>
              <HStack justifyContent="space-between">
                <Text>{task.title}</Text>
                <HStack>
                  <IconButton
                    aria-label="Edit task"
                    icon={<EditIcon />}
                    onClick={() => dispatch(edit(task))}
                    colorScheme="teal"
                  />
                  <IconButton
                    aria-label="Delete task"
                    icon={<DeleteIcon />}
                    onClick={() => dispatch(remove(task.id))}
                    colorScheme="red"
                  />
                </HStack>
              </HStack>
            </ListItem>
          ))}
      </List>
    </VStack>
  );
};

export default TaskList;
