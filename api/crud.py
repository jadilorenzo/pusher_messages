from sqlalchemy import text
from sqlalchemy.orm import Session
from models import User
from pusher_utils import update_active_users

def get_user(db: Session, username):
    """Get user based off id"""
    return db.query(User).filter(User.username == username).first()

def login_user(db: Session, username: str, password: str, client):
    """Set user status to be true if logged in properly"""
    if (db.query(User).filter((User.username == username) & (User.hashed_password == password)).first() != 0):
        db.execute(text("UPDATE users SET is_active=:x WHERE username=:y"), [{"x": True, "y": username}])
        update_active_users(db, client)
    
        return True
    else:
        return False

def logout_user(db: Session, username: str, client: any):
    """Log out for appropriate user"""
    db.execute(text("UPDATE users SET is_active=:x WHERE username=:y"), [{"x": False, "y": username}])
    update_active_users(db, client)

    return True
    
def create_user(db: Session, username: str, password: str):  
    """Add users to database"""  
    user = User(username=username, password=password, is_active=False)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
