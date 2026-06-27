from fastapi import APIRouter
from app.schemas.company import CompanyRequest
from app.services.company_services import save_company

router = APIRouter()


@router.post("/company")
def submit(data: CompanyRequest):

    save_company(data.model_dump())

    return {
        "success": True,
        "message": "Company Information Saved"
    }