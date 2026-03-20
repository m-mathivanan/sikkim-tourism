# Sikkim Tourism Platform

A full-stack web application for discovering Sikkim's monasteries, cultural heritage, and planning spiritual journeys — powered by React, FastAPI, MongoDB, and Google Gemini AI.

## Features

- **Monastery Explorer** — Profiles of Sikkim's most sacred monasteries with visiting info, festivals, and coordinates
- **AI Guide** — Multilingual chatbot (English, Nepali, Hindi, Tibetan, Bengali, Sikkimese) powered by Gemini 2.0 Flash
- **Events Calendar** — Buddhist festivals and ceremonies
- **Rural Places** — Off-beat destinations beyond the popular circuits
- **Handicraft Workshops** — Book sessions with local artisans
- **Cultural Library** — Videos, articles, and cultural archive
- **Gamified Learning** — Quizzes and interactive cultural storytelling
- **Travel Planning** — Itinerary builder with travel buddy matching

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, React Router, Tailwind CSS, shadcn/ui |
| Backend | FastAPI (Python), Uvicorn |
| Database | MongoDB (async Motor driver) |
| AI | Google Gemini 2.0 Flash via emergentintegrations |

---

## Quick Start

### Prerequisites

- **Node.js** v18+
- **Python** 3.9+
- **MongoDB** running locally (or Atlas URI)
- **Yarn** v1.22+ (`npm install -g yarn`)

---

### 1. Backend Setup

```bash
cd Hackathon1-main/backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Create your environment file
cp .env.example .env
# Edit .env and fill in your MONGO_URL, DB_NAME, and EMERGENT_LLM_KEY
```

Start the backend:
```bash
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

- API: http://localhost:8001
- Interactive docs: http://localhost:8001/docs
- Health check: http://localhost:8001/api/

---

### 2. Frontend Setup

```bash
cd Hackathon1-main/frontend

# Create your environment file
cp .env.example .env
# Edit .env — set REACT_APP_BACKEND_URL=http://localhost:8001

# Install dependencies
yarn install

# Start dev server
yarn start
```

App opens at: http://localhost:3000

---

## Environment Variables

### backend/.env

| Variable | Description |
|----------|-------------|
| `MONGO_URL` | MongoDB connection string |
| `DB_NAME` | Database name (e.g. `sikkim_tourism`) |
| `EMERGENT_LLM_KEY` | API key for the emergentintegrations / Gemini AI service |

### frontend/.env

| Variable | Description |
|----------|-------------|
| `REACT_APP_BACKEND_URL` | Backend URL (e.g. `http://localhost:8001`) |

---

## API Reference

All responses use:
```json
{ "success": true, "data": {}, "message": "...", "error": null }
```

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/monasteries` | GET | List all monasteries |
| `/api/monasteries/:id` | GET | Get monastery by ID |
| `/api/monasteries` | POST | Create monastery |
| `/api/events` | GET | List all events |
| `/api/events/upcoming` | GET | Upcoming events only |
| `/api/ai/chat` | POST | Chat with AI guide |
| `/api/ai/languages` | GET | Supported languages |
| `/api/rural-places` | GET | Rural destinations |
| `/api/cultural-content` | GET | Cultural library content |
| `/api/workshops` | GET | Handicraft workshops |
| `/api/workshops/:id/book` | POST | Book a workshop |
| `/api/travel-plans` | GET | Community travel plans |
| `/api/forum` | GET | Forum posts |
| `/api/games` | GET | Game content |

---

## Running Tests

```bash
cd Hackathon1-main
python backend_test.py
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `EMERGENT_LLM_KEY not found` | Add it to `backend/.env` |
| `Cannot connect to MongoDB` | Start MongoDB; check `MONGO_URL` |
| CORS error in browser | Confirm `REACT_APP_BACKEND_URL` matches backend port |
| `yarn install` fails | Run `npm install -g yarn` first |
| Module not found (Python) | Activate venv, then re-run `pip install -r requirements.txt` |
| AI chat returns error | Check Gemini key quota at your API provider |

---

## Project Structure

```
Hackathon1-main/
├── backend/
│   ├── server.py              # FastAPI app, all routes
│   ├── server_extended.py     # Extended cultural routes
│   ├── ai_service.py          # Gemini AI chat service
│   ├── database.py            # Core MongoDB operations
│   ├── database_extended.py   # Extended DB + seeding
│   ├── models.py              # Pydantic models (core)
│   ├── models_extended.py     # Pydantic models (extended)
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.js             # Root component + routing
│   │   ├── components/        # Page components
│   │   └── mock/data.js       # Static feature data
│   ├── package.json
│   └── .env.example
├── contracts.md               # API contract spec
├── backend_test.py
└── README.md
```
