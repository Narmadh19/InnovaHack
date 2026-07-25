import React from 'react';
import { FileText, Cpu, Landmark, Calendar, User, Plane, Hotel } from 'lucide-react';

const ReportCard = ({ report, selectedFlight, selectedHotel }) => {
  if (!report) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Overview Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="glass-card border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Destination</span>
            <span className="text-sm font-bold text-slate-200">{report.summary.destination}</span>
          </div>
        </div>

        {/* Duration */}
        <div className="glass-card border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Duration</span>
            <span className="text-sm font-bold text-slate-200">{report.summary.duration}</span>
          </div>
        </div>

        {/* Selected Flight */}
        <div className="glass-card border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
            <Plane className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 block uppercase">Selected Flight</span>
            <span className="text-sm font-bold text-slate-200 truncate block">
              {selectedFlight ? selectedFlight.airline : report.summary.airlineSelected}
            </span>
          </div>
        </div>

        {/* Selected Hotel */}
        <div className="glass-card border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
            <Hotel className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 block uppercase">Selected Hotel</span>
            <span className="text-sm font-bold text-slate-200 truncate block">
              {selectedHotel ? selectedHotel.name : report.summary.hotelSelected}
            </span>
          </div>
        </div>
      </div>

      {/* Main Analysis details */}
      <div className="glass-card border border-white/10 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
          <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
          <div>
            <h3 className="text-sm font-bold text-slate-100">AI Decision Core</h3>
            <p className="text-[10px] text-slate-400">Swarm synthesis justification summary</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 text-slate-300 text-xs leading-relaxed">
          {report.aiDecision}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider mb-1">Traveler count</span>
            <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <User className="w-4 h-4 text-cyan-400" />
              {report.summary.passenger}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider mb-1">Travel Window</span>
            <span className="text-sm font-bold text-slate-200">{report.summary.dates}</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider mb-1">Total Estimated</span>
            <span className="text-sm font-bold text-cyan-400 font-mono">{report.summary.totalEstimated}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
