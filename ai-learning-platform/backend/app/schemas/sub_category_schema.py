from pydantic import BaseModel

class SubCategoryBase(BaseModel):
    name: str

class SubCategoryCreate(SubCategoryBase):
    pass

class SubCategory(SubCategoryBase):
    id: int

    class Config:
        orm_mode = True
