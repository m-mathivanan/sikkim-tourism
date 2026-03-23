from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime
import uuid

class Coordinates(BaseModel):
    lat: float
    lng: float

class Monastery(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    tibetan_name: str
    location: str
    established: str
    sect: str
    altitude: str
    description: str
    features: List[str]
    festivals: List[str]
    significance: str
    best_time: str
    visiting_hours: str
    nearby_attractions: List[str]
    coordinates: Coordinates
    images: List[str]
    virtual_tour: bool
    accessibility: str
    offerings: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MonasteryCreate(BaseModel):
    name: str
    tibetan_name: str
    location: str
    established: str
    sect: str
    altitude: str
    description: str
    features: List[str]
    festivals: List[str]
    significance: str
    best_time: str
    visiting_hours: str
    nearby_attractions: List[str]
    coordinates: Coordinates
    images: List[str]
    virtual_tour: bool
    accessibility: str
    offerings: List[str]

class Event(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    monastery: str
    date: datetime
    duration: str
    description: str
    type: str
    highlights: List[str]
    images: List[str] = []
    video_url: Optional[str] = None
    booking_available: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class EventCreate(BaseModel):
    name: str
    monastery: str
    date: datetime
    duration: str
    description: str
    type: str
    highlights: List[str]
    images: List[str] = []
    video_url: Optional[str] = None
    booking_available: bool = True

class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    message: str
    response: str
    language: str = "english"
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ChatRequest(BaseModel):
    session_id: str
    message: str
    language: Optional[str] = "english"

class ChatResponse(BaseModel):
    response: str
    session_id: str

class APIResponse(BaseModel):
    success: bool
    data: Optional[dict] = None
    message: str
    error: Optional[str] = None

class EventBooking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_id: str
    user_name: str
    user_email: str
    user_phone: str
    tickets_count: int
    booking_date: datetime = Field(default_factory=datetime.utcnow)
    status: str = "confirmed"