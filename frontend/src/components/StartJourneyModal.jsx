import React, { useState } from 'react';
import { 
  X, ChevronRight, ChevronLeft, CheckCircle, MapPin, Calendar, 
  Users, User, Mail, Phone, Home, Sparkles, Heart, 
  Camera, Music, Sun, Wind, BookOpen, Compass,
  Eye, Smile, Coffee, Mountain, Compass as CompassIcon
} from 'lucide-react';
import { Button } from './ui/button';

const StartJourneyModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    travelerType: '',
    interests: [],
    startDate: '',
    duration: 7,
    budget: 15000,
    fullName: '',
    email: '',
    phone: '',
    city: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const travelerTypes = [
    { id: 'solo', label: 'Solo Traveler', icon: User },
    { id: 'couple', label: 'Couple', icon: Heart },
    { id: 'family', label: 'Family', icon: Home },
    { id: 'group', label: 'Group Tour', icon: Users },
    { id: 'spiritual', label: 'Spiritual Seeker', icon: Sparkles }
  ];

  const interests = [
    { id: 'monastery', label: 'Monastery Tours', icon: BookOpen },
    { id: 'festivals', label: 'Cultural Festivals', icon: Music },
    { id: 'nature', label: 'Nature & Trekking', icon: Mountain },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'wellness', label: 'Meditation & Wellness', icon: Sun },
    { id: 'workshops', label: 'Handicraft Workshops', icon: Coffee }
  ];

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleTypeSelect = (typeId) => {
    setFormData(prev => ({ ...prev, travelerType: typeId }));
    setTimeout(nextStep, 300);
  };

  const handleInterestToggle = (interestId) => {
    setFormData(prev => {
      const current = prev.interests;
      if (current.includes(interestId)) {
        return { ...prev, interests: current.filter(id => id !== interestId) };
      } else {
        return { ...prev, interests: [...current, interestId] };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      onClose();
    }, 5000);
  };

  // Helper for recommendation
  const getRecommendation = () => {
    if (formData.interests.includes('monastery')) return "Rumtek & Pemayangtse Monasteries";
    if (formData.interests.includes('nature')) return "North Sikkim Rural Circuit";
    return "Gangtok Cultural Loop";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center w-full h-full p-4 overflow-hidden">
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-[101] animate-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <CompassIcon className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Start Your Journey</h2>
              <p className="text-orange-50 text-sm opacity-90">Step {step} of 5</p>
            </div>
          </div>
          <div className="w-full bg-white/20 h-1.5 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-white transition-all duration-500 ease-out" style={{ width: `${(step / 5) * 100}%` }} />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl">
                <CheckCircle className="w-14 h-14" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 uppercase tracking-tight">Your spiritual journey begins!</h3>
              <p className="text-slate-600 text-lg max-w-md mx-auto">
                Check your email for your personalized Sikkim itinerary. Our spiritual guides will prepare your path.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Step 1: Traveler Type */}
              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                  <h3 className="text-xl font-bold text-slate-800 text-center">What type of traveler are you?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {travelerTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => handleTypeSelect(type.id)}
                          className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center space-y-3 group ${
                            formData.travelerType === type.id 
                            ? 'border-orange-500 bg-orange-50 shadow-inner' 
                            : 'border-slate-100 hover:border-orange-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`p-4 rounded-full transition-colors ${
                            formData.travelerType === type.id ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-orange-100 group-hover:text-orange-600'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="font-bold text-slate-700 text-sm tracking-wide">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Interests */}
              {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                  <h3 className="text-xl font-bold text-slate-800 text-center">Pick your interests:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {interests.map((interest) => {
                      const Icon = interest.icon;
                      const isActive = formData.interests.includes(interest.id);
                      return (
                        <button
                          key={interest.id}
                          onClick={() => handleInterestToggle(interest.id)}
                          className={`p-5 rounded-2xl border-2 transition-all flex items-center space-x-4 group text-left ${
                            isActive 
                            ? 'border-orange-500 bg-orange-50' 
                            : 'border-slate-100 hover:border-orange-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`p-3 rounded-xl transition-colors ${
                            isActive ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-slate-700 text-sm">{interest.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Plan your trip */}
              {step === 3 && (
                <div className="space-y-8 animate-in slide-in-from-right-8 duration-300">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700 block text-center">When do you want to visit?</label>
                    <input 
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center px-2">
                      <label className="text-sm font-bold text-slate-700">How many days?</label>
                      <span className="text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-lg">{formData.duration} Days</span>
                    </div>
                    <input 
                      type="range"
                      name="duration"
                      min="1"
                      max="30"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center px-2">
                      <label className="text-sm font-bold text-slate-700">Budget per person (₹)</label>
                      <span className="text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-lg">₹ {formData.budget.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range"
                      name="budget"
                      min="1000"
                      max="50000"
                      step="500"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Your details */}
              {step === 4 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">City</label>
                    <input name="city" value={formData.city} onChange={handleChange} placeholder="Traveling from" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none" />
                  </div>
                </div>
              )}

              {/* Step 5: Summary */}
              {step === 5 && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4 shadow-inner">
                    <h4 className="font-black text-slate-900 border-b pb-2 uppercase tracking-tight text-lg">Your Spiritual Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500 font-bold">Preferences</span>
                        <span className="font-bold text-slate-800 capitalize leading-relaxed">{formData.interests.length > 0 ? formData.interests.join(', ') : 'Sikkim Exploration'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500 font-bold">Traveler Type</span>
                        <span className="font-bold text-slate-800 capitalize">{formData.travelerType || 'Tourist'}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t">
                        <span className="text-slate-500 font-bold">Recommended Visit</span>
                        <span className="font-bold text-orange-600">{getRecommendation()}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-slate-500 font-black text-xs uppercase tracking-widest">Estimated cost</span>
                        <span className="text-2xl font-black text-slate-900 leading-none">₹ {formData.budget.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start space-x-3 text-amber-900 italic text-sm">
                    <Compass className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>"The journey of a thousand miles begins with a single step." We are honored to guide your path through the sacred land of Sikkim.</p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center space-x-4 pt-6">
                {(step > 1 && !isSubmitted) && (
                  <Button variant="outline" onClick={prevStep} className="flex-1 py-7 rounded-2xl font-black text-slate-600 uppercase tracking-widest text-xs">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
                
                {step < 5 ? (
                  <Button 
                    onClick={nextStep}
                    disabled={step === 1 && !formData.travelerType}
                    className="flex-[2] py-7 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl font-black shadow-xl shadow-orange-100 uppercase tracking-widest text-xs transition-all transform hover:scale-[1.02] disabled:opacity-50"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    className="flex-[2] py-7 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl font-black shadow-xl shadow-green-100 uppercase tracking-widest text-xs transition-all transform hover:scale-[1.02]"
                  >
                    Start My Journey
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

export default StartJourneyModal;
