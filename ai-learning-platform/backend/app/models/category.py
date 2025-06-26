# from sqlalchemy import Column, String, Integer
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import relationship
#
# from app.models.user import Base
#
# class Category(Base):
#     __tablename__ = 'categories'
#
#     id = Column(Integer, primary_key=True, autoincrement=True)
#     name = Column(String(255), nullable=False)
#
#     sub_categories = relationship("SubCategory", back_populates="category")
#     prompts = relationship("Prompt", back_populates="category")
