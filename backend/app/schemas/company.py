from pydantic import BaseModel
from typing import Optional


class PersonalInformation(BaseModel):
    firstName: str
    lastName: str
    email: str
    phone: str
    dob: Optional[str]
    gender: str
    skills: str
    address: str


class CompanyInformation(BaseModel):
    companyName: str
    panNumber: str
    gstNumber: str
    companyAddress: str


class CompanyRequest(BaseModel):
    personalInformation: PersonalInformation
    companyInformation: CompanyInformation