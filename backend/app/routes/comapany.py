from fastapi import APIRouter
from schemas.company import CompanyRequest
from utils.json_helper import save_data

router = APIRouter(
    prefix="/api/company",
    tags=["Company"]
)


@router.post("/submit")
async def submit(request: CompanyRequest):

    save_data(request.model_dump())

    return {
        "success": True,
        "message": "Data Saved Successfully",
        "data": request
    }