from fastapi import APIRouter
from app.schemas.company import CompanyRequest
from app.services.company_services import (
    save_company,
    get_company,
    update_company
)

router = APIRouter()


@router.post("/company")
def submit(data: CompanyRequest):
    save_company(data.model_dump())
    return {
        "success": True,
        "message": "Company Information Saved"
    }


@router.get("/company")
def get_all():
    return get_company()


@router.put("/company/{id}")
def update(id: int, data: CompanyRequest):
    return update_company(id, data.model_dump())