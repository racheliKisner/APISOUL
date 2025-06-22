import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# טוען משתני סביבה מקובץ .env
load_dotenv()

# קבלת כתובת למסד הנתונים
DATABASE_URL = os.getenv("DATABASE_URL")

# יצירת מנוע SQLAlchemy רגיל
engine = create_engine(DATABASE_URL, echo=True)

# הגדרת session רגיל
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# בסיס למודלים
Base = declarative_base()

# פונקציית תלות ל-FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
