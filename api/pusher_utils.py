from models import User

def update_active_users(db, client):
    u = db.query(User).all()
    users = []
    for user in u:
        users.append((
            "id", user.id,
            "username", user.username,
            "is_active", user.is_active,
            
        ))

    client.trigger('active-users', 'changed-user', {'users': users})
