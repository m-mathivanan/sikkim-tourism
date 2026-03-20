import React from 'react';
import { Card, CardContent } from './ui/card';
import { Building, Camera, Map, Calendar, Bot, BookOpen } from 'lucide-react';

const iconMap = {
  building: Building,
  camera: Camera,
  map: Map,
  calendar: Calendar,
  bot: Bot,
  book: BookOpen
};

export const FeaturesSection = ({ features }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Discover Sacred Heritage
            <span className="block text-orange-600">Through Technology</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Our platform combines ancient wisdom with modern technology to bring you closer to the spiritual heart of Sikkim's monasteries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-slate-100 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};