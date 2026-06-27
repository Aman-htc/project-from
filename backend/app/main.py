from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.personal import router as personal_router
from app.routers.company import router as company_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(personal_router)
app.include_router(company_router)