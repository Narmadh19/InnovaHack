import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import FlightCard from '../components/FlightCard';
import { Plane, ArrowRight, ArrowUpDown, Filter, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Flights = () => {
  const { flights, selectedFlight, setSelectedFlight, sessionId } = useTravel();
  const [filterStops, setFilterStops] = useState('all');
  const [sortBy, setSortBy] = useState('price-asc');
  const navigate = useNavigate();

  if (!sessionId) {
    return (
      <div className="glass-card border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4 py-20">
        <Lock className="w-12 h-12 text-slate-600 opacity-60" />
        <h3 className="text-lg font-bold text-slate-200">Flight Swarm Locked</h3>
        <p className="text-xs text-slate-400 max-w-sm">
          Please initialize the agent swarm on the homepage first to search flights.
        </p>
        <Link to="/" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wide">
          Unlock Swarm
        </Link>
      </div>
    );
  }

  // Filter flights
  const filteredFlights = flights.filter(f => {
    if (filterStops === 'nonstop') return f.stops === 0;
    if (filterStops === 'stops') return f.stops > 0;
    return true;
  });

  // Sort flights
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'duration') {
      const getMin = (d) => {
        const parts = d.split(' ');
        const h = parseInt(parts[0]) || 0;
        const m = parseInt(parts[1]) || 0;
        return h * 60 + m;
      };
      return getMin(a.duration) - getMin(b.duration);
    }
    return 0;
  });

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-100 flex items-center gap-2">
            <Plane className="w-6 h-6 text-cyan-400" />
            Flight Analysis Swarm
          </h2>
          <p className="text-xs text-slate-400">Comparing airline values, layover details, and duration times</p>
        </div>

        {selectedFlight && (
          <button 
            onClick={() => navigate('/hotels')}
            className="glow-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center gap-2 self-start"
          >
            <span>Proceed to Hotels</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        )}
      </div>

      {/* Filters block */}
      <div className="glass-card border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Stops */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <Filter className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">Stops:</span>
          <div className="flex bg-slate-900/60 p-1 rounded-xl border border-white/5 w-full sm:w-auto">
            {['all', 'nonstop', 'stops'].map((stopsType) => (
              <button
                key={stopsType}
                onClick={() => setFilterStops(stopsType)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                  filterStops === stopsType 
                    ? 'bg-cyan-500 text-slate-950 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {stopsType}
              </button>
            ))}
          </div>
        </div>

        {/* Sorts */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <ArrowUpDown className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-white/10 text-slate-300 text-xs rounded-xl px-3 py-2 outline-none focus:border-cyan-500 w-full sm:w-auto"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      </div>

      {/* Flights List */}
      <div className="flex flex-col gap-4">
        {sortedFlights.map((flight) => (
          <FlightCard 
            key={flight.id} 
            flight={flight} 
            isSelected={selectedFlight?.id === flight.id}
            onSelect={setSelectedFlight}
          />
        ))}
        {sortedFlights.length === 0 && (
          <div className="glass-card border border-white/5 rounded-2xl p-10 text-center text-xs text-slate-400">
            No flight options match your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Flights;
