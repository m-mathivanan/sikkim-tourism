import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle, MapPin, Calendar, Users, User, Mail, Phone, Home, Bus, Car, Train, Plane, Hotel, IndianRupee, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const PlanVisitModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    monastery: 'Rumtek',
    visitDate: '',
    visitorCount: 1,
    fullName: '',
    email: '',
    phone: '',
    originCity: '',
    transportation: 'Bus',
    accommodationNeeded: false,
    budgetRange: 'Under 5000',
    specialRequirements: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      onClose();
    }, 4000);
  };

  const ProgressBanner = () => (
    <div className="w-full bg-slate-100 h-2 mt-4 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500 ease-out"
        style={{ width: `${(step / 4) * 100}%` }}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center w-full h-full p-4 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity w-full h-full"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-[101] animate-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Plan Your Visit</h2>
              <p className="text-orange-50 text-sm opacity-90">Step {step} of 4: {
                step === 1 ? 'Choose Destination' : 
                step === 2 ? 'Personal Details' : 
                step === 3 ? 'Trip Preferences' : 'Confirmation'
              }</p>
            </div>
          </div>
          <ProgressBanner />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">Your visit is planned!</h3>
              <p className="text-slate-600 text-lg max-w-md mx-auto">
                Our team will contact you within 24 hours to finalize your journey to Sikkim.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Step 1: Choose Destination */}
              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                        Select Monastery
                      </label>
                      <select 
                        name="monastery"
                        value={formData.monastery}
                        onChange={handleChange}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      >
                        <option>Rumtek</option>
                        <option>Pemayangtse</option>
                        <option>Tashiding</option>
                        <option>Enchey</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                        Preferred Visit Date
                      </label>
                      <input 
                        type="date"
                        name="visitDate"
                        required
                        value={formData.visitDate}
                        onChange={handleChange}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-orange-500" />
                      Number of Visitors
                    </label>
                    <div className="flex items-center space-x-4">
                      <input 
                        type="range"
                        name="visitorCount"
                        min="1"
                        max="20"
                        value={formData.visitorCount}
                        onChange={handleChange}
                        className="flex-1 accent-orange-500"
                      />
                      <span className="w-12 h-12 bg-orange-100 text-orange-700 rounded-xl flex items-center justify-center font-bold">
                        {formData.visitorCount}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Details */}
              {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center">
                      <User className="w-4 h-4 mr-2 text-orange-500" />
                      Full Name
                    </label>
                    <input 
                      type="text"
                      name="fullName"
                      required
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-orange-500" />
                        Email Address
                      </label>
                      <input 
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-orange-500" />
                        Phone Number
                      </label>
                      <input 
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center">
                      <Home className="w-4 h-4 mr-2 text-orange-500" />
                      Traveling From (City/State)
                    </label>
                    <input 
                      type="text"
                      name="originCity"
                      required
                      placeholder="e.g. Mumbai, Maharashtra"
                      value={formData.originCity}
                      onChange={handleChange}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Trip Preferences */}
              {step === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center">
                        <Bus className="w-4 h-4 mr-2 text-orange-500" />
                        Transportation Mode
                      </label>
                      <select 
                        name="transportation"
                        value={formData.transportation}
                        onChange={handleChange}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      >
                        <option>Bus</option>
                        <option>Car</option>
                        <option>Train</option>
                        <option>Flight</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center">
                        <IndianRupee className="w-4 h-4 mr-2 text-orange-500" />
                        Budget Range
                      </label>
                      <select 
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      >
                        <option>Under 5000</option>
                        <option>5000-10000</option>
                        <option>10000-20000</option>
                        <option>Above 20000</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border border-orange-100">
                    <div className="flex items-center space-x-3">
                      <Hotel className="w-6 h-6 text-orange-600" />
                      <div>
                        <h4 className="font-bold text-slate-800">Accommodation Needed?</h4>
                        <p className="text-xs text-slate-500">We can help you find local homestays</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="accommodationNeeded"
                        checked={formData.accommodationNeeded}
                        onChange={handleChange}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2 text-orange-500" />
                      Special Requirements
                    </label>
                    <textarea 
                      name="specialRequirements"
                      placeholder="Any specific requests or assistance needed during the monastic visit?"
                      rows="3"
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                    <h4 className="font-bold text-slate-900 border-b pb-2">Summary of Your Plan</h4>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-slate-500 uppercase text-[10px] font-bold tracking-wider">Destination</p>
                        <p className="font-bold text-slate-800">{formData.monastery} Monastery</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-500 uppercase text-[10px] font-bold tracking-wider">Visit Date</p>
                        <p className="font-bold text-slate-800">{formData.visitDate || 'Not selected'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-500 uppercase text-[10px] font-bold tracking-wider">Travelers</p>
                        <p className="font-bold text-slate-800">{formData.visitorCount} Person(s)</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-500 uppercase text-[10px] font-bold tracking-wider">Transport</p>
                        <p className="font-bold text-slate-800">By {formData.transportation}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-500 uppercase text-[10px] font-bold tracking-wider">Contact</p>
                        <p className="font-bold text-slate-800 truncate">{formData.email}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-500 uppercase text-[10px] font-bold tracking-wider">Stay Needed</p>
                        <p className="font-bold text-slate-800">{formData.accommodationNeeded ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-800 text-sm italic">
                    <Sparkles className="w-5 h-5 flex-shrink-0" />
                    <p>Double check your details before confirming. We look forward to hosting you in Sikkim!</p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center space-x-4 pt-6">
                {step > 1 && (
                  <Button 
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1 py-6 rounded-2xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                )}
                
                {step < 4 ? (
                  <Button 
                    onClick={nextStep}
                    className="flex-[2] py-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-100 transition-all transform hover:scale-[1.02]"
                  >
                    Next Step
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    className="flex-[2] py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-green-100 transition-all transform hover:scale-[1.02]"
                  >
                    Confirm Booking
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanVisitModal;
