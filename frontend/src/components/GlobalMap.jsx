import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Navigation, Info, ArrowLeft, Camera, 
  Search, Filter, Layers, ZoomIn, ZoomOut, X
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const GlobalMap = () => {
  const navigate = useNavigate();
  const [monasteries, setMonasteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonastery, setSelectedMonastery] = useState(null);

  useEffect(() => {
    fetchMonasteries();
  }, []);

  const fetchMonasteries = async () => {
    try {
      const response = await axios.get(`${API}/monasteries`);
      if (response.data.success) {
        setMonasteries(response.data.data.monasteries);
      }
    } catch (err) {
      console.error('Error fetching monasteries for map:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      {/* Map Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 z-20 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="rounded-full hover:bg-slate-100"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">360° Monastery Explorer</h1>
            <p className="text-xs text-slate-500">Interactive Map of Sikkim's Cultural Heritage</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search monasteries..." 
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all w-64"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-full border-slate-200">
            <Filter className="w-4 h-4 text-slate-600" />
          </Button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden flex">
        {/* Map Interface (Simulated) */}
        <div className="flex-1 relative bg-slate-200 overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1600&h=1200&fit=crop&q=40'),_url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&h=1200&fit=crop')] bg-cover bg-center filter saturate-50 opacity-30"></div>
          
          {/* Map Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          {/* Interactive Markers */}
          {monasteries.map((m, i) => (
            <div 
              key={m.id || m._id}
              className={`absolute z-10 transition-all duration-500 transform ${
                selectedMonastery?.id === m.id ? 'scale-125' : 'hover:scale-110'
              }`}
              style={{ 
                top: `${30 + (i * 12)}%`, 
                left: `${25 + (i * 15)}%` 
              }}
            >
              <button 
                onClick={() => setSelectedMonastery(m)}
                className={`flex flex-col items-center group`}
              >
                <div className={`w-12 h-12 rounded-full border-2 shadow-2xl overflow-hidden transition-all duration-200 ${
                  selectedMonastery?.id === m.id 
                    ? 'border-orange-500 scale-125 ring-4 ring-orange-500/20' 
                    : 'border-white'
                }`}>
                  <img 
                    src={m.images?.[0] || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=100&h=100&fit=crop'} 
                    alt={m.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
                  />
                </div>
                <div className={`mt-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200 shadow-lg text-xs font-bold transition-all duration-200 ${
                  selectedMonastery?.id === m.id ? 'bg-orange-600 text-white border-orange-600' : 'text-slate-800'
                }`}>
                  {m.name}
                </div>
              </button>
            </div>
          ))}

          {/* Map UI Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col space-y-3 z-20">
            <Button size="icon" className="bg-white text-slate-700 shadow-2xl border border-slate-200 hover:bg-slate-50 rounded-2xl w-12 h-12 p-2 transition-all hover:scale-110">
              <img src="https://img.icons8.com/isometric/50/zoom-in.png" className="w-8 h-8" alt="+" />
            </Button>
            <Button size="icon" className="bg-white text-slate-700 shadow-2xl border border-slate-200 hover:bg-slate-50 rounded-2xl w-12 h-12 p-2 transition-all hover:scale-110">
              <img src="https://img.icons8.com/isometric/50/zoom-out.png" className="w-8 h-8" alt="-" />
            </Button>
            <Button size="icon" className="bg-white text-slate-700 shadow-2xl border border-slate-200 hover:bg-slate-50 rounded-2xl w-12 h-12 p-2 transition-all hover:scale-110">
              <img src="https://img.icons8.com/isometric/50/layers.png" className="w-8 h-8" alt="L" />
            </Button>
          </div>
        </div>

        {/* Monastery Detail Sidebar */}
        {selectedMonastery && (
          <div className="w-96 bg-white border-l border-slate-200 shadow-2xl z-30 animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={selectedMonastery.images?.[0] || "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop"} 
                alt={selectedMonastery.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedMonastery(null)}
                className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
              <div className="absolute bottom-4 left-4 text-white">
                <Badge className="bg-orange-500 text-white border-0 mb-1">
                  {selectedMonastery.sect}
                </Badge>
                <h2 className="text-xl font-bold">{selectedMonastery.name}</h2>
              </div>
            </div>

            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                  {selectedMonastery.location}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Camera className="w-4 h-4 mr-2 text-orange-600" />
                  360° Virtual Tour Available
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedMonastery.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button 
                  onClick={() => navigate(`/monastery/${selectedMonastery.id || selectedMonastery._id}`)}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm"
                >
                  <Info className="w-4 h-4 mr-2" />
                  Details
                </Button>
                <Button 
                  variant="outline"
                  className="border-orange-200 text-orange-700 hover:bg-orange-50 rounded-xl text-sm"
                  onClick={() => navigate(`/monastery/${selectedMonastery.id || selectedMonastery._id}`)} 
                >
                  <Camera className="w-4 h-4 mr-2" />
                  360 Tour
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
