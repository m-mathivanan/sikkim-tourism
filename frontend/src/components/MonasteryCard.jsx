import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Clock, Mountain, Calendar, Camera, ExternalLink } from 'lucide-react';

export const MonasteryCard = ({ monastery }) => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate(`/monastery/${monastery.id}`);
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border border-slate-200 rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={monastery.images?.[0] || "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop"} 
          alt={monastery.name}
          onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge className="bg-white/90 text-slate-700 border-0 hover:bg-white">
            {monastery.sect}
          </Badge>
          {monastery.virtual_tour && (
            <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 hover:from-orange-600 hover:to-amber-600">
              <img 
                src="/monk-prayer.png" 
                className="w-4 h-4 mr-1 rounded-full border border-white" 
                onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
                alt="360" 
              />
              Virtual Tour
            </Badge>
          )}
        </div>

        {/* Altitude */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
          <img 
            src="/phodong-monastery.png" 
            className="w-5 h-5 rounded-full border border-white shadow-sm"
            onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
            alt="Altitude"
          />
          <span className="text-sm font-bold text-slate-800 tracking-tight">{monastery.altitude}</span>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors duration-200">
              {monastery.name}
            </h3>
            <p className="text-sm text-slate-500 font-medium">{monastery.tibetan_name}</p>
            
            {/* Location & Date */}
            <div className="flex items-center justify-between text-sm text-slate-600">
              <div className="flex items-center space-x-1">
                <img 
                  src="https://img.icons8.com/color/48/marker.png" 
                  className="w-4 h-4 opacity-80" 
                  onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
                  alt="Loc" 
                />
                <span className="font-medium">{monastery.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <img 
                  src="https://img.icons8.com/color/48/historical.png" 
                  className="w-4 h-4 opacity-80" 
                  onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
                  alt="Era" 
                />
                <span className="font-medium">{monastery.established}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
            {monastery.description}
          </p>

          {/* Features */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-800">Key Features</h4>
            <div className="flex flex-wrap gap-1">
              {monastery.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200">
                  {feature}
                </Badge>
              ))}
              {monastery.features.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                  +{monastery.features.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Next Festival */}
          {monastery.festivals.length > 0 && (
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-xl border border-orange-100">
              <div className="flex items-center space-x-2 text-sm">
                <img 
                  src="/tashiding-monastery.png" 
                  className="w-5 h-5 rounded-full border border-white shadow-sm"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
                  alt="Fest"
                />
                <span className="font-medium text-slate-800">Next Festival:</span>
                <span className="text-orange-700">{monastery.festivals[0]}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={handleExploreClick}
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              Explore Details
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
            {monastery.virtual_tour && (
              <Button 
                variant="outline" 
                className="px-4 border-orange-200 hover:border-orange-300 hover:bg-orange-50 text-orange-700 rounded-xl transition-all duration-200"
              >
                <Camera className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};