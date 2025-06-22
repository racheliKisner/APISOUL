# קובץ models.py
from sqlalchemy import Column, Integer, String, ForeignKey, Text, TIMESTAMP

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.base import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    phone = Column(String(50))

    prompts = relationship("Prompt", back_populates="user")

class Category(Base):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)

    prompts = relationship("Prompt", back_populates="category")

class SubCategory(Base):
    __tablename__ = 'sub_categories'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)

    prompts = relationship("Prompt", back_populates="sub_category")

class Prompt(Base):
    __tablename__ = 'prompts'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
    sub_category_id = Column(Integer, ForeignKey('sub_categories.id'), nullable=False)
    prompt = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    user = relationship("User", back_populates="prompts")
    category = relationship("Category", back_populates="prompts")
    sub_category = relationship("SubCategory", back_populates="prompts")
