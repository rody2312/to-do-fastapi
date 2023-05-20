import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Divider } from "@chakra-ui/react";
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
          <SubTaskForm taskId={taskId} />
          <Divider my={6} />
          <SubTaskList taskId={taskId} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubTaskModal;
