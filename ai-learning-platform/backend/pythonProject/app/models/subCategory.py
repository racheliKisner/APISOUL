# from sqlalchemy import Column, String, Integer, ForeignKey
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import relationship
# from app.models.user import Base
#
#
# class SubCategory(Base):
#     __tablename__ = 'sub_categories'
#
#     id = Column(Integer, primary_key=True, autoincrement=True)
#     name = Column(String(255), nullable=False)
#     category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
#
#     category = relationship("Category", back_populates="sub_categories")
#     prompts = relationship("Prompt", back_populates="sub_category")
