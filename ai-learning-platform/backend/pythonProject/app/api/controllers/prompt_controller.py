from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.schemas.prompt_schema import PromptCreate, Prompt
from app.services.prompt_service import create_prompt, get_user_prompts

router = APIRouter()

@router.post("/prompts/", response_model=Prompt)
def create_new_prompt(prompt: PromptCreate, db: Session = Depends(get_db)):
    return create_prompt(db=db, user_id=prompt.user_id, category_id=prompt.category_id, sub_category_id=prompt.sub_category_id, prompt=prompt.prompt, response=prompt.response)

@router.get("/prompts/user/{user_id}", response_model=list[Prompt])
def read_user_prompts(user_id: int, db: Session = Depends(get_db)):
    return get_user_prompts(db=db, user_id=user_id)
