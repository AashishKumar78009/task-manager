from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Task
import crud

app = FastAPI()

# CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # use specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/tasks")
async def create_task(task: Task):
    return await crud.create_task(task)

@app.get("/tasks")
async def get_tasks():
    return await crud.get_all_tasks()

@app.get("/tasks/{task_id}")
async def get_task(task_id: str):
    task = await crud.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.put("/tasks/{task_id}")
async def update_task(task_id: str, task: Task):
    updated = await crud.update_task(task_id, task)
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    success = await crud.delete_task(task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted"}


# @app.get("/contacts")
# def list_contacts():
#     return crud.get_all_contacts()

# @app.get("/contacts/{id}")
# def read_contact(id: str):
#     c = crud.get_contact(id)
#     if not c: raise HTTPException(404, "Not found")
#     return c

# @app.post("/contacts")
# def create(c: Contact):
#     return crud.create_contact(c.dict())

# @app.put("/contacts/{id}")
# def update(id: str, c: Contact):
#     updated = crud.update_contact(id, c.dict())
#     if not updated: raise HTTPException(404, "Not found")
#     return updated

# @app.delete("/contacts/{id}")
# def remove(id: str):
#     deleted = crud.delete_contact(id)
#     if not deleted: raise HTTPException(404, "Not found")
#     return {"message": "Deleted"}
