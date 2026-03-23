import React, { useState } from 'react';
import { X, CheckCircle, IndianRupee, Users, Calendar, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

const BookingModal = ({ isOpen, onClose, planTitle, planPrice }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    travelers: 1,
    startDate: '',
    endDate: '',
    specialRequirements: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        travelers: 1,
        startDate: '',
        endDate: '',
        specialRequirements: ''
      });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 opacity-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Join Travel Plan</h2>
            <p className="text-orange-50 opacity-90 font-medium">{planTitle}</p>
          </div>

          <div className="mt-4 flex items-center space-x-4 text-sm font-medium">
            <div className="flex items-center">
              <IndianRupee className="w-4 h-4 mr-1" />
              <span>{planPrice}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Booking Confirmed!</h3>
              <p className="text-slate-600 max-w-xs">
                We will contact you soon with more details about your journey to {planTitle}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Full Name */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center">
                    <User className="w-4 h-4 mr-2 text-orange-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-orange-500" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-orange-500" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Number of Travelers */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-orange-500" />
                      Travelers
                    </label>
                    <input
                      type="number"
                      name="travelers"
                      min="1"
                      max="20"
                      required
                      value={formData.travelers}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  {/* Dummy placeholder for spacing on larger screens */}
                  <div className="hidden sm:block"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      required
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  {/* End Date */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      required
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-orange-500" />
                    Special Requirements
                  </label>
                  <textarea
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    placeholder="Any diet preferences or assistance needed?"
                    rows="3"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none resize-none"
                  />
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-200 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Confirm Booking
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
