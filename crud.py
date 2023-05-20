from sqlalchemy.orm import Session
import models, schemas

#CRUD De Tasks

def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(title=task.title, description=task.description, due_date=task.due_date)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_tasks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Task).offset(skip).limit(limit).all()

def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()

def update_task(db: Session, task_id: int, task: schemas.TaskCreate):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).one()
    for var, value in vars(task).items():
        if value is not None:
            setattr(db_task, var, value)
    db.commit()
    db.refresh(db_task)
    return db_task




def delete_task(db: Session, task_id: int):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    db.delete(db_task)
    db.commit()



#CRUD De SubTasks

def create_subtask(db: Session, subtask: schemas.SubTaskCreate, task_id: int):
    # Crea una nueva subtarea en la base de datos.
    # La subtarea se crea a partir del esquema SubTaskCreate y se le añade el ID de la tarea principal.
    db_subtask = models.SubTask(title=subtask.title,due_date=subtask.due_date, task_id=task_id)
    db.add(db_subtask)
    db.commit()
    db.refresh(db_subtask)
    return db_subtask

def get_subtasks(db: Session, task_id: int, skip: int = 0, limit: int = 100):
    # Obtiene todas las subtareas de una tarea principal específica.
    # Podemos especificar cuántas subtareas saltar y cuántas obtener.
    return db.query(models.SubTask).filter(models.SubTask.task_id == task_id).offset(skip).limit(limit).all()

def get_subtask(db: Session, subtask_id: int):
    # Obtiene una subtarea específica por su ID.
    return db.query(models.SubTask).filter(models.SubTask.id == subtask_id).first()

def update_subtask(db: Session, subtask_id: int, subtask: schemas.SubTaskCreate):
    # Actualiza una subtarea específica.
    # Podemos actualizar cualquier campo de la subtarea y marcarla como completada o no completada.
    db_subtask = db.query(models.SubTask).filter(models.SubTask.id == subtask_id).one()
    for var, value in vars(subtask).items():
        if value is not None:
            setattr(db_subtask, var, value)
    db.commit()
    db.refresh(db_subtask)
    return db_subtask

def delete_subtask(db: Session, subtask_id: int):
    #Elimina una subtarea específica
    db_task = db.query(models.SubTask).filter(models.SubTask.id == subtask_id).first()
    db.delete(db_task)
    db.commit()