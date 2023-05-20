import React, { useEffect } from "react";
import { VStack, ListItem, HStack, IconButton, Text, List, Checkbox } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubTasks, remove, updateSubTask } from "../features/subTaskSlice";

const SubTaskList = ({ taskId }) => {
  const subTasks = useSelector((state) => state.subTasks.value)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSubTasks(taskId))
  }, [dispatch, taskId])
  
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
                    onClick={() => {
                      if (window.confirm("¿Estás seguro de que quieres eliminar esta subtarea?")) {
                        dispatch(remove(subTask.id))
                      }
                    }}
                    colorScheme="red"
                  />
                </HStack>
              </HStack>
            </ListItem>
          )) : <p className="m-4">No hay subtareas, puedes crearlos en el registro</p>}
      </List>
    </VStack>
  );
};

export default SubTaskList;
