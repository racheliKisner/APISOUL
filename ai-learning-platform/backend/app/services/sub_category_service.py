from sqlalchemy.orm import Session
from app.models.models import SubCategory

def create_sub_category(db: Session, name: str, category_id: int) -> SubCategory:
    sub_category = SubCategory(name=name, category_id=category_id)
    db.add(sub_category)
    db.commit()
    db.refresh(sub_category)
    return sub_category

def get_sub_categories_by_category(db: Session, category_id: int) -> list:
    return db.query(SubCategory).filter(SubCategory.category_id == category_id).all()

def get_sub_category_by_id(db: Session, sub_category_id: int) -> SubCategory:
    return db.query(SubCategory).filter(SubCategory.id == sub_category_id).first()
