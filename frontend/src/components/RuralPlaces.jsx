import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  MapPin, ArrowLeft, Mountain, Compass, Users, Star, 
  Clock, Camera, Navigation, TreePine, Heart, Share2
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const RuralPlaces = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                  src={place.images[0]} 
                  alt={place.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                    <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-all duration-200 transform hover:scale-105">
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
    </div>
  );
};