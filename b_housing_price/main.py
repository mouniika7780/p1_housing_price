from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import property_router
app = FastAPI(title="Property Market Analysis API",version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(property_router, prefix="/api/market", tags=["Prediction"])
