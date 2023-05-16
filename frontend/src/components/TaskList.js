import { useEffect, useState } from "react";
import { VStack, ListItem, HStack, IconButton, Text, List, Button } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import TaskService from "../services/TaskService";
import { useDispatch, useSelector } from "react-redux";
import { edit, fetchTasks, remove } from "../features/taskSlice";
import SubTaskModal from "./SubTaskModal";

const TaskList = () => {
  const [isSubTaskModalOpen, setIsSubTaskModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const tasks = useSelector((state) => state.tasks.value)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const handleOpenSubTaskModal = (taskId) => {
    setSelectedTaskId(taskId);
    setIsSubTaskModalOpen(true);
  };

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
                    aria-label="List subtasks"
                    icon={<ViewIcon />}
                    onClick={() => handleOpenSubTaskModal(task.id)}
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
      <SubTaskModal
        isOpen={isSubTaskModalOpen}
        onClose={() => setIsSubTaskModalOpen(false)}
        taskId={selectedTaskId}
      />
    </VStack>
  );
};

export default TaskList;
