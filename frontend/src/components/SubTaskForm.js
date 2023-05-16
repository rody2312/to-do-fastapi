import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button, FormErrorMessage } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createSubTask } from "../features/subTaskSlice";

const SubTaskForm = ({ taskId }) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(createSubTask({ title:title, task_id:taskId }));
      setTitle("");
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
          placeholder="Titulo de subtarea"
        />
        <FormErrorMessage>{titleError}</FormErrorMessage>
      </FormControl>
      <Button mt={4} type="submit" colorScheme="blue">
        Crear subtarea
      </Button>
    </form>
  );
};

export default SubTaskForm;
