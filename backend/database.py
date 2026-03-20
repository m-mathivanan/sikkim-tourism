from motor.motor_asyncio import AsyncIOMotorClient
from models import Monastery, Event, ChatMessage
import os
import uuid
from datetime import datetime
from typing import List, Optional

class Database:
    def __init__(self, client: AsyncIOMotorClient, db_name: str):
        self.client = client
        self.db = client[db_name]
        self.monasteries = self.db.monasteries
        self.events = self.db.events
        self.chat_messages = self.db.chat_messages

    async def seed_initial_data(self):
        """Seed database with initial monastery and event data"""
        # Check if data already exists
        monastery_count = await self.monasteries.count_documents({})
        if monastery_count > 0:
            return
        
        # Initial monastery data
        initial_monasteries = [
            {
                "id": str(uuid.uuid4()),
                "name": "Rumtek Monastery",
                "tibetan_name": "རུམ་ཐེག་དགོན་པ།",
                "location": "Rumtek, East Sikkim",
                "established": "16th Century",
                "sect": "Kagyu",
                "altitude": "5800 ft",
                "description": "The most famous monastery in Sikkim, known as the 'Dharma Chakra Centre'. It serves as the main seat of the Karmapa and houses precious relics and religious art.",
                "features": ["Golden Stupa", "Prayer Hall", "Monastery School", "Library"],
                "festivals": ["Saga Dawa", "Tibetan New Year", "Buddha Jayanti"],
                "significance": "Seat of the 16th Karmapa, replica of Tsurphu Monastery in Tibet",
                "best_time": "October to December, March to May",
                "visiting_hours": "6:00 AM - 6:00 PM",
                "nearby_attractions": ["Lingdum Monastery", "Ranka Monastery", "Gangtok city"],
                "coordinates": {"lat": 27.2896, "lng": 88.5591},
                "images": [
                    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
                ],
                "virtual_tour": True,
                "accessibility": "Wheelchair accessible main areas",
                "offerings": ["Butter lamps", "Prayer flags", "Incense sticks"],
                "created_at": datetime.utcnow()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Pemayangtse Monastery",
                "tibetan_name": "པདྨ་ཡང་རྩེ་དགོན་པ།",
                "location": "Pelling, West Sikkim",
                "established": "1705",
                "sect": "Nyingma",
                "altitude": "7000 ft",
                "description": "One of the oldest and most important monasteries in Sikkim, meaning 'Perfect Sublime Lotus'. It offers stunning views of Kanchenjunga and houses ancient artifacts.",
                "features": ["Seven-story Wooden Structure", "Ancient Murals", "Meditation Hall", "Museum"],
                "festivals": ["Cham Dance", "Buddha Purnima", "Drupka Kunley Festival"],
                "significance": "Second oldest monastery in Sikkim, head monastery of Nyingma sect",
                "best_time": "March to May, October to December",
                "visiting_hours": "5:00 AM - 7:00 PM",
                "nearby_attractions": ["Rabdentse Ruins", "Khecheopalri Lake", "Kanchenjunga Falls"],
                "coordinates": {"lat": 27.3126, "lng": 88.2114},
                "images": [
                    "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
                ],
                "virtual_tour": True,
                "accessibility": "Limited wheelchair access due to stairs",
                "offerings": ["Khata scarves", "Fruits", "Traditional butter tea"],
                "created_at": datetime.utcnow()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Tashiding Monastery",
                "tibetan_name": "བཀྲ་ཤིས་སྡིང་དགོན་པ།",
                "location": "Tashiding, West Sikkim",
                "established": "1641",
                "sect": "Nyingma",
                "altitude": "4600 ft",
                "description": "Perched on a hilltop between Rathong and Rangeet rivers, this monastery is considered one of the holiest in Sikkim. The sacred Bhumchu ceremony takes place here annually.",
                "features": ["Sacred Chorten", "Prayer Wheels", "Holy Water Ceremony", "Meditation Caves"],
                "festivals": ["Bhumchu Festival", "Saga Dawa", "Losar"],
                "significance": "Sacred Bhumchu water ceremony, prophetic waters",
                "best_time": "October to March",
                "visiting_hours": "6:00 AM - 6:00 PM",
                "nearby_attractions": ["Yuksom", "Dubdi Monastery", "Norbugang Park"],
                "coordinates": {"lat": 27.3424, "lng": 88.2177},
                "images": [
                    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop"
                ],
                "virtual_tour": False,
                "accessibility": "Steep trek required, not wheelchair accessible",
                "offerings": ["White scarves", "Incense", "Prayer flags"],
                "created_at": datetime.utcnow()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Enchey Monastery",
                "tibetan_name": "ལྷ་ཁང་དགོན་པ།",
                "location": "Gangtok, East Sikkim",
                "established": "1909",
                "sect": "Nyingma",
                "altitude": "6200 ft",
                "description": "A small but beautiful monastery in Gangtok with incredible views of Kanchenjunga. Known for its peaceful atmosphere and the famous Cham dance performed during festivals.",
                "features": ["Prayer Hall", "Statue of Buddha", "Meditation Area", "Library"],
                "festivals": ["Cham Dance Festival", "Pang Lhabsol", "Drupka Kunley"],
                "significance": "City monastery with rich cultural programs",
                "best_time": "Year round",
                "visiting_hours": "5:30 AM - 7:00 PM",
                "nearby_attractions": ["Ganesh Tok", "Hanuman Tok", "Do-drul Chorten"],
                "coordinates": {"lat": 27.3389, "lng": 88.6065},
                "images": [
                    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop"
                ],
                "virtual_tour": True,
                "accessibility": "Wheelchair accessible",
                "offerings": ["Flowers", "Fruits", "Candles"],
                "created_at": datetime.utcnow()
            }
        ]
        
        # Initial events data
        initial_events = [
            {
                "id": str(uuid.uuid4()),
                "name": "Losar Festival",
                "monastery": "All Monasteries",
                "date": datetime(2024, 2, 15),
                "duration": "3 days",
                "description": "Tibetan New Year celebration with traditional dances, prayers, and festivities",
                "type": "Religious Festival",
                "highlights": ["Mask dances", "Traditional music", "Special prayers", "Community feast"],
                "created_at": datetime.utcnow()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Saga Dawa Festival",
                "monastery": "Rumtek Monastery",
                "date": datetime(2024, 5, 23),
                "duration": "1 day",
                "description": "Celebrating Buddha's birth, enlightenment, and death on the same auspicious day",
                "type": "Buddhist Festival",
                "highlights": ["Butter lamp lighting", "Prayer flag hanging", "Merit-making activities"],
                "created_at": datetime.utcnow()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Bhumchu Festival",
                "monastery": "Tashiding Monastery",
                "date": datetime(2024, 2, 18),
                "duration": "2 days",
                "description": "Sacred water ceremony where holy water is distributed to devotees for blessings",
                "type": "Sacred Ceremony",
                "highlights": ["Holy water blessing", "Prophecy reading", "Traditional ceremonies"],
                "created_at": datetime.utcnow()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Pang Lhabsol",
                "monastery": "Enchey Monastery",
                "date": datetime(2024, 8, 15),
                "duration": "1 day",
                "description": "Guardian deity festival celebrating Mount Kanchenjunga as the protector of Sikkim",
                "type": "Guardian Deity Festival",
                "highlights": ["Warrior dance", "Traditional archery", "Cultural performances"],
                "created_at": datetime.utcnow()
            }
        ]
        
        # Insert initial data
        await self.monasteries.insert_many(initial_monasteries)
        await self.events.insert_many(initial_events)

    # Monastery operations
    async def get_all_monasteries(self) -> List[dict]:
        monasteries = await self.monasteries.find().to_list(1000)
        return monasteries

    async def get_monastery_by_id(self, monastery_id: str) -> Optional[dict]:
        monastery = await self.monasteries.find_one({"id": monastery_id})
        return monastery

    async def create_monastery(self, monastery_data: dict) -> dict:
        result = await self.monasteries.insert_one(monastery_data)
        monastery = await self.monasteries.find_one({"_id": result.inserted_id})
        return monastery

    # Event operations
    async def get_all_events(self) -> List[dict]:
        events = await self.events.find().to_list(1000)
        return events

    async def get_upcoming_events(self) -> List[dict]:
        current_date = datetime.utcnow()
        events = await self.events.find({"date": {"$gte": current_date}}).sort("date", 1).to_list(1000)
        return events

    async def create_event(self, event_data: dict) -> dict:
        result = await self.events.insert_one(event_data)
        event = await self.events.find_one({"_id": result.inserted_id})
        return event

    # Chat operations
    async def save_chat_message(self, chat_data: dict) -> dict:
        result = await self.chat_messages.insert_one(chat_data)
        message = await self.chat_messages.find_one({"_id": result.inserted_id})
        return message

    async def get_chat_history(self, session_id: str) -> List[dict]:
        messages = await self.chat_messages.find({"session_id": session_id}).sort("timestamp", 1).to_list(100)
        return messages