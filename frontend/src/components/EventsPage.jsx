import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Calendar, MapPin, Clock, Users, ArrowLeft, Filter,
  Search, Star, Heart, Share2, ExternalLink
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const EventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, filterType]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/events`);
      
      if (response.data.success) {
        setEvents(response.data.data.events);
      } else {
        setError('Failed to load events');
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.monastery.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(event => 
        event.type.toLowerCase().includes(filterType.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getEventStatus = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { status: 'past', label: 'Completed', color: 'bg-slate-500' };
    if (diffDays === 0) return { status: 'today', label: 'Today', color: 'bg-red-500' };
    if (diffDays <= 7) return { status: 'upcoming', label: 'This Week', color: 'bg-orange-500' };
    return { status: 'future', label: 'Upcoming', color: 'bg-green-500' };
  };

  const eventTypes = ['all', 'religious', 'buddhist', 'ceremony', 'cultural'];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-600">Loading festivals and events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="hover:bg-orange-50 text-slate-700 rounded-full"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </div>

          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-slate-900">
              Festivals & 
              <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Sacred Events
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Join us in celebrating the rich Buddhist traditions through sacred ceremonies and vibrant festivals throughout the year.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search events, festivals, or monasteries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-600" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {eventTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)} Events
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchEvents} className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full">
              Try Again
            </Button>
          </div>
        )}

        {filteredEvents.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Events Found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => {
            const eventStatus = getEventStatus(event.date);
            
            return (
              <Card key={event.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  {/* Event Header */}
                  <div className="relative bg-gradient-to-br from-orange-500 to-amber-500 p-6 text-white">
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${eventStatus.color}`}>
                        {eventStatus.label}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                        {event.type}
                      </Badge>
                      <h3 className="text-xl font-bold group-hover:scale-105 transition-transform duration-200">
                        {event.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Event Details */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-sm text-slate-600">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span className="font-medium">{formatDate(event.date)}</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-orange-600" />
                        <span>{event.monastery}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-700 leading-relaxed text-sm">
                      {event.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-slate-800 flex items-center space-x-1">
                        <Star className="w-4 h-4 text-orange-600" />
                        <span>Event Highlights</span>
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {event.highlights.slice(0, 3).map((highlight, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                            {highlight}
                          </Badge>
                        ))}
                        {event.highlights.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                            +{event.highlights.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        onClick={() => navigate(`/events/${event.id}/book`)}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl transition-all duration-200 transform hover:scale-105"
                      >
                        <Calendar className="mr-2 w-4 h-4" />
                        Book Slot
                      </Button>
                      <Button 
                        variant="outline" 
                        className="px-4 border-orange-200 hover:border-orange-300 hover:bg-orange-50 text-orange-700 rounded-xl"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="px-4 border-orange-200 hover:border-orange-300 hover:bg-orange-50 text-orange-700 rounded-xl"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More Button */}
        {filteredEvents.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              className="border-2 border-orange-200 hover:border-orange-300 text-slate-700 hover:bg-orange-50 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Load More Events
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};