import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import HotelCard from '../components/HotelCard';
import { Hotel, ArrowRight, ArrowUpDown, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Hotels = () => {
  const { hotels, selectedHotel, setSelectedHotel, sessionId } = useTravel();
  const [sortBy, setSortBy] = useState('rating');
  const navigate = useNavigate();

  if (!sessionId) {
    return (
      <div className="glass-card border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4 py-20">
        <Lock className="w-12 h-12 text-slate-600 opacity-60" />
        <h3 className="text-lg font-bold text-slate-200">Hotel Swarm Locked</h3>
        <p className="text-xs text-slate-400 max-w-sm">
          Please initialize the agent swarm on the homepage first to search hotels.
        </p>
        <Link to="/" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wide">
          Unlock Swarm
        </Link>
      </div>
    );
  }

  const sortedHotels = [...hotels].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-100 flex items-center gap-2">
            <Hotel className="w-6 h-6 text-cyan-400" />
            Hotel Analysis Swarm
          </h2>
          <p className="text-xs text-slate-400">Filtering accommodation choices by walkability index, safety, and price</p>
        </div>

        {selectedHotel && (
          <button 
            onClick={() => navigate('/weather')}
            className="glow-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center gap-2 self-start"
          >
            <span>Check Weather Forecast</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        )}
      </div>

      {/* Sorting panel */}
      <div className="glass-card border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort Accommodations:</span>
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-slate-900 border border-white/10 text-slate-300 text-xs rounded-xl px-3 py-2 outline-none focus:border-cyan-500 w-full sm:w-auto"
        >
          <option value="rating">Top Rated (Default)</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedHotels.map((hotel) => (
          <div key={hotel.id} className="h-full">
            <HotelCard 
              hotel={hotel} 
              isSelected={selectedHotel?.id === hotel.id}
              onSelect={setSelectedHotel}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
