import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  MapPin, ArrowLeft, Mountain, Compass, Users, Star, 
  Clock, Camera, Navigation, TreePine, Heart, Share2, Play, Info
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const RuralPlaces = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRuralPlaces();
  }, []);

  const fetchRuralPlaces = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/rural-places`);
      
      if (response.data.success) {
        setPlaces(response.data.data.rural_places);
      } else {
        setError('Failed to load rural places');
      }
    } catch (err) {
      console.error('Error fetching rural places:', err);
      setError('Failed to load rural places');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'moderate': return 'bg-yellow-100 text-yellow-700';
      case 'difficult': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <TreePine className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-600">Loading hidden gems of Sikkim...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-green-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="hover:bg-green-50 text-slate-700 rounded-full"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-slate-900">
              Hidden Gems &
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Rural Sikkim
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Discover the untouched beauty of rural Sikkim. Experience authentic village life, pristine landscapes, and the warmth of local communities.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchRuralPlaces} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full">
              Try Again
            </Button>
          </div>
        )}

        {/* Places Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {places.map((place) => (
            <Card key={place.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white border border-green-100 rounded-3xl overflow-hidden">
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={place.images?.[0] || ['/hero-image.png', '/monastery_1.png', '/monastery_2.png', '/monastery_3.png'][place.name.length % 4]} 
                  alt={place.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                
                {/* Difficulty Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={`${getDifficultyColor(place.difficulty_level)} border-0 font-semibold`}>
                    <Mountain className="w-3 h-3 mr-1" />
                    {place.difficulty_level}
                  </Badge>
                </div>

                {/* Guide Required Badge */}
                {place.local_guide_required && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-orange-500 text-white border-0">
                      <Users className="w-3 h-3 mr-1" />
                      Guide Required
                    </Badge>
                  </div>
                )}

                {/* Location overlay */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1 group-hover:scale-105 transition-transform duration-200">
                    {place.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-white/90">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{place.location}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Description */}
                  <p className="text-slate-700 leading-relaxed">
                    {place.description}
                  </p>

                  {/* Significance */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-100">
                    <h4 className="font-semibold text-slate-800 mb-2 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-green-600" />
                      Cultural Significance
                    </h4>
                    <p className="text-slate-700 text-sm">{place.significance}</p>
                  </div>

                  {/* Best Time & Transportation */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-slate-800">Best Time to Visit</h5>
                        <p className="text-slate-600 text-sm">{place.best_time_to_visit}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Navigation className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-slate-800">How to Reach</h5>
                        <p className="text-slate-600 text-sm">{place.transportation_info}</p>
                      </div>
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800 flex items-center">
                      <Compass className="w-4 h-4 mr-2 text-green-600" />
                      Activities & Experiences
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {place.activities.map((activity, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={() => {
                        setSelectedPlace(place);
                        setIsModalOpen(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <Camera className="mr-2 w-4 h-4" />
                      Explore More
                    </Button>
                    <Button 
                      variant="outline" 
                      className="px-4 border-green-200 hover:border-green-300 hover:bg-green-50 text-green-700 rounded-xl"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="px-4 border-green-200 hover:border-green-300 hover:bg-green-50 text-green-700 rounded-xl"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Quick Info */}
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Difficulty:</span>
                        <span className="ml-2 font-medium text-slate-800 capitalize">{place.difficulty_level}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Guide:</span>
                        <span className="ml-2 font-medium text-slate-800">
                          {place.local_guide_required ? 'Required' : 'Optional'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-white p-12 rounded-3xl shadow-lg border border-green-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to Explore Rural Sikkim?
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Connect with local guides, plan your rural adventure, and experience the authentic charm of village life in the Himalayas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold">
              Find Local Guides
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-green-200 hover:border-green-300 text-slate-700 hover:bg-green-50 px-8 py-4 rounded-full text-lg font-semibold"
            >
              Plan Custom Trip
            </Button>
          </div>
        </div>
      </div>
      {/* Place Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-green-100">
          {selectedPlace && (
            <div className="space-y-8 p-2">
              <DialogHeader>
                <div className="flex items-center space-x-2 text-green-600 mb-2">
                  <TreePine className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Hidden Gem Detail</span>
                </div>
                <DialogTitle className="text-3xl font-bold text-slate-900">
                  {selectedPlace.name}
                </DialogTitle>
                <div className="flex items-center text-slate-500 mt-2">
                  <MapPin className="w-4 h-4 mr-1 text-green-500" />
                  {selectedPlace.location}
                </div>
              </DialogHeader>

              {/* Media Section: Image + Video */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Feature Image */}
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                  <img 
                    src={selectedPlace.images?.[0] || '/hero-image.png'} 
                    alt={selectedPlace.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
                  />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/90 backdrop-blur-sm text-green-700 border-0 hover:bg-white">
                      Featured View
                    </Badge>
                  </div>
                </div>

                {/* Video Player */}
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg bg-black border border-slate-100 flex items-center justify-center group">
                  {selectedPlace.video_url || "https://www.youtube.com/embed/dQw4w9WgXcQ" ? (
                    <iframe 
                      className="w-full h-full"
                      src={selectedPlace.video_url || "https://www.youtube.com/embed/M7lc1UVf-VE"}
                      title={`${selectedPlace.name} Video`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-green-500 fill-current" />
                      </div>
                      <p className="text-slate-400 text-sm">Experience the beauty</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Description */}
              <div className="grid md:grid-cols-3 gap-8 pt-4">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-green-600" />
                      About this Hidden Gem
                    </h4>
                    <p className="text-slate-700 leading-relaxed text-lg">
                      {selectedPlace.description}
                    </p>
                  </div>

                  <div className="bg-green-50/50 p-6 rounded-3xl border border-green-100/50">
                    <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-green-600" />
                      Historical & Cultural Significance
                    </h4>
                    <p className="text-slate-700 leading-relaxed">
                      {selectedPlace.significance}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-slate-900 flex items-center">
                      <Compass className="w-5 h-5 mr-2 text-green-600" />
                      Local Experiences
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedPlace.activities.map((activity, idx) => (
                        <div key={idx} className="flex items-center space-x-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-green-200 transition-colors">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-slate-700">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Travel Info</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-emerald-50 rounded-xl">
                          <Clock className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase">Best Visit</p>
                          <p className="text-sm text-slate-700">{selectedPlace.best_time_to_visit}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-50 rounded-xl">
                          <Navigation className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase">Transport</p>
                          <p className="text-sm text-slate-700 line-clamp-2">{selectedPlace.transportation_info}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-amber-50 rounded-xl">
                          <Mountain className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase">Difficulty</p>
                          <p className="text-sm text-slate-700 capitalize">{selectedPlace.difficulty_level}</p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-6 mt-4">
                      Book a Local Guide
                    </Button>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-3xl text-white space-y-4 shadow-lg">
                    <h4 className="font-bold">Pro Tip</h4>
                    <p className="text-sm text-white/90 leading-relaxed italic">
                      "Make sure to bring a reusable water bottle and respect the local customs by asking for permission before taking close-up photos of residents."
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <Button 
                  onClick={() => setIsModalOpen(false)}
                  variant="outline" 
                   className="rounded-full px-8 py-2 border-slate-200 hover:bg-slate-50"
                >
                  Close Explorer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};