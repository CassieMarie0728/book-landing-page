import os
from datetime import datetime, timezone
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")

app = FastAPI(title="No Bullshit Grief API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]
subscribers_collection = db["subscribers"]


class SubscribeRequest(BaseModel):
    email: EmailStr


class SubscribeResponse(BaseModel):
    message: str
    email: str


@app.get("/api/health")
async def health_check():
    return {"status": "alive", "message": "Still breathing."}


@app.post("/api/subscribe", response_model=SubscribeResponse)
async def subscribe(req: SubscribeRequest):
    existing = await subscribers_collection.find_one({"email": req.email}, {"_id": 0})
    if existing:
        return SubscribeResponse(
            message="You're already on the list. We got you.",
            email=req.email
        )
    doc = {
        "email": req.email,
        "subscribed_at": datetime.now(timezone.utc).isoformat(),
    }
    await subscribers_collection.insert_one(doc)
    return SubscribeResponse(
        message="You're in. Welcome to the shit show.",
        email=req.email
    )


@app.get("/api/subscribers/count")
async def subscriber_count():
    count = await subscribers_collection.count_documents({})
    return {"count": count}
