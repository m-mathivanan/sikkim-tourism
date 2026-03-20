import React from 'react';
import { Button } from './ui/button';
import { Globe, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 py-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Sikkim Monasteries</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Discover the sacred heritage of Sikkim's monasteries through our digital platform. Preserving ancient wisdom for future generations.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="hover:bg-slate-800 p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-slate-800 p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-slate-800 p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-slate-800 p-2">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Explore</h3>
            <div className="space-y-2">
              <a href="#monasteries" className="block text-slate-400 hover:text-white transition-colors duration-200">All Monasteries</a>
              <a href="#virtual-tours" className="block text-slate-400 hover:text-white transition-colors duration-200">Virtual Tours</a>
              <a href="#events" className="block text-slate-400 hover:text-white transition-colors duration-200">Events & Festivals</a>
              <a href="#map" className="block text-slate-400 hover:text-white transition-colors duration-200">Interactive Map</a>
              <a href="#about" className="block text-slate-400 hover:text-white transition-colors duration-200">About Sikkim</a>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <div className="space-y-2">
              <a href="#ai-guide" className="block text-slate-400 hover:text-white transition-colors duration-200">AI Guide</a>
              <a href="#booking" className="block text-slate-400 hover:text-white transition-colors duration-200">Event Booking</a>
              <a href="#gallery" className="block text-slate-400 hover:text-white transition-colors duration-200">Photo Gallery</a>
              <a href="#cultural-heritage" className="block text-slate-400 hover:text-white transition-colors duration-200">Cultural Heritage</a>
              <a href="#travel-guide" className="block text-slate-400 hover:text-white transition-colors duration-200">Travel Guide</a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-slate-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">Gangtok, Sikkim, India</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">info@sikkimmonasteries.com</span>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="font-medium mb-2">Visit Sikkim</h4>
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg transition-all duration-200 w-full">
                Plan Your Journey
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2024 Sikkim Monasteries Digital Heritage Project. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-slate-400">
              <a href="#privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#accessibility" className="hover:text-white transition-colors duration-200">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};