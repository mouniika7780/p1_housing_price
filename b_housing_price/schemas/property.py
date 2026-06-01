from pydantic import BaseModel
from typing import Optional

class PropertyFilter(BaseModel):
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    min_sqft: Optional[float] = None
    max_sqft: Optional[float] = None
    min_bedrooms: Optional[int] = None
    max_bedrooms: Optional[int] = None
    min_year_built: Optional[int] = None
    max_year_built: Optional[int] = None

class WhatIfRequest(BaseModel):
    square_footage: float
    bedrooms: int
    bathrooms: float
    year_built: int
    lot_size: float
    distance_to_city_center: float
    school_rating: float