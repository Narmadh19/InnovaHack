import React from 'react';
import { Star, MapPin, CheckCircle, Wifi, Compass } from 'lucide-react';

const HotelCard = ({ hotel, onSelect, isSelected }) => {
  return (
    <div 
      className={`glass-card border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full ${
        isSelected 
          ? 'border-cyan-500 bg-cyan-950/20 shadow-lg shadow-cyan-500/10' 
          : 'border-white/5 hover:border-white/20'
      }`}
    >
      {/* Hotel Image & Badge */}
      <div className="relative h-48 w-full overflow-hidden shrink-0">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute top-3 left-3 bg-[#0a0f1d]/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-slate-100">{hotel.rating}</span>
        </div>
        
        {isSelected && (
          <div className="absolute top-3 right-3 bg-cyan-500 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
            Selected Hotel
          </div>
        )}

        <div className="absolute bottom-3 left-3 bg-[#0a0f1d]/60 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-slate-300 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-cyan-400" />
          <span>{hotel.distance}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-base font-bold text-slate-100 mb-2 leading-tight">{hotel.name}</h4>
          
          {/* Amenities tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {hotel.amenities.slice(0, 3).map((amenity, idx) => (
              <span 
                key={idx} 
                className="text-[9px] font-semibold bg-white/5 border border-white/5 text-slate-400 px-2 py-0.5 rounded-full"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-[9px] font-bold text-cyan-400 bg-cyan-500/5 px-2 py-0.5 rounded-full">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          <div>
            <span className="text-[10px] text-slate-400 block tracking-wider uppercase">Avg Price / Night</span>
            <span className="text-xl font-black text-slate-100 font-mono">₹{hotel.price}</span>
          </div>

          <button
            onClick={() => onSelect(hotel)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              isSelected 
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' 
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {isSelected ? 'Selected' : 'Book Hotel'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
