from app.utils.data_helper import read_json, write_json, save_json

FILE_PATH = "app/data/company_details.json"


# CREATE (AUTO ID)
def save_company(data):
    company = read_json(FILE_PATH)

    if not company:
        data["id"] = 1
    else:
        max_id = max([item.get("id", 0) for item in company])
        data["id"] = max_id + 1

    company.append(data)
    write_json(FILE_PATH, company)

    return data


# GET ALL
def get_company():
    return read_json(FILE_PATH)


# UPDATE (ID BASED)
def update_company(id, data):
    company = read_json(FILE_PATH)

    for i, item in enumerate(company):
        if item.get("id") == id:
            data["id"] = id
            company[i] = data
            write_json(FILE_PATH, company)

            return {
                "success": True,
                "message": "Updated successfully",
                "data": company[i]
            }

    return {
        "success": False,
        "message": "Company not found"
    }