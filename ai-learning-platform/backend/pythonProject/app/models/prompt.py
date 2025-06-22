# from sqlalchemy import Column, Integer, ForeignKey, Text, TIMESTAMP
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.sql import func
# from sqlalchemy.orm import relationship
#
# from app.models.user import Base
#
# class Prompt(Base):
#     __tablename__ = 'prompts'
#
#     id = Column(Integer, primary_key=True, autoincrement=True)
#     user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
#     category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
#     sub_category_id = Column(Integer, ForeignKey('sub_categories.id'), nullable=False)
#     prompt = Column(Text, nullable=False)
#     response = Column(Text, nullable=False)
#     created_at = Column(TIMESTAMP, server_default=func.now())
#
#     user = relationship("User", back_populates="prompts")
#     category = relationship("Category", back_populates="prompts")
#     sub_category = relationship("SubCategory", back_populates="prompts")
