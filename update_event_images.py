import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

async def update_event_images():
    load_dotenv('backend/.env')
    mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.getenv('DB_NAME', 'sikkim_tourism')
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    mapping = {
        "Losar Festival": "/rumtek-monastery.png",
        "Saga Dawa Festival": "/monk-prayer.png",
        "Bhumchu Festival": "/tashiding-monastery.png",
        "Pang Lhabsol": "/enchey-monastery.png",
        "Kagyed Dance": "/phodong-monastery.png",
        "Losoong (Sikkimese New Year)": "/yuksom-village.png"
    }
    
    events = await db.events.find({}).to_list(None)
    for event in events:
        name = event['name']
        img = mapping.get(name)
        if not img:
            # unique param to fallback
            img = f"/hero-image.png?v={event.get('id', 'ext')}"
            
        await db.events.update_one({"_id": event["_id"]}, {"$set": {"image": img}})
        print(f"Updated {name} with image {img}")
    
    print("Event images updated successfully.")
    client.close()

if __name__ == "__main__":
    asyncio.run(update_event_images())
