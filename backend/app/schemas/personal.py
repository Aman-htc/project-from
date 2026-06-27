from pydantic import BaseModel
from datetime import date

class PersonalRequest(BaseModel):
    firstName: str
    lastName: str
    email: str
    phone: str
    dob: date
    gender: str
    skills: str
    address: str