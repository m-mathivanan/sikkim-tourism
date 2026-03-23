import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Building, Camera, Map, Calendar, Bot, BookOpen, Sparkles } from 'lucide-react';

const iconMap = {
  building: Building,
  camera: Camera,
  map: Map,
  calendar: Calendar,
  bot: Bot,
  book: BookOpen,
  sparkles: Sparkles
};

export const FeaturesSection = ({ features }) => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-20">
          <Badge className="bg-orange-100 text-orange-600 border-0 px-4 py-1 text-sm rounded-full">Explore Features</Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Discover Sacred Heritage
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Through Technology</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Our platform combines ancient wisdom with modern technology to bring you closer to the spiritual heart of Sikkim.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            return (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 shadow-lg rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="space-y-6 text-center">
                    <div className="w-24 h-24 mx-auto relative group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-amber-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                      <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white shadow-xl ring-4 ring-orange-50/50">
                        <img 
                          src={feature.image || feature.icon_url || `https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=200&h=200&fit=crop`} 
                          alt={feature.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-base">
                        {feature.description}
                      </p>
                    </div>

                    <div className="pt-2">
                       <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                    </div>
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