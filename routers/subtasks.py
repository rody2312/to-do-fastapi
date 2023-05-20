from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import crud, models, schemas
from models import SessionLocal

router = APIRouter()

# Función para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/{task_id}", response_model=schemas.SubTask)
def create_subtask(task_id: int, subTask: schemas.SubTaskCreate, db: Session = Depends(get_db)):
    return crud.create_subtask(db=db, subtask=subTask, task_id=task_id)

@router.get("/{task_id}", response_model=List[schemas.SubTask])
def read_subtasks(task_id:int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    subtasks = crud.get_subtasks(db, task_id, skip=skip, limit=limit)
    return subtasks

@router.get("/{subtask_id}", response_model=schemas.SubTask)
def read_subtask(subtask_id: int, db: Session = Depends(get_db)):
    subtask = crud.get_subtask(db, subtask_id=subtask_id)
    if subtask is None:
        raise HTTPException(status_code=404, detail="SubTask not found")
    return subtask

@router.patch("/{subtask_id}", response_model=schemas.SubTask)
def update_task(subtask_id: int, subtask: schemas.SubTaskCreate, db: Session = Depends(get_db)):
    return crud.update_subtask(db=db, subtask_id=subtask_id, subtask=subtask)

@router.delete("/{subtask_id}")
def delete_subtask(subtask_id: int, db: Session = Depends(get_db)):
    subtask = crud.get_subtask(db, subtask_id=subtask_id)
    if subtask is None:
        raise HTTPException(status_code=404, detail="SubTask not found")
    crud.delete_subtask(db=db, subtask_id=subtask_id)
    return {"status": "SubTask deleted"}
