from pydantic import BaseModel, Field
from datetime import datetime

# Se crea un esquema para cuando se crea una nueva tarea. 
# Este esquema incluirá todos los campos necesarios para crear una tarea con validaciones
class TaskCreate(BaseModel):
    title: str = Field(min_length=4, max_length=30)
    description: str = Field()
    completed: bool
    due_date: datetime = None

# Se crea un esquema para una tarea completa. 
# Este esquema hereda de TaskCreate e incluye cualquier otro campo que una tarea pueda tener.
class Task(TaskCreate):
    id: int
    completed: bool

    class Config:
        orm_mode = True

# Se crea un esquema para cuando se crea una nueva subtarea. 
# Este esquema incluirá todos los campos necesarios para crear una subtarea.
class SubTaskCreate(BaseModel):
    title: str = Field()
    task_id: int
    due_date: datetime = None

# Se crea un esquema para una subtarea completa. 
# Este esquema hereda de SubTaskCreate e incluye cualquier otro campo que una subtarea pueda tener.
class SubTask(SubTaskCreate):
    id: int
    completed: bool
    task_id: int  # Este es el ID de la tarea principal a la que pertenece la subtarea.

    class Config:
        orm_mode = True
