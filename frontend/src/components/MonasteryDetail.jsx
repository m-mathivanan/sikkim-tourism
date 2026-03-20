import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  MapPin, Clock, Mountain, Calendar, Camera, ExternalLink, 
  ArrowLeft, Phone, Globe, Users, Star, Navigation, 
  Info, Heart, Share2
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const MonasteryDetail = () => {
  const { monasteryId } = useParams();
  const navigate = useNavigate();
  const [monastery, setMonastery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetchMonasteryDetails();
  }, [monasteryId]);

  const fetchMonasteryDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/monasteries/${monasteryId}`);
      
      if (response.data.success) {
        setMonastery(response.data.data.monastery);
      } else {
        setError('Monastery not found');
      }
    } catch (err) {
      console.error('Error fetching monastery details:', err);
      setError('Failed to load monastery details');
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
          <p className="text-slate-600">Loading monastery details...</p>
        </div>
      </div>
    );
  }

  if (error || !monastery) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-600">{error || 'Monastery not found'}</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="hover:bg-orange-50 text-slate-700 rounded-full"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Monasteries
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="border-orange-200 hover:border-orange-300 text-orange-700 hover:bg-orange-50 rounded-full"
              >
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                className="border-orange-200 hover:border-orange-300 text-orange-700 hover:bg-orange-50 rounded-full"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={monastery.images[selectedImageIndex]} 
                alt={monastery.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              
              {/* Virtual Tour Badge */}
              {monastery.virtual_tour && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 hover:from-orange-600 hover:to-amber-600">
                    <Camera className="w-3 h-3 mr-1" />
                    360° Virtual Tour Available
                  </Badge>
                </div>
              )}

              {/* Altitude Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                <Mountain className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">{monastery.altitude}</span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {monastery.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {monastery.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index ? 'border-orange-500' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Monastery Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Badge className="bg-orange-100 text-orange-700 border-0">
                  {monastery.sect}
                </Badge>
                <div className="flex items-center text-sm text-slate-600">
                  <Star className="w-4 h-4 mr-1 text-amber-500" />
                  <span>Sacred Site</span>
                </div>
              </div>

              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">{monastery.name}</h1>
                <p className="text-lg text-slate-600 mb-4">{monastery.tibetan_name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{monastery.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>Est. {monastery.established}</span>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed text-lg">
                {monastery.description}
              </p>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100">
                <h3 className="font-semibold text-slate-800 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2 text-orange-600" />
                  Cultural Significance
                </h3>
                <p className="text-slate-700">{monastery.significance}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Visiting Information */}
          <Card className="border-orange-100 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-600" />
                Visiting Information
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-800">Opening Hours</h4>
                  <p className="text-slate-600">{monastery.visiting_hours}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Best Time to Visit</h4>
                  <p className="text-slate-600">{monastery.best_time}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Accessibility</h4>
                  <p className="text-slate-600">{monastery.accessibility}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card className="border-orange-100 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-orange-600" />
                Key Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {monastery.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-sm bg-slate-100 text-slate-700 hover:bg-slate-200">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Festivals & Events */}
          <Card className="border-orange-100 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                Festivals & Ceremonies
              </h3>
              <div className="space-y-2">
                {monastery.festivals.map((festival, index) => (
                  <div key={index} className="flex items-center space-x-2 text-slate-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>{festival}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Nearby Attractions */}
        <Card className="border-orange-100 shadow-lg mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <Navigation className="w-5 h-5 mr-2 text-orange-600" />
              Nearby Attractions
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {monastery.nearby_attractions.map((attraction, index) => (
                <div key={index} className="bg-gradient-to-r from-slate-50 to-orange-50 p-4 rounded-xl border border-orange-100">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    <span className="text-slate-700 font-medium">{attraction}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Offerings & Donations */}
        <Card className="border-orange-100 shadow-lg mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-orange-600" />
              Traditional Offerings
            </h3>
            <div className="flex flex-wrap gap-3">
              {monastery.offerings.map((offering, index) => (
                <div key={index} className="bg-gradient-to-r from-orange-100 to-amber-100 px-4 py-2 rounded-full">
                  <span className="text-orange-800 font-medium">{offering}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-600 mt-4 text-sm">
              These traditional offerings are commonly made by visitors as part of Buddhist customs and prayers.
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {monastery.virtual_tour && (
            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              <Camera className="mr-2 w-5 h-5" />
              Start Virtual Tour
            </Button>
          )}
          <Button 
            variant="outline"
            className="border-2 border-orange-200 hover:border-orange-300 text-slate-700 hover:bg-orange-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
          >
            <MapPin className="mr-2 w-5 h-5" />
            View on Map
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-orange-200 hover:border-orange-300 text-slate-700 hover:bg-orange-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
          >
            <Calendar className="mr-2 w-5 h-5" />
            Plan Visit
          </Button>
        </div>
      </div>
    </div>
  );
};