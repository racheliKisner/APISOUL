from pydantic import BaseModel

class PromptBase(BaseModel):
    user_id: int
    category_id: int
    sub_category_id: int
    prompt: str
    response: str

class PromptCreate(PromptBase):
    pass

class Prompt(PromptBase):
    id: int
    created_at: str

    class Config:
        orm_mode = True
