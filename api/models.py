from database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, ARRAY

class User(Base):
    __tablename__ = "users"
    id = Column("id", Integer, primary_key=True)
    username = Column("username", String)
    hashed_password = Column("hashed_password", String)
    is_active = Column("is_active", Boolean, default=False)

class Room(Base):
    __tablename__ = 'rooms'
    id = Column("id", Integer, primary_key=True)
    user_ids = Column("user_ids", ARRAY(Integer))
    
