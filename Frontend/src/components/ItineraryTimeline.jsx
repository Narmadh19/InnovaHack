import React, { useState } from 'react';
import { Plane, Hotel, Navigation, Utensils, Sparkles, Clock, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ItineraryTimeline = ({ itinerary }) => {
  const [activeDay, setActiveDay] = useState(1);

  if (!itinerary || itinerary.length === 0) return null;

  const currentDayData = itinerary.find(d => d.day === activeDay) || itinerary[0];

  const getEventIcon = (type) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-4 h-4 text-sky-400" />;
      case 'hotel':
        return <Hotel className="w-4 h-4 text-emerald-400" />;
      case 'transport':
        return <Navigation className="w-4 h-4 text-purple-400" />;
      case 'food':
        return <Utensils className="w-4 h-4 text-orange-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />;
    }
  };

  const getEventBorderColor = (type) => {
    switch (type) {
      case 'flight': return 'border-sky-500/30 bg-sky-950/20';
      case 'hotel': return 'border-emerald-500/30 bg-emerald-950/20';
      case 'transport': return 'border-purple-500/30 bg-purple-950/20';
      case 'food': return 'border-orange-500/30 bg-orange-950/20';
      default: return 'border-cyan-500/30 bg-cyan-950/20';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Day Selector Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {itinerary.map((dayObj) => (
          <button
            key={dayObj.day}
            onClick={() => setActiveDay(dayObj.day)}
            className={`px-5 py-3 rounded-2xl text-xs font-semibold tracking-wide shrink-0 transition-all flex items-center gap-2 border ${
              activeDay === dayObj.day
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400/20 shadow-md shadow-cyan-500/10'
                : 'bg-white/5 text-slate-400 hover:text-slate-200 border-white/5'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Day {dayObj.day}</span>
          </button>
        ))}
      </div>

      {/* Main Timeline details */}
      <div className="glass-card border border-white/10 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="mb-6">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block mb-1">Active Itinerary</span>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Day {currentDayData.day}: {currentDayData.title}
          </h3>
        </div>

        {/* Timeline Line */}
        <div className="relative pl-6 md:pl-8 flex flex-col gap-8">
          <div className="absolute left-3.5 md:left-5 top-2 bottom-2 w-0.5 bg-slate-800"></div>

          <AnimatePresence mode="wait">
            {currentDayData.events.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="relative flex flex-col md:flex-row md:items-center gap-2 md:gap-6 group"
              >
                {/* Timeline dot */}
                <div className={`absolute -left-6 md:-left-8 top-1 w-6 h-6 rounded-full border flex items-center justify-center shrink-0 translate-x-[50%] z-10 ${getEventBorderColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>

                {/* Event Time */}
                <div className="md:w-20 shrink-0 select-none">
                  <span className="text-xs font-bold text-cyan-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {event.time}
                  </span>
                  {event.duration && (
                    <span className="text-[9px] text-slate-500 block mt-0.5">({event.duration})</span>
                  )}
                </div>

                {/* Event description Card */}
                <div className="flex-1 p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300">
                  <h4 className="text-sm font-bold text-slate-100 mb-1 group-hover:text-cyan-300 transition-colors leading-tight">
                    {event.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ItineraryTimeline;
