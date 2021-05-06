from sqlalchemy import update
from models import User, Room
from pusher_utils import update_active_users
from database import db

def get_user(username):
    """Get user based off id"""
    return db.query(User).filter(User.username == username).first()

def login_user(username: str, password: str):
    """Set user status to be true if logged in properly"""
    if (db.query(User).filter((User.username == username) & (User.hashed_password == password)).first() != 0):
        db.execute(update(User).where(User.username == username).values(is_active=True))
        db.commit()
        update_active_users()
    
        return True
    else:
        return False

def logout_user(username: str):
    """Log out for appropriate user"""
    db.execute(update(User).where(User.username == username).values(is_active=False))
    db.commit()
    update_active_users()

    return True
    
def create_user(username: str, password: str):  
    """Add users to database"""  
    user = User(username=username, hashed_password=password, is_active=True)
    db.add(user)
    db.commit()
    return True

def get_users():
    return db.query(User).all()


def create_room(users: list):
    """Add room to database"""
    room = Room(user_ids=users)
    db.add(room)
    db.commit()
    return room

def get_rooms():
    return db.query(Room).all()
