import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

async def check_events():
    load_dotenv('backend/.env')
    mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.getenv('DB_NAME', 'sikkim_tourism')
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    docs = await db.events.find({}).to_list(None)
    print("---EVENTS---")
    for doc in docs:
        print(f"ID: {doc.get('id', 'N/A')} | Name: {doc['name']} | Image: {doc.get('image', 'None')}")
    print("-----------")
    client.close()

if __name__ == "__main__":
    asyncio.run(check_events())
