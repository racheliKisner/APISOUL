from sqlalchemy.orm import Session
from app.models.models import Category

def create_category(db: Session, name: str) -> Category:
    category = Category(name=name)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category

def get_all_categories(db: Session) -> list:
    return db.query(Category).all()

def get_category_by_id(db: Session, category_id: int) -> Category:
    return db.query(Category).filter(Category.id == category_id).first()
