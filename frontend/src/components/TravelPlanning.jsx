import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  ArrowLeft, MapPin, Calendar, Users, Plane, Car, Bus, Train,
  Heart, Share2, Plus, Search, Filter, Clock, IndianRupee,
  Navigation, Phone, AlertCircle, CheckCircle, Star
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const TravelPlanning = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('explore');
  const [travelPlans, setTravelPlans] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlan, setNewPlan] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    destinations: [],
    transportation_mode: 'car',
    package_type: 'individual',
    budget_range: '',
    max_participants: 4,
    live_tracking_enabled: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [plansRes, accommodationsRes] = await Promise.all([
        axios.get(`${API}/travel-plans`),
        axios.get(`${API}/accommodations`)
      ]);

      if (plansRes.data.success) {
        setTravelPlans(plansRes.data.data.travel_plans || []);
      }
      if (accommodationsRes.data.success) {
        setAccommodations(accommodationsRes.data.data.accommodations || []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    try {
      const planData = {
        ...newPlan,
        creator_id: `user_${Date.now()}`,
        destinations: newPlan.destinations.filter(d => d.trim())
      };
      
      const response = await axios.post(`${API}/travel-plans`, planData);
      
      if (response.data.success) {
        alert('Travel plan created successfully!');
        setShowCreateForm(false);
        setNewPlan({
          title: '',
          description: '',
          start_date: '',
          end_date: '',
          destinations: [],
          transportation_mode: 'car',
          package_type: 'individual',
          budget_range: '',
          max_participants: 4,
          live_tracking_enabled: false
        });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating plan:', error);
      alert('Failed to create travel plan');
    }
  };

  const getTransportIcon = (mode) => {
    switch (mode) {
      case 'plane': return Plane;
      case 'car': return Car;
      case 'bus': return Bus;
      case 'train': return Train;
      default: return Car;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-600">Planning your Sikkim adventure...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="hover:bg-blue-50 text-slate-700 rounded-full"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
            
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full"
            >
              <Plus className="mr-2 w-4 h-4" />
              Create Travel Plan
            </Button>
          </div>

          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-slate-900">
              Travel Planning &
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Buddy Matching
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Plan your perfect Sikkim journey, find travel companions, and book accommodations. Share experiences and connect with fellow travelers.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-full">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                activeTab === 'explore' 
                  ? 'bg-white shadow-sm text-blue-600 font-semibold' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Explore Plans
            </button>
            <button
              onClick={() => setActiveTab('accommodations')}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                activeTab === 'accommodations' 
                  ? 'bg-white shadow-sm text-blue-600 font-semibold' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Stay Options
            </button>
            <button
              onClick={() => setActiveTab('buddies')}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                activeTab === 'buddies' 
                  ? 'bg-white shadow-sm text-blue-600 font-semibold' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Find Buddies
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Travel Plans Tab */}
        {activeTab === 'explore' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {travelPlans.map((plan) => {
                const TransportIcon = getTransportIcon(plan.transportation_mode);
                const startDate = new Date(plan.start_date);
                const endDate = new Date(plan.end_date);
                
                return (
                  <Card key={plan.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border border-blue-100 rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <Badge className={`${getStatusColor(plan.status)} border-0`}>
                              {plan.status}
                            </Badge>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {plan.title}
                            </h3>
                          </div>
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                            <TransportIcon className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 text-sm line-clamp-2">
                          {plan.description}
                        </p>

                        {/* Details */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 text-sm text-slate-600">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3 text-sm text-slate-600">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span>{plan.current_participants}/{plan.max_participants} travelers</span>
                          </div>
                          
                          <div className="flex items-center space-x-3 text-sm text-slate-600">
                            <IndianRupee className="w-4 h-4 text-blue-600" />
                            <span>{plan.budget_range}</span>
                          </div>
                        </div>

                        {/* Destinations */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-slate-800">Destinations</h4>
                          <div className="flex flex-wrap gap-1">
                            {plan.destinations.slice(0, 3).map((dest, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                                {dest}
                              </Badge>
                            ))}
                            {plan.destinations.length > 3 && (
                              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                                +{plan.destinations.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Live Tracking */}
                        {plan.live_tracking_enabled && (
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200">
                            <div className="flex items-center space-x-2 text-sm text-green-700">
                              <Navigation className="w-4 h-4" />
                              <span className="font-medium">Live tracking enabled</span>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl">
                            Join Plan
                          </Button>
                          <Button variant="outline" className="px-3 border-blue-200 hover:bg-blue-50 text-blue-700 rounded-xl">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" className="px-3 border-blue-200 hover:bg-blue-50 text-blue-700 rounded-xl">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Accommodations Tab */}
        {activeTab === 'accommodations' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodations.map((place) => (
                <Card key={place.id} className="group hover:shadow-xl transition-all duration-300 bg-white border border-blue-100 rounded-2xl overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={place.images[0]} 
                      alt={place.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-slate-700 border-0 capitalize">
                        {place.type}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
                      {place.rating} ⭐
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{place.name}</h3>
                        <div className="flex items-center space-x-1 text-sm text-slate-600">
                          <MapPin className="w-4 h-4" />
                          <span>{place.location}</span>
                        </div>
                      </div>

                      <div className="text-lg font-bold text-blue-600">
                        {place.price_range}
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-slate-800">Amenities</h4>
                        <div className="flex flex-wrap gap-1">
                          {place.amenities.slice(0, 3).map((amenity, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span>{place.reviews_count} reviews</span>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>Contact available</span>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Travel Buddies Tab */}
        {activeTab === 'buddies' && (
          <div className="space-y-8">
            <div className="text-center py-12 bg-white rounded-3xl border border-blue-100">
              <Users className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Find Your Travel Buddy</h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Connect with like-minded travelers, share experiences, and explore Sikkim together. Join our community forum to find the perfect travel companion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full">
                  Join Community Forum
                </Button>
                <Button variant="outline" className="border-blue-200 hover:bg-blue-50 text-blue-700 px-8 py-3 rounded-full">
                  Browse Travel Profiles
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Plan Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Create Travel Plan</h3>
              <Button 
                variant="ghost" 
                onClick={() => setShowCreateForm(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </Button>
            </div>

            <form onSubmit={handleCreatePlan} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Trip Title</label>
                  <input
                    type="text"
                    required
                    value={newPlan.title}
                    onChange={(e) => setNewPlan({...newPlan, title: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Amazing Sikkim Adventure"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Budget Range</label>
                  <input
                    type="text"
                    required
                    value={newPlan.budget_range}
                    onChange={(e) => setNewPlan({...newPlan, budget_range: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="₹15,000 - 25,000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  required
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Describe your travel plan..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    required
                    value={newPlan.start_date}
                    onChange={(e) => setNewPlan({...newPlan, start_date: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
                  <input
                    type="date"
                    required
                    value={newPlan.end_date}
                    onChange={(e) => setNewPlan({...newPlan, end_date: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Transport</label>
                  <select
                    value={newPlan.transportation_mode}
                    onChange={(e) => setNewPlan({...newPlan, transportation_mode: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="car">Car</option>
                    <option value="bus">Bus</option>
                    <option value="plane">Flight</option>
                    <option value="train">Train</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Package Type</label>
                  <select
                    value={newPlan.package_type}
                    onChange={(e) => setNewPlan({...newPlan, package_type: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="individual">Individual</option>
                    <option value="family">Family</option>
                    <option value="group">Group</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Max Travelers</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newPlan.max_participants}
                    onChange={(e) => setNewPlan({...newPlan, max_participants: parseInt(e.target.value)})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newPlan.live_tracking_enabled}
                    onChange={(e) => setNewPlan({...newPlan, live_tracking_enabled: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Enable live tracking for family/friends</span>
                </label>
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 rounded-xl font-semibold text-lg"
              >
                Create Travel Plan
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};