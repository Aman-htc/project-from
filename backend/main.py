from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.company import routes as company_router

app = FastAPI(
    title="Company Registration API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(company_router)


@app.get("/")
def home():
    return {
        "message": "API Running Successfully"
    }