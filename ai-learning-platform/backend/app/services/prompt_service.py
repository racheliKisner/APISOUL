from sqlalchemy.orm import Session
from app.models.models import Prompt

def create_prompt(db: Session, user_id: int, category_id: int, sub_category_id: int, prompt: str, response: str) -> Prompt:
    new_prompt = Prompt(user_id=user_id, category_id=category_id, sub_category_id=sub_category_id, prompt=prompt, response=response)
    db.add(new_prompt)
    db.commit()
    db.refresh(new_prompt)
    return new_prompt

def get_user_prompts(db: Session, user_id: int) -> list:
    return db.query(Prompt).filter(Prompt.user_id == user_id).all()
