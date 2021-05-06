from main import app
from pydantic import BaseModel
from models import User
from crud import get_user, get_users, login_user, logout_user, create_user
from pusher_utils import update_active_users

class UserIsActive(BaseModel):
    username: str

@app.post("/is_active/")
def get_activity_of_user(body: UserIsActive):
    user = get_user(body.username)
    return user


class UserLogin(BaseModel):
    username: str
    password: str


@app.post("/login_user/")
def login(body: UserLogin):
    print(body)
    update_active_users()
    success = login_user(username=body.username, password=body.password)
    return success


class UserLogout(BaseModel):
    username: str


@app.post("/logout_user/")
def logout(body: UserLogout):
    success = logout_user(username=body.username)
    print(body, success)
    return success


@app.post("/create_user/")
def signup(body: UserLogin):
    create_user(body.username, body.password)
    return True

@app.post("/users_init/")
def users_init():
    update_active_users()
    return True

@app.get("/users_get/")
def users_init():
    return get_users()
