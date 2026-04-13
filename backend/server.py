import os
import asyncio
import logging
from datetime import datetime, timezone
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
import resend

load_dotenv()

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")
RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL")

resend.api_key = RESEND_API_KEY

logger = logging.getLogger(__name__)

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


WELCOME_EMAIL_HTML = """
<div style="background-color:#0A0A0A;padding:40px 20px;font-family:'Courier New',Courier,monospace;">
  <div style="max-width:600px;margin:0 auto;background-color:#121212;border:2px solid #333333;padding:40px;">
    <h1 style="color:#D42A2A;font-size:28px;margin:0 0 8px 0;font-family:'Courier New',Courier,monospace;">HOLY SH*T, YOU'RE IN.</h1>
    <p style="color:#A1A1AA;font-size:14px;margin:0 0 30px 0;font-family:'Courier New',Courier,monospace;">Welcome to the shit show. You made a good call.</p>

    <div style="border-top:1px solid #333333;padding-top:30px;margin-top:10px;">
      <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 20px 0;font-family:'Courier New',Courier,monospace;">THE GRIEF SURVIVAL CHEAT SHEET</h2>
      <p style="color:#E0E0E0;font-size:15px;line-height:1.7;margin:0 0 20px 0;font-family:'Courier New',Courier,monospace;">
        Here are the 20 things you actually need to know when grief hits. No filler. No "live, laugh, love" garbage.
      </p>

      <div style="background-color:#1A1A1A;border-left:3px solid #D42A2A;padding:20px;margin:20px 0;">
        <p style="color:#E0E0E0;font-size:14px;line-height:1.8;margin:0;font-family:'Courier New',Courier,monospace;">
          <strong style="color:#D42A2A;">01.</strong> Grief doesn't have stages. It has ambushes.<br>
          <strong style="color:#D42A2A;">02.</strong> You're not going crazy. Grief brain is real.<br>
          <strong style="color:#D42A2A;">03.</strong> Eat something. Even if it's garbage. Your body needs fuel.<br>
          <strong style="color:#D42A2A;">04.</strong> Sleep will be a war. Fight for it anyway.<br>
          <strong style="color:#D42A2A;">05.</strong> "How are you?" is a trap. "Surviving" is a valid answer.<br>
          <strong style="color:#D42A2A;">06.</strong> People will say stupid shit. It's not about you.<br>
          <strong style="color:#D42A2A;">07.</strong> Crying in the shower counts as self-care.<br>
          <strong style="color:#D42A2A;">08.</strong> You don't have to forgive the universe right now.<br>
          <strong style="color:#D42A2A;">09.</strong> Anger is not a character flaw. It's a survival response.<br>
          <strong style="color:#D42A2A;">10.</strong> The "firsts" will wreck you. That's normal.<br>
          <strong style="color:#D42A2A;">11.</strong> Some friendships won't survive your grief. Let them go.<br>
          <strong style="color:#D42A2A;">12.</strong> Talking to the dead is not weird. Keep doing it.<br>
          <strong style="color:#D42A2A;">13.</strong> You don't owe anyone your grief performance.<br>
          <strong style="color:#D42A2A;">14.</strong> Laughing doesn't mean you're over it.<br>
          <strong style="color:#D42A2A;">15.</strong> Set boundaries without apology.<br>
          <strong style="color:#D42A2A;">16.</strong> The paperwork of death is soul-crushing. Get help if you can.<br>
          <strong style="color:#D42A2A;">17.</strong> You will forget things. Write everything down.<br>
          <strong style="color:#D42A2A;">18.</strong> There's no timeline. Anyone who gives you one is wrong.<br>
          <strong style="color:#D42A2A;">19.</strong> You're still here. That counts for something.<br>
          <strong style="color:#D42A2A;">20.</strong> The only way out is through. And through is ugly.
        </p>
      </div>
    </div>

    <div style="border-top:1px solid #333333;padding-top:30px;margin-top:30px;">
      <p style="color:#E0E0E0;font-size:15px;line-height:1.7;margin:0 0 20px 0;font-family:'Courier New',Courier,monospace;">
        If you need more than a cheat sheet, the full survival guide is waiting:
      </p>
      <a href="https://www.amazon.com/HOLY-THEYRE-GONE-Navigating-Aftermath-ebook/dp/B0DYPKMSSZ" style="display:inline-block;background-color:#D42A2A;color:#FFFFFF;text-decoration:none;padding:14px 28px;font-size:16px;font-weight:bold;font-family:'Courier New',Courier,monospace;">GET THE BOOK</a>
    </div>

    <div style="border-top:1px solid #333333;padding-top:20px;margin-top:30px;">
      <p style="color:#666666;font-size:12px;margin:0;font-family:'Courier New',Courier,monospace;">
        &copy; 2026 Ashes &amp; Whiskey &mdash; Crafted with fire, fury, and zero f*cks given.<br>
        <a href="https://cassandracrossno.com" style="color:#D42A2A;text-decoration:none;">cassandracrossno.com</a> |
        <a href="https://nobullshitgrief.com" style="color:#D42A2A;text-decoration:none;">nobullshitgrief.com</a>
      </p>
    </div>
  </div>
</div>
"""


async def send_welcome_email(recipient_email: str):
    if not RESEND_API_KEY or not SENDER_EMAIL:
        logger.warning("Resend not configured, skipping welcome email")
        return

    params = {
        "from": SENDER_EMAIL,
        "to": [recipient_email],
        "subject": "HOLY SH*T, YOU'RE IN. Here's Your Grief Survival Cheat Sheet.",
        "html": WELCOME_EMAIL_HTML,
    }

    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Welcome email sent to {recipient_email}, id: {email.get('id')}")
    except Exception as e:
        logger.error(f"Failed to send welcome email to {recipient_email}: {str(e)}")


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

    asyncio.create_task(send_welcome_email(req.email))

    return SubscribeResponse(
        message="You're in. Welcome to the shit show. Check your inbox.",
        email=req.email
    )


@app.get("/api/subscribers/count")
async def subscriber_count():
    count = await subscribers_collection.count_documents({})
    return {"count": count}
