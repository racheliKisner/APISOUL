from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.schemas.sub_category_schema import SubCategoryCreate, SubCategory
from app.services.sub_category_service import create_sub_category, get_sub_categories_by_category, get_sub_category_by_id

router = APIRouter()

@router.post("/sub_categories/", response_model=SubCategory)
def create_new_sub_category(sub_category: SubCategoryCreate, db: Session = Depends(get_db)):
    return create_sub_category(db=db, name=sub_category.name, category_id=sub_category.category_id)

@router.get("/sub_categories/category/{category_id}", response_model=list[SubCategory])
def read_sub_categories(category_id: int, db: Session = Depends(get_db)):
    return get_sub_categories_by_category(db=db, category_id=category_id)

@router.get("/sub_categories/{sub_category_id}", response_model=SubCategory)
def read_sub_category(sub_category_id: int, db: Session = Depends(get_db)):
    sub_category = get_sub_category_by_id(db=db, sub_category_id=sub_category_id)
    if not sub_category:
        raise HTTPException(status_code=404, detail="SubCategory not found")
    return sub_category
