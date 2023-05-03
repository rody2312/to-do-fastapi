import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  FormControl,
  HStack,
  Textarea,
  Stack,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import TaskService from "../services/TaskService";

const TaskForm = ({ tasks, setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await TaskService.getTasks();
      setTasks(result);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newTask = await TaskService.createTask({ title, description });
      setTitle("");
      setDescription("");
      setTasks([...tasks, newTask]);
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (title.trim() === "") {
      setTitleError("El título es requerido");
      isValid = false;
    } else {
      setTitleError("");
    }
    if (description.trim() === "") {
      setDescriptionError("La descripción es requerida");
      isValid = false;
    } else {
      setDescriptionError("");
    }
    return isValid;
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={titleError !== ""}>
        <FormLabel>Título</FormLabel>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titulo de tarea"
        />
        <FormErrorMessage>{titleError}</FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={descriptionError !== ""}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción de la tarea"
        />
        <FormErrorMessage>{descriptionError}</FormErrorMessage>
      </FormControl>
      <Button mt={4} type="submit" colorScheme="blue">
        Crear tarea
      </Button>
    </form>
  );
};

export default TaskForm;
