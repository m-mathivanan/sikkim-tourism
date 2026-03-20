import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

export const EventsSection = ({ events }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Upcoming 
            <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Festivals & Events
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Join us in celebrating the rich Buddhist traditions through sacred ceremonies and vibrant festivals throughout the year.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors duration-200">
                        {event.name}
                      </h3>
                      <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.monastery}</span>
                    </div>

                    <p className="text-slate-700 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-slate-800 flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Event Highlights</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {event.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl transition-all duration-200 transform hover:scale-105">
                      Learn More & Book
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Events Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="border-2 border-orange-200 hover:border-orange-300 text-slate-700 hover:bg-orange-50 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
          >
            View All Events & Festivals
          </Button>
        </div>
      </div>
    </section>
  );
};