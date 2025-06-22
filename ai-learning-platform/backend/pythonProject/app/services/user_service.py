from sqlalchemy.orm import Session
from app.models.models import User
from sqlalchemy.exc import IntegrityError


def create_user(db: Session, name: str, phone: str) -> User:
    existing_user = get_user_by_phone(db, phone)
    if existing_user:
        return existing_user
    user = User(name=name, phone=phone)
    try:
        db.add(user)
        db.commit()
        db.refresh(user)
    except IntegrityError:
        db.rollback()
        raise ValueError("User with this phone number already exists.")
    return user


def get_user_by_phone(db: Session, phone: str) -> User:
    return db.query(User).filter(User.phone == phone).first()


def get_user_by_id(db: Session, user_id: int) -> User:
    return db.query(User).filter(User.id == user_id).first()


def get_all_users(db: Session) -> list:
    return db.query(User).all()


def update_user(db: Session, user_id: int, name: str = None, phone: str = None) -> User:
    user = get_user_by_id(db, user_id)
    if not user:
        return None
    if name:
        user.name = name
    if phone:
        user.phone = phone
    db.commit()
    db.refresh(user)
    return user


def delete_user(db: Session, user_id: int) -> bool:
    user = get_user_by_id(db, user_id)
    if not user:
        return False
    db.delete(user)
    db.commit()
    return True
