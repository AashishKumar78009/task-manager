from models import Task
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.taskmanager
collection = db.tasks

def serialize_task(task):
    task["id"] = str(task["_id"])
    task.pop("_id")
    return task

async def create_task(task: Task):
    result = await collection.insert_one(task.dict())
    new_task = await collection.find_one({"_id": result.inserted_id})
    return serialize_task(new_task)

async def get_all_tasks():
    tasks = []
    cursor = collection.find()
    async for task in cursor:
        tasks.append(serialize_task(task))
    return tasks

async def get_task(task_id: str):
    if not ObjectId.is_valid(task_id):
        return None
    task = await collection.find_one({"_id": ObjectId(task_id)})
    return serialize_task(task) if task else None

async def update_task(task_id: str, updated: Task):
    if not ObjectId.is_valid(task_id):
        return None
    await collection.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": updated.dict()}
    )
    updated_task = await collection.find_one({"_id": ObjectId(task_id)})
    return serialize_task(updated_task) if updated_task else None

async def delete_task(task_id: str):
    if not ObjectId.is_valid(task_id):
        return None
    result = await collection.delete_one({"_id": ObjectId(task_id)})
    return result.deleted_count > 0



# from bson.objectid import ObjectId
# from database import contacts_collection

# def contact_serializer(c):
#     return {"id": str(c["_id"]), "name": c["name"], "email": c["email"], "phone": c["phone"]}

# def get_all_contacts():
#     return [contact_serializer(c) for c in contacts_collection.find()]

# def get_contact(id: str):
#     c = contacts_collection.find_one({"_id": ObjectId(id)})
#     return contact_serializer(c) if c else None

# def create_contact(data: dict):
#     res = contacts_collection.insert_one(data)
#     return get_contact(str(res.inserted_id))

# def update_contact(id: str, data: dict):
#     contacts_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
#     return get_contact(id)

# def delete_contact(id: str):
#     return contacts_collection.delete_one({"_id": ObjectId(id)}).deleted_count
