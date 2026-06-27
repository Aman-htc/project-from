from pydantic import BaseModel


class CompanyRequest(BaseModel):
    companyName: str
    panNumber: str
    gstNumber: str
    companyAddress: str