import React from 'react';
import { X, MapPin, Navigation, Info, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

export const MapViewer = ({ monastery, onClose }) => {
  // Simulate a map with 360 points
  const mapCenter = monastery.coordinates || { lat: 27.2896, lng: 88.5591 };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-300">
      <div className="relative w-full max-w-6xl h-[80vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 z-10 bg-gradient-to-b from-white/95 to-transparent flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">360° Interactive Map</h2>
            <p className="text-slate-600 flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-orange-600" />
              {monastery.name} - {monastery.location}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-slate-500 hover:bg-slate-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Interactive Map (Simulated) */}
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1600&h=800&fit=crop&q=20'),_url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&h=800&fit=crop')] bg-cover bg-center filter grayscale opacity-20"></div>
          
          <div className="relative text-center space-y-4 max-w-lg z-10 px-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
              <Navigation className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Map & 360° Integration</h3>
              <p className="text-slate-600">
                Explore all 360° vantage points around {monastery.name} using our interactive map coordinates.
              </p>
            </div>
            
            {/* Coordinate info */}
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Latitude</p>
                <p className="text-slate-900 font-mono">{mapCenter.lat.toFixed(4)}° N</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Longitude</p>
                <p className="text-slate-900 font-mono">{mapCenter.lng.toFixed(4)}° E</p>
              </div>
            </div>
            
            <div className="flex justify-center gap-3">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6">
                <Navigation className="w-4 h-4 mr-2" />
                Navigate Here
              </Button>
              <Button 
                variant="outline" 
                className="border-slate-300 hover:bg-slate-50 text-slate-700 rounded-full px-6"
                onClick={() => window.open(`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open External Map
              </Button>
            </div>
          </div>

          {/* Map markers simulation */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              className="absolute z-20 group"
              style={{ 
                top: `${20 + (i * 15)}%`, 
                left: `${15 + (i * 18)}%` 
              }}
            >
              <div className="w-6 h-6 bg-white rounded-full border-2 border-orange-500 flex items-center justify-center cursor-pointer hover:scale-125 transition-transform duration-200">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white p-2 rounded-lg border border-slate-200 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <p className="text-xs font-bold text-slate-900">Viewpoint {i + 1}</p>
                <p className="text-[10px] text-slate-600">360° panorama available</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Info */}
        <div className="absolute top-24 right-6 bottom-6 w-80 z-10 bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-6 overflow-y-auto hidden lg:block">
          <h4 className="font-bold text-slate-900 mb-4 flex items-center">
            <Info className="w-4 h-4 mr-2 text-orange-600" />
            Nearby Highlights
          </h4>
          <div className="space-y-4">
            {monastery.nearby_attractions?.map((attr, index) => (
              <div key={index} className="flex gap-3 group items-start hover:bg-orange-50 p-2 rounded-xl transition-colors">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex-shrink-0 flex items-center justify-center text-orange-700">
                  {index + 1}
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-slate-800">{attr}</h5>
                  <p className="text-xs text-slate-500">Accessible from {monastery.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
