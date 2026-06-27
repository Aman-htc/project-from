import json
import os


def save_json(file_path, data):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            try:
                records = json.load(file)
            except json.JSONDecodeError:
                records = []
    else:
        records = []

    records.append(data)

    with open(file_path, "w") as file:
        json.dump(records, file, indent=4, default=str)
        
        
        


def read_json(file_path):
    if not os.path.exists(file_path):
        return []

    with open(file_path, "r") as file:
        try:
            return json.load(file)
        except:
            return []


def write_json(file_path, data):
    with open(file_path, "w") as file:
        json.dump(data, file, indent=4)        