from app.utils.data_helper import save_json
from app.utils.data_helper import read_json

FILE = "app/data/user_details.json"


def save_personal(data):
    save_json(FILE, data)
    
    
def get_personal():
    return read_json(FILE) 



from app.utils.data_helper import read_json, write_json



def update_personal(index, data):
    users = read_json(FILE)

    users[index] = data

    write_json(FILE, users)

    return users[index] 



def delete_personal(index):
    users = read_json(FILE)

    users.pop(index)

    write_json(FILE, users)

    return {"message": "Deleted Successfully"}