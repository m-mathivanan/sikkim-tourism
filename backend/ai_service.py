import os
from dotenv import load_dotenv
from google import genai
from typing import Dict

load_dotenv()

class AIService:
    def __init__(self):
        self.api_key = os.environ.get('EMERGENT_LLM_KEY') or os.environ.get('GOOGLE_API_KEY')
        if not self.api_key:
            raise ValueError("No API key found. Set EMERGENT_LLM_KEY in .env")
        self.client = genai.Client(api_key=self.api_key)
        self.supported_languages = {
            "english": "English",
            "nepali": "Nepali",
            "hindi": "Hindi",
            "tibetan": "Tibetan",
            "bengali": "Bengali",
            "sikkimese": "Sikkimese"
        }

    def get_system_message(self, language: str = "english") -> str:
        base = """You are a knowledgeable AI guide for Sikkim's monasteries and Buddhist culture.
You specialize in monastery history, Buddhist traditions, festivals, travel advice,
and cultural insights about Sikkim and Himalayan Buddhism.
Always be respectful and culturally sensitive."""
        instructions = {
            "nepali": "Please respond in Nepali using Devanagari script.",
            "hindi": "Please respond in Hindi using Devanagari script.",
            "bengali": "Please respond in Bengali script.",
            "tibetan": "Please respond in Tibetan or English with Tibetan terms explained.",
            "sikkimese": "Please respond in simple English with local Sikkimese terms."
        }
        if language in instructions:
            return f"{base}\n\n{instructions[language]}"
        return base

    async def get_chat_response(self, message: str, session_id: str, language: str = "english") -> str:
        try:
            system = self.get_system_message(language)
            full_message = f"{system}\n\nUser: {message}"
            response = self.client.models.generate_content(
                model="gemini-2.0-flash",
                contents=full_message
            )
            return response.text
        except Exception as e:
            error_str = str(e)
            if "API_KEY_INVALID" in error_str or "API key not valid" in error_str or "API key" in error_str or "400" in error_str or "429" in error_str or "quota" in error_str.lower():
                lower_msg = str(message).lower() if message else ""
                if "hello" in lower_msg or "hi" in lower_msg:
                    return "Hello! I am the AI Guide. (Note: I am running in Offline Demo Mode because the Google API key is invalid, but I can still answer basic questions!) How can I help you explore Sikkim's monasteries today?"
                elif "rumtek" in lower_msg:
                    return "Rumtek Monastery is the largest monastery in Sikkim and the seat of the Karmapa. It's famous for its stunning architecture and the Golden Stupa! Are you planning to visit?"
                elif "pemayangtse" in lower_msg:
                    return "Pemayangtse Monastery was built in 1705 and offers spectacular views of Mount Kanchenjunga. It's truly a must-visit location."
                elif "festival" in lower_msg or "events" in lower_msg:
                    return "Sikkim has many beautiful festivals! Some famous ones include Saga Dawa in May and Losar (Tibetan New Year) in February. Would you like to know more about a specific one?"
                else:
                    return f"That's an interesting question about '{message}'. (Offline Demo Mode: Please provide a valid Google Gemini API key in backend/.env to unlock my full AI capabilities and get a real detailed answer!)"
            return f"I'm having trouble right now. Please try again. Error: {error_str}"

    def get_supported_languages(self) -> Dict[str, str]:
        return self.supported_languages