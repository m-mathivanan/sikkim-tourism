import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Globe, Menu, X, MapPin, Calendar, Camera } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">Sikkim Monasteries</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-4">
            <a href="#monasteries" className="text-slate-600 hover:text-orange-600 transition-colors duration-200 text-sm">
              Monasteries
            </a>
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
            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105 text-sm">
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
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-full transition-all duration-200 w-full mt-4">
                Plan Your Visit
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};