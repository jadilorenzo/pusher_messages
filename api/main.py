from pusher_utils import update_active_users, update_active_rooms

from fastapi import FastAPI
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware
from database import db
from crud import get_user, get_rooms
from pydantic import BaseModel
from crud import create_room


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*', 'http://localhost:3000'],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=['*'],
    allow_credentials=True
)

@app.get("/")
def get_root():
    return get_user("Jacob Di Lorenzo")


@app.post("/room_init/")
def room_init():
    return True

class RoomCreate(BaseModel):
    user_ids: list

@app.post("/room_create/")
def create_new_room(body: RoomCreate):
    update_active_rooms()
    room = create_room(body.user_ids)
    return room.id

@app.get("/rooms_get/")
def get_all_room():
    return get_rooms()

import user_api
