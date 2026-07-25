import React from 'react';
import { useTravel } from '../context/TravelContext';
import ItineraryTimeline from '../components/ItineraryTimeline';
import { CalendarDays, ArrowRight, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Itinerary = () => {
  const { itinerary, sessionId } = useTravel();
  const navigate = useNavigate();

  if (!sessionId) {
    return (
      <div className="glass-card border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4 py-20">
        <Lock className="w-12 h-12 text-slate-600 opacity-60" />
        <h3 className="text-lg font-bold text-slate-200">Itinerary Builder Locked</h3>
        <p className="text-xs text-slate-400 max-w-sm">
          Please initialize the agent swarm on the homepage first to view daily timelines.
        </p>
        <Link to="/" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wide">
          Unlock Swarm
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-100 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-cyan-400" />
            Itinerary Building Swarm
          </h2>
          <p className="text-xs text-slate-400">Chronological multi-day mapping combining flights, lodging, dining, and site tours</p>
        </div>

        <button 
          onClick={() => navigate('/report')}
          className="glow-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center gap-2 self-start"
        >
          <span>Consolidated Summary</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>

      {/* Timeline details */}
      <ItineraryTimeline itinerary={itinerary} />
    </div>
  );
};

export default Itinerary;
