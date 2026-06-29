from pydantic import BaseModel
from typing import Optional


class CompanyRequest(BaseModel):
    id: Optional[int] = None
    companyName: str
    panNumber: str
    gstNumber: str
    companyAddress: str