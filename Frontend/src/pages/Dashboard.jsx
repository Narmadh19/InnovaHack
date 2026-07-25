import React from 'react';
import { useTravel } from '../context/TravelContext';
import ProgressTracker from '../components/ProgressTracker';
import ActionLog from '../components/ActionLog';
import { 
  BrainCircuit, 
  Compass, 
  Plane, 
  Hotel, 
  CloudSun, 
  Coins, 
  UserCheck, 
  FileCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { stages, progress, isGenerating, sessionId } = useTravel();

  const getStageIcon = (id) => {
    switch (id) {
      case 'goal': return <BrainCircuit className="w-5 h-5 text-purple-400" />;
      case 'planner': return <Compass className="w-5 h-5 text-blue-400" />;
      case 'flights': return <Plane className="w-5 h-5 text-sky-400" />;
      case 'hotels': return <Hotel className="w-5 h-5 text-emerald-400" />;
      case 'weather': return <CloudSun className="w-5 h-5 text-amber-400" />;
      case 'budget': return <Coins className="w-5 h-5 text-teal-400" />;
      case 'decision': return <UserCheck className="w-5 h-5 text-indigo-400" />;
      case 'report': return <FileCheck className="w-5 h-5 text-pink-400" />;
      default: return <Compass className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Completed</span>;
      case 'running':
        return <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 animate-pulse">Running</span>;
      default:
        return <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-slate-800 text-slate-500 border border-slate-700/50">Pending</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-100">Swarm Execution Center</h2>
          <p className="text-xs text-slate-400">Monitoring real-time multi-agent communications and analysis steps</p>
        </div>
        
        {progress === 100 && (
          <Link 
            to="/flights" 
            className="glow-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center gap-2 self-start border border-cyan-400/20"
          >
            <span>Explore Trip Swarm</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </Link>
        )}
      </div>

      {!sessionId ? (
        <div className="glass-card border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4">
          <BrainCircuit className="w-16 h-16 text-cyan-400 opacity-50 animate-pulse" />
          <h3 className="text-lg font-bold text-slate-200">No Active Planning Swarm</h3>
          <p className="text-xs text-slate-400 max-w-sm">
            You must enter a travel destination prompt on the homepage to activate the agent network.
          </p>
          <Link 
            to="/" 
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wide border border-cyan-400/20"
          >
            Go to Console
          </Link>
        </div>
      ) : (
        <>
          {/* Tracker bar */}
          <ProgressTracker />

          {/* Grid Layout of Sub-Agents */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stages.map((stage) => (
              <div 
                key={stage.id} 
                className={`glass-card border rounded-2xl p-5 relative overflow-hidden transition-all duration-300 ${
                  stage.status === 'running' 
                    ? 'border-cyan-500/40 bg-cyan-950/10 shadow-lg shadow-cyan-500/5' 
                    : 'border-white/5'
                }`}
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                      {getStageIcon(stage.id)}
                    </div>
                    <span className="text-xs font-bold text-slate-200">{stage.name}</span>
                  </div>
                  {getStatusBadge(stage.status)}
                </div>

                {/* Description */}
                <p className="text-[10px] text-slate-400 leading-relaxed mb-4 min-h-[32px]">
                  {stage.description}
                </p>

                {/* Sub-Progress bar */}
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden relative">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      stage.status === 'completed' 
                        ? 'bg-emerald-500' 
                        : stage.status === 'running' 
                        ? 'bg-cyan-400 animate-pulse' 
                        : 'bg-slate-800'
                    }`}
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Logs Terminal */}
          <ActionLog />
        </>
      )}
    </div>
  );
};

export default Dashboard;
