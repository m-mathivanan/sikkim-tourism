# API Contracts - Sikkim Monasteries Platform

## Overview
This document defines the API contracts between frontend and backend for seamless integration, replacing mock data with real database operations.

## Current Mock Data Integration Points

### 1. Monasteries Data (`mockMonasteries` in `/mock/data.js`)
**Frontend Usage:** Main monasteries listing, monastery cards, detailed profiles
**Mock Location:** `mockMonasteries` array with 4 sample monasteries
**Integration:** Replace with API calls to fetch monastery data

**API Endpoints Needed:**
- `GET /api/monasteries` - List all monasteries
- `GET /api/monasteries/:id` - Get specific monastery details
- `POST /api/monasteries` - Add new monastery (admin)

**Schema Requirements:**
```javascript
{
  id: ObjectId,
  name: String,
  tibetanName: String,
  location: String,
  established: String,
  sect: String,
  altitude: String,
  description: String,
  features: [String],
  festivals: [String],
  significance: String,
  bestTime: String,
  visitingHours: String,
  nearbyAttractions: [String],
  coordinates: { lat: Number, lng: Number },
  images: [String], // URLs
  virtualTour: Boolean,
  accessibility: String,
  offerings: [String]
}
```

### 2. Events Data (`mockEvents` in `/mock/data.js`)
**Frontend Usage:** Events section, festival calendar
**Mock Location:** `mockEvents` array with 4 sample events
**Integration:** Replace with API calls to fetch events data

**API Endpoints Needed:**
- `GET /api/events` - List all events
- `GET /api/events/upcoming` - Get upcoming events only
- `POST /api/events` - Create new event (admin)

**Schema Requirements:**
```javascript
{
  id: ObjectId,
  name: String,
  monastery: String, // Reference to monastery
  date: Date,
  duration: String,
  description: String,
  type: String,
  highlights: [String]
}
```

### 3. Features Data (`mockFeatures` in `/mock/data.js`)
**Frontend Usage:** Features section display
**Mock Location:** `mockFeatures` array
**Integration:** Can remain static or move to CMS-managed content

## AI Integration Requirements (Gemini Pro)

### 4. AI Guide Chat System
**Frontend Integration:** "Chat with AI Guide" button functionality
**New Feature:** Multilingual chat interface with Gemini Pro
**Requirements:** 
- Real-time chat interface
- Multi-language support (English, Nepali, Hindi, Tibetan, Bengali, Sikkimese)
- Context about monasteries, events, and cultural information

**API Endpoints Needed:**
- `POST /api/ai/chat` - Send message to AI guide
- `GET /api/ai/languages` - Get supported languages

## Backend Implementation Plan

### Database Models (MongoDB)
1. **Monastery** - Store monastery information
2. **Event** - Store events and festivals
3. **ChatSession** - Store AI chat conversations (optional)

### API Routes Structure
```
/api
├── /monasteries
│   ├── GET / (list all)
│   ├── GET /:id (get by id)
│   └── POST / (create - admin)
├── /events
│   ├── GET / (list all)
│   ├── GET /upcoming (upcoming only)
│   └── POST / (create - admin)
└── /ai
    ├── POST /chat (AI guide chat)
    └── GET /languages (supported languages)
```

### Integration Points to Replace
1. **App.js Line 12-15:** Remove `mockMonasteries`, `mockEvents`, `mockFeatures` imports
2. **App.js Line 34:** Replace `mockFeatures` with API call
3. **App.js Line 48:** Replace `mockMonasteries.map()` with API data
4. **App.js Line 59:** Replace `mockEvents` with API call
5. **AI Guide buttons:** Connect to real Gemini Pro chat system

### Frontend Changes Required
1. Add `useEffect` hooks to fetch data from APIs
2. Add loading states for better UX
3. Add error handling for API failures
4. Replace mock data imports with API calls
5. Implement AI chat modal/interface

### Backend Dependencies to Add
- `emergentintegrations` - For Gemini Pro integration
- Additional MongoDB models and validation

### API Response Format
All APIs should follow consistent format:
```javascript
{
  success: boolean,
  data: any,
  message: string,
  error?: string
}
```

This contracts file ensures smooth backend integration while maintaining the existing frontend functionality.