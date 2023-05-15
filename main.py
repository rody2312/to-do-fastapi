from fastapi import FastAPI
from routers import tasks, subtasks

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],  # Cambia esto por la URL de tu frontend si es diferente
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router, prefix="/tasks")
app.include_router(subtasks.router, prefix="/subtasks")
