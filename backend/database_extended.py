from motor.motor_asyncio import AsyncIOMotorClient
from models_extended import *
from datetime import datetime
from typing import List, Optional
import uuid

class ExtendedDatabase:
    def __init__(self, client: AsyncIOMotorClient, db_name: str):
        self.client = client
        self.db = client[db_name]
        
        # Extended collections
        self.rural_places = self.db.rural_places
        self.travel_plans = self.db.travel_plans
        self.travel_buddies = self.db.travel_buddies
        self.forum_posts = self.db.forum_posts
        self.accommodations = self.db.accommodations
        self.local_transports = self.db.local_transports
        self.virtual_tours = self.db.virtual_tours
        self.cultural_content = self.db.cultural_content
        self.handicraft_workshops = self.db.handicraft_workshops
        self.game_content = self.db.game_content
        self.bookings = self.db.bookings

    async def seed_extended_data(self):
        """Seed database with cultural preservation data"""
        # Check if data already exists
        rural_count = await self.rural_places.count_documents({})
        if rural_count > 0:
            return
        
        # Rural Places
        rural_places_data = [
            {
                "id": str(uuid.uuid4()),
                "name": "Yuksom Village",
                "location": "West Sikkim",
                "coordinates": {"lat": 27.2991, "lng": 88.2251},
                "description": "Historic village known as the first capital of Sikkim and gateway to Kanchenjunga trek",
                "significance": "Coronation site of the first Chogyal of Sikkim in 1642",
                "best_time_to_visit": "March to May, October to December",
                "difficulty_level": "easy",
                "activities": ["Village walk", "Historical site visit", "Photography", "Local food tasting"],
                "images": ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"],
                "video_url": "https://www.youtube.com/embed/pAnuLOnYpTE",
                "local_guide_required": True,
                "transportation_info": "Accessible by road from Geyzing (40 km)",
                "created_at": datetime.utcnow()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Dzongu Valley",
                "location": "North Sikkim",
                "coordinates": {"lat": 27.4924, "lng": 88.5354},
                "description": "Protected area and homeland of the Lepcha tribe with pristine forests and traditional villages",
                "significance": "Indigenous Lepcha cultural preservation area",
                "best_time_to_visit": "October to April",
                "difficulty_level": "moderate",
                "activities": ["Cultural immersion", "Nature walks", "Traditional crafts learning", "Lepcha cuisine"],
                "images": ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"],
                "video_url": "https://www.youtube.com/embed/3u_F-X6sP0I",
                "local_guide_required": True,
                "transportation_info": "Permit required, accessible from Mangan",
                "created_at": datetime.utcnow()
            }
        ]
        
        # Cultural Content
        cultural_content_data = [
            {
                "id": str(uuid.uuid4()),
                "title": "Traditional Thangka Painting of Sikkim",
                "type": "video",
                "category": "handicrafts",
                "description": "Master artisan demonstrates the ancient art of Thangka painting with natural pigments",
                "content_url": "https://www.youtube.com/embed/M9R4IEmiIPw",
                "thumbnail_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
                "duration_minutes": 25,
                "tags": ["thangka", "buddhist_art", "traditional_painting", "sikkim_culture"],
                "views_count": 0,
                "likes_count": 0,
                "created_at": datetime.utcnow()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Lepcha Traditional Healing Methods",
                "type": "video",
                "category": "healing_methods",
                "description": "Documentary on indigenous Lepcha healing practices using local herbs and traditional knowledge",
                "content_url": "https://www.youtube.com/embed/Kz6-814-F2Y",
                "thumbnail_url": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
                "duration_minutes": 35,
                "tags": ["lepcha", "traditional_medicine", "herbs", "indigenous_knowledge"],
                "views_count": 0,
                "likes_count": 0,
                "created_at": datetime.utcnow()
            }
        ]
        
        # Handicraft Workshops
        workshops_data = [
            {
                "id": str(uuid.uuid4()),
                "title": "Tibetan Carpet Weaving Workshop",
                "instructor_name": "Tenzin Dolma",
                "instructor_contact": {"phone": "+91-9876543210", "email": "tenzin@example.com"},
                "description": "Learn traditional Tibetan carpet weaving techniques using authentic tools and materials",
                "craft_type": "weaving",
                "location": "Gangtok Craft Center",
                "duration_hours": 6,
                "max_participants": 8,
                "price_per_person": "₹1500",
                "materials_included": ["Yarn", "Loom", "Traditional tools", "Tea and snacks"],
                "available_dates": [datetime(2024, 3, 15), datetime(2024, 3, 22), datetime(2024, 3, 29)],
                "booking_slots": [],
                "images": ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"],
                "created_at": datetime.utcnow()
            }
        ]
        
        # Game Content
        games_data = [
            {
                "id": str(uuid.uuid4()),
                "title": "Legend of the Thunder Dragon",
                "type": "interactive_story",
                "age_group": "teens",
                "description": "Interactive animated story about Sikkim's founding and the legend of Kanchenjunga",
                "content_url": "https://example.com/thunder-dragon-game",
                "thumbnail_url": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
                "difficulty_level": "medium",
                "historical_period": "17th Century",
                "cultural_theme": "Sikkim Founding Story",
                "play_count": 0,
                "average_rating": 0.0,
                "created_at": datetime.utcnow()
            }
        ]
        
        # Accommodations
        accommodations_data = [
            {
                "id": str(uuid.uuid4()),
                "name": "Heritage Monastery Homestay",
                "type": "homestay",
                "location": "Near Rumtek Monastery, East Sikkim",
                "coordinates": {"lat": 27.2896, "lng": 88.5591},
                "price_range": "₹2,000 - 3,500/night",
                "amenities": ["Traditional rooms", "Local cuisine", "Monastery visits", "Cultural programs", "Wi-Fi"],
                "contact_info": {"phone": "+91-9876543211", "email": "heritage@homestay.com", "website": ""},
                "images": ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop"],
                "rating": 4.8,
                "reviews_count": 56,
                "availability_calendar": [],
                "created_at": datetime.utcnow()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Summit Namnang Courtyard",
                "type": "hotel",
                "location": "Gangtok, East Sikkim",
                "coordinates": {"lat": 27.3314, "lng": 88.6138},
                "price_range": "₹4,500 - 7,000/night",
                "amenities": ["Mountain views", "Restaurant", "Modern rooms", "Central heating", "Spa"],
                "contact_info": {"phone": "+91-9876543212", "email": "namnang@summithotels.com", "website": ""},
                "images": ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"],
                "rating": 4.5,
                "reviews_count": 128,
                "availability_calendar": [],
                "created_at": datetime.utcnow()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Pelling Hill Top Resort",
                "type": "resort",
                "location": "Pelling, West Sikkim",
                "coordinates": {"lat": 27.3075, "lng": 88.2372},
                "price_range": "₹3,500 - 5,500/night",
                "amenities": ["Kanchenjunga view", "Garden", "Fireplace", "Local tours"],
                "contact_info": {"phone": "+91-9876543213", "email": "pelling@resort.com", "website": ""},
                "images": ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop"],
                "rating": 4.6,
                "reviews_count": 89,
                "availability_calendar": [],
                "created_at": datetime.utcnow()
            }
        ]

        # Travel Plans
        travel_plans_data = [
            {
                "id": str(uuid.uuid4()),
                "title": "Spiritual Journey through West Sikkim",
                "description": "A 5-day guided tour exploring the ancient monasteries of Pelling, Yuksom, and Tashiding.",
                "start_date": datetime(2024, 4, 10),
                "end_date": datetime(2024, 4, 15),
                "destinations": ["Pelling", "Yuksom", "Tashiding", "Khecheopalri Lake"],
                "transportation_mode": "car",
                "package_type": "group",
                "budget_range": "₹12,000 - 18,000",
                "current_participants": 2,
                "max_participants": 8,
                "live_tracking_enabled": True,
                "status": "active",
                "is_public": True,
                "creator_id": "admin",
                "created_at": datetime.utcnow()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "East Sikkim Cultural Loop",
                "description": "Discover the vibrant culture of Gangtok and surrounding monasteries like Rumtek and Enchey.",
                "start_date": datetime(2024, 5, 20),
                "end_date": datetime(2024, 5, 24),
                "destinations": ["Gangtok", "Rumtek", "Enchey", "Nathula Pass"],
                "transportation_mode": "bus",
                "package_type": "individual",
                "budget_range": "₹8,000 - 15,000",
                "current_participants": 5,
                "max_participants": 12,
                "live_tracking_enabled": False,
                "status": "active",
                "is_public": True,
                "creator_id": "admin",
                "created_at": datetime.utcnow()
            }
        ]
        
        # Insert all data
        await self.rural_places.insert_many(rural_places_data)
        await self.cultural_content.insert_many(cultural_content_data)
        await self.handicraft_workshops.insert_many(workshops_data)
        await self.game_content.insert_many(games_data)
        await self.accommodations.insert_many(accommodations_data)
        await self.travel_plans.insert_many(travel_plans_data)

    # Rural Places operations
    async def get_rural_places(self) -> List[dict]:
        places = await self.rural_places.find().to_list(1000)
        return places

    async def create_rural_place(self, place_data: dict) -> dict:
        result = await self.rural_places.insert_one(place_data)
        place = await self.rural_places.find_one({"_id": result.inserted_id})
        return place

    # Travel Plans operations
    async def get_travel_plans(self, is_public: bool = True) -> List[dict]:
        plans = await self.travel_plans.find({"is_public": is_public}).to_list(1000)
        return plans

    async def create_travel_plan(self, plan_data: dict) -> dict:
        result = await self.travel_plans.insert_one(plan_data)
        plan = await self.travel_plans.find_one({"_id": result.inserted_id})
        return plan

    # Forum Posts operations
    async def get_forum_posts(self, category: Optional[str] = None) -> List[dict]:
        filter_dict = {"category": category} if category else {}
        posts = await self.forum_posts.find(filter_dict).sort("created_at", -1).to_list(1000)
        return posts

    async def create_forum_post(self, post_data: dict) -> dict:
        result = await self.forum_posts.insert_one(post_data)
        post = await self.forum_posts.find_one({"_id": result.inserted_id})
        return post

    # Cultural Content operations
    async def get_cultural_content(self, category: Optional[str] = None) -> List[dict]:
        filter_dict = {"category": category} if category else {}
        content = await self.cultural_content.find(filter_dict).to_list(1000)
        return content

    async def create_cultural_content(self, content_data: dict) -> dict:
        result = await self.cultural_content.insert_one(content_data)
        content = await self.cultural_content.find_one({"_id": result.inserted_id})
        return content

    # Workshop operations
    async def get_workshops(self) -> List[dict]:
        workshops = await self.handicraft_workshops.find().to_list(1000)
        return workshops

    async def create_workshop_booking(self, workshop_id: str, booking_data: dict) -> dict:
        # Add booking to workshop
        booking_data['id'] = str(uuid.uuid4())
        booking_data['created_at'] = datetime.utcnow()
        
        # Convert date objects to datetime for MongoDB compatibility
        import datetime as dt_lib
        for key, value in list(booking_data.items()):
            if isinstance(value, dt_lib.date) and not isinstance(value, dt_lib.datetime):
                booking_data[key] = dt_lib.datetime.combine(value, dt_lib.time.min)
            elif isinstance(value, dt_lib.datetime):
                # Ensure it is a naive datetime or UTC if needed
                pass
        
        await self.handicraft_workshops.update_one(
            {"id": workshop_id},
            {"$push": {"booking_slots": booking_data}}
        )
        
        # Also store in separate bookings collection
        booking_data['workshop_id'] = workshop_id
        result = await self.bookings.insert_one(booking_data)
        if '_id' in booking_data:
            booking_data['_id'] = str(booking_data['_id'])
        return booking_data

    # Game Content operations
    async def get_games(self, age_group: Optional[str] = None) -> List[dict]:
        filter_dict = {"age_group": age_group} if age_group else {}
        games = await self.game_content.find(filter_dict).to_list(1000)
        return games

    # Accommodation operations
    async def get_accommodations(self, location: Optional[str] = None) -> List[dict]:
        filter_dict = {"location": {"$regex": location, "$options": "i"}} if location else {}
        accommodations = await self.accommodations.find(filter_dict).to_list(1000)
        return accommodations