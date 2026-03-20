from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from models import APIResponse
from models_extended import *
from database import Database
from database_extended import ExtendedDatabase
from ai_service import AIService
from typing import List
import uuid
from datetime import datetime, date

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = Database(client, os.environ['DB_NAME'])
extended_db = ExtendedDatabase(client, os.environ['DB_NAME'])

# AI Service
ai_service = AIService()

# Extended API endpoints for cultural preservation features

# Rural Places endpoints
@app.get("/api/rural-places", response_model=APIResponse)
async def get_rural_places():
    try:
        places = await extended_db.get_rural_places()
        for place in places:
            place['_id'] = str(place['_id'])
        
        return APIResponse(
            success=True,
            data={"rural_places": places},
            message="Rural places retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to retrieve rural places",
            error=str(e)
        )

@app.post("/api/rural-places", response_model=APIResponse)
async def create_rural_place(place_data: RuralPlace):
    try:
        place_dict = place_data.dict()
        place_dict['created_at'] = datetime.utcnow()
        
        result = await extended_db.create_rural_place(place_dict)
        result['_id'] = str(result['_id'])
        
        return APIResponse(
            success=True,
            data={"rural_place": result},
            message="Rural place created successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to create rural place",
            error=str(e)
        )

# Cultural Content endpoints
@app.get("/api/cultural-content", response_model=APIResponse)
async def get_cultural_content(category: str = None):
    try:
        content = await extended_db.get_cultural_content(category)
        for item in content:
            item['_id'] = str(item['_id'])
        
        return APIResponse(
            success=True,
            data={"cultural_content": content},
            message="Cultural content retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to retrieve cultural content",
            error=str(e)
        )

@app.post("/api/cultural-content", response_model=APIResponse)
async def create_cultural_content(content_data: CulturalContent):
    try:
        content_dict = content_data.dict()
        content_dict['created_at'] = datetime.utcnow()
        
        result = await extended_db.create_cultural_content(content_dict)
        result['_id'] = str(result['_id'])
        
        return APIResponse(
            success=True,
            data={"cultural_content": result},
            message="Cultural content created successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to create cultural content",
            error=str(e)
        )

# Handicraft Workshops endpoints
@app.get("/api/workshops", response_model=APIResponse)
async def get_workshops():
    try:
        workshops = await extended_db.get_workshops()
        for workshop in workshops:
            workshop['_id'] = str(workshop['_id'])
            # Convert dates to ISO format
            if 'available_dates' in workshop:
                workshop['available_dates'] = [d.isoformat() if hasattr(d, 'isoformat') else d for d in workshop['available_dates']]
        
        return APIResponse(
            success=True,
            data={"workshops": workshops},
            message="Workshops retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to retrieve workshops",
            error=str(e)
        )

@app.post("/api/workshops/{workshop_id}/book", response_model=APIResponse)
async def book_workshop(workshop_id: str, booking_data: BookingCreate):
    try:
        booking_dict = booking_data.dict()
        result = await extended_db.create_workshop_booking(workshop_id, booking_dict)
        
        return APIResponse(
            success=True,
            data={"booking": result},
            message="Workshop booking created successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to create workshop booking",
            error=str(e)
        )

# Travel Plans endpoints
@app.get("/api/travel-plans", response_model=APIResponse)
async def get_travel_plans():
    try:
        plans = await extended_db.get_travel_plans()
        for plan in plans:
            plan['_id'] = str(plan['_id'])
            # Convert dates to ISO format
            if 'start_date' in plan and hasattr(plan['start_date'], 'isoformat'):
                plan['start_date'] = plan['start_date'].isoformat()
            if 'end_date' in plan and hasattr(plan['end_date'], 'isoformat'):
                plan['end_date'] = plan['end_date'].isoformat()
        
        return APIResponse(
            success=True,
            data={"travel_plans": plans},
            message="Travel plans retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to retrieve travel plans",
            error=str(e)
        )

@app.post("/api/travel-plans", response_model=APIResponse)
async def create_travel_plan(plan_data: TravelPlanCreate):
    try:
        plan_dict = plan_data.dict()
        plan_dict['id'] = str(uuid.uuid4())
        plan_dict['created_at'] = datetime.utcnow()
        plan_dict['current_participants'] = 0
        plan_dict['status'] = 'active'
        
        result = await extended_db.create_travel_plan(plan_dict)
        result['_id'] = str(result['_id'])
        
        # Convert dates to ISO format for response
        if 'start_date' in result and hasattr(result['start_date'], 'isoformat'):
            result['start_date'] = result['start_date'].isoformat()
        if 'end_date' in result and hasattr(result['end_date'], 'isoformat'):
            result['end_date'] = result['end_date'].isoformat()
        
        return APIResponse(
            success=True,
            data={"travel_plan": result},
            message="Travel plan created successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to create travel plan",
            error=str(e)
        )

# Forum Posts endpoints
@app.get("/api/forum", response_model=APIResponse)
async def get_forum_posts(category: str = None):
    try:
        posts = await extended_db.get_forum_posts(category)
        for post in posts:
            post['_id'] = str(post['_id'])
        
        return APIResponse(
            success=True,
            data={"forum_posts": posts},
            message="Forum posts retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to retrieve forum posts",
            error=str(e)
        )

@app.post("/api/forum", response_model=APIResponse)
async def create_forum_post(post_data: ForumPostCreate):
    try:
        post_dict = post_data.dict()
        post_dict['id'] = str(uuid.uuid4())
        post_dict['created_at'] = datetime.utcnow()
        post_dict['likes'] = 0
        post_dict['replies'] = []
        post_dict['is_pinned'] = False
        
        result = await extended_db.create_forum_post(post_dict)
        result['_id'] = str(result['_id'])
        
        return APIResponse(
            success=True,
            data={"forum_post": result},
            message="Forum post created successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to create forum post",
            error=str(e)
        )

# Accommodation endpoints
@app.get("/api/accommodations", response_model=APIResponse)
async def get_accommodations(location: str = None):
    try:
        accommodations = await extended_db.get_accommodations(location)
        for accommodation in accommodations:
            accommodation['_id'] = str(accommodation['_id'])
        
        return APIResponse(
            success=True,
            data={"accommodations": accommodations},
            message="Accommodations retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to retrieve accommodations",
            error=str(e)
        )

# Games Content endpoints
@app.get("/api/games", response_model=APIResponse)
async def get_games(age_group: str = None):
    try:
        games = await extended_db.get_games(age_group)
        for game in games:
            game['_id'] = str(game['_id'])
        
        return APIResponse(
            success=True,
            data={"games": games},
            message="Games retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to retrieve games",
            error=str(e)
        )

# Startup event to seed extended data
@app.on_event("startup")
async def startup_extended_db():
    await db.seed_initial_data()  # Original data
    await extended_db.seed_extended_data()  # Extended cultural preservation data
    logging.info("Extended database initialized and seeded with cultural preservation data")