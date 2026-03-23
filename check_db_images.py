import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

async def check_enchey():
    load_dotenv('backend/.env')
    mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.getenv('DB_NAME', 'sikkim_tourism')
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    doc = await db.monasteries.find_one({"name": "Enchey Monastery"})
    if doc:
        print(f"Enchey Images: {doc.get('images', [])}")
    else:
        print("Enchey not found")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(check_enchey())
