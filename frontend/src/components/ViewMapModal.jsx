import React, { useState } from 'react';
import { X, MapPin, Compass, Info, Calendar, ArrowRight, Filter, Navigation } from 'lucide-react';
import { Button } from './ui/button';

const ViewMapModal = ({ isOpen, onClose }) => {
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedPin, setSelectedPin] = useState(null);

  if (!isOpen) return null;

  const locations = [
    { id: 1, name: 'Rumtek Monastery', district: 'East', x: 75, y: 70, altitude: '1,500m', time: 'March to May', desc: 'A major Buddhist monastery and the seat of the Kagyud order of Buddhism.' },
    { id: 2, name: 'Pemayangtse Monastery', district: 'West', x: 25, y: 65, altitude: '2,085m', time: 'February to June', desc: 'One of the oldest and most premier monasteries in Sikkim, belonging to the Nyingma order.' },
    { id: 3, name: 'Tashiding Monastery', district: 'West', x: 30, y: 55, altitude: '1,460m', time: 'All Year', desc: 'Known for the sacred Bumchu ceremony and its profound spiritual significance.' },
    { id: 4, name: 'Enchey Monastery', district: 'East', x: 70, y: 55, altitude: '1,883m', time: 'January', desc: 'Located above Gangtok, this 200-year-old monastery is built on a site blessed by Lama Drupthob Karpo.' },
    { id: 5, name: 'Yuksom', district: 'West', x: 20, y: 45, altitude: '1,780m', time: 'October to March', desc: 'The historical first capital of Sikkim, where the first Chogyal was consecrated in 1642.' },
    { id: 6, name: 'Namchi', district: 'South', x: 50, y: 85, altitude: '1,315m', time: 'September to November', desc: 'Famous for the 135ft tall statue of Guru Padmasambhava at Samdruptse hill.' },
    { id: 7, name: 'Lachung', district: 'North', x: 60, y: 20, altitude: '2,700m', time: 'April to June', desc: 'A picturesque mountain village and home to the ancient Lachung Monastery.' }
  ];

  const filteredLocations = selectedDistrict === 'All' 
    ? locations 
    : locations.filter(loc => loc.district === selectedDistrict);

  const districts = ['All', 'North', 'South', 'East', 'West'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center w-full h-full p-4 overflow-hidden">
      <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white w-[95%] max-w-6xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[90vh] z-[101] animate-in zoom-in duration-300 border-4 border-orange-500/20">
        {/* Header/Filters */}
        <div className="p-6 border-b border-orange-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 bg-orange-50/50">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-600 p-2 rounded-xl shadow-lg shadow-orange-200">
              <Compass className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">EXPLORE SIKKIM</h2>
              <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">Interactive Monastery Map</p>
            </div>
          </div>

          <div className="flex bg-white p-1.5 rounded-2xl shadow-inner border border-slate-200">
            {districts.map(d => (
              <button
                key={d}
                onClick={() => { setSelectedDistrict(d); setSelectedPin(null); }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all uppercase tracking-tighter ${
                  selectedDistrict === d 
                  ? 'bg-orange-500 text-white shadow-md transform scale-105' 
                  : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <button onClick={onClose} className="p-2 hover:bg-orange-100 rounded-full transition-colors text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          {/* Left Side: Map */}
          <div className="flex-[1.5] bg-orange-50/20 relative overflow-hidden flex items-center justify-center p-4 md:p-12 group">
            {/* Real Realistic Map Image */}
            <div className="relative w-full h-full max-w-2xl flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.03]">
              <img 
                src="/sikkim-map.png" 
                alt="Sikkim Real Map" 
                className="w-full h-full object-contain drop-shadow-2xl opacity-90 brightness-105"
                onError={(e) => { e.target.onerror = null; e.target.src = '/hero-image.png'; }}
              />
              
              {/* SVG Overlay for Interactive Pins */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                {/* Pins */}
                {filteredLocations.map(loc => (
                  <g 
                    key={loc.id} 
                    className="cursor-pointer group/pin"
                    onClick={(e) => { e.stopPropagation(); setSelectedPin(loc); }}
                  >
                    <circle 
                      cx={loc.x} cy={loc.y} r="3" 
                      className={`transition-all duration-300 ${selectedPin?.id === loc.id ? 'fill-white scale-150 stroke-orange-600 stroke-2' : 'fill-orange-600 group-hover/pin:fill-white group-hover/pin:scale-125'} drop-shadow-xl`}
                    />
                    <circle 
                      cx={loc.x} cy={loc.y} r="8" 
                      className={`animate-ping opacity-30 fill-orange-500 scale-150 ${selectedPin?.id === loc.id ? 'block' : 'hidden group-hover/pin:block'}`}
                    />
                    {/* Tiny Pulsing Ring */}
                    <circle 
                      cx={loc.x} cy={loc.y} r="1.5" 
                      className="fill-white animate-pulse"
                    />
                  </g>
                ))}
              </svg>
            </div>

            {/* Compass Overlay */}
            <div className="absolute bottom-8 right-8 flex flex-col items-center space-y-1 opacity-40">
              <div className="w-10 h-10 border-2 border-slate-400 rounded-full flex items-center justify-center">
                <Navigation className="w-6 h-6 text-slate-500" />
              </div>
              <span className="text-[10px] font-black text-slate-400">NORTH</span>
            </div>
          </div>

          {/* Right Side: Info Panel */}
          <div className="flex-1 bg-white border-l border-orange-50 flex flex-col shadow-2xl relative z-10">
            {selectedPin ? (
              <div className="p-8 space-y-8 animate-in slide-in-from-right-12 duration-500 flex flex-col h-full">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-orange-100 px-3 py-1 rounded-full text-[10px] font-black text-orange-700 uppercase tracking-tighter">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedPin.district} Sikkim</span>
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{selectedPin.name}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{selectedPin.desc}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 transition-colors hover:bg-white hover:shadow-md group">
                    <div className="flex items-center space-x-2 text-slate-400 mb-1">
                      <Compass className="w-4 h-4 group-hover:text-orange-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-inherit">Altitude</span>
                    </div>
                    <div className="text-lg font-black text-slate-800">{selectedPin.altitude}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 transition-colors hover:bg-white hover:shadow-md group">
                    <div className="flex items-center space-x-2 text-slate-400 mb-1">
                      <Calendar className="w-4 h-4 group-hover:text-orange-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-inherit">Best Time</span>
                    </div>
                    <div className="text-sm font-black text-slate-800">{selectedPin.time}</div>
                  </div>
                </div>

                <div className="flex-1" />

                <div className="space-y-4">
                  <Button className="w-full py-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-[2rem] font-black shadow-xl shadow-orange-100 uppercase tracking-widest text-xs group">
                    Plan Visit Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                  <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Seats currently available for next ceremony
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
                <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center border-2 border-dashed border-orange-200">
                  <Info className="w-10 h-10 text-orange-300" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">DISCOVER SACRED SITES</h3>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto font-medium">
                    Click on the highlighted monastery pins to view history, altitude, and visiting guides.
                  </p>
                </div>
                {/* Micro detail */}
                <div className="grid grid-cols-2 gap-2 w-full pt-8">
                  {locations.slice(0, 4).map(l => (
                    <div key={l.id} className="text-[9px] font-bold text-slate-400 border border-slate-100 p-2 rounded-xl flex items-center space-x-1">
                      <div className="w-1 h-1 bg-orange-400 rounded-full" />
                      <span className="truncate">{l.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMapModal;
