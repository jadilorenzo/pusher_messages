from fastapi import FastAPI, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from database import Base
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, User
from crud import get_user, login_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*', 'http://localhost:3000'],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=['*'],
    allow_credentials=True
)

Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def get_root(db: Session = Depends(get_db)):
    user = get_user(db, 1)
    return user

class UserLogin(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(body: UserLogin, db: Session = Depends(get_db)):
    print(body)
    success = login_user(db=db, username=body.username, password=body.password)
    return success
