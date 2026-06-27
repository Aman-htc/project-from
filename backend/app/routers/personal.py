from fastapi import APIRouter
from app.schemas.personal import PersonalRequest
from app.services.personal_services import save_personal
from app.services.personal_services import get_personal
from app.services.personal_services import update_personal
from app.services.personal_services import delete_personal
router = APIRouter()

@router.post("/personal")
def submit(data: PersonalRequest):
    save_personal(data.model_dump())
    return {
        "success": True,
        "message": "Personal Information Saved"
    }
    
    
@router.get("/personal")
def get_all():
    return get_personal()    


@router.put("/personal/{index}")
def update(index: int, data: PersonalRequest):
    return update_personal(index, data.model_dump())



@router.delete("/personal/{index}")
def delete(index: int):
    return delete_personal(index)