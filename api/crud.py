from sqlalchemy.orm import Session
from models import User

def get_user(db: Session, user_id):
    """Get user based off id"""
    return db.query(User).filter(User.id == user_id).first(

def login_user(db: Session, username: str, password: str):
    if (db.query(User).filter(User.username == username).all() != None):
        return True
    else:
        return False

def create_user(db: Session, username: str, password: str):    
    user = User(username=username, password=password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
