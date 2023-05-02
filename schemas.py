from pydantic import BaseModel
from datetime import datetime

class TaskCreate(BaseModel):
    title: str
    description: str
    due_date: datetime = None

class Task(TaskCreate):
    id: int
    completed: bool

    class Config:
        orm_mode = True
