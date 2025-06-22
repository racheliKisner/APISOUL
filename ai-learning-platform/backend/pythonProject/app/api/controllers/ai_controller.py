from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.models import Prompt as PromptModel
from app.schemas.prompt_schema import PromptCreate
from app.services.ai_service import generate_lesson
router = APIRouter()

@router.post("/prompts/", response_model=PromptCreate)
def create_prompt(prompt_data: PromptCreate, db: Session = Depends(get_db)):
    try:

        lesson_response = generate_lesson(prompt_data.prompt)


        new_prompt = PromptModel(
            user_id=prompt_data.user_id,
            category_id=prompt_data.category_id,
            sub_category_id=prompt_data.sub_category_id,
            prompt=prompt_data.prompt,
            response=lesson_response
        )

        db.add(new_prompt)
        db.commit()
        db.refresh(new_prompt)

        return new_prompt
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

