from pydantic import BaseModel
from typing import Optional

class Task(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False


# from pydantic import BaseModel, EmailStr

# class Contact(BaseModel):
#     name: str
#     email: EmailStr
#     phone: str
