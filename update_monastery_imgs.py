import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

async def update_monastery_images():
    load_dotenv('backend/.env')
    mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.getenv('DB_NAME', 'sikkim_tourism')
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Update Enchey
    await db.monasteries.update_one(
        {"name": "Enchey Monastery"},
        {"$set": {"images": ["/enchey-monastery.png"]}}
    )
    
    # Update Rumtek
    await db.monasteries.update_one(
        {"name": "Rumtek Monastery"},
        {"$set": {"images": ["/rumtek-monastery.png"]}}
    )
    
    # Update Pemayangtse
    await db.monasteries.update_one(
        {"name": "Pemayangtse Monastery"},
        {"$set": {"images": ["/pemayangtse-monastery.png"]}}
    )
    
    print("Monastery images updated successfully.")
    client.close()

if __name__ == "__main__":
    asyncio.run(update_monastery_images())
