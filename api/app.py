from fastapi import FastAPI, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pusher

pusher_client = pusher.Pusher(
    app_id='925341',
    key='922ac30666e5c94d5e7a',
    secret='f3992180415e80497cc6',
    cluster='us2',
    ssl=True
)

from database import Base
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, User
from crud import get_user, login_user, logout_user

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


class UserIsActive(BaseModel):
    username: str

@app.get("/")
def get_root(db: Session = Depends(get_db)):
    return get_user(db, "Jacob Di Lorenzo")

@app.post("/is_active/")
def get_activity_of_user(body: UserIsActive, db: Session = Depends(get_db)):
    user = get_user(db, body.username)
    print(user.is_active)
    return user

class UserLogin(BaseModel):
    username: str
    password: str

@app.post("/login/")
def login(body: UserLogin, db: Session = Depends(get_db)):
    print(body)
    success = login_user(db=db, username=body.username, password=body.password, client=pusher_client)
    return success

class UserLogout(BaseModel):
    username: str

@app.post("/logout/")
def logout(body: UserLogout, db: Session = Depends(get_db)):
    success = logout_user(db=db, username=body.username, client=pusher_client)
    print(body, success)
    return success
