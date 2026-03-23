import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

async def check_workshops():
    load_dotenv('backend/.env')
    mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.getenv('DB_NAME', 'sikkim_tourism')
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    workshop = await db.handicraft_workshops.find_one()
    print(f'Workshop keys: {list(workshop.keys()) if workshop else "None found"}')
    if workshop:
        print(f"Workshop 'id' field value: {workshop.get('id')}")
    client.close()

if __name__ == '__main__':
    asyncio.run(check_workshops())
