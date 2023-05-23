from fastapi import FastAPI
from routers import tasks, subtasks

from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
import os

# Cargar variables de entorno desde el archivo .env
load_dotenv()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("ALLOWED_ORIGIN")
    ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router, prefix="/tasks")
app.include_router(subtasks.router, prefix="/subtasks")
