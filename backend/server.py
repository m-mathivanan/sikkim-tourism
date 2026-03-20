from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from models import (
    Monastery, MonasteryCreate, Event, EventCreate, 
    ChatRequest, ChatResponse, APIResponse, ChatMessage
)
from models_extended import *
from database import Database
from database_extended import ExtendedDatabase
from ai_service import AIService
from typing import List
import uuid
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = Database(client, os.environ['DB_NAME'])
extended_db = ExtendedDatabase(client, os.environ['DB_NAME'])

# AI Service
ai_service = AIService()

# Create the main app without a prefix
app = FastAPI(title="Sikkim Monasteries API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Startup event to seed data
@app.on_event("startup")
async def startup_db():
    await db.seed_initial_data()
    await extended_db.seed_extended_data()
    logging.info("Database initialized and seeded with initial and extended cultural preservation data")

# Health check
@api_router.get("/")
async def root():
    return {"message": "Sikkim Monasteries API is running", "status": "healthy"}

# Monastery endpoints
@api_router.get("/monasteries", response_model=APIResponse)
async def get_monasteries():
    try:
        monasteries = await db.get_all_monasteries()
        # Convert ObjectId to string for JSON serialization
        for monastery in monasteries:
            monastery['_id'] = str(monastery['_id'])
        
        return APIResponse(
            success=True,
            data={"monasteries": monasteries},
            message="Monasteries retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to retrieve monasteries",
            error=str(e)
        )

@api_router.get("/monasteries/{monastery_id}", response_model=APIResponse)
async def get_monastery(monastery_id: str):
    try:
        monastery = await db.get_monastery_by_id(monastery_id)
        if not monastery:
            return APIResponse(
                success=False,
                message="Monastery not found",
                error="No monastery found with the given ID"
            )
        
        monastery['_id'] = str(monastery['_id'])
        return APIResponse(
            success=True,
            data={"monastery": monastery},
            message="Monastery retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to retrieve monastery",
            error=str(e)
        )

@api_router.post("/monasteries", response_model=APIResponse)
async def create_monastery(monastery_data: MonasteryCreate):
    try:
        monastery_dict = monastery_data.dict()
        monastery_dict['id'] = str(uuid.uuid4())
        monastery_dict['created_at'] = datetime.utcnow()
        
        result = await db.create_monastery(monastery_dict)
        result['_id'] = str(result['_id'])
        
        return APIResponse(
            success=True,
            data={"monastery": result},
            message="Monastery created successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to create monastery",
            error=str(e)
        )

# Event endpoints
@api_router.get("/events", response_model=APIResponse)
async def get_events():
    try:
        events = await db.get_all_events()
        # Convert ObjectId to string and dates to ISO format
        for event in events:
            event['_id'] = str(event['_id'])
            if 'date' in event and hasattr(event['date'], 'isoformat'):
                event['date'] = event['date'].isoformat()
        
        return APIResponse(
            success=True,
            data={"events": events},
            message="Events retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to retrieve events",
            error=str(e)
        )

@api_router.get("/events/upcoming", response_model=APIResponse)
async def get_upcoming_events():
    try:
        events = await db.get_upcoming_events()
        # Convert ObjectId to string and dates to ISO format
        for event in events:
            event['_id'] = str(event['_id'])
            if 'date' in event and hasattr(event['date'], 'isoformat'):
                event['date'] = event['date'].isoformat()
        
        return APIResponse(
            success=True,
            data={"events": events},
            message="Upcoming events retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to retrieve upcoming events",
            error=str(e)
        )

@api_router.post("/events", response_model=APIResponse)
async def create_event(event_data: EventCreate):
    try:
        event_dict = event_data.dict()
        event_dict['id'] = str(uuid.uuid4())
        event_dict['created_at'] = datetime.utcnow()
        
        result = await db.create_event(event_dict)
        result['_id'] = str(result['_id'])
        if 'date' in result and hasattr(result['date'], 'isoformat'):
            result['date'] = result['date'].isoformat()
        
        return APIResponse(
            success=True,
            data={"event": result},
            message="Event created successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to create event",
            error=str(e)
        )

# AI Chat endpoints
@api_router.post("/ai/chat", response_model=APIResponse)
async def chat_with_ai(chat_request: ChatRequest):
    try:
        # Get AI response
        response = await ai_service.get_chat_response(
            message=chat_request.message,
            session_id=chat_request.session_id,
            language=chat_request.language or "english"
        )
        
        # Save chat message to database
        chat_data = {
            'id': str(uuid.uuid4()),
            'session_id': chat_request.session_id,
            'message': chat_request.message,
            'response': response,
            'language': chat_request.language or "english",
            'timestamp': datetime.utcnow()
        }
        
        saved_message = await db.save_chat_message(chat_data)
        saved_message['_id'] = str(saved_message['_id'])
        
        return APIResponse(
            success=True,
            data={
                "response": response,
                "session_id": chat_request.session_id,
                "chat_record": saved_message
            },
            message="AI response generated successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to process AI request",
            error=str(e)
        )

@api_router.get("/ai/languages", response_model=APIResponse)
async def get_supported_languages():
    try:
        languages = ai_service.get_supported_languages()
        return APIResponse(
            success=True,
            data={"languages": languages},
            message="Supported languages retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to retrieve supported languages",
            error=str(e)
        )

@api_router.get("/ai/chat/history/{session_id}", response_model=APIResponse)
async def get_chat_history(session_id: str):
    try:
        messages = await db.get_chat_history(session_id)
        # Convert ObjectId to string
        for message in messages:
            message['_id'] = str(message['_id'])
        
        return APIResponse(
            success=True,
            data={"messages": messages},
            message="Chat history retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            success=False,
            message="Failed to retrieve chat history",
            error=str(e)
        )

# Extended Cultural Preservation API Endpoints

# Rural Places endpoints
@api_router.get("/rural-places", response_model=APIResponse)
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

# Cultural Content endpoints
@api_router.get("/cultural-content", response_model=APIResponse)
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

# Handicraft Workshops endpoints
@api_router.get("/workshops", response_model=APIResponse)
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

@api_router.post("/workshops/{workshop_id}/book", response_model=APIResponse)
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
@api_router.get("/travel-plans", response_model=APIResponse)
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

# Forum Posts endpoints
@api_router.get("/forum", response_model=APIResponse)
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

# Games Content endpoints
@api_router.get("/games", response_model=APIResponse)
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

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()