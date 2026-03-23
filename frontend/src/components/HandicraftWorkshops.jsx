import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  ArrowLeft, Users, Clock, MapPin, Star, Calendar, 
  Phone, Mail, Heart, Share2, CheckCircle, AlertCircle
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const HandicraftWorkshops = () => {
  const navigate = useNavigate();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingModal, setBookingModal] = useState({ isOpen: false, workshop: null });
  const [bookingForm, setBookingForm] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    date: '',
    time_slot: '',
    number_of_people: 1,
    special_requirements: ''
  });

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/workshops`);
      
      if (response.data.success) {
        setWorkshops(response.data.data.workshops);
      } else {
        setError('Failed to load workshops');
      }
    } catch (err) {
      console.error('Error fetching workshops:', err);
      setError('Failed to load workshops');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/workshops/${bookingModal.workshop.id}/book`, bookingForm);
      
      if (response.data.success) {
        alert('Workshop booking successful! We will contact you with confirmation details.');
        setBookingModal({ isOpen: false, workshop: null });
        setBookingForm({
          user_name: '',
          user_email: '',
          user_phone: '',
          date: '',
          time_slot: '',
          number_of_people: 1,
          special_requirements: ''
        });
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    }
  };

  const getCraftTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'weaving': return 'bg-blue-100 text-blue-700';
      case 'pottery': return 'bg-amber-100 text-amber-700';
      case 'carving': return 'bg-green-100 text-green-700';
      case 'painting': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <Users className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-600">Loading handicraft workshops...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="hover:bg-amber-50 text-slate-700 rounded-full"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-slate-900">
              Traditional Handicraft
              <span className="block bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Workshops
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Learn traditional Sikkim handicrafts from master artisans. Create your own authentic pieces while preserving ancient cultural techniques.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchWorkshops} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full">
              Try Again
            </Button>
          </div>
        )}

        {/* Workshops Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {workshops.map((workshop) => (
            <Card key={workshop.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border border-amber-100 rounded-3xl overflow-hidden">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={['/hero-image.png', '/monastery_1.png', '/monastery_2.png', '/monastery_3.png'][workshop.title.length % 4]} 
                  alt={workshop.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Craft Type Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={`${getCraftTypeColor(workshop.craft_type)} border-0 font-semibold`}>
                    {workshop.craft_type}
                  </Badge>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-bold text-amber-600">{workshop.price_per_person}</span>
                </div>

                {/* Workshop Title Overlay */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold group-hover:scale-105 transition-transform duration-200">
                    {workshop.title}
                  </h3>
                </div>
              </div>

              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Instructor Info */}
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Master Instructor</h4>
                      <p className="text-slate-600">{workshop.instructor_name}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{workshop.instructor_contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{workshop.instructor_contact.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-700 leading-relaxed">
                    {workshop.description}
                  </p>

                  {/* Workshop Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>{workshop.duration_hours} hours</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Users className="w-4 h-4 text-amber-600" />
                      <span>Max {workshop.max_participants} people</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>{workshop.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Star className="w-4 h-4 text-amber-600" />
                      <span>All levels welcome</span>
                    </div>
                  </div>

                  {/* Materials Included */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      What's Included
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {workshop.materials_included.map((material, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-700">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Available Dates */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-amber-600" />
                      Available Dates
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {workshop.available_dates.slice(0, 3).map((dateStr, index) => {
                        const date = new Date(dateStr);
                        return (
                          <Badge key={index} className="bg-amber-100 text-amber-700 border-0">
                            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </Badge>
                        );
                      })}
                      {workshop.available_dates.length > 3 && (
                        <Badge className="bg-slate-100 text-slate-700 border-0">
                          +{workshop.available_dates.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={() => setBookingModal({ isOpen: true, workshop })}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <Calendar className="mr-2 w-4 h-4" />
                      Book Workshop
                    </Button>
                    <Button 
                      variant="outline" 
                      className="px-4 border-amber-200 hover:border-amber-300 hover:bg-amber-50 text-amber-700 rounded-xl"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="px-4 border-amber-200 hover:border-amber-300 hover:bg-amber-50 text-amber-700 rounded-xl"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Modal */}
        {bookingModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Book Workshop</h3>
                <Button 
                  variant="ghost" 
                  onClick={() => setBookingModal({ isOpen: false, workshop: null })}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ✕
                </Button>
              </div>

              <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <h4 className="font-semibold text-amber-800">{bookingModal.workshop?.title}</h4>
                <p className="text-amber-700 text-sm">with {bookingModal.workshop?.instructor_name}</p>
                <p className="text-amber-600 font-medium mt-1">{bookingModal.workshop?.price_per_person}</p>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.user_name}
                    onChange={(e) => setBookingForm({...bookingForm, user_name: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={bookingForm.user_email}
                    onChange={(e) => setBookingForm({...bookingForm, user_email: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={bookingForm.user_phone}
                    onChange={(e) => setBookingForm({...bookingForm, user_phone: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Date</label>
                    <select
                      required
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Select Date</option>
                      {bookingModal.workshop?.available_dates.map((dateStr, index) => (
                        <option key={index} value={dateStr}>
                          {new Date(dateStr).toLocaleDateString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Participants</label>
                    <input
                      type="number"
                      min="1"
                      max={bookingModal.workshop?.max_participants}
                      required
                      value={bookingForm.number_of_people}
                      onChange={(e) => setBookingForm({...bookingForm, number_of_people: parseInt(e.target.value)})}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Special Requirements (Optional)</label>
                  <textarea
                    value={bookingForm.special_requirements}
                    onChange={(e) => setBookingForm({...bookingForm, special_requirements: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    rows="3"
                    placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-xl font-semibold"
                >
                  Confirm Booking
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};