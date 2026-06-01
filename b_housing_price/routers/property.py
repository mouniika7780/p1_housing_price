from fastapi import APIRouter, Query
from schemas import PropertyFilter, WhatIfRequest
from services import get_market_stats, get_price_distribution, get_properties, what_if_prediction


router = APIRouter()

@router.get("/stats")
def market_stats():
    return get_market_stats()

@router.post("/stats/filtered")
def filtered_stats(filters: PropertyFilter):
    return get_market_stats(filters)

@router.get("/distribution")
def price_distribution():
    return get_price_distribution()

@router.get("/properties")
def list_properties(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    min_price: float = None,
    max_price: float = None,
    min_bedrooms: int = None,
    max_bedrooms: int = None,
):
    filters = PropertyFilter(
        min_price=min_price,
        max_price=max_price,
        min_bedrooms=min_bedrooms,
        max_bedrooms=max_bedrooms,
    )
    return get_properties(filters, page, page_size)

@router.post("/whatif")
async def what_if(payload: WhatIfRequest):
    return await what_if_prediction(payload.dict())