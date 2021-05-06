from models import User
from database import db

import pusher

client = pusher.Pusher(
    app_id='925341',
    key='922ac30666e5c94d5e7a',
    secret='f3992180415e80497cc6',
    cluster='us2',
    ssl=True
)

def update_active_users():
    u = db.query(User).all()
    users = []
    for user in u:
        users.append({
            "id": user.id,
            "username": user.username,
            "is_active": user.is_active,
        })

    client.trigger('users', 'update', users)
    return users

def update_active_rooms():
    r = db.query(Rooms).all()
    rooms = []
    for room in r:
        rooms.append({
            "id": room.id,
            "user_ids": room.user_ids
        })

    client.trigger('rooms', 'update', room)
    return room
