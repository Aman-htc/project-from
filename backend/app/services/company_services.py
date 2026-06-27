from app.utils.data_helper import save_json
from app.utils.data_helper import read_json

FILE_PATH = "app/data/company_details.json"

def save_company(data):
    print("Company Data:", data)   # Debug

    save_json(FILE_PATH, data)
    
    
   

FILE_PATH = "app/data/company_details.json"

def get_company():
    return read_json(FILE_PATH)