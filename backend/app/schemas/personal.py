from pydantic import BaseModel
from datetime import date
from typing import Optional


class PersonalRequest(BaseModel):
    id: Optional[int] = None
    firstName: str
    lastName: str
    email: str
    phone: str
    dob: str
    gender: str
    skills: str
    address: str