from fastapi import APIRouter
from app.schemas.personal import PersonalRequest
from app.services.personal_services import (
    save_personal,
    get_personal,
    update_personal,
    delete_personal
)

router = APIRouter()


@router.post("/personal")
def submit(data: PersonalRequest):
    save_personal(data.model_dump())
    return {"success": True, "message": "Saved successfully"}


@router.get("/personal")
def get_all():
    return get_personal()


@router.put("/personal/{id}")
def update(id: int, data: PersonalRequest):
    return update_personal(id, data.model_dump())


@router.delete("/personal/{id}")
def delete(id: int):
    return delete_personal(id)