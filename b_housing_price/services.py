import pandas as pd
import numpy as np
import httpx
from functools import lru_cache

PYTHON_API_URL = "http://localhost:8001/api/v1"

# PYTHON_API_URL = "http://127.0.0.1:8001/api/v1"

@lru_cache(maxsize=1)
def load_housing_data():
    df = pd.read_csv("housing.csv")
    return df


def get_market_stats(filters=None):
    df = load_housing_data()

    if filters:
        if filters.min_price:
            df = df[df["price"] >= filters.min_price]
        if filters.max_price:
            df = df[df["price"] <= filters.max_price]
        if filters.min_sqft:
            df = df[df["square_footage"] >= filters.min_sqft]
        if filters.max_sqft:
            df = df[df["square_footage"] <= filters.max_sqft]
        if filters.min_bedrooms:
            df = df[df["bedrooms"] >= filters.min_bedrooms]
        if filters.max_bedrooms:
            df = df[df["bedrooms"] <= filters.max_bedrooms]
        if filters.min_year_built:
            df = df[df["year_built"] >= filters.min_year_built]
        if filters.max_year_built:
            df = df[df["year_built"] <= filters.max_year_built]

    stats = {
        "total_properties": int(len(df)),
        "avg_price": float(round(df["price"].mean(), 2)),
        "median_price": float(round(df["price"].median(), 2)),
        "min_price": float(round(df["price"].min(), 2)),
        "max_price": float(round(df["price"].max(), 2)),
        "avg_sqft": float(round(df["square_footage"].mean(), 2)),
        "avg_bedrooms": float(round(df["bedrooms"].mean(), 2)),
        "avg_school_rating": float(round(df["school_rating"].mean(), 2)),
    }
    return stats

def get_price_distribution(filters=None):
    df = load_housing_data()
    bins = [0, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, float("inf")]
    labels = ["<100k","100-200k","200-300k","300-400k","400-500k","500-600k","600-700k","700-800k","800-900k","900k+"]
    df["price_range"] = pd.cut(df["price"], bins=bins, labels=labels)
    distribution = df["price_range"].value_counts().sort_index()
    return [{"range": str(k), "count": int(v)} for k, v in distribution.items()]

def get_properties(filters=None, page=1, page_size=20):
    df = load_housing_data()
    if filters:
        if filters.min_price:
            df = df[df["price"] >= filters.min_price]
        if filters.max_price:
            df = df[df["price"] <= filters.max_price]
        if filters.min_bedrooms:
            df = df[df["bedrooms"] >= filters.min_bedrooms]
        if filters.max_bedrooms:
            df = df[df["bedrooms"] <= filters.max_bedrooms]
    total = len(df)
    start = (page - 1) * page_size
    end = start + page_size
    page_df = df.iloc[start:end]
    return {"total": total,"page": page,"page_size": page_size,"data": page_df.to_dict(orient="records")}

async def what_if_prediction(payload: dict):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{PYTHON_API_URL}/predict",
            json=payload
        )
        return response.json()