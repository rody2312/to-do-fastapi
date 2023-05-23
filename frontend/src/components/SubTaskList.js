import React, { useEffect, useState } from "react";
import { VStack, ListItem, HStack, IconButton, Text, List, Checkbox } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubTasks, remove, selectSubTaskById, updateSubTask } from "../features/subTaskSlice";
import ConfirmationDialog from "./message/ConfirmationDialog";

const SubTaskList = ({ taskId }) => {
  const subTasks = useSelector((state) => state.subTasks.value)
  const dispatch = useDispatch()
  
  const [isOpen, setIsOpen] = useState(false);
  const [deleteSubTaskId, setDeleteSubTaskId] = useState(null);
  const onClose = () => setIsOpen(false);

  const subTask = useSelector(state => selectSubTaskById(state, deleteSubTaskId));

  useEffect(() => {
    dispatch(fetchSubTasks(taskId))
  }, [dispatch, taskId])


  //Funciones para el mensaje de eliminación
  const handleDelete = (subTaskId) => {
    setDeleteSubTaskId(subTaskId);
    setIsOpen(true);
  }

  const confirmDelete = () => {
    dispatch(remove(deleteSubTaskId));
    setIsOpen(false);
  }
  
  return (
    <VStack align="stretch" spacing={4}>
      <Text className="text-xl font-semibold">Lista de subtareas</Text>
      <List>
        {subTasks && subTasks.length > 0 ?
          subTasks.map((subTask) => (
            <ListItem key={subTask.id} bg="gray.200" p={4} borderRadius="md" margin={2}>
              <HStack justifyContent="space-between">
                <Checkbox
                  size="lg" colorScheme="green" borderColor="blackAlpha.400" bgColor="blue.100"
                  isChecked={subTask.completed} 
                  onChange={(e) => {
                    const updatedSubTask = { ...subTask, completed: e.target.checked };
                    dispatch(updateSubTask(updatedSubTask));
                  }} 
                />
                <Text>{subTask.title}</Text>
                <HStack>
                  <IconButton
                    aria-label="Delete subtask"
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(subTask.id)}
                    colorScheme="red"
                  />
                </HStack>
              </HStack>
            </ListItem>
          )) : <p className="m-4">No hay subtareas, puedes crearlos en el registro</p>}
      </List>

      {/* Mensaje de confirmación para eliminar subtarea */}
      <ConfirmationDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmDelete}
        title={`Eliminar Tarea: ${subTask ? subTask.title : ''}`}
        message="¿Estás seguro? No podrás deshacer esta acción después."
      />
    </VStack>
  );
};

export default SubTaskList;
