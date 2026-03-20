import os
from dotenv import load_dotenv
import google.generativeai as genai
from typing import Dict

load_dotenv()

class AIService:
    def __init__(self):
        self.api_key = os.environ.get('EMERGENT_LLM_KEY') or os.environ.get('GOOGLE_API_KEY')
        if not self.api_key:
            raise ValueError("No API key found. Set EMERGENT_LLM_KEY in .env")
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash')
        self.sessions = {}
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
            if session_id not in self.sessions:
                self.sessions[session_id] = self.model.start_chat(history=[])
            system = self.get_system_message(language)
            full_message = f"{system}\n\nUser: {message}"
            response = self.sessions[session_id].send_message(full_message)
            return response.text
        except Exception as e:
            return f"I'm having trouble right now. Please try again. Error: {str(e)}"

    def get_supported_languages(self) -> Dict[str, str]:
        return self.supported_languages