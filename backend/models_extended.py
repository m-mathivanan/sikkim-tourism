from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime, date
import uuid

# Extended models for comprehensive cultural preservation platform

class BookingSlot(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_name: str
    user_email: str
    user_phone: str
    date: date
    time_slot: str = "Morning Session (10:00 AM)"
    number_of_people: int
    special_requirements: Optional[str] = None
    status: str = "pending"  # pending, confirmed, cancelled
    created_at: datetime = Field(default_factory=datetime.utcnow)

class RuralPlace(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: str
    coordinates: Dict[str, float]  # lat, lng
    description: str
    significance: str
    best_time_to_visit: str
    difficulty_level: str  # easy, moderate, difficult
    activities: List[str]
    images: List[str]
    video_url: Optional[str] = None
    local_guide_required: bool
    transportation_info: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TravelPlan(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    creator_id: str
    title: str
    description: str
    start_date: date
    end_date: date
    destinations: List[str]
    transportation_mode: str  # bus, car, train, plane
    package_type: str  # individual, family, group
    budget_range: str
    is_public: bool = True
    max_participants: int
    current_participants: int = 0
    status: str = "active"  # active, completed, cancelled
    live_tracking_enabled: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TravelBuddy(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_name: str
    user_email: str
    user_phone: str
    age_range: str
    interests: List[str]
    travel_style: str  # budget, comfort, luxury
    preferred_destinations: List[str]
    languages: List[str]
    bio: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ForumPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    author_name: str
    author_email: str
    title: str
    content: str
    category: str  # travel, culture, experiences, tips
    tags: List[str]
    likes: int = 0
    replies: List[Dict] = []
    is_pinned: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Accommodation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    type: str  # hotel, guesthouse, homestay, hostel
    location: str
    coordinates: Dict[str, float]
    price_range: str
    amenities: List[str]
    contact_info: Dict[str, str]  # phone, email, website
    images: List[str]
    rating: float = 0.0
    reviews_count: int = 0
    availability_calendar: List[Dict] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)

class LocalTransport(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    provider_name: str
    transport_type: str  # taxi, bus, bike_rental, car_rental
    route: str
    price: str
    contact_info: Dict[str, str]
    operating_hours: str
    advance_booking_required: bool
    created_at: datetime = Field(default_factory=datetime.utcnow)

class VirtualTour(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    monastery_id: str
    title: str
    description: str
    tour_url: str  # 360 degree view URL
    hotspots: List[Dict] = []  # Interactive points in the tour
    audio_guide_url: Optional[str] = None
    duration_minutes: int
    views_count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class CulturalContent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    type: str  # video, article, gallery, audio
    category: str  # handicrafts, sculptures, healing_methods, traditions
    description: str
    content_url: str
    thumbnail_url: Optional[str] = None
    duration_minutes: Optional[int] = None
    tags: List[str]
    views_count: int = 0
    likes_count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class HandicraftWorkshop(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    instructor_name: str
    instructor_contact: Dict[str, str]
    description: str
    craft_type: str  # pottery, weaving, carving, painting
    location: str
    duration_hours: int
    max_participants: int
    price_per_person: str
    materials_included: List[str]
    available_dates: List[date]
    booking_slots: List[BookingSlot] = []
    images: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)

class GameContent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    type: str  # quiz, story, interactive_game, virtual_reality
    age_group: str  # children, teens, adults, all
    description: str
    content_url: str
    thumbnail_url: str
    difficulty_level: str  # easy, medium, hard
    historical_period: str
    cultural_theme: str
    play_count: int = 0
    average_rating: float = 0.0
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Request/Response models for the extended features
class BookingCreate(BaseModel):
    user_name: str
    user_email: str
    user_phone: str
    date: date
    time_slot: str = "Morning Session (10:00 AM)"
    number_of_people: int
    special_requirements: Optional[str] = None

class TravelPlanCreate(BaseModel):
    creator_id: str
    title: str
    description: str
    start_date: date
    end_date: date
    destinations: List[str]
    transportation_mode: str
    package_type: str
    budget_range: str
    max_participants: int
    live_tracking_enabled: bool = False

class ForumPostCreate(BaseModel):
    author_name: str
    author_email: str
    title: str
    content: str
    category: str
    tags: List[str]