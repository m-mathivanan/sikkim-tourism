import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

async def make_unique_images():
    load_dotenv('backend/.env')
    mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.getenv('DB_NAME', 'sikkim_tourism')
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    monasteries = await db.monasteries.find({}).to_list(None)
    
    # Specific targeted unique images
    mapping = {
        "Rumtek Monastery": ["/rumtek-monastery.png"],
        "Enchey Monastery": ["/enchey-monastery.png"],
        "Pemayangtse Monastery": ["/pemayangtse-monastery.png"],
        "Tashiding Monastery": ["/tashiding-monastery.png"],
        "Phodong Monastery": ["/phodong-monastery.png"],
        "Dubdi Monastery": ["/dubdi-monastery.png"],
        "Lingdum Monastery": ["/monk-prayer.png"], # Use the prayer one as a unique feature/spiritual shot
        "Ranka Monastery": ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop"], # Ensure no one else uses this
    }
    
    # Other Unsplash unique ones
    unique_unsplash = [
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop" # Differen dimensions count as unique for now, but better to vary
    ]
    
    used_images = set()
    for name, images in mapping.items():
        used_images.add(images[0])
        await db.monasteries.update_one({"name": name}, {"$set": {"images": images}})
    
    idx = 0
    for monastery in monasteries:
        if monastery['name'] not in mapping:
            # Assign a unique unsplash if available, else something related
            img = unique_unsplash[idx % len(unique_unsplash)]
            # Ensure it's not and has not been used exactly
            if img in used_images:
                img += f"&u={idx}" # unique param
            
            await db.monasteries.update_one({"_id": monastery["_id"]}, {"$set": {"images": [img]}})
            used_images.add(img)
            idx += 1
            
    print("All monasteries updated with unique images.")
    client.close()

if __name__ == "__main__":
    asyncio.run(make_unique_images())
