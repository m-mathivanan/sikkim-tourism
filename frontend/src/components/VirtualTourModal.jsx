import React, { useState } from 'react';
import { X, RotateCcw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';

export const VirtualTourModal = ({ monastery, onClose }) => {
  const [rotation, setRotation] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Simulated 360 view using a wide panorama image
  // In a real app, this would use a library like Pannellum or a 360 video player
  const panoramaImage = monastery.name === "Rumtek Monastery" 
    ? "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&h=400&fit=crop"
    : "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1600&h=400&fit=crop";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 z-10 bg-gradient-to-b from-black/60 to-transparent flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">360° Virtual Tour</h2>
            <p className="text-white/80">{monastery.name} - {monastery.location}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* 360 Viewer (Simulated) */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden cursor-move">
          <div 
            className="w-[400%] h-full flex transition-transform duration-700 ease-out"
            style={{ 
              transform: `translateX(-${rotation}%) scale(${isZoomed ? 1.5 : 1})`,
              backgroundImage: `url(${panoramaImage}), url(/hero-image.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Repeated background for seamless loop simulation if needed */}
          </div>
          
          {/* Overlay controls */}
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 animate-pulse">
              <p className="text-white text-sm font-medium">Drag to rotate 360°</p>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10 bg-gradient-to-t from-black/60 to-transparent flex justify-center items-center gap-4">
          <div className="flex bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setRotation((prev) => (prev + 5) % 80)}
              className="text-white hover:bg-white/20"
            >
              <RotateCcw className="w-5 h-5 rotate-180" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setRotation((prev) => (prev > 0 ? prev - 5 : 75))}
              className="text-white hover:bg-white/20"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
            <div className="w-px h-8 bg-white/20 mx-1"></div>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setIsZoomed(!isZoomed)}
              className={`text-white hover:bg-white/20 ${isZoomed ? 'bg-orange-500/50' : ''}`}
            >
              {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-white hover:bg-white/20"
            >
              <Maximize2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Hotspots (Simulated) */}
        <div 
          className="absolute top-1/2 left-1/3 z-20 pointer-events-auto"
          style={{ transform: `translateX(-${rotation * 10}px)` }}
        >
          <div className="group relative">
            <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white animate-ping"></div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <p className="text-xs font-bold text-slate-900">Main Prayer Hall</p>
              <p className="text-[10px] text-slate-600">Click to enter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
