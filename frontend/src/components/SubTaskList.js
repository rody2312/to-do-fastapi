import React, { useEffect } from "react";
import { VStack, ListItem, HStack, IconButton, Text, List } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubTasks, remove } from "../features/subTaskSlice";

const SubTaskList = ({ taskId }) => {
  const subTasks = useSelector((state) => state.subTasks.value)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSubTasks(taskId))
  }, [dispatch, taskId])

  return (
    <VStack align="stretch" spacing={4}>
      <Text className="text-xl font-semibold mb-4">Subtareas</Text>
      <List>
        {subTasks &&
          subTasks.map((subTask) => (
            <ListItem key={subTask.id} bg="gray.200" p={4} borderRadius="md" margin={2}>
              <HStack justifyContent="space-between">
                <Text>{subTask.title}</Text>
                <HStack>
                  <IconButton
                    aria-label="Delete subtask"
                    icon={<DeleteIcon />}
                    onClick={() => dispatch(remove(subTask.id))}
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

export default SubTaskList;
