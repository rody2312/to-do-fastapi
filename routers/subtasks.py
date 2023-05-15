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

@router.post("/", response_model=schemas.SubTask)
def create_subtask(subtask: schemas.SubTaskCreate, db: Session = Depends(get_db)):
    return crud.create_subtask(db=db, subtask=subtask)

@router.get("/", response_model=List[schemas.SubTask])
def read_subtasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    subtasks = crud.get_subtasks(db, skip=skip, limit=limit)
    return subtasks

@router.get("/{subtask_id}", response_model=schemas.SubTask)
def read_subtask(subtask_id: int, db: Session = Depends(get_db)):
    subtask = crud.get_subtask(db, subtask_id=subtask_id)
    if subtask is None:
        raise HTTPException(status_code=404, detail="SubTask not found")
    return subtask

@router.put("/{subtask_id}", response_model=schemas.SubTask)
def update_subtask(
    subtask_id: int,
    subtask_update: schemas.SubTaskCreate,
    completed: bool,
    db: Session = Depends(get_db),
):
    subtask = crud.get_subtask(db, subtask_id=subtask_id)
    if subtask is None:
        raise HTTPException(status_code=404, detail="SubTask not found")
    return crud.update_subtask(
        db=db, subtask_id=subtask_id, subtask_update=subtask_update, completed=completed
    )

@router.delete("/{subtask_id}")
def delete_subtask(subtask_id: int, db: Session = Depends(get_db)):
    subtask = crud.get_subtask(db, subtask_id=subtask_id)
    if subtask is None:
        raise HTTPException(status_code=404, detail="SubTask not found")
    crud.delete_subtask(db=db, subtask_id=subtask_id)
    return {"status": "SubTask deleted"}
