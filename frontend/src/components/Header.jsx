import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Globe, Menu, X, MapPin, Calendar, Camera } from 'lucide-react';
import PlanVisitModal from './PlanVisitModal';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border-2 border-white ring-2 ring-orange-100 flex-shrink-0">
                 <img 
                   src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=80&h=80&fit=crop" 
                   className="w-full h-full object-cover" 
                   onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
                   alt="Logo" 
                 />
              </div>
              <span className="text-xl font-bold text-slate-800 tracking-tight">Sikkim Monasteries</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-4">
              <a href="#monasteries" className="text-slate-600 hover:text-orange-600 transition-colors duration-200 text-sm font-medium">
                Monasteries
              </a>
              <button 
                onClick={() => navigate('/map')}
                className="text-slate-600 hover:text-orange-600 transition-colors duration-200 text-sm flex items-center font-medium bg-orange-50 px-3 py-1.5 rounded-full"
              >
                <img 
                  src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=40&h=40&fit=crop" 
                  className="w-5 h-5 mr-2 rounded-full border border-white shadow-sm" 
                  onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
                  alt="360" 
                />
                360 Map
              </button>
              <button 
                onClick={() => navigate('/events')}
                className="text-slate-600 hover:text-orange-600 transition-colors duration-200 text-sm"
              >
                Events
              </button>
              <button 
                onClick={() => navigate('/rural-places')}
                className="text-slate-600 hover:text-orange-600 transition-colors duration-200 text-sm"
              >
                Rural Places
              </button>
              <button 
                onClick={() => navigate('/cultural-library')}
                className="text-slate-600 hover:text-orange-600 transition-colors duration-200 text-sm"
              >
                Culture
              </button>
              <button 
                onClick={() => navigate('/workshops')}
                className="text-slate-600 hover:text-orange-600 transition-colors duration-200 text-sm"
              >
                Workshops
              </button>
              <button 
                onClick={() => navigate('/travel-planning')}
                className="text-slate-600 hover:text-orange-600 transition-colors duration-200 text-sm"
              >
                Travel
              </button>
              <button 
                onClick={() => navigate('/games')}
                className="text-slate-600 hover:text-orange-600 transition-colors duration-200 text-sm"
              >
                Games
              </button>
              <Button 
                onClick={() => setIsPlanModalOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105 text-sm"
              >
                Plan Visit
              </Button>
            </nav>

            {/* Medium Screen Navigation */}
            <nav className="hidden lg:flex xl:hidden items-center space-x-2">
              <button onClick={() => navigate('/events')} className="text-slate-600 hover:text-orange-600 transition-colors duration-200 text-sm">Events</button>
              <button onClick={() => navigate('/cultural-library')} className="text-slate-600 hover:text-orange-600 transition-colors duration-200 text-sm">Culture</button>
              <button onClick={() => navigate('/travel-planning')} className="text-slate-600 hover:text-orange-600 transition-colors duration-200 text-sm">Travel</button>
              <button onClick={() => navigate('/games')} className="text-slate-600 hover:text-orange-600 transition-colors duration-200 text-sm">Games</button>
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-3 py-2 rounded-full transition-all duration-200 text-sm">
                Explore
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="xl:hidden py-4 border-t border-slate-100 mt-2">
              <nav className="flex flex-col space-y-3">
                <a href="#monasteries" className="text-slate-600 hover:text-orange-600 transition-colors duration-200 py-2">
                  Monasteries
                </a>
                <button onClick={() => navigate('/map')} className="text-slate-600 hover:text-orange-600 transition-colors duration-200 py-2 text-left flex items-center">
                  <Camera className="w-4 h-4 mr-2 text-orange-500" />
                  360 Exploration Map
                </button>
                <button onClick={() => navigate('/events')} className="text-slate-600 hover:text-orange-600 transition-colors duration-200 py-2 text-left">
                  Events & Festivals
                </button>
                <button onClick={() => navigate('/rural-places')} className="text-slate-600 hover:text-orange-600 transition-colors duration-200 py-2 text-left">
                  Rural Places
                </button>
                <button onClick={() => navigate('/cultural-library')} className="text-slate-600 hover:text-orange-600 transition-colors duration-200 py-2 text-left">
                  Cultural Library
                </button>
                <button onClick={() => navigate('/workshops')} className="text-slate-600 hover:text-orange-600 transition-colors duration-200 py-2 text-left">
                  Handicraft Workshops
                </button>
                <button onClick={() => navigate('/travel-planning')} className="text-slate-600 hover:text-orange-600 transition-colors duration-200 py-2 text-left">
                  Travel Planning
                </button>
                <button onClick={() => navigate('/games')} className="text-slate-600 hover:text-orange-600 transition-colors duration-200 py-2 text-left">
                  Interactive Games
                </button>
                <Button 
                  onClick={() => {
                    setIsPlanModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-full transition-all duration-200 w-full mt-4"
                >
                  Plan Your Visit
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <PlanVisitModal 
        isOpen={isPlanModalOpen} 
        onClose={() => setIsPlanModalOpen(false)} 
      />
    </>
  );
};