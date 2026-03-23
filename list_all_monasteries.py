import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

async def list_monasteries():
    load_dotenv('backend/.env')
    mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.getenv('DB_NAME', 'sikkim_tourism')
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    docs = await db.monasteries.find({}).to_list(None)
    print("---MONASTERY LIST---")
    for doc in docs:
        images = doc.get('images', [])
        print(f"ID: {doc.get('id', 'N/A')} | Name: {doc['name']} | Images: {images}")
    print("---END LIST---")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(list_monasteries())
