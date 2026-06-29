from app.utils.data_helper import save_json, read_json, write_json

FILE = "app/data/user_details.json"


# CREATE (AUTO ID)
def save_personal(data):
    users = read_json(FILE)

    if not users:
        data["id"] = 1
    else:
        max_id = max([u.get("id", 0) for u in users])
        data["id"] = max_id + 1

    users.append(data)
    write_json(FILE, users)

    return data


# GET ALL
def get_personal():
    return read_json(FILE)


# UPDATE (ID BASED)
def update_personal(id, data):
    users = read_json(FILE)

    for i, user in enumerate(users):
        if user.get("id") == id:
            data["id"] = id
            users[i] = data
            write_json(FILE, users)

            return {
                "success": True,
                "message": "Updated successfully",
                "data": users[i]
            }

    return {"success": False, "message": "User not found"}


# DELETE (ID BASED)
def delete_personal(id):
    users = read_json(FILE)

    for i, user in enumerate(users):
        if user.get("id") == id:
            deleted = users.pop(i)
            write_json(FILE, users)

            return {
                "success": True,
                "message": "Deleted successfully",
                "data": deleted
            }

    return {"success": False, "message": "User not found"}