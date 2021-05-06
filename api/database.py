from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

engine = create_engine('postgres://postgres@/pusher_messages', echo=False)

Base = declarative_base()


def get_db():
    return Session(engine)

db = get_db()

Base.metadata.create_all(engine)