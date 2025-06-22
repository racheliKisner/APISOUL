#
# # קובץ user.py
# from sqlalchemy import Column, String, Integer
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import relationship
#
# Base = declarative_base()
#
# class User(Base):
#     __tablename__ = 'users'
#
#     id = Column(Integer, primary_key=True, autoincrement=True)
#     name = Column(String(255), nullable=False)
#     phone = Column(String(50))
#
#     prompts = relationship("Prompt", back_populates="user")
#
#
# from app.models.prompt import Prompt
