#!/usr/bin/env python3
"""
Comprehensive Backend Testing for Sikkim Monasteries Platform
Tests all API endpoints, database operations, and AI integration
"""

import asyncio
import aiohttp
import json
import uuid
from datetime import datetime, timedelta
from typing import Dict, List, Any
import sys
import os

# Backend URL from frontend environment
BACKEND_URL = "https://sikkim-monastery-1.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.session = None
        self.test_results = {
            "database_setup": {"passed": 0, "failed": 0, "errors": []},
            "monastery_apis": {"passed": 0, "failed": 0, "errors": []},
            "events_apis": {"passed": 0, "failed": 0, "errors": []},
            "ai_chat": {"passed": 0, "failed": 0, "errors": []},
            "error_handling": {"passed": 0, "failed": 0, "errors": []}
        }
        
    async def setup(self):
        """Initialize HTTP session"""
        self.session = aiohttp.ClientSession()
        
    async def cleanup(self):
        """Clean up HTTP session"""
        if self.session:
            await self.session.close()
            
    def log_test(self, category: str, test_name: str, success: bool, error: str = None):
        """Log test result"""
        if success:
            self.test_results[category]["passed"] += 1
            print(f"✅ {test_name}")
        else:
            self.test_results[category]["failed"] += 1
            self.test_results[category]["errors"].append(f"{test_name}: {error}")
            print(f"❌ {test_name}: {error}")
            
    async def test_health_check(self):
        """Test basic API health"""
        print("\n🔍 Testing API Health Check...")
        try:
            async with self.session.get(f"{BACKEND_URL}/") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("status") == "healthy":
                        self.log_test("database_setup", "API Health Check", True)
                        return True
                    else:
                        self.log_test("database_setup", "API Health Check", False, "Unhealthy status response")
                        return False
                else:
                    self.log_test("database_setup", "API Health Check", False, f"HTTP {response.status}")
                    return False
        except Exception as e:
            self.log_test("database_setup", "API Health Check", False, str(e))
            return False
            
    async def test_monastery_apis(self):
        """Test all monastery-related API endpoints"""
        print("\n🏛️ Testing Monastery APIs...")
        
        # Test GET /api/monasteries
        try:
            async with self.session.get(f"{BACKEND_URL}/monasteries") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("success") and "monasteries" in data.get("data", {}):
                        monasteries = data["data"]["monasteries"]
                        if len(monasteries) >= 4:  # Should have 4 seeded monasteries
                            self.log_test("monastery_apis", "GET /api/monasteries", True)
                            
                            # Test GET /api/monasteries/:id with first monastery
                            if monasteries:
                                monastery_id = monasteries[0].get("id")
                                if monastery_id:
                                    await self.test_get_monastery_by_id(monastery_id)
                                else:
                                    self.log_test("monastery_apis", "GET /api/monasteries/:id", False, "No monastery ID found")
                        else:
                            self.log_test("monastery_apis", "GET /api/monasteries", False, f"Expected 4+ monasteries, got {len(monasteries)}")
                    else:
                        self.log_test("monastery_apis", "GET /api/monasteries", False, "Invalid response format")
                else:
                    self.log_test("monastery_apis", "GET /api/monasteries", False, f"HTTP {response.status}")
        except Exception as e:
            self.log_test("monastery_apis", "GET /api/monasteries", False, str(e))
            
        # Test POST /api/monasteries
        await self.test_create_monastery()
        
    async def test_get_monastery_by_id(self, monastery_id: str):
        """Test GET /api/monasteries/:id"""
        try:
            async with self.session.get(f"{BACKEND_URL}/monasteries/{monastery_id}") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("success") and "monastery" in data.get("data", {}):
                        monastery = data["data"]["monastery"]
                        required_fields = ["name", "location", "description", "coordinates"]
                        if all(field in monastery for field in required_fields):
                            self.log_test("monastery_apis", "GET /api/monasteries/:id", True)
                        else:
                            missing = [f for f in required_fields if f not in monastery]
                            self.log_test("monastery_apis", "GET /api/monasteries/:id", False, f"Missing fields: {missing}")
                    else:
                        self.log_test("monastery_apis", "GET /api/monasteries/:id", False, "Invalid response format")
                else:
                    self.log_test("monastery_apis", "GET /api/monasteries/:id", False, f"HTTP {response.status}")
        except Exception as e:
            self.log_test("monastery_apis", "GET /api/monasteries/:id", False, str(e))
            
    async def test_create_monastery(self):
        """Test POST /api/monasteries"""
        test_monastery = {
            "name": "Test Monastery",
            "tibetan_name": "Test Tibetan Name",
            "location": "Test Location, Sikkim",
            "established": "2024",
            "sect": "Test Sect",
            "altitude": "5000 ft",
            "description": "A test monastery for API testing",
            "features": ["Test Feature 1", "Test Feature 2"],
            "festivals": ["Test Festival"],
            "significance": "Test significance",
            "best_time": "Year round",
            "visiting_hours": "9:00 AM - 5:00 PM",
            "nearby_attractions": ["Test Attraction"],
            "coordinates": {"lat": 27.3389, "lng": 88.6065},
            "images": ["https://example.com/test.jpg"],
            "virtual_tour": True,
            "accessibility": "Test accessibility",
            "offerings": ["Test Offering"]
        }
        
        try:
            async with self.session.post(f"{BACKEND_URL}/monasteries", 
                                       json=test_monastery,
                                       headers={"Content-Type": "application/json"}) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("success") and "monastery" in data.get("data", {}):
                        created_monastery = data["data"]["monastery"]
                        if created_monastery.get("name") == test_monastery["name"]:
                            self.log_test("monastery_apis", "POST /api/monasteries", True)
                        else:
                            self.log_test("monastery_apis", "POST /api/monasteries", False, "Created monastery data mismatch")
                    else:
                        self.log_test("monastery_apis", "POST /api/monasteries", False, "Invalid response format")
                else:
                    self.log_test("monastery_apis", "POST /api/monasteries", False, f"HTTP {response.status}")
        except Exception as e:
            self.log_test("monastery_apis", "POST /api/monasteries", False, str(e))
            
    async def test_events_apis(self):
        """Test all events-related API endpoints"""
        print("\n📅 Testing Events APIs...")
        
        # Test GET /api/events
        try:
            async with self.session.get(f"{BACKEND_URL}/events") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("success") and "events" in data.get("data", {}):
                        events = data["data"]["events"]
                        if len(events) >= 4:  # Should have 4 seeded events
                            self.log_test("events_apis", "GET /api/events", True)
                        else:
                            self.log_test("events_apis", "GET /api/events", False, f"Expected 4+ events, got {len(events)}")
                    else:
                        self.log_test("events_apis", "GET /api/events", False, "Invalid response format")
                else:
                    self.log_test("events_apis", "GET /api/events", False, f"HTTP {response.status}")
        except Exception as e:
            self.log_test("events_apis", "GET /api/events", False, str(e))
            
        # Test GET /api/events/upcoming
        try:
            async with self.session.get(f"{BACKEND_URL}/events/upcoming") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("success") and "events" in data.get("data", {}):
                        upcoming_events = data["data"]["events"]
                        # Should return events (may be empty if all past dates)
                        self.log_test("events_apis", "GET /api/events/upcoming", True)
                    else:
                        self.log_test("events_apis", "GET /api/events/upcoming", False, "Invalid response format")
                else:
                    self.log_test("events_apis", "GET /api/events/upcoming", False, f"HTTP {response.status}")
        except Exception as e:
            self.log_test("events_apis", "GET /api/events/upcoming", False, str(e))
            
        # Test POST /api/events
        await self.test_create_event()
        
    async def test_create_event(self):
        """Test POST /api/events"""
        future_date = datetime.utcnow() + timedelta(days=30)
        test_event = {
            "name": "Test Festival",
            "monastery": "Test Monastery",
            "date": future_date.isoformat(),
            "duration": "2 days",
            "description": "A test festival for API testing",
            "type": "Test Festival",
            "highlights": ["Test Highlight 1", "Test Highlight 2"]
        }
        
        try:
            async with self.session.post(f"{BACKEND_URL}/events",
                                       json=test_event,
                                       headers={"Content-Type": "application/json"}) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("success") and "event" in data.get("data", {}):
                        created_event = data["data"]["event"]
                        if created_event.get("name") == test_event["name"]:
                            self.log_test("events_apis", "POST /api/events", True)
                        else:
                            self.log_test("events_apis", "POST /api/events", False, "Created event data mismatch")
                    else:
                        self.log_test("events_apis", "POST /api/events", False, "Invalid response format")
                else:
                    self.log_test("events_apis", "POST /api/events", False, f"HTTP {response.status}")
        except Exception as e:
            self.log_test("events_apis", "POST /api/events", False, str(e))
            
    async def test_ai_chat_integration(self):
        """Test AI chat functionality with Gemini Pro"""
        print("\n🤖 Testing AI Chat Integration...")
        
        # Test GET /api/ai/languages
        try:
            async with self.session.get(f"{BACKEND_URL}/ai/languages") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("success") and "languages" in data.get("data", {}):
                        languages = data["data"]["languages"]
                        expected_languages = ["english", "nepali", "hindi", "tibetan", "bengali", "sikkimese"]
                        if all(lang in languages for lang in expected_languages):
                            self.log_test("ai_chat", "GET /api/ai/languages", True)
                        else:
                            missing = [lang for lang in expected_languages if lang not in languages]
                            self.log_test("ai_chat", "GET /api/ai/languages", False, f"Missing languages: {missing}")
                    else:
                        self.log_test("ai_chat", "GET /api/ai/languages", False, "Invalid response format")
                else:
                    self.log_test("ai_chat", "GET /api/ai/languages", False, f"HTTP {response.status}")
        except Exception as e:
            self.log_test("ai_chat", "GET /api/ai/languages", False, str(e))
            
        # Test POST /api/ai/chat
        await self.test_ai_chat_message()
        
    async def test_ai_chat_message(self):
        """Test POST /api/ai/chat"""
        test_session_id = str(uuid.uuid4())
        chat_request = {
            "session_id": test_session_id,
            "message": "Tell me about Rumtek Monastery",
            "language": "english"
        }
        
        try:
            async with self.session.post(f"{BACKEND_URL}/ai/chat",
                                       json=chat_request,
                                       headers={"Content-Type": "application/json"}) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("success") and "response" in data.get("data", {}):
                        ai_response = data["data"]["response"]
                        if ai_response and len(ai_response) > 10:  # Should get meaningful response
                            self.log_test("ai_chat", "POST /api/ai/chat", True)
                            
                            # Test chat history retrieval
                            await self.test_chat_history(test_session_id)
                        else:
                            self.log_test("ai_chat", "POST /api/ai/chat", False, "Empty or too short AI response")
                    else:
                        self.log_test("ai_chat", "POST /api/ai/chat", False, "Invalid response format")
                else:
                    self.log_test("ai_chat", "POST /api/ai/chat", False, f"HTTP {response.status}")
        except Exception as e:
            self.log_test("ai_chat", "POST /api/ai/chat", False, str(e))
            
    async def test_chat_history(self, session_id: str):
        """Test GET /api/ai/chat/history/:session_id"""
        try:
            async with self.session.get(f"{BACKEND_URL}/ai/chat/history/{session_id}") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("success") and "messages" in data.get("data", {}):
                        messages = data["data"]["messages"]
                        if len(messages) > 0:
                            self.log_test("ai_chat", "GET /api/ai/chat/history", True)
                        else:
                            self.log_test("ai_chat", "GET /api/ai/chat/history", False, "No chat history found")
                    else:
                        self.log_test("ai_chat", "GET /api/ai/chat/history", False, "Invalid response format")
                else:
                    self.log_test("ai_chat", "GET /api/ai/chat/history", False, f"HTTP {response.status}")
        except Exception as e:
            self.log_test("ai_chat", "GET /api/ai/chat/history", False, str(e))
            
    async def test_error_handling(self):
        """Test API error handling"""
        print("\n⚠️ Testing Error Handling...")
        
        # Test invalid monastery ID
        try:
            async with self.session.get(f"{BACKEND_URL}/monasteries/invalid-id") as response:
                if response.status == 200:
                    data = await response.json()
                    if not data.get("success"):
                        self.log_test("error_handling", "Invalid monastery ID handling", True)
                    else:
                        self.log_test("error_handling", "Invalid monastery ID handling", False, "Should return error for invalid ID")
                else:
                    self.log_test("error_handling", "Invalid monastery ID handling", True)  # HTTP error is also valid
        except Exception as e:
            self.log_test("error_handling", "Invalid monastery ID handling", False, str(e))
            
        # Test invalid JSON for POST requests
        try:
            async with self.session.post(f"{BACKEND_URL}/monasteries",
                                       data="invalid json",
                                       headers={"Content-Type": "application/json"}) as response:
                if response.status >= 400:  # Should return error status
                    self.log_test("error_handling", "Invalid JSON handling", True)
                else:
                    self.log_test("error_handling", "Invalid JSON handling", False, "Should reject invalid JSON")
        except Exception as e:
            self.log_test("error_handling", "Invalid JSON handling", True)  # Exception is expected
            
    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("🧪 BACKEND TEST SUMMARY")
        print("="*60)
        
        total_passed = 0
        total_failed = 0
        
        for category, results in self.test_results.items():
            passed = results["passed"]
            failed = results["failed"]
            total_passed += passed
            total_failed += failed
            
            status = "✅" if failed == 0 else "❌"
            print(f"{status} {category.replace('_', ' ').title()}: {passed} passed, {failed} failed")
            
            if results["errors"]:
                for error in results["errors"]:
                    print(f"   • {error}")
                    
        print("-" * 60)
        print(f"TOTAL: {total_passed} passed, {total_failed} failed")
        
        if total_failed == 0:
            print("🎉 All backend tests passed!")
        else:
            print(f"⚠️ {total_failed} tests failed - see details above")
            
        return total_failed == 0
        
async def main():
    """Run all backend tests"""
    print("🚀 Starting Sikkim Monasteries Backend Testing...")
    print(f"Testing against: {BACKEND_URL}")
    
    tester = BackendTester()
    await tester.setup()
    
    try:
        # Run all test suites
        health_ok = await tester.test_health_check()
        
        if health_ok:
            await tester.test_monastery_apis()
            await tester.test_events_apis()
            await tester.test_ai_chat_integration()
            await tester.test_error_handling()
        else:
            print("❌ API health check failed - skipping other tests")
            
        # Print summary
        success = tester.print_summary()
        return success
        
    finally:
        await tester.cleanup()

if __name__ == "__main__":
    try:
        success = asyncio.run(main())
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n⏹️ Testing interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Testing failed with error: {e}")
        sys.exit(1)