import React from 'react';
import { motion } from 'framer-motion';
import { useTravel } from '../context/TravelContext';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';

const ProgressTracker = () => {
  const { progress, stages } = useTravel();

  return (
    <div className="w-full glass-card border border-white/10 rounded-3xl p-6 shadow-xl mb-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100">Swarm Progress</h3>
          <p className="text-xs text-slate-400">Coordinating autonomous agents to synthesize travel options</p>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-cyan-400 font-mono">{progress}</span>
          <span className="text-xs font-semibold text-slate-500">%</span>
        </div>
      </div>

      {/* Progress track */}
      <div className="w-full h-2.5 bg-slate-900/60 rounded-full border border-white/5 overflow-hidden p-0.5 mb-6">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Small mini-steps for mobile/compact layout */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {stages.map((stage, idx) => {
          let statusColor = 'text-slate-500 border-slate-800 bg-transparent';
          let icon = <Circle className="w-4 h-4" />;
          
          if (stage.status === 'completed') {
            statusColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
            icon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
          } else if (stage.status === 'running') {
            statusColor = 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-lg shadow-cyan-500/10';
            icon = <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />;
          }

          return (
            <div 
              key={stage.id} 
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 ${statusColor}`}
            >
              <div className="mb-1.5">{icon}</div>
              <span className="text-[10px] font-bold text-center truncate w-full tracking-wide">
                {stage.name.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
