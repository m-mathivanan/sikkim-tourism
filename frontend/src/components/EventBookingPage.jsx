import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, Users, ArrowLeft, 
  CheckCircle, Play, Info, Star, Ticket,
  Video, Image as ImageIcon, Sparkles
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const EventBookingPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, booking, success
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    tickets_count: 1
  });

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`${API}/events/${eventId}`);
      if (response.data.success) {
        setEvent(response.data.data.event);
      } else {
        setError('Event not found');
      }
    } catch (err) {
      console.error('Error fetching event details:', err);
      setError('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus('booking');
    try {
      const response = await axios.post(`${API}/events/${eventId}/book`, formData);
      if (response.data.success) {
        setBookingStatus('success');
      } else {
        alert('Booking failed: ' + response.data.message);
        setBookingStatus('idle');
      }
    } catch (err) {
      console.error('Error booking event:', err);
      alert('Booking failed. Please try again.');
      setBookingStatus('idle');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
  );

  if (error || !event) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <Info className="w-16 h-16 text-slate-400 mb-4" />
      <h2 className="text-2xl font-bold text-slate-900 mb-2">{error || 'Event Not Found'}</h2>
      <Button onClick={() => navigate('/events')} variant="ghost">Back to Events</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Header with Media */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-slate-900">
        {event.video_url ? (
          <iframe 
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
            src={`${event.video_url}?autoplay=1&mute=1&controls=0&loop=1&playlist=${event.video_url.split('/').pop()}`}
            title={event.name}
            allow="autoplay; encrypted-media"
          ></iframe>
        ) : (
          <img 
            src={event.images?.[0] || "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1600&h=800&fit=crop"} 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            alt={event.name}
            onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="absolute top-6 left-6 z-20">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/events')}
            className="text-white hover:bg-white/20 rounded-full backdrop-blur-md"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back to Events
          </Button>
        </div>

        <div className="absolute bottom-12 left-0 right-0 px-6 max-w-7xl mx-auto z-10">
          <div className="space-y-4 max-w-3xl">
            <Badge className="bg-orange-500 text-white border-0 px-3 py-1 text-sm">
              {event.type}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              {event.name}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl">
              {event.description}
            </p>
            <div className="flex flex-wrap gap-6 text-white/90 pt-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-orange-400" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-orange-400" />
                <span>{event.monastery}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-400" />
                <span>{event.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                    <Sparkles className="w-6 h-6 mr-2 text-orange-500" />
                    Festival Highlights
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {event.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start p-4 bg-orange-50 rounded-2xl border border-orange-100 transition-all hover:shadow-md">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 space-y-6">
                  <h3 className="text-xl font-bold text-slate-900">About the Celebration</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Witness the spiritual grandeur of {event.name} at the sacred {event.monastery}. 
                    This festival brings together monks and devotees from across the region to participate 
                    in ancient rituals that have been preserved for centuries.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="rounded-2xl overflow-hidden h-48 group cursor-pointer">
                      <img 
                        src={event.images?.[0] || "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop"} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        alt="Festival 1" 
                        onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden h-48 group cursor-pointer">
                      <img 
                        src={event.images?.[1] || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop"} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        alt="Festival 2" 
                        onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Practical Info */}
            <div className="grid md:grid-cols-2 gap-6 text-slate-700">
              <Card className="border-0 shadow-lg bg-orange-600 text-white rounded-3xl p-6">
                <h4 className="font-bold text-lg mb-2 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Travel Tip
                </h4>
                <p className="text-white/90">
                  Arrive at least 2 hours early to secure a good viewing spot for the Cham dances. 
                  Photography is generally allowed except inside the inner sanctum.
                </p>
              </Card>
              <Card className="border-0 shadow-lg bg-slate-900 text-white rounded-3xl p-6">
                <h4 className="font-bold text-lg mb-2 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  How to reach
                </h4>
                <p className="text-white/90">
                  {event.monastery} is accessible by local taxi from Gangtok. 
                  During the festival, shared transport is readily available.
                </p>
              </Card>
            </div>
          </div>

          {/* Booking Side Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {bookingStatus === 'success' ? (
                <Card className="border-0 shadow-2xl rounded-3xl bg-green-50 p-8 text-center animate-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
                  <p className="text-slate-600 mb-8">
                    Your spot for {event.name} has been reserved. A confirmation email has been sent to {formData.user_email}.
                  </p>
                  <Button 
                    onClick={() => navigate('/events')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white p-6 rounded-2xl h-auto text-lg font-bold"
                  >
                    Back to Events
                  </Button>
                </Card>
              ) : (
                <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white text-center">
                    <h3 className="text-2xl font-bold">Secure Your Spot</h3>
                    <p className="text-white/80">Book tickets for this sacred event</p>
                  </div>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 uppercase">Full Name</label>
                        <input 
                          required
                          name="user_name"
                          value={formData.user_name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 uppercase">Email Address</label>
                        <input 
                          required
                          type="email"
                          name="user_email"
                          value={formData.user_email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 uppercase">Phone Number</label>
                        <input 
                          required
                          name="user_phone"
                          value={formData.user_phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                          placeholder="+91 XXXX XXX XXX"
                        />
                      </div>
                      <div className="space-y-2 pb-2">
                        <label className="text-sm font-bold text-slate-700 uppercase">Number of Tickets</label>
                        <div className="flex items-center space-x-4">
                          <Button 
                            type="button"
                            variant="outline" 
                            size="icon"
                            onClick={() => setFormData(p => ({...p, tickets_count: Math.max(1, p.tickets_count - 1)}))}
                            className="w-12 h-12 rounded-xl text-xl"
                          >
                            -
                          </Button>
                          <span className="text-2xl font-bold w-8 text-center">{formData.tickets_count}</span>
                          <Button 
                            type="button"
                            variant="outline" 
                            size="icon"
                            onClick={() => setFormData(p => ({...p, tickets_count: Math.min(10, p.tickets_count + 1)}))}
                            className="w-12 h-12 rounded-xl text-xl"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <Button 
                        disabled={bookingStatus === 'booking'}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white p-6 rounded-2xl h-auto text-lg font-bold shadow-xl shadow-slate-900/20 transition-all hover:scale-[1.02]"
                      >
                        {bookingStatus === 'booking' ? 'Processing...' : 'Complete Booking'}
                        <Ticket className="ml-2 w-5 h-5" />
                      </Button>
                      <p className="text-center text-slate-400 text-xs mt-4">
                        Free entry for children under 5 years
                      </p>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
