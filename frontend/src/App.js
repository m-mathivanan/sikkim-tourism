import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import { MapPin, Users, Camera, Globe } from 'lucide-react';
import axios from "axios";
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { MonasteryCard } from './components/MonasteryCard';
import { EventsSection } from './components/EventsSection';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { MonasteryDetail } from './components/MonasteryDetail';
import { EventsPage } from './components/EventsPage';
import { RuralPlaces } from './components/RuralPlaces';
import { CulturalLibrary } from './components/CulturalLibrary';
import { HandicraftWorkshops } from './components/HandicraftWorkshops';
import { TravelPlanning } from './components/TravelPlanning';
import { GamifiedLearning } from './components/GamifiedLearning';
import { mockFeatures } from './mock/data';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const navigate = useNavigate();
  const [monasteries, setMonasteries] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [monasteriesRes, eventsRes] = await Promise.all([
        axios.get(`${API}/monasteries`),
        axios.get(`${API}/events`)
      ]);

      if (monasteriesRes.data.success) {
        setMonasteries(monasteriesRes.data.data.monasteries);
      }
      if (eventsRes.data.success) {
        setEvents(eventsRes.data.data.events);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please check the backend is running and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <div className="w-6 h-6 bg-white rounded-lg"></div>
          </div>
          <p className="text-slate-600">Loading sacred monasteries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto">
            <Globe className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-red-600 font-medium">{error}</p>
          <p className="text-slate-500 text-sm">Make sure the backend server is running on port 8001 and your .env file is configured.</p>
          <button
            onClick={fetchData}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-2 rounded-full transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection features={mockFeatures} />

      {/* Monasteries Section */}
      <section id="monasteries" className="py-20 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Sacred
              <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Monasteries Collection
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Explore the most significant monasteries of Sikkim, each with unique history, architecture, and spiritual significance.
            </p>
          </div>

          {monasteries.length === 0 ? (
            <div className="text-center py-12 text-slate-500">No monasteries found.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {monasteries.map((monastery) => (
                <MonasteryCard key={monastery.id || monastery._id} monastery={monastery} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button
              onClick={() => document.getElementById('monasteries')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Explore All Monasteries
            </button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <EventsSection events={events} />

      {/* Quick Access Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Complete Cultural
              <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Preservation Platform
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Everything you need to explore, learn, and preserve Sikkim's rich heritage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              onClick={() => navigate('/travel-planning')}
              className="group p-6 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border border-blue-100 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg text-left"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Travel Planning</h3>
              <p className="text-slate-600 text-sm">Plan trips, find travel buddies, book accommodations</p>
            </button>

            <button
              onClick={() => navigate('/workshops')}
              className="group p-6 bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-100 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg text-left"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Handicraft Workshops</h3>
              <p className="text-slate-600 text-sm">Learn traditional crafts from master artisans</p>
            </button>

            <button
              onClick={() => navigate('/cultural-library')}
              className="group p-6 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-100 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg text-left"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Cultural Library</h3>
              <p className="text-slate-600 text-sm">Videos, articles, and cultural content archive</p>
            </button>

            <button
              onClick={() => navigate('/games')}
              className="group p-6 bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-100 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg text-left"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Interactive Games</h3>
              <p className="text-slate-600 text-sm">Gamified learning and cultural storytelling</p>
            </button>
          </div>
        </div>
      </section>

      {/* AI Guide CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Need Guidance on Your
                <span className="block bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Cultural Journey?
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Our AI-powered guide speaks multiple languages and can help you plan visits, understand cultural significance, and answer questions about traditions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.querySelector('.ai-chat-trigger')?.click()}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Chat with AI Guide
              </button>
              <button
                onClick={() => navigate('/cultural-library')}
                className="border-2 border-white/20 hover:border-white/40 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                Explore Platform
              </button>
            </div>

            <div className="pt-8">
              <p className="text-slate-400 text-sm mb-4">AI Guide available in multiple languages:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['English', 'Nepali', 'Hindi', 'Tibetan', 'Bengali', 'Sikkimese'].map((lang) => (
                  <span key={lang} className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/monastery/:monasteryId" element={<MonasteryDetail />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/rural-places" element={<RuralPlaces />} />
          <Route path="/cultural-library" element={<CulturalLibrary />} />
          <Route path="/workshops" element={<HandicraftWorkshops />} />
          <Route path="/travel-planning" element={<TravelPlanning />} />
          <Route path="/games" element={<GamifiedLearning />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
