import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import SubTaskForm from "./SubTaskForm";
import SubTaskList from "./SubTaskList";

const SubTaskModal = ({ isOpen, onClose, taskId }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Subtareas</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SubTaskForm taskId={taskId} />
          <SubTaskList taskId={taskId} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubTaskModal;
