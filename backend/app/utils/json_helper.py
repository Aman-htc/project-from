import json
import os

FILE_NAME = "data.json"


def save_data(data):

    if os.path.exists(FILE_NAME):

        with open(FILE_NAME, "r") as f:
            try:
                all_data = json.load(f)
            except:
                all_data = []

    else:
        all_data = []

    all_data.append(data)

    with open(FILE_NAME, "w") as f:
        json.dump(all_data, f, indent=4)