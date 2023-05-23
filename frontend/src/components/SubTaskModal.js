import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Divider, Text, VStack } from "@chakra-ui/react";
import SubTaskForm from "./SubTaskForm";
import SubTaskList from "./SubTaskList";
import { useSelector } from "react-redux";
import { selectTaskById } from "../features/taskSlice";

const SubTaskModal = ({ isOpen, onClose, taskId }) => {
  const task = useSelector(state => selectTaskById(state, taskId));

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
      <ModalHeader>Subtareas de "{task ? task.title : ''}"</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {task && (
            <VStack spacing={2} align="start" mb={4}>
              <Text fontWeight="bold">Descripción de tarea:</Text>
              <Text>{task.description}</Text>
            </VStack>
          )}
          <Divider my={6} />
          <Text className="mb-4" fontWeight="bold">Creación de subtareas</Text>
          <SubTaskForm taskId={taskId} />
          <Divider my={6} />
          <SubTaskList taskId={taskId} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubTaskModal;
