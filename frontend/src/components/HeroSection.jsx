import React from 'react';
import { Button } from './ui/button';
import { MapPin, Calendar, Globe, ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-slate-50 to-orange-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-100">
                <Globe className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-slate-700">Discover Sacred Heritage</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
                Explore the Sacred
                <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Monasteries of Sikkim
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                Embark on a spiritual journey through centuries-old monasteries nestled in the breathtaking Himalayan landscapes. Experience rich Buddhist culture, ancient wisdom, and architectural marvels.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">200+</div>
                <div className="text-sm text-slate-600">Monasteries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">1000+</div>
                <div className="text-sm text-slate-600">Years of History</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">50K+</div>
                <div className="text-sm text-slate-600">Visitors Annually</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-orange-200 hover:border-orange-300 text-slate-700 hover:bg-orange-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 group"
              >
                <MapPin className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                View Map
              </Button>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="relative">
            <div className="relative w-full h-96 bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-slate-600">
                  <div className="w-20 h-20 bg-white/90 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Globe className="w-10 h-10 text-orange-600" />
                  </div>
                  <p className="text-lg font-medium">Sacred Monastery View</p>
                  <p className="text-sm opacity-75">Image placeholder</p>
                </div>
              </div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">Next Festival</div>
                  <div className="text-xs text-slate-600">Losar - Feb 15</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">Featured Location</div>
                  <div className="text-xs text-slate-600">Rumtek Monastery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};