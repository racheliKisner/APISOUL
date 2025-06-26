from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.schemas.category_schema import CategoryCreate, Category
from app.services.category_service import create_category, get_all_categories, get_category_by_id

router = APIRouter()

@router.post("/categories/", response_model=Category)
def create_new_category(category: CategoryCreate, db: Session = Depends(get_db)):
    return create_category(db=db, name=category.name)

@router.get("/categories/", response_model=list[Category])
def read_all_categories(db: Session = Depends(get_db)):
    return get_all_categories(db=db)

@router.get("/categories/{category_id}", response_model=Category)
def read_category(category_id: int, db: Session = Depends(get_db)):
    category = get_category_by_id(db=db, category_id=category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category
