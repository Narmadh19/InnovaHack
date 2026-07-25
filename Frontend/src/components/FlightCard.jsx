import React from 'react';
import { Plane, Clock, Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const FlightCard = ({ flight, onSelect, isSelected }) => {
  return (
    <div 
      className={`glass-card border rounded-2xl p-5 relative overflow-hidden transition-all duration-300 ${
        isSelected 
          ? 'border-cyan-500 bg-cyan-950/20 shadow-lg shadow-cyan-500/10' 
          : 'border-white/5 hover:border-white/20'
      }`}
    >
      {isSelected && (
        <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-wider uppercase">
          Selected Option
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Airline Info */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center font-black text-cyan-400 text-xs shadow-inner">
            {flight.logo}
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-sm leading-tight">{flight.airline}</h4>
            <span className="text-[10px] text-slate-400 font-mono">{flight.flightNo}</span>
          </div>
        </div>

        {/* Route Details */}
        <div className="flex-1 w-full grid grid-cols-3 items-center text-center gap-2">
          {/* Departure */}
          <div className="text-left">
            <span className="text-lg font-bold text-slate-100 font-mono leading-none block">{flight.depTime}</span>
            <span className="text-xs text-slate-400 font-bold tracking-wider">{flight.depCode}</span>
          </div>

          {/* Timeline Divider */}
          <div className="flex flex-col items-center justify-center px-2">
            <span className="text-[10px] text-slate-400 font-medium mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" />
              {flight.duration}
            </span>
            <div className="relative w-full flex items-center justify-center">
              <div className="h-0.5 w-full bg-slate-800 rounded-full"></div>
              <div className="absolute bg-[#0b0f19] px-2 text-[10px] font-bold text-slate-500 border border-slate-800 rounded-full">
                {flight.stops === 0 ? 'Nonstop' : `${flight.stops} Stop`}
              </div>
            </div>
          </div>

          {/* Arrival */}
          <div className="text-right">
            <span className="text-lg font-bold text-slate-100 font-mono leading-none block">{flight.arrTime}</span>
            <span className="text-xs text-slate-400 font-bold tracking-wider">{flight.arrCode}</span>
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="flex items-center justify-between lg:flex-col lg:items-end w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-white/5 gap-4">
          <div className="text-left lg:text-right">
            <span className="text-[10px] text-slate-400 block tracking-wider uppercase">Estimated Fare</span>
            <span className="text-2xl font-black text-slate-100 font-mono">₹{flight.price}</span>
          </div>

          <button
            onClick={() => onSelect(flight)}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              isSelected 
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' 
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {isSelected ? 'Confirmed' : 'Select Flight'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
