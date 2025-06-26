from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    name: str
    phone: Optional[str] = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

    class Config:
        from_attributes = True
