import { useEffect, useState } from "react";
import { VStack, ListItem, HStack, IconButton, Text, List, Button, Checkbox } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import TaskService from "../services/TaskService";
import { useDispatch, useSelector } from "react-redux";
import { edit, fetchTasks, remove, selectTaskById, updateTask } from "../features/taskSlice";
import SubTaskModal from "./SubTaskModal";
import { clearMessage } from "../features/subTaskSlice";
import ConfirmationDialog from "./message/ConfirmationDialog";

const TaskList = () => {
  const [isSubTaskModalOpen, setIsSubTaskModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const onClose = () => setIsOpen(false);

  const tasks = useSelector((state) => state.tasks.value)
  const dispatch = useDispatch()

  const task = useSelector(state => selectTaskById(state, deleteTaskId));
  
  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const handleOpenSubTaskModal = (taskId) => {
    setSelectedTaskId(taskId);
    setIsSubTaskModalOpen(true);
  };

  const handleCloseSubTaskModal = () => {
    dispatch(clearMessage());
    setIsSubTaskModalOpen(false);
  }

  //Funciones para el mensaje de eliminación
  const handleDelete = (taskId) => {
    setDeleteTaskId(taskId);
    setIsOpen(true);
  }

  const confirmDelete = () => {
    dispatch(remove(deleteTaskId));
    setIsOpen(false);
  }


  return (
    <VStack align="stretch" spacing={4}>
      <Text className="text-xl font-semibold mb-4">Lista de tareas</Text>
      <List>
        {tasks &&
          tasks.map((task) => (
            <ListItem key={task.id} bg="gray.200" p={4} borderRadius="md" margin={2}>
              <HStack justifyContent="space-between">
                <Checkbox size="lg" colorScheme="green" borderColor="blackAlpha.400" bgColor="blue.100" isChecked={task.completed} onChange={(e) => {
                    const updatedTask = { ...task, completed: !task.completed };
                    dispatch(updateTask(updatedTask));
                }} />
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
                    onClick={() => handleDelete(task.id)}
                    colorScheme="red"
                  />
                </HStack>
              </HStack>
            </ListItem>
          ))}
      </List>
      <SubTaskModal
        isOpen={isSubTaskModalOpen}
        onClose={handleCloseSubTaskModal}
        taskId={selectedTaskId}
      />
      <ConfirmationDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmDelete}
        title={`Eliminar Tarea: ${task ? task.title : ''}`}
        message="¿Estás seguro? No podrás deshacer esta acción después."
      />
    </VStack>
  );
};

export default TaskList;
